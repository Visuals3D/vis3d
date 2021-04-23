const yaml = require('js-yaml');
const { exec } = require('child_process');
const fs   = require('fs');

// Get document, or throw exception on error

fs.readFile('./insomnia.yaml', 'utf8', (err, data) => {
    if (err) {
        console.error(err);  
    } else {
        try {
            const insomnia = yaml.load(data);
            let openapiStr = '';
            for (let resource of insomnia.resources) {
                if ('contentType' in resource && resource.contentType === 'yaml') {
                    openapiStr = resource.contents;
                }
            }
            fs.writeFile('./swagger.yaml', openapiStr, (err) => {
                if (err) console.error(err);
                exec('npx openapi-typescript ./swagger.yaml --output ./models/generated/api/api.schema.ts',
                (error, stdout, stderr) => {
                    console.log(stdout);
                    console.log(stderr);
                    if (error !== null) {
                        console.log(`exec error: ${error}`);
                    }
                    fs.unlink('./swagger.yaml', (err) => {
                        if (err) console.error(err);
                    }); 
                });
            });
        } catch (err) {
            console.error(err);
        }
    }
});
