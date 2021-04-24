const { exec } = require('child_process');
const fs   = require('fs');
const {readOpenApiFile} = require('./openapiFile.helper');

// Get document, or throw exception on error

readOpenApiFile((openapiStr) => {
    try {
        fs.writeFile('./swagger.yaml', openapiStr, (err) => {
            if (err){
                console.error(err);
                process.exit(1);
            }
            exec('redoc-cli bundle -o api-docs.html swagger.yaml',
            (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
                fs.unlink('./swagger.yaml', (err) => {
                    if (err){
                        console.error(err);
                        process.exit(1);
                    }
                }); 
            });
        });
    } catch (err) {
        if (err){
            console.error(err);
            process.exit(1);
        }
    }
});
