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
import { initWebpage } from './webpage-helper';
import { getTemplatesDirPath } from '../helpers';

var copy = promisify(ncp);
var writeGitignore = promisify(gitignore.writeFile);

export class WebpageCli {

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
        if (templateType === 'webpage') {
            return await initWebpage(targetPath)
        }
    }


    static async generate(options) {
        console.log(options.packageDir);
        const templateDir = path.join(options.packageDir, options.templateType);
        console.log(templateDir);
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
  
        options['git'] = args['--git'] || false;
        options['runInstall'] = args['--install'] || false;
        options['targetPath'] = args._[2];
        options['skipPrompts'] = args['--yes'] || false;
        options['packageDir'] = getTemplatesDirPath();
 
        return options;
    }


    static async promptForMissingOptions(options) {
        const questions = [];

        if (!options.targetPath) {
            questions.push({
                type: 'input',
                name: 'targetPath',
                message: 'Please enter a valid name for your webpage'
            });
        }

        if (!options.git) {
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

        if (!options.runInstall) {
            if (options.skipPrompts) {
                options.runInstall = false;
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
       
        options['targetPath'] = !options.targetPath ? path.join(process.cwd(), answers.targetPath) : path.join(process.cwd(), options.targetPath);
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