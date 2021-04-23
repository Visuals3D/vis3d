import fs from 'fs';
import path from 'path';
import { replaceStringInFile } from '../helpers';

const replaceableVarsFilesList = ['package.json', 'insomnia.yaml', 'preset.env', 'docker-compose.yml', 'README.md'];

export async function initMicroservice(targetPath) {
    const serviceName = path.basename(targetPath);
    for (let file of replaceableVarsFilesList) {
        await replaceStringInFile(path.join(targetPath, file), 'MICROSERVICE_NAME', serviceName);
    }
}