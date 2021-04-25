import fs from 'fs';
import path from 'path';
import { replaceStringInFile } from '../helpers';

const replaceableVarsFilesList = ['package.json', 'insomnia.yaml', 'preset.env', 'docker-compose.yml', 'README.md', '.insomnia/ApiSpec/spc_5504ff4ccd1c4ef491f21b0e87c78ed6.yml', '.insomnia/Workspace/wrk_26fa530600ea45e298aacb902b4a8253.yml'];

export async function initMicroservice(targetPath) {
    const serviceName = path.basename(targetPath);
    for (let file of replaceableVarsFilesList) {
        await replaceStringInFile(path.join(targetPath, file), 'MICROSERVICE_NAME', serviceName);
    }
}
