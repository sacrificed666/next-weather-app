import type { MessageKey, Messages } from "./messages/en";

export type MessageParams = Readonly<Record<string, string | number>>;

export type Translate = (key: MessageKey, params?: MessageParams) => string;

const PLACEHOLDER = /\{(\w+)\}/gu;

export const createTranslator =
  (messages: Messages): Translate =>
  (key, params) => {
    const template = messages[key];
    if (!params) return template;
    return template.replaceAll(PLACEHOLDER, (placeholder, name: string) =>
      Object.hasOwn(params, name) ? String(params[name]) : placeholder,
    );
  };
