const path = require('path');
const fs = require('fs');

var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName, 'utf8', function (error, data) {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        });
    });
};

var writeFile = function (fileName, data) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(fileName, data, 'utf8', function (error) {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        });
    });
};

var colors = {
    'bold': ['\x1B[1m', '\x1B[22m'],
    'italic': ['\x1B[3m', '\x1B[23m'],
    'underline': ['\x1B[4m', '\x1B[24m'],
    'inverse': ['\x1B[7m', '\x1B[27m'],
    'strikethrough': ['\x1B[9m', '\x1B[29m'],
    'white': ['\x1B[37m', '\x1B[39m'],
    'grey': ['\x1B[90m', '\x1B[39m'],
    'black': ['\x1B[30m', '\x1B[39m'],
    'blue': ['\x1B[34m', '\x1B[39m'],
    'cyan': ['\x1B[36m', '\x1B[39m'],
    'green': ['\x1B[32m', '\x1B[39m'],
    'magenta': ['\x1B[35m', '\x1B[39m'],
    'red': ['\x1B[31m', '\x1B[39m'],
    'yellow': ['\x1B[33m', '\x1B[39m'],
    'whiteBG': ['\x1B[47m', '\x1B[49m'],
    'greyBG': ['\x1B[49;5;8m', '\x1B[49m'],
    'blackBG': ['\x1B[40m', '\x1B[49m'],
    'blueBG': ['\x1B[44m', '\x1B[49m'],
    'cyanBG': ['\x1B[46m', '\x1B[49m'],
    'greenBG': ['\x1B[42m', '\x1B[49m'],
    'magentaBG': ['\x1B[45m', '\x1B[49m'],
    'redBG': ['\x1B[41m', '\x1B[49m'],
    'yellowBG': ['\x1B[43m', '\x1B[49m']
};

function Log(msg, color) {
    console.log('%s%s\x1B[0m', color[0], msg);  //cyan
}

Log('============================================================================================================', colors.cyan);
Log('ziyou install starting...', colors.green);
Log('ziyou is a Chinese word meaning "freedom",her is to make the management of react components easier.', colors.white);
Log(`The current directory is "${path.resolve(__dirname, '..')}"`, colors.white);

async function prepend(file, string) {
    let data = await readFile(file, 'utf8');
    data = data.replace(/..\/..\/app\/node_modules\//g, "../../")
    await writeFile(file, data, 'utf8');
}

async function HandleFiles() {
    await Promise.all(
        [
            '../dist/ziyou.js',
            '../dist/ziyou.min.js',
        ].map(file => { prepend(path.resolve(__dirname, file), "install"), Log(`> ${file}`, colors.magenta) }),
    );
}

async function run() {
    await HandleFiles();
    await new Promise(function (resolve, reject) {
        Log("ziyou is installed complete.", colors.green);
        Log('============================================================================================================', colors.cyan);
    });
}

run();