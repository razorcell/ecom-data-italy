const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const HttpsProxyAgent = require("https-proxy-agent");
const randomUseragent = require("random-useragent");
const dotenv = require("dotenv");
dotenv.config();

puppeteer.use(StealthPlugin());


// Start of Selection
const proxyAgent = new HttpsProxyAgent(process.env.PROXY_URL);

async function logToBrowserConsole(page, message) {
  await page.evaluate((msg) => {
    console.log(msg);
  }, message);
}

async function waitRandomTime(page) {
  const min = 2000; // 2 seconds
  const max = 4000; // 4 seconds
  const waitTime = Math.floor(Math.random() * (max - min + 1)) + min;
  await logToBrowserConsole(page, `Waiting for ${waitTime} milliseconds`);
  await new Promise((resolve) => setTimeout(resolve, waitTime));
}

async function waitSpecificTime(page, nbr) {
  const waitTime = nbr * 1000; // Convert seconds to milliseconds
  await logToBrowserConsole(page, `Waiting for ${waitTime} milliseconds`);
  await new Promise((resolve) => setTimeout(resolve, waitTime));
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
    defaultViewport: {
      width: 1280, // Adjust width to your screen size
      height: 768, // Adjust height to your screen size
    },
  });

  const context = await browser.defaultBrowserContext();
  const page = await context.newPage();

  const userAgent = randomUseragent.getRandom((ua) => ua.browserName === "Chrome");
  console.log(userAgent);
  await page.setUserAgent(userAgent);

  // Set a longer navigation timeout
  page.setDefaultNavigationTimeout(120000);

  // Set proxy authentication
  await page.authenticate({
    username: proxyAgent.proxy.auth.split(":")[0],
    password: proxyAgent.proxy.auth.split(":")[1],
  });

  try {
    await page.goto("https://spesaonline.conad.it/home", { waitUntil: "networkidle0" });

    await waitSpecificTime(page, 10);
    const cookieButton = await page.$("#onetrust-accept-btn-handler");
    if (cookieButton) {
      await page.click("#onetrust-accept-btn-handler");
      await waitRandomTime(page);
    } else {
      console.log("No cookie button found, moving on.");
    }

    await logToBrowserConsole(page, "typing address");
    await page.type("#googleInputEntrypageLine1", "viale lucania 22", { delay: 500 });

    await waitSpecificTime(page, 4);

    await logToBrowserConsole(page, "click search button");
    await page.click("#\\30 -1-banner-address-536650613 > form > button.uk-form-icon.uk-form-icon-flip.submitButton");
    await waitRandomTime(page);

    await logToBrowserConsole(page, "click list of stores");

    await page.waitForSelector("#ordina-e-ritira > div > div > button", { visible: true });
    await page.click("#ordina-e-ritira > div > div > button");
    await waitRandomTime(page);

    // ---------- SELECT STORE ---------
    await logToBrowserConsole(page, "waiting for ul tag");
    await page.waitForSelector(
      "#ordina-ritira-scelta-pdv > div.section-view-negozi > div > div.lista-negozi-section > div > ul",
      { visible: true }
    );
    const liCount = await page.evaluate(() => {
      return document.querySelectorAll(
        "#ordina-ritira-scelta-pdv > div.section-view-negozi > div > div.lista-negozi-section > div > ul > li"
      ).length;
    });
    await logToBrowserConsole(page, `Number of <li> tags: ${liCount}`);
    await logToBrowserConsole(page, "clicking first store");
    if (liCount > 0) {
      await page.click(
        "#ordina-ritira-scelta-pdv > div.section-view-negozi > div > div.lista-negozi-section > div > ul > li:nth-child(1)"
      );
      await waitRandomTime(page);
    }

    await logToBrowserConsole(page, "waiting for select store button");
    await page.waitForSelector(
      "#modal-onboarding-wrapper > div.modal-content.uk-align-center.uk-grid-margin.uk-first-column > div.bottom-section.btn-conferma-pdv > button",
      { visible: true }
    );
    await logToBrowserConsole(page, "click on select store button");
    // Click on Select Store button
    await page.click(
      "#modal-onboarding-wrapper > div.modal-content.uk-align-center.uk-grid-margin.uk-first-column > div.bottom-section.btn-conferma-pdv > button"
    );
    await waitRandomTime(page);
    // ---- WAIT FOR THE CHANGE STORE BUTTON ---
    await page.waitForSelector("body > section.header-row > div.component-PreHeader > div", { visible: true });
    await waitRandomTime(page);

    const cookies = await page.cookies();
    const ecCooperative = cookies.find(cookie => cookie.name === "ecCooperative")?.value || "";
    const ecAccess = cookies.find(cookie => cookie.name === "ecAccess")?.value || "";
    const cookieHeader = cookies.map((cookie) => `${cookie.name}=${cookie.value}`).join("; ");

    // Extract and filter the pointOfService object
    const pointOfService = await page.evaluate(() => {
      const pos = window.pointOfService || {};
      return {
        address: pos.address,
        businessName: pos.businessName,
        geoPoint: pos.geoPoint,
        internalStoreCode: pos.internalStoreCode,
        name: pos.name,
        storeType: pos.storeType,
        storeSystems: pos.storeSystems,
        storeSize: pos.storeSize,
      };
    });

    // Assemble the result with the cookie header
      const result = {
          ecCooperative,
          ecAccess,
          ...pointOfService,
          cookieHeader,
      };
     

    console.log("Result:", result);

    // Keep the browser open
    console.log("Page loaded. Browser will remain open.");
  } catch (error) {
    console.error("Error visiting the page:", error);
  }
})();
