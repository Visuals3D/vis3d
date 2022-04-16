import path from 'path';
import { replaceStringInFile } from '../helpers';

const replaceableVarsFilesList = ['package.json', 'docker-compose.yml', 'nginx.conf', 'docker-compose.dev.yml', 'README.md'];

export async function initWebpage(targetPath) {

    const serviceName = path.basename(targetPath);
    for (let file of replaceableVarsFilesList) {
        await replaceStringInFile(path.join(targetPath, file), 'WEBPAGE_NAME', serviceName);
    }
}
