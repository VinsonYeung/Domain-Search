$(document).ready(function() {
    const google = "https://www.google.com/search?q=";
    const yahoo = "https://www.search.yahoo.com/search?p=";
    const bing = "https://www.bing.com/search?q=";
    const duckduckgo = "https://www.duckduckgo.com/?q=";
    const ecosia = "https://www.ecosia.org/search?q=";
    
    showSelectableDomains();

    $('input#search').focus();

    // Show list of domains for selection
    function showSelectableDomains() {
        chrome.storage.local.get('domains', function(data) {
            $('#domains-list').append("<option value='current'>Current Domain</option>");
            if (data.domains != undefined) {
                data.domains.forEach(element => {
                    $('#domains-list').append("<option value=" + element + ">" + element + "</option>");
                });
            }
        });
    };

    $('#this-tab').click(function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var hostname = $('#domains-list').val();
            if (hostname == "current") {
                hostname = new URL(tabs[0].url).hostname;
            }
            chrome.storage.local.get('searchEngine', function(data) {
                var search;
                switch (data.searchEngine) {
                    case "google":
                        search = google;
                        break;
                    case "yahoo":
                        search = yahoo;
                        break;
                    case "bing":
                        search = bing;
                        break;
                    case "duckduckgo":
                        search = duckduckgo;
                        break;
                    case "ecosia":
                        search = ecosia;
                        break;
                    default:
                        search = google;
                }
                search += "site:" + hostname + "+" + $('#search').val();
                chrome.tabs.update({ url: search })
            });
        });
    });

    $('#new-tab').click(function() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var hostname = $('#domains-list').val();
            if (hostname == "current") {
                hostname = new URL(tabs[0].url).hostname;
            }
            chrome.storage.local.get('searchEngine', function(data) {
                var search;
                switch (data.searchEngine) {
                    case "google":
                        search = google;
                        break;
                    case "yahoo":
                        search = yahoo;
                        break;
                    case "bing":
                        search = bing;
                        break;
                    case "duckduckgo":
                        search = duckduckgo;
                        break;
                    case "ecosia":
                        search = ecosia;
                        break;
                    default:
                        search = google;
                }
                search += "site:" + hostname + "+" + $('#search').val();
                window.open(search, '_blank');
            });
        });
    });
});
