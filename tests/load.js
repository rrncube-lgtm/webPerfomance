import { browser } from "k6/browser";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
export const options = {
  scenarios: {
    browser_test: {
      executor: "ramping-vus",
      startVUs: 1,
      stages: [
        { duration: "30s", target: 50 },
        { duration: "1m", target: 50 },
        { duration: "30s", target: 0 },
      ],
      options: {
        browser: {
          type: "chromium",
        },
      },
    },
  },

  thresholds: {
    checks: ["rate>0.95"],
  },
};

export default async function () {
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Open website
    await page.goto("https://www.saucedemo.com/", {
      waitUntil: "networkidle",
    });

    // Login
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");

    await Promise.all([
      page.waitForNavigation(),
      page.locator("#login-button").click(),
    ]);

    const title = await page.locator(".title").textContent();

    check(page, {
      "logged in successfully": () => title === "Products",
    });
    // Add item to cart
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Open cart
    await page.locator(".shopping_cart_link").click();

    sleep(1);
  } finally {
    await page.close();
    await context.close();
  }

}

export function handleSummary(data) {
  return {
    "reports/summary.html": htmlReport(data),
  };
}
