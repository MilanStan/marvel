/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _uiModule = __webpack_require__(1);

var _uiModule2 = _interopRequireDefault(_uiModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_uiModule2.default.Init();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dataModule = __webpack_require__(2);

var _dataModule2 = _interopRequireDefault(_dataModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UIController = function (data) {
    //dom strings
    var DOMstrings = {
        title: "title-container",
        search: "search-input",
        mainContainer: "main-container",
        mainWrapper: "main-wrapper",
        startBgContainer: "start-bg-container",
        itemWrapper: "item-wrapper",
        bookmark: "bookmark",
        prev: "prev",
        next: "next"
    };
    //method for printing character items
    var printItems = function printItems(charactersArray, typeTitle, prev, next) {
        var output = '';
        charactersArray.forEach(function (element) {
            output += printItem(element);
        });
        console.log("Izvršeno print items");
        //console.log(output);
        document.getElementsByClassName(DOMstrings.mainWrapper)[0].innerHTML = output;
        //return output;

        //turn off loader - show container if charactersArray has elements
        if (!document.getElementsByClassName(DOMstrings.mainWrapper)[0].classList.contains("shown") && charactersArray.length > 0) {
            document.getElementsByClassName(DOMstrings.mainWrapper)[0].classList.add('shown');
            document.getElementsByClassName(DOMstrings.mainContainer)[0].classList.remove('loading');
        }
        //turn on background if charactersArray hasn't elements
        else if (charactersArray.length === 0 && document.getElementsByClassName(DOMstrings.startBgContainer)[0].classList.contains('fade-out')) {
                document.getElementsByClassName(DOMstrings.startBgContainer)[0].classList.remove('fade-out');
                document.getElementsByClassName(DOMstrings.mainContainer)[0].classList.remove('loading');
            }
        //load images
        loadImg();
        //change title
        changeTitle(charactersArray.length, typeTitle);
        //switch pagination
        if (prev) {
            document.getElementsByClassName(DOMstrings.prev)[0].classList.add("active");
        } else {
            if (document.getElementsByClassName(DOMstrings.prev)[0].classList.contains("active")) {
                document.getElementsByClassName(DOMstrings.prev)[0].classList.remove("active");
            }
        }
        if (next) {
            document.getElementsByClassName(DOMstrings.next)[0].classList.add("active");
        } else {
            if (document.getElementsByClassName(DOMstrings.next)[0].classList.contains("active")) {
                document.getElementsByClassName(DOMstrings.next)[0].classList.remove("active");
            }
        }
        console.log(prev);
        console.log(next);
    };
    //method for printing one item
    var printItem = function printItem(characterItem) {
        var output = "<div class=\"item-wrapper loading\">\n        <div class=\"image-wrapper\">\n            <img class=\"img-item\" src=\"" + getImage(characterItem.thumbnail) + "\" alt=\"" + characterItem.name + "\" data-object-fit=\"cover\"/>\n        </div>\n        <div class=\"name\">" + characterItem.name + "</div>\n        <div class=\"bookmark\" data-id=\"" + characterItem.id + "\" data-name=\"" + characterItem.name + "\" data-path=\"" + characterItem.thumbnail.path + "\" data-extension=\"" + characterItem.thumbnail.extension + "\" data-isbook=\"" + (characterItem.isBookmarked ? 'true' : 'false') + "\">\n            " + (characterItem.isBookmarked ? '<span class="glyphicon glyphicon-star" aria-hidden="true" title="Remove from bookmarks">' : '<span class="glyphicon glyphicon-star-empty" aria-hidden="true" title="Add to bookmarks">') + "\n            </span>\n        </div>\n    </div>";
        return output;
    };
    //method for getting background image
    var getImage = function getImage(thumbnail) {
        var output = '';
        output = thumbnail.path + "/detail." + thumbnail.extension;
        /* output=
        `
        <picture>
            <source srcset='${thumbnail.path}/portrait_incredible.${thumbnail.extension}' media='(max-width: 220px)'>
            <source srcset='${thumbnail.path}/portrait_uncanny.${thumbnail.extension}' media='(max-width: 300px)'>
            <source srcset='${thumbnail.path}/detail.${thumbnail.extension}' media='(max-width: 480px)'>
            <source srcset='${thumbnail.path}/portrait_uncanny.${thumbnail.extension}' media='(min-width: 481px) and (max-width:560px)'>
            <source srcset='${thumbnail.path}/landscape_incredible.${thumbnail.extension}' media='(min-width: 561px) and (max-width:771px)'>
            <source srcset='${thumbnail.path}/portrait_uncanny.${thumbnail.extension}' media='(min-width: 772px) and (max-width:900px)'>
            <source srcset='${thumbnail.path}/landscape_incredible.${thumbnail.extension}' media='(min-width: 901px) and (max-width:991px)'>
            <source srcset='${thumbnail.path}/portrait_uncanny.${thumbnail.extension}' media='(min-width: 992px) and (max-width:1200px)'>
            <source srcset='${thumbnail.path}/detail.${thumbnail.extension}' media='(min-width: 1201px)'>
                  <img src='${thumbnail.path}/detail.${thumbnail.extension}' alt='${name}'>
        </picture>
        `; */
        return output;
    };
    //change title
    var changeTitle = function changeTitle(arrayLenght, title) {
        console.log("Naslov" + arrayLenght, title);
        var titleContainer = document.getElementsByClassName(DOMstrings.title)[0];
        var newTitle = "";
        if (title == "saved" && arrayLenght > 0) {
            newTitle = "Your bookmarks";
        }
        if (title == "saved" && arrayLenght == 0) {
            newTitle = "No bookmarks!";
        }
        if (title == "error" && arrayLenght == 0) {
            newTitle = "Database error occurred!";
        }
        if (title == "loaded") {
            var prefix = document.getElementsByClassName(DOMstrings.search)[0].value;
            if (arrayLenght == 0) {
                newTitle = "No items start with '" + prefix + "'";
            } else {
                newTitle = "Items start with '" + prefix + "'";
            }
        }
        titleContainer.innerHTML = newTitle;
    };
    //turn on loader
    var turnOnLoader = function turnOnLoader() {
        if (document.getElementsByClassName(DOMstrings.mainWrapper)[0].classList.contains("shown")) {
            document.getElementsByClassName(DOMstrings.mainContainer)[0].classList.add('loading');
            document.getElementsByClassName(DOMstrings.mainWrapper)[0].classList.remove('shown');
        }
        if (!document.getElementsByClassName(DOMstrings.startBgContainer)[0].classList.contains("fade-out")) {
            document.getElementsByClassName(DOMstrings.startBgContainer)[0].classList.add('fade-out');
            document.getElementsByClassName(DOMstrings.mainContainer)[0].classList.add('loading');
        }
    };
    //show image on load
    var loadImg = function loadImg() {
        var images = document.getElementsByClassName('img-item');
        var imagesArray = Array.from(images);
        imagesArray.forEach(function (current) {
            current.addEventListener('load', function () {
                objectFitPolyfill(current);
                current.classList.add('loaded');
                var parent = current.parentNode;
                //parent.classList.add("loaded");
                //remove loading png on img load
                parent.parentNode.classList.remove('loading');
            });
        });
    };
    var Events = {
        loadDocument: function loadDocument() {
            window.addEventListener('load', function () {
                data.loadSavedCharacter(printItems);
            });
            document.getElementsByClassName(DOMstrings.search)[0].focus();
        },
        changeBookmarkStatus: function changeBookmarkStatus() {
            document.addEventListener('click', function (e) {
                if (e.target && e.target.parentNode.classList.contains(DOMstrings.bookmark)) {
                    var currentStar = e.target.parentNode;
                    var id = parseInt(currentStar.getAttribute('data-id'));
                    var isBookmarked = currentStar.getAttribute('data-isbook') === "true" ? true : false;
                    if (!isBookmarked) {
                        var name = currentStar.getAttribute('data-name');
                        var thumbnail = {
                            path: currentStar.getAttribute('data-path'),
                            extension: currentStar.getAttribute('data-extension')
                        };
                        data.makeSavedCharacter(id, name, thumbnail, true);
                        currentStar.setAttribute('data-isbook', 'true');
                        currentStar.innerHTML = '<span class="glyphicon glyphicon-star" aria-hidden="true" title="Remove from bookmarks">';
                    } else {
                        data.removeSavedCharacter(id);
                        currentStar.setAttribute('data-isbook', 'false');
                        currentStar.innerHTML = '<span class="glyphicon glyphicon-star-empty" aria-hidden="true" title="Add to bookmarks">';
                    }
                }
            });
        },
        typeSearchCharacter: function typeSearchCharacter() {
            var type;
            var searchEl = document.getElementsByClassName(DOMstrings.search)[0];
            //set timeout for typing and call loadAjax
            function callData() {
                if (type !== undefined) {
                    clearTimeout(type);
                }
                type = setTimeout(function () {
                    var prefix = searchEl.value;
                    console.log(prefix);
                    if (prefix) {
                        data.resetUrlData();
                        data.loadAjax(prefix, printItems);
                    } else {
                        printItems(data.getSavedItems, "saved", 0, 0);
                    }
                }, 1000);
            }
            searchEl.addEventListener('input', callData);
            searchEl.addEventListener('input', turnOnLoader);
        },
        changePage: function changePage() {
            document.addEventListener('click', function (ev) {
                if (ev.target && ev.target.parentNode && ev.target.parentNode.classList.contains('pagination')) {
                    console.log("Paginacija");
                    var direction = '';
                    direction = ev.target.parentNode.getAttribute('data-direction');
                    console.log(direction);
                    turnOnLoader();
                    data.changePage(direction, printItems);
                }
            });
        }
    };
    return {
        Init: function Init() {
            Events.changeBookmarkStatus();
            Events.typeSearchCharacter();
            Events.loadDocument();
            Events.changePage();
        }
        /* printItems: printItems,
        events: Events */
    };

    console.log(data);
}(_dataModule2.default);

exports.default = UIController;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var dataController = function () {
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
        showNext: 0,
        showPrev: 0
        //url data if have pagination
    };var newUrlData = null;
    //toggle pagination arrows
    var loadPagination = function loadPagination() {
        if (resultsData.total > urlData.offset + urlData.limit) {
            if (newUrlData === null) {
                newUrlData = Object.assign({}, urlData);
            }
            resultsData.showNext = 1;
        } else {
            resultsData.showNext = 0;
        }
        if (urlData.offset > 0) {
            resultsData.showPrev = 1;
        } else {
            resultsData.showPrev = 0;
        }
    };
    //changePage function
    var changePage = function changePage(direction, printCall) {
        if (direction === "next") {
            urlData.offset += urlData.limit;
        } else if (direction === "prev") {
            urlData.offset -= urlData.limit;
        }
        //console.log(urlData.offset);
        loadAjax(urlData.prefix, printCall);
    };
    //make url
    var makeUrl = function makeUrl(prefix) {
        urlData.prefix = "" + prefix;
        var urlAddress = '';

        urlAddress = "" + urlData.baseUrl + urlData.subject + urlData.nameStartText + urlData.prefix + "&limit=" + urlData.limit + "&offset=" + urlData.offset + "&" + urlData.apikey;
        console.log(urlAddress);
        return urlAddress;
    };

    var Character = function Character(id, name, thumbnail, isBookmarked) {
        _classCallCheck(this, Character);

        this.id = id;
        this.name = name;
        this.thumbnail = thumbnail;
        this.isBookmarked = isBookmarked;
    };
    //check if elements of loaded items is bookmarked


    var checkIsBookmarked = function checkIsBookmarked(itemsArray) {
        if (savedItems.length > 0) {
            for (var i = 0; i < savedItems.length; i++) {
                for (var j = 0; j < itemsArray.length; j++) {
                    if (savedItems[i].id === itemsArray[j].id) {
                        itemsArray[j].isBookmarked = true;
                        break;
                    }
                }
            }
        }
    };
    //make Character objects from loaded data and add them to loadedItems array
    var makeCharacter = function makeCharacter(itemsArray) {
        itemsArray.forEach(function (current) {
            var id = current.id,
                name = current.name,
                thumbnail = current.thumbnail;

            loadedItems.push(new Character(id, name, thumbnail));
        });
    };
    //load saved Characters
    var loadSavedCharacter = function loadSavedCharacter(callback) {
        if (typeof Storage !== "undefined" && localStorage.marvel) {
            //console.log(localStorage.getItem('marvel'));
            var tekst = JSON.parse(localStorage.getItem('marvel'));
            tekst.forEach(function (current) {
                var id = current.id,
                    name = current.name,
                    thumbnail = current.thumbnail,
                    isBookmarked = current.isBookmarked;

                savedItems.push(new Character(id, name, thumbnail, isBookmarked));
            });
        } else {
            console.log("there aren't saved characters");
        }
        callback(savedItems, "saved", 0, 0);
    };
    //make bookmarked Character object
    var makeSavedCharacter = function makeSavedCharacter(id, name, thumbnail, isBook) {
        savedItems.push(new Character(id, name, thumbnail, isBook));
        if (typeof Storage !== "undefined") {
            localStorage.setItem("marvel", JSON.stringify(savedItems));
        } else {
            message = "No web storage support!";
        }
    };
    //remove bookmarked Character object
    var removeSavedCharacter = function removeSavedCharacter(itemId) {
        parseInt(itemId);
        var indexPos = -1;
        if (savedItems.length !== 0) {
            indexPos = savedItems.findIndex(function (current) {
                return current.id === itemId;
            });
            //console.log("indexPos " + indexPos);
            if (indexPos !== -1) {
                savedItems.splice(indexPos, 1);
                localStorage.setItem("marvel", JSON.stringify(savedItems));
                //console.log("obrisan clan niza");
                if (savedItems.length === 0) {
                    localStorage.removeItem("marvel");
                }
            }
        } else {
            //console.log("nema clanova");
        }
    };

    //make Ajax call
    var loadAjax = function loadAjax(prefix, callback) {
        loadedItems = [];
        if (xhr) {
            xhr.abort();
            xhr = null;
        }
        xhr = new XMLHttpRequest();
        var urlAddress = makeUrl(prefix);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    var dataObj = JSON.parse(xhr.responseText);
                    //console.log(dataObj);
                    var _dataObj$data = dataObj.data,
                        results = _dataObj$data.results,
                        total = _dataObj$data.total;

                    resultsData.total = total;
                    makeCharacter(results);
                    checkIsBookmarked(loadedItems);
                    loadPagination();
                    callback(loadedItems, "loaded", resultsData.showPrev, resultsData.showNext);
                } else if (xhr.status >= 400) {
                    callback(loadedItems, "error");
                    console.log('There was an error.');
                }
            }
        };
        xhr.open('GET', urlAddress, true);
        xhr.send();
    };
    //reset url data
    var resetUrlData = function resetUrlData() {
        if (newUrlData !== null) {
            urlData = Object.assign({}, newUrlData);
            newUrlData = null;
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
        resetUrlData: resetUrlData
    };
}();

exports.default = dataController;

/***/ })
/******/ ]);