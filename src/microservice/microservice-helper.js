import fs from 'fs';
import path from 'path';
import { replaceStringInFile } from '../helpers';



export async function initMicroservice(targetPath) {
    const serviceName = path.basename(targetPath);;
    await replaceStringInFile(path.join(targetPath, 'package.json'), 'MICROSERVICE_NAME', serviceName);
    await replaceStringInFile(path.join(targetPath, 'swagger.yaml'), 'MICROSERVICE_NAME', serviceName);
    await replaceStringInFile(path.join(targetPath, 'preset.env'), 'MICROSERVICE_NAME', serviceName);
}