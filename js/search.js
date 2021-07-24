$(document).ready(function() {
    const google = "https://www.google.com/search?q=";
    const yahoo = "https://www.search.yahoo.com/search?p=";
    const bing = "https://www.bing.com/search?q=";
    const duckduckgo = "https://www.duckduckgo.com/?q=";
    const ecosia = "https://www.ecosia.org/search?q=";
    
    showSelectableDomains();
    showSavedDomains();
    getCurrentSearchEngine();

    $('input#search').focus();

    // Show list of domains for selection
    function showSelectableDomains() {
        chrome.storage.local.get('domains', function(data) {
            $('#domains-list').empty();
            $('#domains-list').append("<option value='current'>Current Domain</option>");
            if (data.domains != undefined) {
                data.domains.forEach(element => {
                    $('#domains-list').append("<option value='" + element + "'>" + element + "</option>");
                });
            }
        });
    };

    // Shows list of saved domains for modification
    function showSavedDomains() {
        chrome.storage.local.get('domains', function(data) {
            $('#saved-domains').empty();
            if (data.domains != undefined) {
                data.domains.forEach(element => {
                    $('#saved-domains').append("<option id='" + element + "' value='" + element + "'>" + element + "</option>");
                });
            }
        });
    };

    // Show the set search engine as chosen
    function getCurrentSearchEngine() {
        chrome.storage.local.get('searchEngine', function(data) {
            // If search engine is set
            if (data.searchEngine != null) {
                document.getElementById(data.searchEngine).setAttribute("selected", "selected")
            }
        });
    }

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

    $('#collapse-options').click(function() {
        $('#options').toggle();
    });

    $('#save-url').click(function() {
        chrome.storage.local.get('domains', function(data) {
            // No existing list
            if (data.domains == undefined) {
                var newArray = [];
                data.domains = newArray;
            }
            // Domain already exists
            for (i = 0; i < data.domains.length; i++) {
                if (String(data.domains[i]) == $('#new-domain').val()) {
                    return;
                }
            }
            data.domains.push($('#new-domain').val());
            chrome.storage.local.set({domains: data.domains});
            showSavedDomains();
            showSelectableDomains();
        });
    });

    $('#shift-up').click(function() {
        chrome.storage.local.get('domains', function(data) {
            var url = $('#saved-domains').val()[0];
            // Find position
            for (i = 0; i < data.domains.length; i++) {
                if (String(data.domains[i]) == url) {
                    var index = i;
                    break;
                }
            }
            // If not first
            if (index > 0) {
                data.domains[index] = data.domains[index - 1];
                data.domains[index - 1] = url;
                chrome.storage.local.set({domains: data.domains});
                showSavedDomains();
                showSelectableDomains();
                $(document).ready(function() {
                    $('select#saved-domains').val(url);
                });
            }
        });
    });

    $('#shift-down').click(function() {
        chrome.storage.local.get('domains', function(data) {
            var url = $('#saved-domains').val()[0];
            // Find position
            for (i = 0; i < data.domains.length; i++) {
                if (String(data.domains[i]) == url) {
                    var index = i;
                    break;
                }
            }
            // If not last
            if (index < data.domains.length - 1 && index >= 0) {
                data.domains[index] = data.domains[index + 1];
                data.domains[index + 1] = url;
                chrome.storage.local.set({domains: data.domains});
                showSavedDomains();
                showSelectableDomains();
                $(document).ready(function() {
                    $('select#saved-domains').val(url);
                });
            }
        });
    });

    $('#remove-url').click(function() {
        chrome.storage.local.get('domains', function(data) {
            var url = $('#saved-domains').val()[0];
            data.domains = data.domains.filter(e => e != url);
            chrome.storage.local.set({domains: data.domains});
            showSavedDomains();
            showSelectableDomains();
        });
    });

    $('#save-search-engine').click(function() {
        chrome.storage.local.set({searchEngine: $('#search-engine').val()});
    });
});
