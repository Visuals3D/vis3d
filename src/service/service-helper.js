import fs from 'fs';
import path from 'path';
import { trimToCamelCase, capitalizeFirstChar, replaceStringInFile, camleCaseToSnakeCase } from '../helpers';


export async function initService(targetPath) {
    process.cwd()
    const originalServiceName = path.basename(targetPath);
    const snakeCaseServiceName = camleCaseToSnakeCase(originalServiceName);
    const camleCaseServiceName = capitalizeFirstChar(trimToCamelCase(originalServiceName));
    const newServiceFilePath = path.join(targetPath, snakeCaseServiceName +'.service.ts');

    await fs.rename(path.join(targetPath, '/template.service.ts'), newServiceFilePath, (err) => {
        if (err) {
            console.error(err);
        }
    });
    await replaceStringInFile(newServiceFilePath, 'SERVICE_NAME', camleCaseServiceName);
}