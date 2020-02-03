$(document).ready(function() {

    showDomains();

    function showDomains() {
        chrome.storage.local.get('domains', function(data) {
            $('#saved-domains').empty();
            if (data.domains != undefined) {
                data.domains.forEach(element => {
                    $('#saved-domains').append("<option id=" + element + " value=" + element + ">" + element + "</option>");
                });
            }
        });
    };

    $('#save-url').click(function() {
        chrome.storage.local.get('domains', function(data) {
            if (data.domains == undefined) {
                var newArray = [];
                data.domains = newArray;
            }
            if (data.domains.includes($('#new-domain').val())) {
                return;
            }
            data.domains.push($('#new-domain').val());
            chrome.storage.local.set({domains: data.domains});
            showDomains();
        });
    });

    $('#shift-up').click(function() {
        chrome.storage.local.get('domains', function(data) {
            var url = $('#saved-domains').val();
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
                showDomains();
                $(document).ready(function() {
                    $('select#saved-domains').val(url);
                });
            }
        });
    });

    $('#shift-down').click(function() {
        chrome.storage.local.get('domains', function(data) {
            var url = $('#saved-domains').val();
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
                showDomains();
                $(document).ready(function() {
                    $('select#saved-domains').val(url);
                });
            }
        });
    });

    $('#remove-url').click(function() {
        chrome.storage.local.get('domains', function(data) {
            var url = $('#saved-domains').val();
            data.domains = data.domains.filter(e => e != url);
            chrome.storage.local.set({domains: data.domains});
            showDomains();
        });
    });

    $('#save-search-engine').click(function() {
        chrome.storage.local.set({searchEngine: $('#search-engine').val()});
    });

});