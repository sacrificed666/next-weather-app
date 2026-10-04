"use client";

import ForecastError from "@/features/forecast/ui/ForecastError/ForecastError";
import { homeHref } from "@/features/i18n/model/locales";
import { useI18n } from "@/features/i18n/model/useI18n";

interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

const ErrorPage = ({ error, retry }: ErrorPageProps) => {
  const { locale, t } = useI18n();
  return <ForecastError kind="unexpected" t={t} home={homeHref(locale)} digest={error.digest} onRetry={retry} />;
};

export default ErrorPage;
