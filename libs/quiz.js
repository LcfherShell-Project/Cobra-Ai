const utils = require("util");
const {exec, execSync} = require("node:child_process");
const JPython = utils.promisify(exec);

async function quizv2(command){
    let results = require('child_process').execSync(command).toString();
    if(results){
        return results;
    }
    return;
}


module.exports.myquizv2 = async function (command){
    let quiz = quizv2("python -u C:/Users/pc/Documents/MetaTestBeater/libs/quiz.py "+command.toString());
    
    if (quiz){
        return quiz.then(res=>{
        let resp = res.replaceAll(/\r?\n|\r/g, '').replaceAll("'", "\"");
        let jsondata = JSON.parse(resp);
        
        if(Object.hasOwn(jsondata, "answer")){
            const answer = jsondata.answer.join(", ");
            const maps = `
    (^u^) I have a good question, please answer correctly.
    ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    [@]> ${jsondata.quest}
    ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    Answer: ${answer}
    Session: ${jsondata.session}
        `;
        return maps;
        }else{
            const maps = `
    (^u^) I have a good question, please answer correctly.
    ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    [@]> ${jsondata.quest}
    ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
    Session: ${jsondata.session}
        `;
        return maps;
        }
        
    });
    };
    return "";
}