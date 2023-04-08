const { Brainly } = require("brainly-scraper-v2");

Brainly.initialize();

Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
// You should do '.initialize()' for 1st time (v2.1.0 - higher)
Brainly.initialize();

const brain = new Brainly("id"); // 'id' - Default to 'id'

// You can do
const elementbreak = "<br />";
const htmlother = /<[^>]*>?/gm;

///brainly.json
async function BrainlyQ(question, id){
    return brain.searchWithMT(`${question}`, id).then( result=>{
        let listrest = result;
        let results = {result:[]};

        listrest.forEach((resout)=>{
            let data = {}
            data["question"] = resout["question"]["content"].replaceAll(elementbreak, "\n").replaceAll(htmlother, "");
            
            let listpoint = []
            resout["answers"].forEach((ansout)=>{
                
                listpoint.push(ansout["author"]["points"])
                // console.log(ansout["content"]);
            });
            if(listpoint.length!=0){
                let maxim = listpoint.max();
                resout["answers"].forEach((ansout)=>{
                    if (maxim >= ansout["author"]["points"]){

                        data["answers"] = ansout["content"].replaceAll(elementbreak, "\n").replaceAll(htmlother, "");

                    }
                });
            }
            results["result"].push(data);

        });
        return results;
    });
}

//BrainlyQ("rumus pitagoras", "id").then(results=>{
//    console.log(results);
//});
module.exports.brainly = BrainlyQ;