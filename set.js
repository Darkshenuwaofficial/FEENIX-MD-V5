const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0lDNzE0dytyMnJXZFZJZnM1ZTJNckdoZk5zeXptbHc1djFZMFFCYmpWWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM1VHNnVNWDVIUE11bVNPZFhMVnhiNXFrR003aXhSU0kwS3RSeDVLaFJuOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTUYyU0dXWTZET01ZeE45NU9YbWRpOUxTN2lkamhiWU4wNFFBNzNMNjJVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTdEtuT3hvVktjdDRKK2YrTmFYczRGcmtxQ2t4cmloVVZRUy84T3FVM0NzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVFUEFSb3hVNGlRSm1VMWp6OFU5K016TVY2Tjg1cmdGcEFmY1ZjZ1VpRnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldUcFdRV2VXUXF6a3R1WDUzcTltZmZWZlREbUgxeTdTS2JsQW1aNTJBRDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0RoV2pKYnVYYjZlNEluWk9rWmZsY0JuVVRjaTVwdStkVXNnaDJVY3FtUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTGZYQk9aQ09VMEZDdVQ5YXFTVFdsQlZDd25ScTJCSzFRdnZ6YjNzWG1tST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlcydVpiSlpwOVRQVFFHVjA0c2pIcVN2dDYzM2VxTWJMaXZsSGk0djJBZVFvWndTOTlTNlpnVkVpK1djUnNkMkw2dHMwWGFOcUswU3BuK0NIUlhpNURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQyLCJhZHZTZWNyZXRLZXkiOiIzNlR5bVFmRGdWN0JIMFJGbkhqWXNvYVIxWUZXaUJSZXk1WFVnM2l5WEYwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJuNUxsUXBVcFNfNjBka2hMeWRmRHRRIiwicGhvbmVJZCI6ImEyMGM0OGJjLTNkNTAtNDVkYi05MmE4LWFjNmY3ZDI3MTBkNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsN096NDZWNFpYcS84UGVwL2pVRmNWYmIxMWM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYy9XS29HU25yYStUbytBakMvTGlXd2RnZTg0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik5GTkJQSktNIiwibWUiOnsiaWQiOiI5NDcyMjgwNzczNTo5MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZCF8J2atfCdmrXwnZq08J2asPCdmr5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG7wnZq48J2aqvCdmq/wnZCG8J2aqvCdmqvwnZqz8J2atfCdmqpcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG7wnZqu8J2atfCdkIvwnZCL8J2ar/CdkJYg8J2as/Cdmq/wnZq78J2arvCdmrXwnZqqIPCdkIXwnZCU8J2QgvCdkIrwnZq18J2aqiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTWFPalA4RkVJM252YlFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTDVWcmpNZEl2V0RUbktyQzJSWlpWRGFTdFZZQzkyRmhGRng5ZFNDMTZEcz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiKys5NnIwZm5sdEYxbmpkV0JIVk5FLzhSUllscVlwMlorbUN1YjdjSFN0SnRuTmlsc3kyNkZpREo1NDNjZzVKemFkdWFnUDRsMEZ1THlkRWhrY002RFE9PSIsImRldmljZVNpZ25hdHVyZSI6ImVHeDB6azU4MTYyRWxJWlZpVnY1S1RBblpCSEpxck9OcEIwQ01EWExSWjh1SXl4T2xrV05rM2JDYktVVlFsaUVKWHhaRjBtTll5Z2dKZVdnZko3cENBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3MjI4MDc3MzU6OTJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUytWYTR6SFNMMWcwNXlxd3RrV1dWUTJrclZXQXZkaFlSUmNmWFVndGVnNyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMDY3NzI3MywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPY0kifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "⚔  feenix  ⚔",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "94722807735",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'DEXTER-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
