$(document).ready(function() {

    showSavedDomains();
    getCurrentSearchEngine();

    // Shows list of saved domains for modification
    function showSavedDomains() {
        chrome.storage.local.get('domains', function(data) {    ///////////////////////////////////
            console.log(data.domains);
            $('#saved-domains').empty();
            if (data.domains != undefined) {
                data.domains.forEach(element => {
                    $('#saved-domains').append("<option id=" + element + " value=" + element + ">" + element + "</option>");
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
        });
    });

    $('#save-search-engine').click(function() {
        chrome.storage.local.set({searchEngine: $('#search-engine').val()});
    });

});