"use client";

import "./globals.scss";
import ForecastError from "@/features/forecast/ui/ForecastError/ForecastError";
import { en } from "@/features/i18n/model/messages/en";
import { createTranslator } from "@/features/i18n/model/translate";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

const t = createTranslator(en);

const GlobalError = ({ retry }: GlobalErrorProps) => (
  <html lang="en" data-theme="system">
    <body>
      <ForecastError kind="unexpected" t={t} onRetry={retry} />
    </body>
  </html>
);

export default GlobalError;
