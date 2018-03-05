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
    //data about results
    var resultsData = {
        count: 0,
        //limit: 20,
        offset: 0,
        total: 0,
        showNext:0,
        showPrev:0
    }
    //url data if have pagination
    var newUrlData=null;
    //toggle pagination arrows
    var loadPagination=function(){
        if(resultsData.total>(urlData.offset+urlData.limit)){
            if(newUrlData===null){
                newUrlData=Object.assign({}, urlData);
            }
            resultsData.showNext=1;
        }
        else{
            resultsData.showNext=0;
        }
        if(urlData.offset>0){
            resultsData.showPrev=1;
        }
        else{
            resultsData.showPrev=0;
        }
        
    }
    //changePage function
    var changePage=function(direction, printCall){
        if(direction==="next"){
            urlData.offset+=urlData.limit;
        }
        else if(direction==="prev"){
            urlData.offset-=urlData.limit;
        }
        //console.log(urlData.offset);
        loadAjax(urlData.prefix, printCall);
    };
    //make url
    var makeUrl = function (prefix) {
        urlData.prefix = `${prefix}`;
        let urlAddress = '';
       
    urlAddress=`${urlData.baseUrl}${urlData.subject}${urlData.nameStartText}${urlData.prefix}&limit=${urlData.limit}&offset=${urlData.offset}&${urlData.apikey}`;
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
            //console.log(localStorage.getItem('marvel'));
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
            
        } else {
            console.log("there aren't saved characters");
        }
        callback(savedItems,"saved",0,0);
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
        let indexPos = -1;
        if (savedItems.length!==0) {
            indexPos = savedItems.findIndex(function (current) {
                return current.id === itemId;
            });
            //console.log("indexPos " + indexPos);
            if (indexPos !== -1) {
                savedItems.splice(indexPos, 1);
                localStorage.setItem("marvel", JSON.stringify(savedItems));
                //console.log("obrisan clan niza");
                if (savedItems.length===0) {
                    localStorage.removeItem("marvel");
                }
            }
        } else {
            //console.log("nema clanova");
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
                    //console.log(dataObj);
                    let {
                        results, 
                        total
                    } = dataObj.data;
                    resultsData.total = total;
                    makeCharacter(results);
                    checkIsBookmarked(loadedItems);
                    loadPagination();
                    callback(loadedItems,"loaded",resultsData.showPrev,resultsData.showNext);
                } else if (xhr.status >= 400) {
                    callback(loadedItems,"error")
                    console.log('There was an error.');
                }
            }
        }
        xhr.open('GET', urlAddress, true);
        xhr.send();
    };
    //reset url data
    var resetUrlData=function(){
        if(newUrlData!==null){
            urlData=Object.assign({}, newUrlData);
            newUrlData=null;
            //console.log("resetovan url");
        }
    };

    return {
        urlData: urlData,
        loadAjax: loadAjax,
        loadSavedCharacter: loadSavedCharacter,
        makeSavedCharacter: makeSavedCharacter,
        removeSavedCharacter: removeSavedCharacter,
        getLoadedItems: loadedItems,
        getSavedItems: savedItems,
        changePage: changePage,
        resetUrlData:resetUrlData
    };
})();



export default dataController;


