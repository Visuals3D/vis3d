import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs';
import Listr from 'listr';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import { initService } from './service-helper';
import { camleCaseToSnakeCase, getTemplatesDirPath } from '../helpers';


var copy = promisify(ncp);

export class ServiceCli {

    static async copyTemplateFiles(templatePath, targetPath) {
        return copy(templatePath, targetPath, {
            clobber: false,
        });
    }

    static async initTemplate(targetPath) {
        return await initService(targetPath);
    }

    static async generate(options) {

        const templateDir = path.join(options.packageDir, options.templateType);
        const splitPath = options.targetPath.split(path.sep);
        const serviceFolderPath = path.join(splitPath.slice(0, -1).join(path.sep), '/src/services/');
        const servicePath = path.join(serviceFolderPath, camleCaseToSnakeCase(splitPath.slice(-1)[0])); // Generates a new Path which adds a service folder into the path

        fs.access(templateDir, fs.constants.R_OK, async (err) => {
            if (err) {
                console.error(err);
                console.error('%s Cant generate a ' + options.templateType, chalk.red.bold('ERROR'));
                process.exit(1);
            } else {
                await fs.access(serviceFolderPath, fs.constants.R_OK, async (err) => {
                    if (err) {
                        await fs.mkdir(serviceFolderPath, (err) => {
                            if (err) {
                                console.error(err);
                                console.error("%s Can't find or generate a service folder for " + options.templateType, chalk.red.bold('ERROR'));
                                process.exit(1);
                            }
                        });
                    } 
                    const tasks = new Listr(
                        [
                            {
                                title: 'Create ' + options.templateType,
                                task: () => this.copyTemplateFiles(templateDir, servicePath)

                            },
                            {
                                title: 'Initialize template',
                                task: () => this.initTemplate(servicePath)
                            }
                        ],
                        {
                            exitOnError: true,
                        }
                    );
                    let error = null;
                    await tasks.run().catch((err) => {
                        error = err;
                    });
                    if (error != null) {
                        console.error(error);
                        console.log('%s ' + options.templateType + ' failed to build', chalk.red.bold('FAILED'));
                    } else {
                        console.log('%s ' + options.templateType + ' ready', chalk.green.bold('DONE'));
                    }
                
                    return error === null;
                });
            }
        });
    }


    static parseArgumentsIntoOptions(rawArgs, options) {

        const args = arg({}, { argv: rawArgs.slice(2) });
        options['targetPath'] = args._[2];
        options['packageDir'] = getTemplatesDirPath();
        return options;
    }


    static async promptForMissingOptions(options) {
        const questions = [];

        if (!options.targetPath) {
            questions.push({
                type: 'input',
                name: 'targetPath',
                message: 'Please enter a valid name for your service'
            });
        }

        const answers = await inquirer.prompt(questions);

        options['targetPath'] = !options.targetPath ? path.join(process.cwd(), answers.targetPath) : path.join(process.cwd(), options.targetPath);

        return options;
    }

    static async cliRun(args, options) {
        await this.parseArgumentsIntoOptions(args, options);
        await this.promptForMissingOptions(options);
        await this.generate(options);
    }

}