const {Client, List, Buttons, Status, MessageMedia, LocalAuth, NoAuth} = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const path = require("path");
const cutprocess = require("./libs/cutprocess.js");
const {phone} = require('phone');
const { findPhoneNumbersInText, parsePhoneNumber } = require('libphonenumber-js');
const {parse} = require("url");
///openai : key:: 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

///audiot python speach.py id:hi anakku
//////////check followredirect
const {followRedirectasync, followRedirectsync, parseURLsync} = require("./libs/followredirect.js");
const {get_AllParams} = require("./libs/parserParameter.js");

//searching
const { gosearch, newsearch, imagesearch } = require("./libs/searching.js");
///games
const { mysudokuv2 } = require("./libs/sudoku.js");
const { mytictactoev2 } = require("./libs/tictactoe.js");
const { myquizv2 } = require("./libs/quiz.js");
//downloader
const { downloader, autoDownload, ttkdownload, ytdownload, twtdonwload} = require("./libs/downloader.js");
//brainly
//const {brainly} = require("./libs/brainly.js");
///badword
const {filter_Word, filter_badword} = require("./libs/badword.js");
///GPT
const {GPasking} = require("./libs/gpt4.js");
const {menuBar, menuDownload, menuQuestion, menuSudoku, menuTictactoe, menuabout, menucomm, menutranslates} = require("./helper/menu.js");
const { title } = require("process");
const {tools_fileinform, tools_renames, mimetype} = require("./libs/filenamager.js");
const { platform } = require("os");
///Translate
const {YandexTranslates, CheckLanggues} = require("./libs/translate.js");
///
const salams = `
Hi, introduce my name is cobra-bot. I was created by my master Ramsyan from the lcfhershell team, I was programmed using 3 programming languages namely C, Python, and Javascript but my brain was programmed using C language. I was assigned by my master to help you, I hope my presence can make you happy.
`

const badfilt = new filter_badword();
const client = new Client(
    {
        authStrategy: new LocalAuth(),
        puppeteer: {
            executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
            handleSIGINT: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ] 
        }
    }
);
client.on('authenticated', (session) => {
    let sessionData = session;
    console.log(sessionData)
});
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    console.log(qr);
});


client.on("ready", async () => {
    console.log("Client is ready!");
    let chat_activos = await client.getChats();
    ///for (const n_chat of chat_activos) {

    //    var n_id = n_chat.id;
    //    let mensajes_verificar = await n_chat.fetchMessages();
    
    //    for (const n_chat_mensaje of mensajes_verificar) {
    
    //        if (n_chat_mensaje.isGroup) {
    //            es_grupo = 'N';
    //        } else {
    //           es_grupo = 'S';
    //        }
    //    }
    //    console.log(chat_activos);
    //}
    //send button
    let button = new Buttons(`
C: 🤖Can I help you guys?
Please select and press the button provided
    `, [{ body: 'Help' }, { body: 'Report' }, {body:"Turn off"}], 'ˢᵗᵃᵗᵘˢ ᵇᵒᵗ: ᵒⁿˡᶦⁿᵉ', 'ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ*ˡᶜᶠʰᵉʳˢʰᵉˡˡ*');
    client.sendMessage("120363093996691840@g.us", button); //120363093996691840@g.us
});

///get messages self
client.on('message_create', async message => {
    
    if (message._data.id.remote == "120363093996691840@g.us" || message._data.id.remote == "120363024215117807@g.us" ){
        
        var testAwait = function () {
            var promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('Inside test await');
                }, 1000);
            });
            return promise;
        }
        var asyncFunction = async function() {
            await testAwait().then((data) => {
                console.log('data');
            })
            return 'hello asyncFunction';
        };

        if (message._data.id.fromMe && message._data.type == 'chat'){

            if (message._data.body.length == "The program will be closed".length){

                async function close() {
                    process.exit(0);
                }
                
                
                asyncFunction().then((data) => {
                    if (data){
                        close().then(scss=>{
                            console.log("success");
                        })
                    }
                }).catch(err=>{
                    console.log("passout");
                });
                
            
            }else{

                    let mesx = message.body.toString().replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');
                    badfilt.config(update={sensor:true, smart:true, ap:mesx, ma:33, test: (ap, ma)=>{

                        var messagespost ;
                        badfilt.words_o(ap.toString());
  
                        if (badfilt.thisToxic) {
                  
                            if (badfilt.thisToxic.length == 3) {
                            
                                //console.log( badfilt.cleans );
                            
                                //console.log( "Get subject sensore: " + badfilt.thisToxic[badfilt.thisToxic.length-1] );

                                messagespost = badfilt.cleans
                       
                            }else{
                        
                                //console.log( badfilt.clean(badfilt.position()) );
                                messagespost = badfilt.clean(badfilt.position())
                            
                            };
                            if (mesx != messagespost){
                                
                                async function deletes(froms) {

                                    let chat = await client.getChatById(froms);
                                    let messages = await chat.fetchMessages({limit: 10});
                                    for (let index = 0; index < messages.length; index++) {
                                        const element = messages[index]._data.id;
                                        if (element.fromMe && element.id == message._data.id.id){
                                            try{
                                                await messages[index].delete(true);
                                            }catch{
                                                await message.delete();
                                            }
                                        };

                                    }
                                    

                                }
                                asyncFunction().then((data) => {
                                    if (data){
                                        deletes(message._data.id.remote).then(scss=>{
                                            console.log("success");
                                        }).catch(er=>{
                                            console.log("failed");
                                        })
                                    }
                                });
                            
                            }
                            //message.reply(messagespost);
                        
                        }
                  
                    },});
            }

        }
    
    }
    //process.exit(0);
});
///end get message from me

//get update chat changes
client.on('message_revoke_everyone', async (after, before) => {

    if (before._data.id.remote == "120363024215117807@g.us" && after._data.id.remote == "120363024215117807@g.us" || before._data.id.remote == "120363093996691840@g.us" && after._data.id.remote == "120363093996691840@g.us"){
            // message before it was deleted.
            //console.log(" - message_revoke_everyone:before", before._data.id.participant);
        
            if (before._data.id.fromMe == false){
                const contact = await client.getContactById(before._data.id.participant);
                let mentions = [];
                if (contact){
                    mentions.push(contact);
                    client.sendMessage(before._data.id.remote, `🤫Someone deleted a message`, { mentions });
                }
            };
            // message after it was deleted.
            //console.log(" - message_revoke_everyone:after", after);
            
    }
});
//end


//get messages
client.on('message', async message => {


    const get_ChatAll = await message.getChat();
    
    if (get_ChatAll.isGroup){
        if (get_ChatAll.id.remote == "120363024215117807@g.us" || get_ChatAll.id.user == "120363024215117807" && get_ChatAll.id.server == "g.us" || get_ChatAll.id.remote == "120363093996691840@g.us" || get_ChatAll.id.user == "120363093996691840"){
            
            //console.log(get_ChatAll);
            //console.log(message);
            
            ///get participant
            const list_participants = get_ChatAll.groupMetadata.participants;
            const listadmin = [];

            for (var numb = 0; numb < Object.keys(list_participants).length; numb++){
                var usernumb = list_participants[numb].id.user;
                var admins = list_participants[numb].isAdmin;
                if (admins != false){
                    listadmin.push(usernumb)
                }
            };
            
            ///GET
            //console.log(list_participants);
            ///GET
            //console.log(client.info.wid.user);
            ///GET
            //console.log(mentions);

            let msg = message.body.toString();
            if (message.type === "buttons_response"){
                
                if (msg.startsWith("Help")){
                    
                    let send = `
Example menu:
[1]
 .ai:searching hello world
 .ai:image Jesus Cry
 .ai:news Protests against Barack Obama
[2] Inform [maxim size: 4mb]
 .ai:download https:example.com/img/error.png?q53no30crjr0qwr946
 .ai:youtube https://youtu.be/pgN-vvVVxMA
 .ai:tiktok https://www.tiktok.com/@cikfeeya0/video/7207314132486376730
 .ai:smart [get bug]
[3]
 .ai:audit:ru<code country> Привет, мир
[4]
 .ai:tagall just kidding :)
 .ai:tagadmin hello admin..!
[5]
 .ai:ask laporan penelitian kemkes tentang gizi masyarakat
                    `
                    message.reply(send);
                
                }else if(msg.startsWith("Report")){

                    message.reply("If there are bugs or complaints please contact us via email Tutanota: lcfhershell@tutanota.com")
                
                }else if(msg.startsWith("Turn off")){

                    message.reply("The program will be closed");

                }


            }else if(message.type === "list_response"){
                var rms, filenames, platforms;
                let remove_Session = async function (filename){
                            let jsona = {
                                "link":"",
                                "result":[]
                            }
                            fs.writeFileSync(filename, JSON.stringify(jsona));
                }
                if(msg.startsWith("Youtube")){
               
                    rms = msg.replace("Youtube:", "").replaceAll(/\s/g, "")
                    filenames = "./session/ytdll.json"
                    platforms = "-yt"
               
                }else if(msg.startsWith("Twitter")){
               
                    rms = msg.replace("Twitter:", "").replaceAll(/\s/g, "")
                    filenames = "./session/twitt.json"
                    platforms = "-twit"
               
                }else if(msg.startsWith("Tiktok")){
               
                    rms = msg.replace("Tiktok:", "").replaceAll(/\s/g, "")
                    filenames = "./session/tictoc.json"
                    platforms = "-ttk"
                }
                ///processs downloader social media
                if(filenames){
                    let dataselect;
                    const reads = fs.readFileSync(filenames);
                    let jsonx = JSON.parse(reads);
                    if (Object.keys(jsonx.result).length !=0){
                            
                            Object.keys(jsonx.result).forEach(nresult=>{
                                if (jsonx.result[nresult].hasOwnProperty(rms)){
                                    dataselect = jsonx.result[nresult][rms];
                                    return;
                                }
                            });

                            if (dataselect){
                                let sd = message._data.id.participant.toString(), mentions = [];
                                const contactx = await client.getContactById(message._data.id.participant);
                                mentions.push(contactx);
                                try{
                                    const media = await MessageMedia.fromUrl(dataselect);

                                    //console.log(media);
                                    //client.sendMessage(get_ChatAll.id._serialized, media);
                                    if (media.mimetype){
                                        try{
                                            let mediaup = await new MessageMedia(media.mimetype, media.data, media.filename, media.filesize)
                                            await client.sendMessage(get_ChatAll.id._serialized, mediaup);
                                        }catch{
                                            
                                            try{
                                                
                                                await client.sendMessage(get_ChatAll.id._serialized, media, {caption: `Hey @${sd.split("@")[0]} here your file is ready`, mentions});

                                            }catch{
                                                
                                                message.reply("⚠️Something problem has occurred please repeat your command again ( ai:<platformname> <url> )");
                                            
                                            }
                                        }
                                        
                                        
                                    }
                                }catch{
                                    downloader(dataselect, "./media").then(rest=>{
                                        if (Object.keys(rest).includes("filename")){
                                            
                                            let filenames = rest.filename;
                                            let mimets = mimetype(filenames);
                                            let attachment = fs.readFileSync(filenames).toString("base64");
                                            (async () => {
                                                var media = await new MessageMedia(mimets, attachment, filenames)
                                                await client.sendMessage(get_ChatAll.id._serialized, media, {caption: `Hey @${sd.split("@")[0]} here your file is ready`,  mentions}).then(re=>{
                                                    if (media){
                                                        fs.unlinkSync(filenames);
                                                    };
                                                }).catch(erro=>{
                                                    try{
                                                        if (media){
                                                            fs.unlinkSync(filenames);
                                                        };
                                                    }catch{
                                                        console.log("error delete");
                                                    }
                                                })
                                                
                                                
                                            })()
                                        }
                                    }).catch(err=>{
                                        message.reply("⚠️Something problem has occurred please repeat your command again ( ai:<platformname> <url> )");
                                    });
                                }
                                remove_Session(filenames);
                            }

                        }else{
                             
                            message.reply("⚠️The session has been deleted, repeat your command ( ai:youtube <url> )");
                        
                        }   
                }///other program commingsoon;

            }
            if (msg.toLocaleLowerCase().startsWith(".ai:")){
                


                var newString = msg.toLocaleLowerCase().indexOf('.ai:') == 0 ? msg.toLocaleLowerCase().substring(".ai:".length) : xx;
                let command = newString.split(" ");
                if(command[0]== "phone"){
                    
                    var theRemovedElement = command.shift()
                    //console.log(command);
                    let parsex = findPhoneNumbersInText(command.join(" "));
                    var sessionx = [];
                    Object.keys(parsex).forEach(exnum=>{
                    
                        const getcontact = parsex[exnum].number;
                        let informx = phone(getcontact.number, {country: null}); 
                        sessionx.push( `Phone Valid: ${informx.isValid}\nNation Number: ${informx.phoneNumber} or ${getcontact.nationalNumber}\nISO-Alpha 2/3: ${informx.countryIso2}/${informx.countryIso3}\nCode Number: ${informx.countryCode}\nTLS version: ${getcontact.metadata.version}` );
                    
                    });

                    if (sessionx.length != 0){

                        let sendMessages = sessionx.join("\n-------------------------------------\n")
                        message.reply(`${sendMessages}\n${menuDownload}`);
                    
                    }else{
                    
                        message.reply("Sorry, data not found")
                    
                    }
                    //const phoneNumber = parsePhoneNumber('+12133734253');
                    //phoneNumber.formatNational();


                }else if(command[0]=="tagall"){
                        var theRemovedElement = command.shift();
                    ///remove
                        const chat = await message.getChat();
        
                        let mentions = [];
                        let fromtag = "", sd = message._data.id.participant.toString();

                        for(let participant of chat.participants) {
                            const contact = await client.getContactById(participant.id._serialized);
                            if (sd.includes(participant.id.user.toString())){
                                command.unshift(`From: @${participant.id.user}\nMessage:`);
                            }

                            mentions.push(contact);
                            //text += `@${participant.id.user} `;
                        }
                        
                        await chat.sendMessage(command.join(" "), { mentions });

                }else if (command[0]=="tagadmin"){

                    var theRemovedElement = command.shift();

                    const chat = await message.getChat();
                    let mentions = [];
                    let fromtag = "", sd = message._data.id.participant.toString();
                    for(let participant of chat.participants) {
                        const contact = await client.getContactById(participant.id._serialized);
                        if (sd.includes(participant.id.user.toString())){
                            command.unshift(`From: @${participant.id.user}\nMessage:`);
                        }
                        if (mentions.length == listadmin.length){
                            //for (let index = 0; index < listadmin.length; index++) {
                            //    const contactx = await client.getContactById(listadmin[index]);
        
                                //command.unshift(`From: @${participant.id.user}\nMessage:`);
                            //    mentions.push(contactx);
                            //}
                            console.log(1);
                        }else{

                            if (listadmin.includes(contact.number)){
                                mentions.push(contact);
                            }

                        }
                        //text += `@${participant.id.user} `;
                    }
                    if (mentions.length == listadmin.length){
                        const contactx = await client.getContactById(message._data.id.participant);
                        if (contactx){
                            mentions.unshift(contactx);
                        }
                    }
                    await chat.sendMessage(command.join(" "), { mentions });

            }else if(command[0].includes("translate")){
                        let targetx ;
                        var getarget_country = command[0].split(":");
                        if (getarget_country.length !=1 && getarget_country.length !=0){
                            for (let index = 0; index < getarget_country.length; index++) {
                                const element = getarget_country[index];
                                if (CheckLanggues(element) || CheckLanggues(element.toLowerCase())){
                                        targetx = element.toLowerCase();
                                        break;
                                }
                            }
                        }else{
                            targetx = "en";
                        }
                        var theRemovedElement = command.shift();
                        YandexTranslates(command.join(" "), targetx).then(rest=>{
                            
                                message.reply(`
From languages: ${rest.from}
To languages: ${rest.to}
Input: ${rest.text}
Result: ${rest.translation}
${menutranslates}`);
                        
                        }).catch(erro=>{
                            message.reply(`⚠️The server encountered a problem with error code 30180-26, the process will be aborted.\nSuggestion: please resubmit your order.`);
                        });


                }else if(command[0]=="ask"){
                    ///start ask
                    var theRemovedElement = command.shift();
                    GPasking(command.join(" ")).then(res=>{
                        
                        let getanswer = res.choices[0].text;
                        message.reply(`
Question: ${command.join(" ")}
Answer: ${getanswer.replace("\n", "")}
                        `);
                    
                    }).catch(error=>{
                        
                        client.sendMessage(get_ChatAll.id._serialized, "{status:'error'}");

                    });
                    ////////////end
                }else if (command[0]=="news"){
                    
                    var theRemovedElement = command.shift()
                    
                    cutprocess(newsearch(command.join(" ").toString().replaceAll(/^\s+|\s+$/gm,'')).then(res=>{
                        if(res){
                            
                            let newsget =  `
Title: *${res.title}*
Description: ${res.excerpt}
Link: ${res.url}
                            `;
                            message.reply(newsget);
                    
                        }
                    }), 5);
                    
                }else if(command[0]=="searching"){

                    var theRemovedElement = command.shift()
                    
                    let tcommand = command.join(" ").toString();
                    cutprocess(gosearch(tcommand.replaceAll(/^\s+|\s+$/gm,'').trim()).then(res=>{
                        if(res){
                            let newsget =  `
Title: *${res.title}*
Description: ${res.description}
Link: ${res.url}
                            `;
                            message.reply(newsget);
                        }
                    }), 5);
                    
                }else if(command[0]=="image"){

                    var theRemovedElement = command.shift()
                    
                    cutprocess(imagesearch(command.join(" ").toString().replaceAll(/^\s+|\s+$/gm,'')).then(res=>{
                        if(res){
                            
                            let newsget =  `
Files: *${res.image}*
Height: ${res.height}px
Width: ${res.width}px
                            `;
                            message.reply(newsget);
                    
                        }
                    }), 5);
                    
                }                
                ///downloader menu
                else if(command[0]=="youtube"){
                    var urlx = msg.replace(/.ai|:youtube/gi, "").replaceAll(/\s/g,"");
                    
                    let files = fs.readFileSync("./session/ytdll.json");
                    let json = JSON.parse(files);              
                    if (json.result.length != 0 && json.link === urlx){

                                        let lists = [];
                                        Object.keys(json.result).forEach(arrays=>{
                                            let xjson = {};
                                            let xx = Object.keys(json.result[arrays])

                                            xjson['id'] = xx[0];
                                            xjson['title'] = `Youtube: ${xx[0]}`;
                                            lists.push(xjson);
                                        });

                                        if (lists.length != 0){
                                            let productsList = new List(
                                                `🖥️ Platform: Youtube\nPlease select the list of pixel media obtained <free mode>${menuDownload}`,
                                                "View all List",
                                                [
                                                {
                                                    title: "Select the result list",
                                                    rows: lists,
                                                },
                                                ],
                                                `Media Downloader`
                                            );
                                            client.sendMessage(get_ChatAll.id._serialized, productsList);
                                        }else{
                                            console.log("eeror")
                                        }

                    }else if (json.result.length == 0  && json.link == "" || json.result.length == 0  && json.link != urlx){
                        const gettingsession = async () =>{
                            let files = fs.readFileSync("./session/ytdll.json");
                            let json = JSON.parse(files);              
                            if (json.result.length != 0){

                                                let lists = [];
                                                Object.keys(json.result).forEach(arrays=>{
                                                    let xjson = {};
                                                    let xx = Object.keys(json.result[arrays])

                                                    xjson['id'] = xx[0];
                                                    xjson['title'] = `Youtube: ${xx[0]}`;
                                                    lists.push(xjson);
                                                });

                                                if (lists.length != 0){
                                                    let productsList = new List(
                                                        `🖥️ Platform: Youtube\nPlease select the list of pixel media obtained <free mode>${menuDownload}`,
                                                        "View all List",
                                                        [
                                                        {
                                                            title: "Select the result list",
                                                            rows: lists,
                                                        },
                                                        ],
                                                        `Media Downloader`
                                                    );
                                                    console.log(1);
                                                    client.sendMessage(get_ChatAll.id._serialized, productsList);
                                                }else{
                                                    console.log(0);
                                                    message.reply("⚠️The server encountered a problem with error code 30180-26, the process will be aborted.\nSuggestion: please resubmit your order.")
                                                }

                            }
                        }
                        
                        //////end funtion
                        cutprocess(
                        
                            ytdownload(urlx, "./session", gettingsession).then(res=>{   
                                
                                    console.log(1);
                                    gettingsession().then(respc=>{
                                        console.log(12);
                                    });
                            
                            }).catch( resp =>{

                                console.log(0);
                                message.reply("⚠️The server encountered a problem with error code 30180-26, the process will be aborted.\nSuggestion: please resubmit your order.")
                            
                            }), 30
                        
                        );
                    }

                    ///const media = MessageMedia.fromFilePath('./path/to/image.png');

                
                
                }else if(command[0]=="twitter"){
                    
                    var urlx = msg.replace(/.ai|:twitter/gi, "").replaceAll(/\s/g,"");
                    let files = fs.readFileSync("./session/twitt.json");
                    let json = JSON.parse(files);

                    if (json.result.length != 0 && json.link === urlx){

                                        let lists = [];
                                        Object.keys(json.result).forEach(arrays=>{
                                            let xjson = {};
                                            let xx = Object.keys(json.result[arrays])

                                            xjson['id'] = xx[0];
                                            xjson['title'] = `Twitter: ${xx[0]}`;
                                            lists.push(xjson);
                                        });

                                        if (lists.length != 0){
                                            let productsList = new List(
                                                `🖥️ Platform: Twitter\nPlease select the list of pixel media obtained <free mode>${menuDownload}`,
                                                "View all List",
                                                [
                                                {
                                                    title: "Select the result list",
                                                    rows: lists,
                                                },
                                                ],
                                                `Media Downloader`
                                            );
                                            client.sendMessage(get_ChatAll.id._serialized, productsList);
                                        }else{
                                            console.log("eeror")
                                        }

                    }else if (json.result.length == 0  && json.link == "" || json.result.length == 0  && json.link != urlx){
                        const gettingsession = async () =>{
                            let files = fs.readFileSync("./session/twitt.json");
                            let json = JSON.parse(files);              
                            if (json.result.length != 0){

                                                let lists = [];
                                                Object.keys(json.result).forEach(arrays=>{
                                                    let xjson = {};
                                                    let xx = Object.keys(json.result[arrays])

                                                    xjson['id'] = xx[0];
                                                    xjson['title'] = `Twitter: ${xx[0]}`;
                                                    lists.push(xjson);
                                                });

                                                if (lists.length != 0){
                                                    let productsList = new List(
                                                        `🖥️ Platform: Twitter\nPlease select the list of pixel media obtained <free mode>${menuDownload}`,
                                                        "View all List",
                                                        [
                                                        {
                                                            title: "Select the result list",
                                                            rows: lists,
                                                        },
                                                        ],
                                                        `Media Downloader`
                                                    );
                                                    console.log(1);
                                                    client.sendMessage(get_ChatAll.id._serialized, productsList);
                                                }else{
                                                    console.log(0);
                                                    message.reply("⚠️The server encountered a problem with error code 30180-26, the process will be aborted.\nSuggestion: please resubmit your order.")
                                                }

                            }
                        }
                        //////end funtion
                        cutprocess(
                        
                            twtdonwload(urlx, "./session", gettingsession).then(res=>{   
                                
                                    console.log(1);
                                    gettingsession().then(respc=>{
                                        console.log(12);
                                    });
                            
                            }).catch( resp =>{

                                console.log(0);
                                message.reply("⚠️The server encountered a problem with error code 30180-26, the process will be aborted.\nSuggestion: please resubmit your order.")
                            
                            }), 30
                        
                        );
                    }

                    ///const media = MessageMedia.fromFilePath('./path/to/image.png');

                
                
                }else if(command[0]=="tiktok"){
                    
                    var urlx = msg.replace(/.ai|:tiktok/gi, "").replaceAll(/\s/g,"");
                    let files = fs.readFileSync("./session/tictoc.json");
                    let json = JSON.parse(files);
                    if (json.result.length != 0 && json.link === urlx){
                            let lists = [];
                            Object.keys(json.result).forEach(arrays=>{
                                let xjson = {};
                                let xx = Object.keys(json.result[arrays])

                                xjson['id'] = xx[0];
                                xjson['title'] = `Tiktok: ${xx[0]}`;
                                lists.push(xjson);
                            });

                            if (lists.length != 0){
                                let productsList = new List(
                                    `🖥️ Platform: Tik-Tok\nPlease select the list of pixel media obtained <free mode>${menuDownload}`,
                                    "View all List",
                                    [
                                    {
                                        title: "Select the result list",
                                        rows: lists,
                                    },
                                    ],
                                    `Media Downloader`
                                );
                                client.sendMessage(get_ChatAll.id._serialized, productsList);
                            }else{
                                console.log("eeror")
                            }
                    }else if (json.result.length == 0  && json.link == "" || json.result.length == 0  && json.link != urlx){
                            const gettingsession = async () =>{
                                let files = fs.readFileSync("./session/tictoc.json");
                                let json = JSON.parse(files);              
                                if (json.result.length != 0){
        
                                                    let lists = [];
                                                    Object.keys(json.result).forEach(arrays=>{
                                                        let xjson = {};
                                                        let xx = Object.keys(json.result[arrays])
        
                                                        xjson['id'] = xx[0];
                                                        xjson['title'] = `Tiktok: ${xx[0]}`;
                                                        lists.push(xjson);
                                                    });
        
                                                    if (lists.length != 0){
                                                        let productsList = new List(
                                                            `🖥️ Platform: Tik-Tok\nPlease select the list of obtained media <free mode>${menuDownload}`,
                                                            "View all List",
                                                            [
                                                            {
                                                                title: "Select the result list",
                                                                rows: lists,
                                                            },
                                                            ],
                                                            `Media Downloader`
                                                        );
                                                        console.log(1);
                                                        client.sendMessage(get_ChatAll.id._serialized, productsList);
                                                    }else{
                                                        console.log(0);
                                                        message.reply("⚠️The server encountered a problem with error code 30180-26, the process will be aborted.\nSuggestion: please resubmit your order.")
                                                    }
        
                                }
                            }
                            //////end function
                            cutprocess(ttkdownload(urlx, "./session", gettingsession).then(res=>{
                                
                                    console.log(1);
                                    gettingsession().then(respc=>{
                                        console.log(12);
                                    })
                                
                                }).catch( resp =>{
                                
                                    message.reply("⚠️The server encountered a problem with error code 30180-26, the process will be aborted.\nSuggestion: please resubmit your order.")
                                
                                }), 30
                            
                            );
                    }
                    

                    ///const media = MessageMedia.fromFilePath('./path/to/image.png');

                
                }else if(command[0]=="download"){
                    var urlx = msg.replace(/.ai|:download/gi, "").replaceAll(/\s/g,"");
                    
                    ///get mentions
                    let sd = message._data.id.participant.toString(), mentions = [];
                    const contactx = await client.getContactById(message._data.id.participant);
                    mentions.push(contactx);
                    
                    followRedirectsync(urlx).then(resync=>{
                            var filename;
                            const parsers = parse(resync);
                            try{
                                filename = path.basename(parsers.pathname);//.replace(/(^\/|\/$)/g, '');
                            }catch{
                                filename = parsers.pathname.replace(/(^\/|\/$)/g, '');
                            }
                            const ext = path.extname(filename)
                            if (ext.includes("html") || ext.includes("css") || ext.includes("js") || ext.includes("asp") || ext.includes("php")){
                                filename = "headers";
                            }else{
                                if (ext){
                                    filename = filename;
                                }else{
                                    
                                    let params = parseURLsync(resync);
                                    const parameterslist = get_AllParams( params.searchParams).values;
                                    for (let index = 0; index < Object.keys(parameterslist).length; index++) {
                                       
                                       const filex = path.basename(parameterslist[index]);
                                       if (filex) {
                                            filename = filex;
                                            break;
                                       }
                                        
                                    }

                                }
                            }

                            if (filename){
                                
                                //console.log(media);
                                //client.sendMessage(get_ChatAll.id._serialized, media);
                                const postmessages = async (urls)=>{   
                                        const media = await MessageMedia.fromUrl(urls);
                                        if (media.mimetype){
                                            try{
                                                let mediaup = await new MessageMedia(media.mimetype, media.data, media.filename, media.filesize)
                                                await client.sendMessage(get_ChatAll.id._serialized, mediaup, {caption: `Hey @${sd.split("@")[0]} here your file is ready`, mentions});
                                                console.log(1);
                                            }catch{
                                                
                                                try{
                                                    console.log(1);
                                                    await client.sendMessage(get_ChatAll.id._serialized, media, {caption: `Hey @${sd.split("@")[0]} here your file is ready`, mentions});

                                                }catch{
                                                    console.log(0);
                                                    message.reply("⚠️Something problem has occurred please repeat your command again ( ai:<platformname> <url> )");
                                                
                                                }
                                            }
                                        }
                                    }

                                ///end function
                                postmessages(resync).then(xx=>{
                                    console.log(1);
                                }).catch(err=>{
                                    console.log(0);
                                    message.reply("⚠️Something problem has occurred please repeat your command again ( ai:<platformname> <url> )");
                                });
                                ////end

                            }

                    })
                }



            }else if(message.body.startsWith(".loads") && message.body.length == 6){   
                message.reply("⚠️Something problem has occurred please repeat your command again )");
            }else if(message.body.startsWith(".menu") && message.body.length == 5){
                let send = `
Example menu:
[1]
 .ai:searching hello world
 .ai:image Jesus Cry
 .ai:news Protests against Barack Obama
[2] Inform [maxim size: 4mb]
 .ai:download https:example.com/img/error.png?q53no30crjr0qwr946
 .ai:youtube https://youtu.be/pgN-vvVVxMA
 .ai:tiktok https://www.tiktok.com/@cikfeeya0/video/7207314132486376730
 .ai:smart [get bug]
[3]
 .ai:audit:ru<code country> Привет, мир
[4]
 .ai:tagall just kidding :)
 .ai:tagadmin hello admin..!
[5]
 .ai:ask laporan penelitian kemkes tentang gizi masyarakat
                    `
                    message.reply(send);
            }else{

                let mesx = message.body.toString().replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');
                badfilt.config(update={sensor:true, smart:true, ap:mesx, ma:33, test: (ap, ma)=>{

                    var messagespost ;
                    badfilt.words_o(ap.toString());
  
                    if (badfilt.thisToxic) {
                  
                        if (badfilt.thisToxic.length == 3) {
                            
                            //console.log( badfilt.cleans );
                            
                            //console.log( "Get subject sensore: " + badfilt.thisToxic[badfilt.thisToxic.length-1] );

                            messagespost = badfilt.cleans
                       
                        }
                        
                        else{
                        
                            //console.log( badfilt.clean(badfilt.position()) );
                            messagespost = badfilt.clean(badfilt.position())
                        
                        };
                        if (mesx != messagespost){
                            message.reply( `dirty words found.\nresult:${messagespost}`);
                        }
                        //message.reply(messagespost);
                        
                    }
                  
                  },
                  
                });
            }
        }
    }

});

client.initialize();
