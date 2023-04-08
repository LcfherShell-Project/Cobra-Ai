const {tebaktebakan, siapakahaku, caklontong} = require('@bochilteam/scraper');
const { json } = require('express');
const {writeFileSync, readFileSync} = require("fs");

async function SoalTebak2an(){
    const tebak = (await tebaktebakan());
    let json = {
        quest: tebak.soal,
        answer: tebak.jawaban
    }
    return json;
}

async function Whoiam(){
    const tebak = (await siapakahaku());
    let json = {
        quest: tebak.soal,
        answer: tebak.jawaban
    }
    return json;
}
async function CakLontong(){
    const tebak = (await caklontong());
    let json = {
        quest: tebak.soal,
        answer: tebak.jawaban
    }
    return json;
}