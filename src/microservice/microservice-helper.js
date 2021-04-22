import fs from 'fs';
import path from 'path';

async function replaceServiceName(filePath, microserviceName) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', function (err,data) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
            var result = data.replace(/\${MICROSERVICE_NAME}/g, microserviceName);
            
            fs.writeFile(filePath, result, 'utf8', function (err) {
                if  (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
            }
        });
    });
}

export async function initMicroservice(targetPath) {
    const serviceName = targetPath.split('/')[targetPath.split('/').length -1];
    await replaceServiceName(path.join(targetPath, 'package.json'), serviceName);
    await replaceServiceName(path.join(targetPath, 'swagger.yaml'), serviceName);
    await replaceServiceName(path.join(targetPath, 'preset.env'), serviceName);
}