"use server";

import { cookies } from "next/headers";

import { isPreferenceValue, preferenceCookies, type PreferenceName } from "./preferences";

const ONE_YEAR = 60 * 60 * 24 * 365;

export const savePreference = async (name: PreferenceName, value: string) => {
  if (!Object.hasOwn(preferenceCookies, name) || !isPreferenceValue(name, value)) return;
  (await cookies()).set(preferenceCookies[name], value, {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
};
