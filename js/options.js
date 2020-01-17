$(document).ready(function() {

    showDomains();

    function showDomains() {
        chrome.storage.local.get('domains', function(data) {
            $('#saved-domains').empty();
            if (data.domains != undefined) {
                data.domains.forEach(element => {
                    $('#saved-domains').append("<option value=" + element + ">" + element + "</option>");
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

    $('#remove-url').click(function() {
        chrome.storage.local.get('domains', function(data) {
            var url = $('#domains-list').val();
            data.domains = data.domains.filter(e => e != url);
            chrome.storage.local.set({domains: data.domains});
            showDomains();
        });
    });

    $('#save-search-engine').click(function() {
        chrome.storage.local.set({searchEngine: $('#search-engine').val()});
    });

});