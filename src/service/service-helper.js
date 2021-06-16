import fs from 'fs';
import path from 'path';
import { trimToCamelCase, capitalizeFirstChar, replaceStringInFile, camleCaseToSnakeCase } from '../helpers';


export async function initService(targetPath) {
    const originalServiceName = path.basename(targetPath);
    const snakeCaseServiceName = camleCaseToSnakeCase(originalServiceName);
    const camleCaseServiceName = capitalizeFirstChar(trimToCamelCase(originalServiceName));
    const newServiceFilePath = path.join(targetPath, snakeCaseServiceName +'.service.ts');

    await new Promise((resolve, reject) => {
        fs.rename(path.join(targetPath, 'template.service.ts'), newServiceFilePath, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
    await new Promise((resolve, reject) => {
        fs.rename(path.join(targetPath, 'template.errors.ts'), path.join(targetPath, snakeCaseServiceName +'.errors.ts'), (err) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
    await replaceStringInFile(newServiceFilePath, 'SERVICE_NAME', camleCaseServiceName);
}