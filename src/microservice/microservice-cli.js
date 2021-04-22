import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs';
import gitignore from 'gitignore';
import Listr from 'listr';
import ncp from 'ncp';
import path from 'path';
import { projectInstall } from 'pkg-install';
import { promisify } from 'util';
import { initMicroservice } from './microservice-helper';

var copy = promisify(ncp);
var writeGitignore = promisify(gitignore.writeFile);

export class MicroserviceCli {

    static async copyTemplateFiles(templatePath, targetPath) {
        return copy(templatePath, targetPath, {
            clobber: false,
        });
    }

    static async createGitignore(targetPath) {
        const file = fs.createWriteStream(
            path.join(targetPath, '.gitignore'),
            { flags: 'a' }
        );
        return writeGitignore({
            type: 'Node',
            file: file,
        });
    }

    static async initGit(targetPath) {
        const result = await execa('git', ['init'], {
            cwd: targetPath,
        });
        if (result.failed) {
            return Promise.reject(new Error('Failed to initialize git'));
        }
        return;
    }

    static async initTemplate(templateType, targetPath) {
        if (templateType === 'microservice') {
            return await initMicroservice(targetPath)
        }
    }


    static async generate(options) {

        const templateDir = path.join(options.packageDir, 'templates', options.templateType);

        fs.access(templateDir, fs.constants.R_OK, async (err) => {
            if (err) {
                console.error(err);
                console.error('%s Cant generate a ' + options.templateType, chalk.red.bold('ERROR'));
                process.exit(1);
            } else {
                const tasks = new Listr(
                    [
                        {
                            title: 'Create ' + options.templateType,
                            task: () => this.copyTemplateFiles(templateDir, options.targetPath)
                        },
                        {
                            title: 'Initialize template',
                            task: () => this.initTemplate(options.templateType, options.targetPath)
                        },
                        {
                            title: 'Create gitignore',
                            task: () => this.createGitignore(options.targetPath)
                        },
                        {
                            title: 'Initialize git',
                            task: () => this.initGit(options.targetPath),
                            skip: () => !options.git,
                        },
                        {
                            title: 'Install dependencies',
                            task: () =>
                                projectInstall({
                                    cwd: options.targetPath,
                                }),
                            skip: () =>
                                !options.runInstall
                                    ? 'Pass --install to automatically install dependencies'
                                    : undefined,
                        },
                    ],
                    {
                        exitOnError: false,
                    }
                );

                await tasks.run();
                console.log('%s ' + options.templateType + ' ready', chalk.green.bold('DONE'));
                return true;
            }
        });
    }


    static parseArgumentsIntoOptions(rawArgs, options) {
        const args = arg(
            {
                '--git': Boolean,
                '--yes': Boolean,
                '--install': Boolean,
                '-g': '--git',
                '-y': '--yes',
                '-i': '--install',
            },
            {
                argv: rawArgs.slice(2),
            }
        );

        console.log(args);

        options['git'] = args['--git'] || false;
        options['runInstall'] = args['--install'] || false;
        options['targetPath'] = args._[2];
        options['packageDir'] = path.join(rawArgs[1], '../../');
        options['skipPrompts'] = args['--yes'] || false;
 
        return options;
    }


    static async promptForMissingOptions(options) {
        const questions = [];

        if (!options.targetPath) {
            questions.push({
                type: 'input',
                name: 'targetPath',
                message: 'Please enter a valid name for your microservice'
            });
        }

        if (!('git' in options)) {
            if (options.skipPrompts) {
                options.git = false;
            } else {
                questions.push({
                    type: 'confirm',
                    name: 'git',
                    message: 'Should a git be initialized?',
                    default: false,
                });
            }
        }

        if (!('runInstall' in options)) {
            if (options.skipPrompts) {
                options.install = false;
            } else {
                questions.push({
                    type: 'confirm',
                    name: 'install',
                    message: 'Should the npm packages be preinstalled?',
                    default: false,
                });
            }
        }

        const answers = await inquirer.prompt(questions);
       
        options['targetPath'] = !options.targetPath ? answers.targetPath : options.targetPath;
        options['git'] = options.git || answers.git;
        options['runInstall'] = options.runInstall || answers.install;

        return options;
    }

    static async cliRun(args, options) {
        await this.parseArgumentsIntoOptions(args, options);
        await this.promptForMissingOptions(options);
        await this.generate(options);
    }

}