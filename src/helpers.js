import fs from 'fs';
import path from 'path';

export async function replaceStringInFile(filePath, replacePreset, newString) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', function (err,data) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                var reg = new RegExp('\\${' + replacePreset +'}',"g");
                var result = data.replace(reg, newString);
                
                fs.writeFile(filePath, result, 'utf8', function (err) {
                    if  (err) {
                        console.error(err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });
    });
}

export function getTemplatesDirPath() {
    const templateDir = path.join(__dirname,'../templates');
    return templateDir;
}

export function trimToCamelCase(str) {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

export function capitalizeFirstChar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function camleCaseToSnakeCase(str) {
    return str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}