const fs = require('fs');
const yaml = require('js-yaml');

exports.readOpenApiFile = function (callback) {
    fs.access('./.insomnia/ApiSpec', fs.constants.R_OK, async (err) => {
        if (err) { // if .insomnia folder does not exist
            fs.readFile('./insomnia.yaml', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                } else {
                    const insomnia = yaml.load(data);
                    for (let resource of insomnia.resources) {
                        if ('contentType' in resource && resource.contentType === 'yaml') {
                            callback(resource.contents);
                        }
                    }
                }
            });
        } else {
            fs.access('./.insomnia/ApiSpec', fs.constants.R_OK, async (err) => {
                if (err) {
                    console.error(err);
                    process.exit(1);
                } else {
                    fs.readdir('./.insomnia/ApiSpec', (err, files) => {
                        if (err) {
                            console.error(err);
                            process.exit(1);
                        }
                        console.log(files);
                        fs.readFile('./.insomnia/ApiSpec/' + files[0], 'utf8', (err, data) => {
                            if (err) {
                                console.error(err);
                                process.exit(1);
                            } else {
                                const insomnia = yaml.load(data);
                                if ('contents' in insomnia) {
                                    callback(insomnia.contents);
                                } else {
                                    console.error('contents missing in insomnia ApiSpec');
                                }
                            }
                        });
                    });
                }
            });
        }
    });
}

