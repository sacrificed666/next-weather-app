import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithI18n } from "@/test/render";

import OfflineNotice from "./OfflineNotice";

const offline = vi.hoisted(() => ({ value: false }));

vi.mock("next/offline", () => ({ useOffline: () => offline.value }));

describe("OfflineNotice", () => {
  it("appears only while offline", () => {
    offline.value = false;
    const { rerender } = renderWithI18n(<OfflineNotice />);
    expect(screen.getByRole("status", { hidden: true })).not.toBeVisible();
    offline.value = true;
    rerender(<OfflineNotice />);
    expect(screen.getByRole("status", { hidden: true })).toHaveTextContent("You are offline");
  });
});
