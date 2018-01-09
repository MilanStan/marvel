var dataController = (function () {
    //array of loaded characters
    var loadedItems = [];
    //array of saved characters
    var savedItems = [];
    //set current ajax
    var xhr = null;
    //data about URL
    var urlData = {
        baseUrl: "https://gateway.marvel.com:443/v1/public/",
        subject: "characters?",
        nameStartText: "nameStartsWith=",
        prefix: "",
        limit: 12,
        offset: 0,
        apikey: "apikey=9cc6908bc626709046be238c2c177a07"
    };
    //url data if have pagination
    var newUrlData=null;
    //data about results
    var resultsData = {
        count: 0,
        limit: 20,
        offset: 0,
        total: 0,
        page:1
    }
    
    //make url
    var makeUrl = function (prefix) {
        urlData.prefix = `${prefix}&`;
        let urlAddress = '';
       
        urlAddress=`${urlData.baseUrl}${urlData.subject}${urlData.nameStartText}${urlData.prefix}limit=${urlData.limit}&offset=${urlData.offset}&${urlData.apikey}`;
        console.log(urlAddress);
        return urlAddress;
    };
    class Character {
        constructor(id, name, thumbnail,isBookmarked) {
            this.id = id;
            this.name = name;
            this.thumbnail = thumbnail;
            this.isBookmarked = isBookmarked;
        }
    }
    //check if elements of loaded items is bookmarked
    var checkIsBookmarked = function (itemsArray) {
        if (savedItems.length > 0) {
            for (let i = 0; i < savedItems.length; i++) {
                for (let j = 0; j < itemsArray.length; j++) {
                    if (savedItems[i].id === itemsArray[j].id) {
                        itemsArray[j].isBookmarked = true;
                        break;
                    }
                }
            }
        }
    };
    //make Character objects from loaded data and add them to loadedItems array
    var makeCharacter = function (itemsArray) {
        itemsArray.forEach((current) => {
            let {
                id,
                name,
                thumbnail
            } = current;
            loadedItems.push(new Character(id, name, thumbnail));
        });
    };
    //load saved Characters
    var loadSavedCharacter = function (callback) {
        if (typeof (Storage) !== "undefined" && localStorage.marvel) {
            console.log(localStorage.getItem('marvel'));
            var tekst = JSON.parse(localStorage.getItem('marvel'));
            tekst.forEach(function (current) {
                let {
                    id,
                    name,
                    thumbnail,
                    isBookmarked
                } = current;
                savedItems.push(new Character(id, name, thumbnail,isBookmarked));
            });
            console.log("Snimljeni objekti:");
            console.log(savedItems);
        } else {
            console.log("there aren't saved characters");
        }
        callback(savedItems,"saved");
    };
    //make bookmarked Character object
    var makeSavedCharacter = function (id, name, thumbnail, isBook) {
        savedItems.push(new Character(id, name, thumbnail, isBook));
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("marvel", JSON.stringify(savedItems));
        } else {
            message = "No web storage support!";
        }
    }
    //remove bookmarked Character object
    var removeSavedCharacter = function (itemId) {
        parseInt(itemId);
        console.log("unutar funkcije:");
        console.log(savedItems.length);
        let indexPos = -1;
        if (savedItems.length!==0) {
            console.log("ima clanova");
            indexPos = savedItems.findIndex(function (current) {
                console.log(current.id);
                console.log(itemId);
                return current.id === itemId;
            });
            console.log("indexPos " + indexPos);
            if (indexPos !== -1) {
                savedItems.splice(indexPos, 1);
                localStorage.setItem("marvel", JSON.stringify(savedItems));
                console.log("obrisan clan niza");
                if (savedItems.length===0) {
                    localStorage.removeItem("marvel");
                }
            }
        } else {
            console.log("nema clanova");
        }
    };

    //make Ajax call
    var loadAjax = function (prefix, callback) {
        loadedItems=[];
        if (xhr) {
            xhr.abort();
            xhr = null;
        }
        xhr = new XMLHttpRequest();
        var urlAddress = makeUrl(prefix);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    let dataObj = JSON.parse(xhr.responseText);
                    console.log(dataObj);
                    let {
                        count,
                        limit,
                        offset,
                        results,
                        total
                    } = dataObj.data;
                    resultsData.count = count;
                    resultsData.limit = limit;
                    resultsData.offset = offset;
                    resultsData.total = total;
                    makeCharacter(results);
                    checkIsBookmarked(loadedItems);
                    //changePage();
                    callback(loadedItems,"loaded");
                } else if (xhr.status >= 400) {
                    callback(loadedItems,"error")
                    console.log('There was an error.');
                }
            }
        }
        xhr.open('GET', urlAddress, true);
        xhr.send();
    }

    return {
        urlData: urlData,
        loadAjax: loadAjax,
        loadSavedCharacter: loadSavedCharacter,
        makeSavedCharacter: makeSavedCharacter,
        removeSavedCharacter: removeSavedCharacter,
        getLoadedItems: loadedItems,
        getSavedItems: savedItems
    };
})();



export default dataController;


