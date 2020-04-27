import config from "./config.js"

class SearchGifs{
    constructor(url=config.SOURCE_GIF_URL,
                trendingUrl = config.SOURCE_TRENDING_URL,
                key = config.KEY,
                max_gif_num = config.MAX_GIF_NUMBER,
                def_tags = config.DEFAULT_TAGS)
    {
        this._url = url;
        this._trendingUrl=trendingUrl;
        this._key=key;
        this._maxGifNum=max_gif_num;
        this._defTags=def_tags;
    }
    init(){
        this._displayDefTags();
        const get_trending = document.getElementById("trending-btn-id");
        get_trending.addEventListener("click",SearchGifs.fetchTrendingGifs);
        const submit_input = document.getElementById("submit-btn-id");
        submit_input.addEventListener("click",SearchGifs.searchByInput);
    }
    
    static async fetchTrendingGifs(){
        const param = SearchGifs.setup_params();
        const args = config.SOURCE_TRENDING_URL+param;
        const resp = await fetch(args);
        const result = await resp.json();
        SearchGifs.displayResult(result);
    }
    static displayResult(data){
        const resultDiv = document.getElementById("result-gifs");
        if(data.data.length == 0){
            resultDiv.innerHTML = "Matching Gifs Not Found";
            return;
        }
        resultDiv.innerHTML="";
        for(let i =0; i< data.data.length; i++){
            const currGif=data.data[i];
            const newGifBox = document.createElement("div");
            newGifBox.className="gif-box";
            const newGifImage =document.createElement("img");
            newGifImage.src=currGif.images.fixed_height.url;
            newGifImage.className="gif-box-img";
            const newGifRating = document.createElement("div");
            newGifRating.className="gif-box-rating";
            newGifRating.innerText="Rating: " + currGif.rating;
            newGifBox.appendChild(newGifImage);
            newGifBox.appendChild(newGifRating);
            resultDiv.appendChild(newGifBox);
        }
    }
    static searchByInput(){
        const input = document.getElementById("search-field-id").value;
        if(input==null|| input=='')return;
        SearchGifs.displayTag(input)
        SearchGifs.fetchGifs(input);
    }

    _displayDefTags(){
        for(let i = 0; i<config.DEFAULT_TAGS.length; i++){
            SearchGifs.displayTag(config.DEFAULT_TAGS[i]);
        }
    }

    static displayTag(newTagVal){
        if(localStorage.getItem(newTagVal) != null ){
            return;
        } 
        const newElem = document.createElement("div");
        const tagsDiv = document.getElementById("tag-buttons-id");

        newElem.className="tags-wrapper";
        const elem = document.createElement('input');
        elem.type = "button";
        elem.className="default-buttons tag-button";
        elem.value = newTagVal;
        elem.addEventListener("click",function(){
            SearchGifs.fetchGifs(this.value);
        });

        const deleteTag = document.createElement("input");
        deleteTag.className ="tag-button-delete";
        deleteTag.type="button";
        deleteTag.value="x";
        deleteTag.addEventListener("click",function(){
            localStorage.removeItem(this.parentNode.lastElementChild.value);
            this.parentNode.removeChild(this.parentNode.lastElementChild);
        });
        newElem.appendChild(deleteTag);
        newElem.appendChild(elem);
        tagsDiv.appendChild(newElem);
        localStorage.setItem(newTagVal,1);

    }
    static deleteFromStorage(val){

    }
    static async fetchGifs(gif_name){
      const param = SearchGifs.setup_params(gif_name);
       const args = config.SOURCE_GIF_URL+param;
       const resp = await fetch(args);
       const result = await resp.json();    
       SearchGifs.displayResult(result);
    }

    static setup_params(name=''){
        const param = new URLSearchParams();
        param.append('method', 'GET');
        param.append('api_key', config.KEY);
        param.append('format', 'json');
        param.append('limit', config.MAX_GIF_NUMBER);
        if(name != "") param.append("q",name);
        return param;
    }


}
localStorage.clear();
const elem = new SearchGifs();
elem.init();











































