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
        limit: "limit=20&",
        offset: "offset=0&",
        apikey: "apikey=9cc6908bc626709046be238c2c177a07"
    };
    //data about results
    var resultsData = {
        count: 0,
        limit: 0,
        offset: 0,
        total: 0
    }
    //make url
    var makeUrl = function (prefix) {
        urlData.prefix = `${prefix}&`;
        let urlAddress = '';
        for (let m in urlData) {
            if (urlData.hasOwnProperty(m)) {
                urlAddress += urlData[m];
            }
        }
        console.log(urlAddress);
        return urlAddress;
    };
    class Character {
        constructor(id, name, thumbnail) {
            this.id = id;
            this.name = name;
            this.thumbnail = thumbnail;
            //this.isBookmarked=false;
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
    var loadSavedCharacter = function () {
        if (typeof (Storage) !== "undefined" && localStorage.marvel) {
            console.log(localStorage.getItem('marvel'));
            var tekst = JSON.parse(localStorage.getItem('marvel'));
            tekst.forEach(function (current) {
                let {
                    id,
                    name,
                    thumbnail
                } = current;
                savedItems.push(new Character(id, name, thumbnail));
            });
            //savedItems.push(new Character(id, name, thumbnail));
            console.log("Snimljeni objekti:");
            console.log(Array.isArray(savedItems));
            console.log(savedItems);
        } else {
            console.log("there aren't saved characters");
        }
    };
    //make bookmarked Character object
    var makeSavedCharacter = function (id, name, thumbnail) {
        //id=id.toString();
        savedItems.push(new Character(id, name, thumbnail));
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
                    console.log(resultsData);
                    console.log(results);
                    makeCharacter(results);
                    console.log(loadedItems);
                    checkIsBookmarked(loadedItems);
                    console.log(loadedItems);
                    callback(loadedItems);
                } else if (xhr.status >= 400) {
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
        loadSaved: loadSavedCharacter,
        makeSavedCharacter: makeSavedCharacter,
        removeSavedCharacter: removeSavedCharacter,
        getLoadedItems: loadedItems,
        getSavedItems: savedItems
    };
})();



export default dataController;



{
    //Set timeout function
    var myVar;

    function myFunction() {
        if (myVar !== undefined) {
            clearTimeout(myVar);
        }
        myVar = setTimeout(
            function () {
                alert("Hello");
                console.log("pozdrav");
            }, 1000);
    }

    //window.addEventListener('keypress', myFunction);
}