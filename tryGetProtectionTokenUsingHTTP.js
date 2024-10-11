const fetch = require("node-fetch");
const { HttpsProxyAgent } = require("https-proxy-agent");
const { HttpProxyAgent } = require("http-proxy-agent");
const dotenv = require("dotenv");
dotenv.config();

// Main function to get protection token
async function getProtectionToken(action) {
  const fingerprint = "2534243ac8343e26414c4b16b75ce003";
  const captchaV3Token =
    "03AFcWeA5lQtBRwhMT3AShrei3SK1vwI4ugXuL0ntUZUtDhHGpVPT84QwjwOJnNFEsyWLlcgdNe5LwPdYvQBc9-EhsR_B1kazV4rufNB2Fkw0Wmq5A9j00fBA0QKl1qjrCdH1m6afsUqpGxqRGWog53Lo4B0aNYxuWJjuRZQfAZ6gcee7CKdvKCc0R0pIGAC74B13xiXccqLmnvr7lG-g5cLSzEJhoH6jvMuUUnE4OAlYpTQu8wtTNQ40l8Cu_aIoznQynU9r4JECUGTKFRm1tOU2B949LTFtDH4A4Hh2sEHhJIU6oNshxSrJTVoQzt7_LO1VeCZ8FDv2y6NeHEvi-A8Td8OG7DE96FwZKVx_2y6UI4Zo3ke5LAVkc2Z6p6YKwr24k98c3lxqE9OI9UmMKwV0qENYwzq4C534xN9GJhsHD2Ce5zghE-IlsuPUf3Q_8KZJWpTOFSftqAiJmJGTGQxLD-i8bgjyjkgvfnvLrRgc_osnLRTvUdaNcu5ETwjYggQ5xrXzybRPQQxlNZFinE-lCyN66rsf1znIq1JwZLA3Ndf12EqJ_NJiycYLi82e7xj_1ML-bYdo-KMfVLmWRPlfBwPM1E3RhqXAyZw79fZyeloPu5WbcNqbGgAmFzWXmXFzLFq0VAkMvxlhToOzSifkKX-LidDs2d-3XnH4694FzMzzVnH4b7O3ADEhqpgMmvtcyV3hEw2Hh-WAluOk0Wkhh_SGcXTUjsZAMDfoWqUQs-0I3W4J2-rcI8agc06lO8ju1TjeP-9ck0OxxTA1CqFJG5vai_D-T2QC7zxP7QnkTBOFrho4rbF46RF9C3Jgkytvoam097uigaHvKd0eKP3VEkg9lj_Ego51jBjrzGg_7oH3JbCdaPgI";
  const proxyAgentsHttps = new HttpsProxyAgent(process.env.PROXY_URL);
  const proxyAgent = new HttpProxyAgent(process.env.PROXY_URL);

  try {
    const responseStep1 = await fetch("https://spesaonline.conad.it/api/common/protection.json?step=one", {
      method: "POST",
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9,fr-FR;q=0.8,fr;q=0.7",
        "content-type": "application/json",
        priority: "u=1, i",
        "sec-ch-ua": '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie:
          'ecSess=b77701ce-97c6-4bdd-ac0b-0468bd5bb35e; _gid=GA1.2.307486665.1728491389; at_check=true; _gcl_au=1.1.370296263.1728491392; affinity="7f6ac93398611a06"; OptanonAlertBoxClosed=2024-10-09T16:31:44.739Z; AMCVS_D3A6DFCB5937B7F90A495CEB%40AdobeOrg=1; s_ecid=MCMID%7C14627906524286971070190715640379162277; s_cc=true; _hjSessionUser_2956443=eyJpZCI6IjU4MzVjN2MzLTk2YmEtNWU2Ni04ZGIyLTkwOGY1ODVhMzk3YyIsImNyZWF0ZWQiOjE3Mjg0OTE1MDU0OTksImV4aXN0aW5nIjp0cnVlfQ==; _ga_51VD9MZD2G=GS1.1.1728504705.2.1.1728504709.56.0.0; _ga_6W0MP2DNMH=GS1.1.1728504705.2.1.1728504713.52.0.0; cto_bundle=UMJxS19mS3dEejhPYk0lMkJwUVdHVEo5aVlCRThBQTNwMmpQYlVwNE9jdUtwemV1bk1zeEpFYVpkOG0xUGd6aEJjaGl3UWdScHd0alJYUmMlMkJ2MkYwbkd6OGtnNDF1bGYwYVg5Y1Q0NUExQzBnU1plb3QwNDc0aWUzJTJGdVNXcXpFM2YwSkdINmd1eHN2ak9LcUwxMEt2Z09LQU8wM3hrQ3NvN2NrTzFMakR3aGwlMkZYdXEwVSUyQm9Zck1vcWJoOEN4UTdLcHUycTJ3ZGoxaWpGNUpneHYlMkZIM0RBelVqJTJGUUQwSGFYbEhtb09Eb3FDVDRhR0FNRkV0eGVhRlBxbjVJM0c5JTJCN2dCa2VWQw; ecRoute=.api-7db7769998-7xdqj; UC17cookie=closed; _hjHasCachedUserAttributes=true; ecServerUUID=27a89a0a-8aed-430c-a4da-c5c5e7cf5cf5; ecCooperative=cia; ecAccess=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlY0FjY2VzcyIsInRpbWVzdGFtcCI6MTcyODUwNTM0Nzc5NywidHlwZU9mU2VydmljZSI6Ik9SREVSX0FORF9DT0xMRUNUIiwicG9pbnRPZlNlcnZpY2VJZCI6IjAxMDA3MCIsImNhcnRJZCI6ImMtcy1DLTI0LTA4NDQzMTQ3IiwiYW5vbnltb3VzQ2FydElkIjoiYmUwYjRjNGMtNThkZS00ZmFjLWEzZjAtODliZDAzOTE4YTU0IiwiY2FydENyZWF0aW9uVGltZSI6MTcyODUwNTM0NzAyNywidGltZXNsb3RFeHBpcmF0aW9uIjowLCJuU3RvcmVzRm91bmQiOjE1LCJtaXNzaW5nQ2FydENvdW50ZXIiOjAsImNsQ291bnRyeSI6IklUIiwiaXNzIjoiY29uYWQiLCJpYXQiOjE3Mjg1NTkxOTh9.XRyuGJMOWC-_kuDWPL_HglYCXJ0c5eKpHi15bzTfspg; _ga_FBP7KVDNQL=GS1.1.1728598072.5.1.1728598082.0.0.0; OptanonConsent=isGpcEnabled=0&datestamp=Thu+Oct+10+2024+23%3A08%3A03+GMT%2B0100+(GMT%2B01%3A00)&version=202403.2.0&browserGpcFlag=0&isIABGlobal=false&consentId=da9e4a64-1c20-45cb-a3aa-e55118f9a263&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&hosts=H52%3A1%2CH54%3A1%2CH55%3A1%2CH44%3A1%2CH1%3A1%2CH4%3A1%2CH116%3A1%2CH7%3A1%2CH117%3A1%2CH77%3A1%2CH120%3A1%2CH79%3A1%2CH13%3A1%2CH16%3A1%2CH122%3A1%2CH123%3A1%2CH124%3A1%2CH80%3A1%2CH81%3A1%2CH82%3A1%2CH83%3A1%2CH20%3A1%2CH23%3A1%2CH84%3A1%2CH127%3A1%2CH24%3A1%2CH86%3A1%2CH129%3A1%2CH88%3A1%2CH130%3A1%2CH32%3A1%2CH89%3A1%2CH90%3A1%2CH91%3A1%2CH105%3A1%2CH132%3A1%2CH93%3A1%2CH94%3A1&genVendors=&intType=1&geolocation=IT%3B25&AwaitingReconsent=false; AMCV_D3A6DFCB5937B7F90A495CEB%40AdobeOrg=179643557%7CMCMID%7C14627906524286971070190715640379162277%7CMCAAMLH-1729202884%7C6%7CMCAAMB-1729202884%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1728605284s%7CNONE%7CMCAID%7CNONE%7CvVersion%7C5.5.0%7CMCIDTS%7C20006; _hjSession_2956443=eyJpZCI6IjhiMTEyY2FkLTU0MzktNDFhNC05ZmVkLTFhM2QzODQyYjJkYyIsImMiOjE3Mjg1OTgwODYyMDUsInMiOjEsInIiOjEsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _hjUserAttributesHash=7eb5035ed1a519f9c7f2b904ce8a4e95; _ga_5Z1ZD7EPPW=GS1.1.1728598072.5.1.1728598088.0.0.0; _ga_WTHX1M1Q2Y=GS1.1.1728598072.2.1.1728598089.0.0.0; _ga=GA1.1.1744329796.1728491389; dicbo_id=%7B%22dicbo_fetch%22%3A1728598094599%7D; _uetsid=4acdc94086f411efb4dc134c63c52a9d; _uetvid=4acdf74086f411efb3abd32d6c49a9f7; adobeujs-optin=%7B%22aam%22%3Atrue%2C%22adcloud%22%3Atrue%2C%22aa%22%3Atrue%2C%22campaign%22%3Atrue%2C%22ecid%22%3Atrue%2C%22livefyre%22%3Afalse%2C%22target%22%3Atrue%2C%22mediaaa%22%3Atrue%7D; s_plt=32.51; s_pltp=Home%20%7C%20Conad; mbox=PC#c07b68f9403942f1b3514ef72116de79.37_0#1791842918|session#f4f630456d94427997e0506c61fa641e#1728599978; s_sq=%5B%5BB%5D%5D',
        Referer: "https://spesaonline.conad.it/home",
        "Referrer-Policy": "no-referrer-when-downgrade",
      },
      body: JSON.stringify({
        captchaToken: captchaV3Token,
        feBot: false,
        fingerprint,
        action,
        infos: null,
      }),
      agent: proxyAgentsHttps,
    });

    if (!responseStep1.ok) {
      const errorText = await responseStep1.text();
      throw new Error(`HTTP error! Status: ${responseStep1.status}, Message: ${errorText}`);
    }

    const dataStep1 = await responseStep1.json();
    if (dataStep1?.data?.ok) {
      return dataStep1.data.token;
    }
    throw new Error("Unable to obtain protection token");
  } catch (error) {
    console.error("Fetch Error:", error.message);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    const protectionToken = await getProtectionToken("entryaccess");
    console.log("Protection Token:", protectionToken);
  } catch (error) {
    console.error("Error:", error);
  }
})();
