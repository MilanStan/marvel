import dataController from './modules/data-module';

var UIController = (function (data) {
    //dom strings
    var DOMstrings = {
        title: "title-container",
        search: "search-input",
        mainContainer: "main-container",
        mainWrapper: "main-wrapper",
        itemWrapper: "item-wrapper",
        bookmark: "bookmark"
    };
    //method for printing character items
    var printItems = charactersArray => {
        let output = '';
        charactersArray.forEach(element => {
            output += printItem(element);
        });
        console.log("Izvršeno print items");
        console.log(output);
        document.getElementsByClassName(DOMstrings.mainWrapper)[0].innerHTML = output;
        //return output;
    };
    //method for printing one item
    var printItem = characterItem => {
        let output =
            `<div class="item-wrapper">
            <div class="image-wrapper" style='${getImage(characterItem.thumbnail)}'></div>
            <div class="name">${characterItem.name}</div>
            <div class="bookmark" data-id="${characterItem.id}" data-name="${characterItem.name}" data-path="${characterItem.thumbnail.path}" data-extension="${characterItem.thumbnail.extension}" data-isbook="${characterItem.isBookmarked?'true':'false'}">
                ${characterItem.isBookmarked?
                    '<span class="glyphicon glyphicon-star" aria-hidden="true">':
                    '<span class="glyphicon glyphicon-star-empty" aria-hidden="true">'
                }
                </span>
            </div>
        </div>`;
        return output;
    };
    //method for getting background image
    var getImage = thumbnail => {
        let output = '';
        output = `
        background-image:url("${thumbnail.path}/detail.${thumbnail.extension}");
        @media (min-width:481px){
            background-image:url("${thumbnail.path}/landscape_amazing.${thumbnail.extension}");
        }
        @media (min-width:992px){
            background-image:url("${thumbnail.path}/landscape_incredible.${thumbnail.extension}");
        }
        @media (min-width:1201px){
            background-image:url("${thumbnail.path}/detail.${thumbnail.extension}");
        }
        `;
        return output;
    };

    var Events = {
        changeBookmarkStatus: function () {
            document.addEventListener('click', function (e) {
                if (e.target && e.target.parentNode.classList.contains(DOMstrings.bookmark)) {
                    console.log("Kliknuta je zvezda");
                    let currentStar = e.target.parentNode;
                    let id = parseInt(currentStar.getAttribute('data-id'));
                    console.log(id);
                    let isBookmarked = currentStar.getAttribute('data-isbook') === "true" ? true : false;
                    console.log(isBookmarked);
                    if (!isBookmarked) {
                        let name = currentStar.getAttribute('data-name');
                        let thumbnail = {
                            path: currentStar.getAttribute('data-path'),
                            extension: currentStar.getAttribute('data-extension')
                        };
                        console.log(name, thumbnail);
                        data.makeSavedCharacter(id, name, thumbnail);
                        currentStar.setAttribute('data-isbook', 'true');
                        currentStar.innerHTML = '<span class="glyphicon glyphicon-star" aria-hidden="true">';
                    } else {
                        data.removeSavedCharacter(id);
                        currentStar.setAttribute('data-isbook', 'false');
                        currentStar.innerHTML = '<span class="glyphicon glyphicon-star-empty" aria-hidden="true">';
                    }
                }
            });
        },
        typeSearchCharacter: function () {
            var type;
            var searchEl=document.getElementsByClassName(DOMstrings.search)[0];
            function callData() {
                if (type !== undefined) {
                    clearTimeout(type);
                }
                type = setTimeout(
                    function () {
                        let prefix=searchEl.value;
                        console.log(prefix);
                        data.loadAjax(prefix,printItems)
                    }, 1000);
            }
            searchEl.addEventListener('input', callData);
            /* searchEl.addEventListener('input', function(){
                console.log("promenjena vrednost input polja");
            }); */
        }
    };
    return {
        printItems: printItems,
        events: Events
    }

    console.log(data);


})(dataController);

//PROBA
console.log(dataController.urlData);
dataController.loadAjax("me", UIController.printItems);
console.log(dataController.urlData);
console.log(dataController.getSavedItems);
//dataController.makeSavedCharacter(1011241, "Menace", "slika");
//dataController.makeSavedCharacter(1011099, "Menace", {path:"slika",extension:"jpg"});
dataController.loadSaved();
UIController.events.changeBookmarkStatus();
UIController.events.typeSearchCharacter();

(function () {
    setTimeout(function () {
        console.log(dataController.getSavedItems);
        //dataController.removeSavedCharacter(1011241);
    }, 2000);
})();