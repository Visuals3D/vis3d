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

const access = promisify(fs.access);
const copy = promisify(ncp);
const writeGitignore = promisify(gitignore.writeFile);

async function copyTemplateFiles(templatePath, targetPath) {
    return copy(templatePath, targetPath, {
        clobber: false,
    });
  }

  async function createGitignore(targetPath) {
    const file = fs.createWriteStream(
      path.join(targetPath, '.gitignore'),
      { flags: 'a' }
    );
    return writeGitignore({
      type: 'Node',
      file: file,
    });
  }
  
  async function initGit(targetPath) {
    const result = await execa('git', ['init'], {
      cwd: targetPath,
    });
    if (result.failed) {
      return Promise.reject(new Error('Failed to initialize git'));
    }
    return;
  }

  async function initTemplate(templateType, targetPath) {
    if (templateType === 'microservice') {
        return await initMicroservice(targetPath)
    }
  }


  export async function generate(options) {
    
    const fullPathName = __dirname;
    console.log('fullPathName', fullPathName)
    const templateDir = path.resolve(
      fullPathName.substr(fullPathName.indexOf('/')),
      '../templates',
      options.templateType.toLowerCase()
    );
        console.log(templateDir)
    try {
      await access(templateDir, fs.constants.R_OK);
    } catch (err) {
        console.error(err);
      console.error('%s Cant generate a ' + options.templateType, chalk.red.bold('ERROR'));
      process.exit(1);
    }
  
    const tasks = new Listr(
      [
        {
          title: 'Create ' + options.templateType,
          task: () => copyTemplateFiles(templateDir, options.targetPath)
        },
        {
            title: 'Initialize template',
            task: () => initTemplate(options.templateType, options.targetPath)
        },
        {
          title: 'Create gitignore',
          task: () => createGitignore(options.targetPath)
        },
        {
          title: 'Initialize git',
          task: () => initGit(options.targetPath),
          enabled: () => options.git,
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