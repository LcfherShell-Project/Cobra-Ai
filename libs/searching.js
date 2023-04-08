const {promisify} = require('util');
const google = require('googlethis');
const DDG = require('duck-duck-scrape');

///get choice array
Array.prototype.choice = function(){
    return this[Math.floor(Math.random()*this.length)];
}

const options = {
    page: 1, 
    safe: false, // Safe Search
    parse_ads: false, // If set to true sponsored results will be parsed
    additional_params: { 
      // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
      hl: 'en' 
    }
  }

//google.image('The Wolf Among Us', options).then(resp=>{
//    if (resp){
//        console.log(resp);
//    }
//});

//const searchResults = DDG.search('sexy', {
//  safeSearch: DDG.SafeSearchType.STRICT
//});

//searchResults.then(res =>{
//    console.log(res);
//});


async function Search(query){
    if (query){
        const news = DDG.search(query, {
                    safeSearch: DDG.SafeSearchType.STRICT
                })
        return news.then(res=>{
            let results = res.results
            if (Array.isArray(results) && results.length != 0){
                   return results.choice();
            }
            return {};
        });
    }
    return {results:[]};
}

async function SearchNews(query){
    if (query){
        const news = DDG.searchNews(query, {
                    safeSearch: DDG.SafeSearchType.STRICT
                })
        return news.then(res=>{
            let results = res.results
            if (Array.isArray(results) && results.length != 0){
                   return results.choice();
            }
            return {};
        });
    }
    return {results:[]};
}

async function SearchImages(query){
    if (query){
        const news = DDG.searchImages(query, {
                    safeSearch: DDG.SafeSearchType.STRICT
                })
        return news.then(res=>{
            let results = res.results
            if (Array.isArray(results) && results.length != 0){
                   return results.choice();
            }
            return {};
        });
    }
    return {results:[]};
}

module.exports = {
    gosearch: Search,
    newsearch: SearchNews,
    imagesearch: SearchImages
}