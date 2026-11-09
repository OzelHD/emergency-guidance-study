# Schritt für Schritt / Step by step

Mobile-first React + TypeScript + Vite research prototype for **simulated** landslides and floods. German is the default; DE/EN switches all visible interface text, scenario text, accessible labels and study information on setup and completion screens. The chosen language and theme apply throughout the focused guide. Light and dark themes are fully implemented. No account, analytics, GPS, sound, real alerts or emergency calls.

GitHub Pages: https://ozelhd.github.io/emergency-guidance-study/

Source: https://github.com/OzelHD/emergency-guidance-study

## Lokal starten / Run locally

Requires Node.js 22.12+ and npm.

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite (normally `http://127.0.0.1:5173`).

```sh
npm test
npm run build
npm run preview
```

The production preview is normally `http://127.0.0.1:4173`. Offline support is enabled in production builds only, to avoid development cache conflicts.

## Inhalte bearbeiten / Edit content

- `src/content/scenarios.ts`: all German/English scenario names, descriptions, warnings, prerequisites, actions and explanations. Step counts come from each scenario array.
- `src/content/interface.ts`: all German/English interface text and accessibility labels.
- `src/components/Illustration.tsx`: local, code-native SVG illustrations. No external images/fonts/CDNs.
- `src/styles.css`: responsive design, light/dark colors, reduced motion and focus indicators.
- `src/state.ts`: deterministic state machine for selection, warning, step advancement, completion, last-step review and restart. Back from the warning returns to selection.

**Read `docs/SCENARIO_REVIEW.md` before any participant study.** It documents the PDF's unsafe flood contradiction, all editorial changes, the missing physical route, and unresolved study prerequisites. The supplied PDF and screenshot are reference material and are not uploaded with this app.

## Studienablauf / Study use

Prepare the physical route and destination and explain them before opening the warning. Choose language and theme before starting the guide. During the guide, only the step count, the instruction card and one **Weiter / Next** button are displayed. The card contains an illustration, the primary action and its relevant explanation. The guide fills the viewport without scrolling, with the button always at the bottom. There is no header, footer, repeated step number, secondary navigation or study information during a step. On short landscape screens the illustration and text sit side by side. Participants move forward explicitly; the last **Weiter / Next** opens the completion screen. No timers, automatic advances or tracking are implemented. Outside the active guide, the information dialog explains data behavior and can be closed with Escape. Semantic controls, visible focus and focus movement to the main content support keyboard/screen-reader use.

After completion, **Neuen Durchgang starten / Start a new session** returns to selection and resets language to German and theme to light for a consistent initial state. A page reload also resets flow and preferences. Language and theme controls are available on selection, warning and completion screens. The completion screen allows reviewing the last step. Native browser Back is not used as step navigation.

## Statisch bereitstellen / Static deployment

### GitHub Pages (deployment target)

The repository includes `.github/workflows/deploy.yml`. GitHub Pages is configured to use GitHub Actions. The workflow installs locked dependencies with `npm ci`, runs tests and the production build, uploads only `dist/`, and deploys it to Pages. Later pushes to `main` repeat the verified deployment. The resulting URL appears in the workflow's `pages-production` environment, which permits deployments only from `main`.

Both `https://OWNER.github.io/REPOSITORY/` and a custom domain are supported: Vite uses relative URLs, and the service worker registers within the current repository directory. No repository name needs to be hard-coded. GitHub Pages availability depends on the repository's visibility and the account's plan. GitHub Pages visitor access is managed by GitHub, separately from the app; the application itself never asks for an account.

Official workflow reference: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

### Other static hosts

Run `npm run build`, then upload the contents of `dist/` to any HTTPS static host. No server application, environment variables or API credentials are needed. Relative asset URLs support subdirectory hosting. Serve `.js` as JavaScript and `index.html` as HTML. Do not use `file://`.

The production build generates `dist/sw.js` with a revisioned cache containing the complete app shell and all generated assets. **Wait until the footer says “Offline verfügbar / Available offline” after the first online load** before disconnecting. Subsequent reloads and both languages/scenarios work from this cache. HTTPS (or localhost) and a browser supporting service workers are required.

For updates: publish the complete new `dist/` together. The new worker installs its own asset cache and waits until existing app tabs close before activation, so a session is not forcibly updated midway. Close all tabs and reopen online to receive the new release. Unregister the worker and clear this site's cache in browser developer tools when intentionally removing offline data.

The only persistent client storage is the browser's offline app-file cache. Participant progress and theme/language preferences are held in memory and are not saved or sent. Static hosting may retain ordinary server access logs; this app does not control the host's logging policy.

## Validation

`npm test` checks both scenario flows and both languages through selection, warning, every focused step, completion, review, theme persistence, restart defaults, and content/config invariants. It checks that the active guide has only one button and no header, footer or extra notices. `npm run build` runs strict TypeScript checks and produces the static release. Browser/manual QA results are in `docs/VALIDATION.md`.
