# K6 Browser Test
## Project structure

- `tests/load.js` - K6 browser test script
- `reports/summary.html` - generated HTML report output
- `package.json` - project metadata and scripts
- `README.md` - usage instructions

## Prerequisites

- Install K6: https://k6.io/docs/getting-started/installation
- Use a K6 browser-enabled build if you need the browser API support.

## Run the test

```bash
k6 run tests/load.js
```

## View report

After the test completes, open:

```bash
reports/summary.html
```

## Notes

The script uses the K6 browser API and the external HTML reporter from `benc-uk/k6-reporter`.

Report guide:
browser_web_vital_fcp: First Contentful Paint. Time until the first visible content appears.

browser_web_vital_lcp: Largest Contentful Paint. Time until the main page content finishes loading.

browser_web_vital_ttfb: Time to First Byte. Backend/network responsiveness.

browser_web_vital_fid: First Input Delay. How fast the page responds to the first interaction.

browser_web_vital_inp: Interaction to Next Paint. How responsive the page is during the whole experience.

