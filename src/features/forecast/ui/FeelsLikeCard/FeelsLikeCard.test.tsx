import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { view } from "@/test/fixtures";
import { renderWithI18n } from "@/test/render";

import FeelsLikeCard from "./FeelsLikeCard";

describe("FeelsLikeCard", () => {
  it("explains why the apparent temperature differs", () => {
    renderWithI18n(<FeelsLikeCard {...view()} />);
    expect(screen.getByText("The wind makes it feel colder.")).toBeInTheDocument();
  });
});
