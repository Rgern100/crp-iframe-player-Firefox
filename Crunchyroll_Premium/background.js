var extraInfoSpec = ['blocking', 'responseHeaders'];
var filter = {
    urls: ["*://rgern100.github.io/*", "*://*.crunchyroll.com/*", "*://pl.crunchyroll.com/*", "*://localhost/*", "*://*.vrv.co/*"],
};

browser.webRequest.onHeadersReceived.addListener(
    function(details) {
      const newHeader = {name: 'Access-Control-Allow-Origin', value: '*'};
      const responseHeaders = details.responseHeaders.concat(newHeader);
      return { responseHeaders };
    },
    {
      urls: ["*://rgern100.github.io/*", "*://*.crunchyroll.com/*", "*://pl.crunchyroll.com/*", "*://localhost/*", "*://*.vrv.co/*"],
      types : ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    },
    ["blocking","responseHeaders"]
  )
