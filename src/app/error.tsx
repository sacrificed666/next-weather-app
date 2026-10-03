"use client";

import ForecastError from "@/features/forecast/ui/ForecastError/ForecastError";
import { useI18n } from "@/features/i18n/model/useI18n";

interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

const ErrorPage = ({ retry }: ErrorPageProps) => {
  const { t } = useI18n();
  return <ForecastError kind="unexpected" t={t} onRetry={retry} />;
};

export default ErrorPage;
