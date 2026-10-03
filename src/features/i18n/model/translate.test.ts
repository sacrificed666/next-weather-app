import { describe, expect, it } from "vitest";

import { en } from "./messages/en";
import { uk } from "./messages/uk";
import { createTranslator } from "./translate";

describe("createTranslator", () => {
  it("returns messages and fills in parameters", () => {
    const t = createTranslator(en);
    expect(t("app.name")).toBe("Weather");
    expect(t("current.feelsLike", { value: "11°" })).toBe("Feels like 11°");
    expect(t("daily.title", { count: 7 })).toBe("7-day forecast");
  });

  it("leaves unknown placeholders untouched", () => {
    expect(createTranslator(en)("search.empty", { other: "x" })).toBe("No cities match “{query}”.");
  });

  it("translates into other languages", () => {
    expect(createTranslator(uk)("daily.title", { count: 5 })).toBe("Прогноз на 5 днів");
  });
});
