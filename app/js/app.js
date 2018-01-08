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
    var resultsData={
        count: 0,
        limit: 0,
        offset:0,
        total: 0
    }
    //make url
    var makeUrl = (prefix) => {
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
    class Character{
        constructor(id,name,thumbnail,savedItems){
            this.id=id;
            this.name=name;
            this.thumbnail=thumbnail;
            this.isBook=false;
        }
        checkBook(){
            if(savedItems.length>0){
                saveditems.forEach((current,index)=>{
                    if(current.id===this.id){
                        this.isBook=true;
                    }
                })
            }
        }
    }
    //make Ajax call
    function loadAjax(prefix) {
        if(xhr){
            xhr.abort();
            xhr=null;
        }
        xhr = new XMLHttpRequest();
        var urlAddress = makeUrl(prefix);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                if (xhr.status == 200) {
                    let dataObj = JSON.parse(xhr.responseText);
                    console.log(dataObj);
                    let{count,limit,offset,results,total}=dataObj.data;
                    resultsData.count=count;
                    resultsData.limit=limit;
                    resultsData.offset=offset;
                    resultsData.total=total;
                    console.log(resultsData);
                    console.log(results);
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
        loadAjax: loadAjax
    };
})();

//PROBA
console.log(dataController.urlData);
dataController.loadAjax("me");
console.log(dataController.urlData);






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