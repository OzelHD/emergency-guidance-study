# Validation / Prüfung

Checked 09.11.2026 on Windows with Node.js 22.17.0.

## Automated

- `npm run build`: passed strict TypeScript compilation and Vite production build. Approximately 77 kB gzipped application JavaScript and 3.4 kB gzipped CSS. No runtime dependencies besides React and React DOM.
- `npm test`: all **6 tests passed**. Four rendered-component tests cover the entire landslide/flood flow in DE and EN, back navigation, translation at every step, theme changes, dynamic progress, completion, final-step review, reset defaults and study information. Two tests cover bilingual content invariants and invalid navigation transitions.
- The test renderer emits its upstream deprecation notice; tests pass. These component tests do not replace browser, assistive-technology or participant evaluation.

## Browser checks

- Checked desktop selection and phone layouts at 390 × 844 and 320 × 740. At 320 px the document width remained within the viewport; all three header controls measured 44 × 44 CSS px after the final adjustment.
- Visually checked light and dark instruction screens. Local SVGs render and the primary instruction remains prominent.
- Completed the English landslide flow in the browser through all four actions and the completion screen.
- Completed the German flood flow through all three actions and completion while the local production server was stopped.
- Verified language switching retains the same step and changes the document language/title.
- Keyboard Enter activates scenario cards and the start button. After navigation, focus is on `main`. Escape closes the native information dialog and returns focus to its opener.
- Saved `docs/preview-mobile.png` as a visual reference of the German flood step screen.

## Offline regression found and fixed

The initial cache served the HTML shell but missed module assets when a host varied responses by `Origin`. The production service worker now matches exact app asset URLs with `ignoreVary: true` within its own revisioned cache. There is no personalized content in that cache. A fresh production origin reloaded the complete application successfully after the server was stopped; flood navigation and completion then worked without that server. Both language dictionaries are in the cached JavaScript bundle.

The final production rebuild also includes a revision derived from JS/CSS filenames, the HTML source and the favicon. App updates do not force a reload during an existing participant session.

## Deployment status

GitHub Pages workflow is configured at `.github/workflows/deploy.yml` for `OzelHD/emergency-guidance-study`. Publication was requested on 09.11.2026. The workflow runs all tests and the production build before deployment; its run status is available in the repository's Actions tab. Only `dist/` is configured as the deployment artifact; the supplied PDF, reference screenshot and temporary extracted text are not part of that artifact. The page is served under the repository subdirectory, using relative asset paths and a service worker scoped to that directory.

Publication verified on 09.11.2026: https://ozelhd.github.io/emergency-guidance-study/ loads the application, the current German AI disclosure and the scenario selection without em dashes. All six tests, the production build and deployment passed in [workflow run 42674025597](https://github.com/OzelHD/emergency-guidance-study/actions/runs/42674025597), for application commit `37f97c34e259c0c4f0adbcf52c2f32d28fe3b475`. GitHub's original automatically created environment repeatedly produced internal server errors before deployment jobs could start. With the user's express approval, publication uses `pages-production` with the same restriction to the `main` branch. No credentials or additional users were added.

## Remaining evaluation limits

No physical-device, iOS/Safari, full screen-reader, formal WCAG audit, professional emergency-content approval or participant usability study was performed. Check the study prerequisites and unresolved safety questions in `SCENARIO_REVIEW.md` before using the scripts with participants. The prototype is a facilitated simulation, not a live emergency service.
