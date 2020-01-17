$(document).ready(function() {
    const google = "https://www.google.com/search?q=";
    const bing = "https://www.bing.com/search?q=";
    const duckDuckGo = "https://www.duckduckgo.com/?q=";
    
    showDomains();

    $('input#search').focus();

    function showDomains() {
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
                    case "bing":
                        search = bing;
                        break;
                    case "duckduckgo":
                        search = duckDuckGo;
                        break;
                    default:
                        search = google;
                }
                search += "site:" + hostname + " " + $('#search').val();
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
                    case "bing":
                        search = bing;
                        break;
                    case "duckduckgo":
                        search = duckDuckGo;
                        break;
                    default:
                        search = google;
                }
                search += "site:" + hostname + " " + $('#search').val();
                window.open(search, '_blank');
            });
        });
    });
});
