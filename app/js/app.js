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
    var printItems = (charactersArray, typeTitle) => {
        let output = '';
        charactersArray.forEach(element => {
            output += printItem(element);
        });
        console.log("Izvršeno print items");
        //console.log(output);
        document.getElementsByClassName(DOMstrings.mainWrapper)[0].innerHTML = output;
        //return output;

        //turn off loader - show container
        if(!document.getElementsByClassName(DOMstrings.mainWrapper)[0].classList.contains("shown")){
            document.getElementsByClassName(DOMstrings.mainWrapper)[0].classList.add('shown');
        }
        //change title
        changeTitle(charactersArray.length, typeTitle);
    };
    //method for printing one item
    var printItem = characterItem => {
        let output =
            `<div class="item-wrapper">
            <div class="image-wrapper" style='${getImage(characterItem.thumbnail)}'></div>
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
    //change title
    var changeTitle=(arrayLenght, title)=>{
        console.log("Naslov" +arrayLenght, title);
        let titleContainer=document.getElementsByClassName(DOMstrings.title)[0];
        let newTitle="";
        if(title=="saved" && arrayLenght>0){
            newTitle="Your bookmarks";
        }
        if(title=="saved" && arrayLenght==0){
            newTitle="There aren't your bookmarks";
        }
        if(title=="loaded"){
            let prefix=document.getElementsByClassName(DOMstrings.search)[0].value;
            if(arrayLenght==0){
                newTitle=`No items start with '${prefix}'`;
            }
            else{
                newTitle=`Items which start with '${prefix}'`;
            }
        }
        titleContainer.innerHTML=newTitle;        
    }

    var Events = {
        loadDocument: function(){
            window.addEventListener('load',function(){
                data.loadSavedCharacter(printItems);
            });
            document.getElementsByClassName(DOMstrings.search)[0].focus();
        },
        changeBookmarkStatus: function () {
            document.addEventListener('click', function (e) {
                if (e.target && e.target.parentNode.classList.contains(DOMstrings.bookmark)) {
                    //console.log("Kliknuta je zvezda");
                    let currentStar = e.target.parentNode;
                    let id = parseInt(currentStar.getAttribute('data-id'));
                    //console.log(id);
                    let isBookmarked = currentStar.getAttribute('data-isbook') === "true" ? true : false;
                    //console.log(isBookmarked);
                    if (!isBookmarked) {
                        let name = currentStar.getAttribute('data-name');
                        let thumbnail = {
                            path: currentStar.getAttribute('data-path'),
                            extension: currentStar.getAttribute('data-extension')
                        };
                        //console.log(name, thumbnail);
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
            var searchEl=document.getElementsByClassName(DOMstrings.search)[0];
            //set timeout for typing and call loadAjax
            function callData() {
                if (type !== undefined) {
                    clearTimeout(type);
                }
                type = setTimeout(
                    function () {
                        let prefix=searchEl.value;
                        console.log(prefix);
                        if(prefix){
                            data.loadAjax(prefix,printItems);
                        }
                        else{
                            printItems(data.getSavedItems,"saved");
                        }
                        
                    }, 1000);
            }
            //turn on loader
            function turnOnLoader(){
                if(document.getElementsByClassName(DOMstrings.mainWrapper)[0].classList.contains("shown")){
                    document.getElementsByClassName(DOMstrings.mainWrapper)[0].classList.remove('shown');
                }
            }
            searchEl.addEventListener('input', callData);
            searchEl.addEventListener('input', turnOnLoader);
        }
    };
    return {
        Init:function(){
            Events.changeBookmarkStatus();
            Events.typeSearchCharacter();
            Events.loadDocument();
        }
        /* printItems: printItems,
        events: Events */
    }

    console.log(data);


})(dataController);

//PROBA
//console.log(dataController.urlData);
//dataController.loadAjax("me", UIController.printItems);
//console.log(dataController.urlData);
//console.log(dataController.getSavedItems);
//dataController.makeSavedCharacter(1011241, "Menace", "slika");
//dataController.makeSavedCharacter(1011099, "Menace", {path:"slika",extension:"jpg"});
//dataController.loadSaved();
/* UIController.events.changeBookmarkStatus();
UIController.events.typeSearchCharacter();
console.log("stampaju se objekti");
UIController.events.loadDocument(); */
UIController.Init();

