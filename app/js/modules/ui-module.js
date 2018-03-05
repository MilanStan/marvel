import dataController from './data-module';

var UIController = (function (data) {
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
    var printItems = (charactersArray, typeTitle, prev, next) => {
        let output = '';
        charactersArray.forEach(element => {
            output += printItem(element);
        });
        console.log("Izvršeno print items");
        //console.log(output);
        document.getElementsByClassName(DOMstrings.mainWrapper)[0].innerHTML = output;
        //return output;

        //turn off loader - show container if charactersArray has elements
        if (!document.getElementsByClassName(DOMstrings.mainWrapper)[0].classList.contains("shown") && charactersArray.length>0) {
            document.getElementsByClassName(DOMstrings.mainWrapper)[0].classList.add('shown');
        }
        //turn on background if charactersArray hasn't elements
        else if(charactersArray.length===0 && document.getElementsByClassName(DOMstrings.startBgContainer)[0].classList.contains('fade-out')){
            document.getElementsByClassName(DOMstrings.startBgContainer)[0].classList.remove('fade-out');
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
    var printItem = characterItem => {
        let output =
            `<div class="item-wrapper">
        <div class="image-wrapper" style="background-image:url(${getImage(characterItem.thumbnail)})">
            <img class="img-invisible" src="${getImage(characterItem.thumbnail)}" alt="${characterItem.name}"/>
        </div>
        <div class="name">${characterItem.name}</div>
        <div class="bookmark" data-id="${characterItem.id}" data-name="${characterItem.name}" data-path="${characterItem.thumbnail.path}" data-extension="${characterItem.thumbnail.extension}" data-isbook="${characterItem.isBookmarked?'true':'false'}">
            ${characterItem.isBookmarked?
                '<span class="glyphicon glyphicon-star" aria-hidden="true" title="Remove from bookmarks">':
                '<span class="glyphicon glyphicon-star-empty" aria-hidden="true" title="Add to bookmarks">'
            }
            </span>
        </div>
    </div>`;
        return output;
    };
    //method for getting background image
    var getImage = (thumbnail) => {
        let output = '';
        output = `${thumbnail.path}/detail.${thumbnail.extension}`;
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
    var changeTitle = (arrayLenght, title) => {
        console.log("Naslov" + arrayLenght, title);
        let titleContainer = document.getElementsByClassName(DOMstrings.title)[0];
        let newTitle = "";
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
            let prefix = document.getElementsByClassName(DOMstrings.search)[0].value;
            if (arrayLenght == 0) {
                newTitle = `No items start with '${prefix}'`;
            } else {
                newTitle = `Items start with '${prefix}'`;
            }
        }
        titleContainer.innerHTML = newTitle;
    };
    //turn on loader
    var turnOnLoader = function () {
        if (document.getElementsByClassName(DOMstrings.mainWrapper)[0].classList.contains("shown")) {
            document.getElementsByClassName(DOMstrings.mainWrapper)[0].classList.remove('shown');
        }
        if(!document.getElementsByClassName(DOMstrings.startBgContainer)[0].classList.contains("fade-out")){
            document.getElementsByClassName(DOMstrings.startBgContainer)[0].classList.add('fade-out');
        }
    };
    //show image on load
    var loadImg = function () {
        let images = document.getElementsByClassName('img-invisible');
        let imagesArray = Array.from(images);
        imagesArray.forEach(current => {
            current.addEventListener('load', () => {
                let parent = current.parentNode;
                parent.classList.add("loaded");
            });
        });
    };
    var Events = {
        loadDocument: function () {
            window.addEventListener('load', function () {
                data.loadSavedCharacter(printItems);
            });
            document.getElementsByClassName(DOMstrings.search)[0].focus();
        },
        changeBookmarkStatus: function () {
            document.addEventListener('click', function (e) {
                if (e.target && e.target.parentNode.classList.contains(DOMstrings.bookmark)) {
                    let currentStar = e.target.parentNode;
                    let id = parseInt(currentStar.getAttribute('data-id'));
                    let isBookmarked = currentStar.getAttribute('data-isbook') === "true" ? true : false;
                    if (!isBookmarked) {
                        let name = currentStar.getAttribute('data-name');
                        let thumbnail = {
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
        typeSearchCharacter: function () {
            var type;
            var searchEl = document.getElementsByClassName(DOMstrings.search)[0];
            //set timeout for typing and call loadAjax
            function callData() {
                if (type !== undefined) {
                    clearTimeout(type);
                }
                type = setTimeout(
                    function () {
                        let prefix = searchEl.value;
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
        changePage: function () {
            document.addEventListener('click', function (ev) {
                if (ev.target && ev.target.parentNode && ev.target.parentNode.classList.contains('pagination')) {
                    console.log("Paginacija");
                    let direction = '';
                    direction = ev.target.parentNode.getAttribute('data-direction');
                    console.log(direction);
                    turnOnLoader();
                    data.changePage(direction, printItems);
                }
            });
        },
    };
    return {
        Init: function () {
            Events.changeBookmarkStatus();
            Events.typeSearchCharacter();
            Events.loadDocument();
            Events.changePage();
        }
        /* printItems: printItems,
        events: Events */
    }

    console.log(data);


})(dataController);


export default UIController;