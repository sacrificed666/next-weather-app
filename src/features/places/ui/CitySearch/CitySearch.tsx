"use client";

import { useRouter } from "next/navigation";
import {
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
  useTransition,
} from "react";

import { homeHref, type Locale } from "@/features/i18n/model/locales";
import { useI18n } from "@/features/i18n/model/useI18n";
import { readArray } from "@/shared/lib/guards";
import Flag from "@/shared/ui/Flag/Flag";
import Icon from "@/shared/ui/Icon/Icon";

import { cityHref } from "../../model/location";
import { parsePlace, placeHref, placeKey, type Place } from "../../model/place";
import { clearRecentPlaces, recentPlaces, rememberPlace, useStoredPlaces } from "../../model/storedPlaces";

import styles from "./CitySearch.module.scss";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 250;

interface Lookup {
  query: string;
  places: Place[] | null;
}

const fetchPlaces = async (query: string, locale: Locale, signal: AbortSignal): Promise<Place[] | null> => {
  const response = await fetch(`/api/places?q=${encodeURIComponent(query)}&lang=${locale}`, { signal });
  if (!response.ok) return null;
  const body: unknown = await response.json();
  return readArray(body, "places")
    .map(parsePlace)
    .filter((place): place is Place => place !== null);
};

const CitySearch = () => {
  const { locale, t, intlLocale } = useI18n();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [lookup, setLookup] = useState<Lookup | null>(null);
  const [navigating, startNavigation] = useTransition();
  const recent = useStoredPlaces(recentPlaces);

  const trimmed = query.trim();
  const searching = trimmed.length >= MIN_QUERY_LENGTH;
  const current = lookup?.query === trimmed ? lookup : null;
  const loading = searching && current === null;
  const options: readonly Place[] = searching ? (current?.places ?? []) : recent;
  const failed = searching && current?.places === null;
  const empty = searching && current?.places?.length === 0;
  const expanded = open && (options.length > 0 || searching);
  const countries = new Intl.DisplayNames(intlLocale, { type: "region", fallback: "code" });

  useEffect(() => {
    if (trimmed.length < MIN_QUERY_LENGTH) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchPlaces(trimmed, locale, controller.signal)
        .then((places) => setLookup({ query: trimmed, places }))
        .catch(() => {
          if (!controller.signal.aborted) setLookup({ query: trimmed, places: null });
        });
    }, DEBOUNCE_MS);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed, locale]);

  const navigate = (href: string) => {
    setOpen(false);
    setQuery("");
    setActive(-1);
    inputRef.current?.blur();
    startNavigation(() => router.push(href));
  };

  const choose = (place: Place) => {
    rememberPlace(place);
    navigate(placeHref(locale, place));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const option = expanded ? options[active] : undefined;
    if (option) choose(option);
    else if (trimmed !== "") navigate(cityHref(locale, trimmed));
  };

  const move = (step: 1 | -1) => {
    setOpen(true);
    const count = options.length;
    if (count === 0) return;
    setActive((index) => {
      if (index < 0) return step > 0 ? 0 : count - 1;
      return (index + step + count) % count;
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    } else if (event.key === "Escape") {
      if (expanded) setOpen(false);
      else setQuery("");
      setActive(-1);
    }
  };

  const onBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.closest("search")?.contains(event.relatedTarget)) setOpen(false);
  };

  const optionId = (index: number) => `${listId}-option-${index}`;

  return (
    <search className={styles.search}>
      <form action={homeHref(locale)} method="get" onSubmit={submit}>
        <label className={styles.field}>
          <span className="visually-hidden">{t("search.label")}</span>
          <Icon
            name={navigating || loading ? "loader" : "search"}
            size={18}
            className={navigating || loading ? styles.spinning : styles.icon}
          />
          <input
            ref={inputRef}
            className={styles.input}
            type="search"
            name="city"
            value={query}
            placeholder={t("search.placeholder")}
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="search"
            maxLength={80}
            role="combobox"
            aria-expanded={expanded}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={expanded && active >= 0 ? optionId(active) : undefined}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(-1);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
          />
          {query !== "" && (
            <button
              className={styles.clear}
              type="button"
              aria-label={t("search.clear")}
              onClick={() => {
                setQuery("");
                setActive(-1);
                inputRef.current?.focus();
              }}
            >
              <Icon name="close" size={16} />
            </button>
          )}
        </label>

        <div className={styles.popup} hidden={!expanded}>
          {!searching && recent.length > 0 && (
            <div className={styles.heading}>
              <span>{t("search.recent")}</span>
              <button className={styles.textButton} type="button" onClick={clearRecentPlaces} onBlur={onBlur}>
                {t("search.clearRecent")}
              </button>
            </div>
          )}
          <div className={styles.list} id={listId} role="listbox" aria-label={t("search.label")}>
            {options.map((place, index) => (
              <div
                key={placeKey(place)}
                id={optionId(index)}
                className={styles.option}
                role="option"
                tabIndex={-1}
                aria-selected={index === active}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => choose(place)}
              >
                <span className={styles.badge}>
                  {place.country ? (
                    <Flag country={place.country} height={14} />
                  ) : (
                    <Icon name={searching ? "pin" : "history"} size={16} />
                  )}
                </span>
                <span className={styles.label}>
                  <span className={styles.name}>{place.name}</span>
                  <span className={styles.details}>
                    {[place.region, place.country ? countries.of(place.country) : null].filter(Boolean).join(", ")}
                  </span>
                </span>
              </div>
            ))}
          </div>
          {loading && <p className={styles.status}>{t("search.loading")}</p>}
          {empty && <p className={styles.status}>{t("search.empty", { query: trimmed })}</p>}
          {failed && <p className={styles.status}>{t("search.failed")}</p>}
        </div>

        <output className="visually-hidden">
          {searching && current?.places ? t("search.suggestions", { count: current.places.length }) : ""}
        </output>
      </form>
    </search>
  );
};

export default CitySearch;
