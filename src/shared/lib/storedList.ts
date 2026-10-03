export interface StoredList<Item> {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => readonly Item[];
  getServerSnapshot: () => readonly Item[];
  replace: (items: readonly Item[]) => void;
}

const readStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

const parseJson = (raw: string): unknown => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const createStoredList = <Item>(
  key: string,
  parse: (value: unknown) => Item | null,
  limit: number,
): StoredList<Item> => {
  const empty: readonly Item[] = [];
  const listeners = new Set<() => void>();
  let cached: { raw: string | null; items: readonly Item[] } = { raw: null, items: empty };

  const getSnapshot = () => {
    const raw = readStorage(key);
    if (raw === cached.raw) return cached.items;
    const parsed = raw === null ? null : parseJson(raw);
    const items = Array.isArray(parsed)
      ? parsed
          .map(parse)
          .filter((item): item is Item => item !== null)
          .slice(0, limit)
      : empty;
    cached = { raw, items };
    return items;
  };

  const notify = () => {
    for (const listener of listeners) listener();
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) notify();
  };

  return {
    subscribe: (listener) => {
      listeners.add(listener);
      if (listeners.size === 1) window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0) window.removeEventListener("storage", onStorage);
      };
    },
    getSnapshot,
    getServerSnapshot: () => empty,
    replace: (items) => {
      if (writeStorage(key, JSON.stringify(items.slice(0, limit)))) notify();
    },
  };
};
