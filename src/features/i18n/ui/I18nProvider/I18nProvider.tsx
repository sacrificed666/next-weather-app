"use client";

import type { ReactNode } from "react";

import { I18nContext, type I18nValue } from "../../model/context";

interface I18nProviderProps extends I18nValue {
  children: ReactNode;
}

const I18nProvider = ({ locale, messages, children }: I18nProviderProps) => (
  <I18nContext value={{ locale, messages }}>{children}</I18nContext>
);

export default I18nProvider;
