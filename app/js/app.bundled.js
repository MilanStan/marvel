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


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
        //make url
    };var makeUrl = function makeUrl(prefix) {
        urlData.prefix = prefix + "&";
        var urlAddress = '';
        for (var m in urlData) {
            if (urlData.hasOwnProperty(m)) {
                urlAddress += urlData[m];
            }
        }
        console.log(urlAddress);
        return urlAddress;
    };

    var Character = function () {
        function Character(id, name, thumbnail, savedItems) {
            _classCallCheck(this, Character);

            this.id = id;
            this.name = name;
            this.thumbnail = thumbnail;
            this.isBook = false;
        }

        _createClass(Character, [{
            key: "checkBook",
            value: function checkBook() {
                var _this = this;

                if (savedItems.length > 0) {
                    saveditems.forEach(function (current, index) {
                        if (current.id === _this.id) {
                            _this.isBook = true;
                        }
                    });
                }
            }
        }]);

        return Character;
    }();
    //make Ajax call


    function loadAjax(prefix) {
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
                    console.log(dataObj);
                    var _dataObj$data = dataObj.data,
                        count = _dataObj$data.count,
                        limit = _dataObj$data.limit,
                        offset = _dataObj$data.offset,
                        results = _dataObj$data.results,
                        total = _dataObj$data.total;

                    resultsData.count = count;
                    resultsData.limit = limit;
                    resultsData.offset = offset;
                    resultsData.total = total;
                    console.log(resultsData);
                    console.log(results);
                } else if (xhr.status >= 400) {
                    console.log('There was an error.');
                }
            }
        };
        xhr.open('GET', urlAddress, true);
        xhr.send();
    }

    return {
        urlData: urlData,
        loadAjax: loadAjax
    };
}();

//PROBA
console.log(dataController.urlData);
dataController.loadAjax("me");
console.log(dataController.urlData);

{
    var myFunction = function myFunction() {
        if (myVar !== undefined) {
            clearTimeout(myVar);
        }
        myVar = setTimeout(function () {
            alert("Hello");
            console.log("pozdrav");
        }, 1000);
    };

    //window.addEventListener('keypress', myFunction);


    //Set timeout function
    var myVar;
}

/***/ })
/******/ ]);