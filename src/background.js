const noFilters = { urls: ["https://*/*", "http://*/*"] };

const filters = { urls: ["*://*.nextgenaws.net/*"] };
const options = [];

// chrome.webRequest.onCompleted.addListener(
//   function (details) {
//     const { requestId, url, initiator, method } = details;
//     console.log(details);
//     console.log(requestId, url, initiator, method);
//     // copyTextToClipboard(initiator);
//     return { requestHeaders: details.requestHeaders };
//   },
//   filters,
//   options
// );
