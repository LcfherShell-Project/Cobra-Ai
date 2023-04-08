const {writeFileSync, readFileSync} = require("fs");
const cutprocess = require("../libs/cutprocess.js");

const menubar = ` 
[мєηυ]----------------------------------
🕯️ [SEARCHING]--------------------
ㅤㅤㅤㅤ.ai:searching othertext
ㅤㅤㅤㅤ.ai:image othertext
ㅤㅤㅤㅤ.ai:news othertext
🕯️ [GAMES]-------------------------
ㅤㅤㅤㅤ.ai:sudoku -start <startgames> and .ai:sudoku [number 0-9]
ㅤㅤㅤㅤ.ai:tictactoe -start <startgames> @tagname and .ai:tictactoe [number 0-9]
ㅤㅤㅤㅤ.ai:quest -start <startgames> and .ai:quest othertext
🕯️ [Downloader]--------------------
ㅤㅤㅤㅤ.ai:download url<type image and document>
ㅤㅤㅤㅤ.ai:youtube url
ㅤㅤㅤㅤ.ai:tiktok url
ㅤㅤㅤㅤ.ai:twiter url
ㅤㅤㅤㅤ.ai:smart url <looking for other options> <bug>
🕯️ [Text 2 Audio]---------------------
ㅤㅤㅤㅤ.ai:audit othertext
🕯️ [Other]---------------------------
ㅤㅤㅤㅤ.ai:nude images or url <scan>#bug
ㅤㅤㅤㅤ.ai:about <show about menu>
ㅤㅤㅤㅤ.ai:menu <show menu>
-----------------------------------------
[тιмє-ση]------------------------------
ㅤㅤ🕡05:10 - 07:12 Morning
ㅤㅤ🕞15:23 - 17:56 Afternoons
ㅤㅤ🕗20:00 - 23:30 Evening
ㅤㅤ🕰Timezone:UTC+7 [WIB]
-----------------------------------------
[συя тσσℓѕ]------------------------------
ㅤㅤ📦Bot-Scrap = [Smart-WEB[VIP], Viper-Scrap[VIP]]
ㅤㅤ📦Bot-Shoop = [ USHOP-BOT [VIP] , TOKONCOL[FREE]#BUG ]
ㅤㅤ📦WA-Bot = [Viper-BOT [VVIP], ONEYES [VIP], COBRA [FREE]]
ㅤㅤ📦Face-RECOGN = MediaPipe[GOOGLE (PUBLIC) ]
ㅤㅤ📦TERA-SEARCH [FREE]
ㅤㅤ📦FRAMEWORK = [PIESHARK, TYP, NINJA_X]
-----------------------------------------
[ѕσ¢ιαℓ мє∂ια]---------------------------
ㅤㅤ📒HackAthon: LcfherShell
ㅤㅤ📒GitLab: #LuciferTopic99 or LcfherShell
ㅤㅤ📒Twitter: @LcferS
ㅤㅤ📒Youtube: @nonamearmyid50
-----------------------------------------
[ємαιℓ]----------------------------------
ㅤㅤ📬Tutanota: lcfhershell@tutanota.com
-----------------------------------------
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ*ˡᶜᶠʰᵉʳˢʰᵉˡˡ*
`;

const payment = `
hide-payment-----------------------------
Crypto [ET]: Cgxnd3Mtd2l6LXNlcnAQAxgBMggIABCKBRCRAjINCAAQigUQsQMQgwEQQzIHCAAQigUQQzINCAAQigUQsQMQgwEQQzINCAAQigUQsQMQgwEQQzILCAAQgAQQsQMQgwEyCwgAEIAEELEDEIMBMgUIABCABDILCAAQgAQQsQMQgwEyCwgAEIAEELEDEIMBOhEILhCABBCxAxCDARDHARDRA0oECEEYAFAAWL8MYLIfaABwAXgAgAH5AYgB5wOSAQUwLjIuMZgBAKABAcABAQ
Hidden-Wallet: --closed-- 
Onion-Payment:  abiumkdgve5kynjztuovbg43uxcbcxn6y2okcrsg7gb6jmba
-----------------------------------------
`;

const community = `
hidden-community-forums-----------[ID GR]
raid-froum : http://raidforums.com/ <dm rams>
lcfhershell: http://satanicalcfhershelltuovbg43uxcbcxn6y2osf09d7gb6jdd.onion
bloody-girl: http://idoaqowifowch9d8dd3dklndfl8vl20vmsp2.onion
facebook: http://d46a7ehxj6d6f2cf4hi3b424uzywno24c7qtnvdvwsah5qpogewoeqid.onion/?com=feoneo93cnid829
`;

const about = `
ramsyan: Adulterio con criaturas terrenales
jasop: La noche será larga sin el sol
mila: Los seres vivos siempre están aprendiendo
wester: Internet está lleno de dramas estúpidos
fadlrahman: solo quédate en casa, acuéstate y come
${community}
`

const menutictactoe = `
🥰Welcome to TicTacToe Games.
Players : [${global.players1}, ${global.players2}]
Time for Player: ${global.players1}
ㅤㅤ--------TicTacToe--------
ㅤㅤㅤㅤ1ㅤ|ㅤ2ㅤ|ㅤ3
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
ㅤㅤㅤㅤ4ㅤ|ㅤ5ㅤ|ㅤ6
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
ㅤㅤㅤㅤ7ㅤ|ㅤ8ㅤ|ㅤ9
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
ㅤ
ѕ¢яιρт ¢яєαтσя: ѕυяуαнα∂ι & נαѕσρ ѕєℓк ℓ
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ*ˡᶜᶠʰᵉʳˢʰᵉˡˡ*
`;

const menusudoku = `
🥰Welcome to Sudo Games.
Players : ${global.players1}
ㅤㅤ---------Sudoku---------
ㅤㅤㅤㅤxㅤ|ㅤxㅤ|ㅤx
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
ㅤㅤㅤㅤxㅤ|ㅤxㅤ|ㅤx
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
ㅤㅤㅤㅤxㅤ|ㅤxㅤ|ㅤx
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
ㅤ
ѕ¢яιρт ¢яєαтσя: נαѕσρ ѕєℓк ℓ
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ*ˡᶜᶠʰᵉʳˢʰᵉˡˡ*
`;
const menuquestion = `
ѕ¢яιρт ¢яєαтσя: мιℓℓα αρяι
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ*ˡᶜᶠʰᵉʳˢʰᵉˡˡ*
`;

////download
const menudownload =  `
ѕ¢яιρт ¢яєαтσя: яαмѕуαη тυηggα
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ*ˡᶜᶠʰᵉʳˢʰᵉˡˡ*
`;

const menutranslate= `
ѕ¢яιρт ¢яєαтσя: נαѕσρ ѕєℓк ℓ
ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ*ˡᶜᶠʰᵉʳˢʰᵉˡˡ*
`
module.exports = {
    menuBar:menubar,
    menuTictactoe:menutictactoe,
    menuSudoku:menusudoku,
    menuQuestion:menuquestion,
    menuDownload:menudownload,
    menuabout: about,
    menucomm: community,
    menutranslates: menutranslate 
}