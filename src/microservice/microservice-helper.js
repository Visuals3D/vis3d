import fs from 'fs';
import path from 'path';
import { replaceStringInFile } from '../helpers';

const INSOMNIA_KEYS_LENGTH = 32;
const insomniaKeysMap = {
    wrk_: '',
    spc_: '',
    env_: '',
    ut_: '',
    uts_: ''
};
const replaceableVarsFilesList = ['package.json', 'insomnia.yaml', 'preset.env', 'docker-compose.yml', 'README.md'];

function generateUuid(len) {
    let uuid = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < len; i++) {
        uuid += chars[Math.floor(Math.random() * chars.length)];
    }
    return uuid;
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file))
        }
    })

    return arrayOfFiles
}

async function generateInsomniaKey() {
    for (const [key, value] of Object.entries(insomniaKeysMap)) {
        insomniaKeysMap[key] = generateUuid(INSOMNIA_KEYS_LENGTH);
    }
}

async function renameInsomniaFiles(targetPath) {
    const filesList = getAllFiles(path.join(targetPath, '.insomnia'));
    for (let file of filesList) {
        let newFile = file;
        for (const [key, value] of Object.entries(insomniaKeysMap)) {
            if (file.includes('${' + key + '}')) {
                let reg = new RegExp('\\${' + key + '}', "g");
                newFile = file.replace(reg, value);
            }
        }
        try {
            await fs.promises.rename(file, newFile);
        } catch (error) {
            console.error(error);
        }
    }
}

async function renameKubernetesFiles(targetPath, serviceName) {
    const filesList = getAllFiles(path.join(targetPath, 'kube'));
    for (let file of filesList) {
        let newFile = file;
        let reg = new RegExp('\\${MICROSERVICE_NAME}', "g");
        newFile = file.replace(reg, serviceName);
        try {
            await fs.promises.rename(file, newFile);
        } catch (error) {
            console.error(error);
        }
    }
}

async function adjustKubernetsFilesWithKeys(targetPath, serviceName) {
    const filesList = getAllFiles(path.join(targetPath, 'kube'));
    for (let file of filesList) {
        await replaceStringInFile(file, 'MICROSERVICE_NAME', serviceName);
        for (const [key, value] of Object.entries(insomniaKeysMap)) {
            await replaceStringInFile(file, key, value);
        }
    }
    await renameKubernetesFiles(targetPath, serviceName);
}

async function adjustInsomiaFilesWithKeys(targetPath, serviceName) {
    const filesList = getAllFiles(path.join(targetPath, '.insomnia'));
    for (let file of filesList) {
        await replaceStringInFile(file, 'MICROSERVICE_NAME', serviceName);
        for (const [key, value] of Object.entries(insomniaKeysMap)) {
            await replaceStringInFile(file, key, value);
        }
    }
    await renameInsomniaFiles(targetPath);
}

export async function initMicroservice(targetPath) {

    const serviceName = path.basename(targetPath);
    for (let file of replaceableVarsFilesList) {
        await replaceStringInFile(path.join(targetPath, file), 'MICROSERVICE_NAME', serviceName);
    }
    await generateInsomniaKey();
    await adjustInsomiaFilesWithKeys(targetPath, serviceName);
    await adjustKubernetsFilesWithKeys(targetPath, serviceName);
}
