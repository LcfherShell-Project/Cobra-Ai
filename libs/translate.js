const { translate } = require('bing-translate-api');
const languages = require("bing-translate-api/src/lang.json");
const { isCorrectable }  = require("bing-translate-api/src/lang.js");


async function YandexTranslate(text, codes){
    if(isCorrectable(codes) || Object.keys(languages).includes(codes)){
        
        return await translate(text, null, codes).then(rest=>{
            let json = {
                text: text,
                translation: rest.translation,
                from: rest.language.from,
                to: rest.language.to
            }
            return json;
        }).catch(err=>{
            return {errors: 404};
        })

    }
    return false;
};
function CheckValidateLanggues(codes){
    return isCorrectable(codes) || Object.keys(languages).includes(codes)
}
module.exports = {
    YandexTranslates: YandexTranslate,
    CheckLanggues: CheckValidateLanggues
}
