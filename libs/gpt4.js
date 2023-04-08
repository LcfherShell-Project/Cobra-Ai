const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({

    apiKey: "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",

});

const openai = new OpenAIApi(configuration);

async function Check(message=""){
    
    const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    temperature:0,
    max_tokens: 4032,
    top_p:1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
    });

    return completion.data;
}

//Check("cara membuat website").then(res=>{
//    console.log(res.choices);
//})
module.exports.GPasking = Check;