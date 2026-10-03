# 🛡️ Security policy

## ✅ What is supported

Only the current code on `main` receives security fixes.

## 📮 Reporting a vulnerability

Please **do not open a public issue** for security problems.

1. Open the repository's **Security** tab and choose **Report a vulnerability** to send a private advisory.
2. Describe the problem, the affected commit and the steps to reproduce it.
3. If you have a proof of concept, attach it to the advisory rather than publishing it.

You can expect an acknowledgement within **3 working days** and a status update at least once a week until the report is resolved. Once a fix is released, the advisory is published and you are credited, unless you prefer to stay anonymous.

## 🎯 Scope

Weather App is a Next.js server that renders forecasts from OpenWeatherMap. The API key never leaves the server, the browser only talks to the app's own origin, and there are no accounts. Reports are especially welcome about:

- 🔑 ways to read or abuse the OpenWeatherMap API key, including the `/api/places` endpoint;
- 💉 script injection through URL parameters, city names or data returned by OpenWeatherMap;
- 🧱 ways to bypass the Content Security Policy or the other security headers;
- 🍪 tampering with the preference cookies or saved places;
- ⚙️ weaknesses in the CI pipeline or the GitHub Actions workflows.

The measures already in place are described in [docs/security.md](../docs/security.md).
