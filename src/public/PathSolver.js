(function(){
    if (location.search) {
        if (location.search.indexOf("?p=") >= 0) {
            let queryParts = location.search.split('?p=');
            queryParts = queryParts[1].split("&");
            if (/^\d+$/.test(queryParts[0])) {
                window.location.replace("/posts/p" + queryParts[0]);
            }
        }
        if (location.search.indexOf("?tag=") >= 0) {
            let queryParts = location.search.split('?tag=');
            queryParts = queryParts[1].split("&");
            window.location.replace("/tag/" + queryParts[0]);
        }
    }
})();