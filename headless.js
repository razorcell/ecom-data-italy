const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const HttpsProxyAgent = require("https-proxy-agent");

// Use the stealth plugin
puppeteer.use(StealthPlugin());

// Proxy details
const proxyAgent = new HttpsProxyAgent("http://43dle0eolrojlw1ovjpdj:y5inwf9thsgg1uev047de4@20.62.44.172:8888");

async function logToBrowserConsole(page, message) {
  await page.evaluate((msg) => {
    console.log(msg);
  }, message);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    devtools: true, // Open DevTools
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      `--proxy-server=${proxyAgent.proxy.host}:${proxyAgent.proxy.port}`,
    ],
  });

  const context = await browser.defaultBrowserContext();
  const page = await context.newPage();
  // Set a longer navigation timeout
  page.setDefaultNavigationTimeout(60000); // 60 seconds

  // Set proxy authentication
  await page.authenticate({
    username: proxyAgent.proxy.auth.split(":")[0],
    password: proxyAgent.proxy.auth.split(":")[1],
  });

  try {
    await page.goto("https://spesaonline.conad.it/home", { waitUntil: "networkidle0" });

    // Click the cookie acceptance button
    await page.click("#onetrust-accept-btn-handler");

    // Type the address into the input field
    await page.type("#googleInputEntrypageLine1", "viale lucania 22");

    // Wait for a short period before pressing Enter
    // Wait for a short period before pressing Enter
    await logToBrowserConsole(page, "Waiting 4 seconds");

    await new Promise((resolve) => setTimeout(resolve, 4000)); // Wait for 1 second
    // await page.waitForTimeout(4000); // Wait for 3 second
    // Log a message to the browser console
    await logToBrowserConsole(page, "click search button");

    // Locate the button using a CSS selector and click it
    await page.click("#\\30 -1-banner-address-536650613 > form > button.uk-form-icon.uk-form-icon-flip.submitButton");

    await logToBrowserConsole(page, "waiting for navigation");

    // Wait for the network to be idle
    await page.waitForNavigation({ waitUntil: "networkidle0" });

    await logToBrowserConsole(page, "click list of stores");

    // Click the next button
    await page.click("#ordina-e-ritira > div > div > button");

    // // // Press Enter to submit
    // await page.keyboard.press("Enter");

    // Keep the browser open
    console.log("Page loaded. Browser will remain open.");
  } catch (error) {
    console.error("Error visiting the page:", error);
  }
})();
