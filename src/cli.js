import arg from 'arg';
import inquirer from 'inquirer';
import { exit } from 'process';
import { generate } from './main';


const validTemplates = ['microservice'];

function parseArgumentsIntoOptions(rawArgs) {
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
    return {
        skipPrompts: args['--yes'] || false,
        git: args['--git'] || false,
        action: args._[0],
        templateType: args._[1],
        targetPath: args._[2],
        runInstall: args['--install'] || false,
    };
}

/*
async function parseArgumentsIntoOptions(rawArgs) {
  const args = rawArgs.slice(2);
  const options = {
      templateType: null,
      targetPath: null,
  }

  if (args[0] === 'generate' || args[0] === '-g') {
      if (args.length > 1) {
          options.templateType = args[1];
      }
      if (args.length > 2) {
          options.targetPath = args[2];
      }
  } else {
      const questions = [];
      questions.push({
          type: 'list',
          name: 'action',
          message: 'What do you want to do?',
          choices: ['generate', 'exit'],
          default: 'exit',
        });
      const answers = await inquirer.prompt(questions);
      if (answers.action === 'exit') {
          exit();
      } else if (answers.action === 'generate') {
          return options;
      }
  }
  return options;
}
*/

async function promptForMissingOptions(options) {
    const questions = [];

    if (!options.action) {
        const answers = await inquirer.prompt([{
            type: 'list',
            name: 'action',
            message: 'Please choose an action',
            choices: ['generate', 'exit'] //'internal-service', 'route'
        }]);
        if (answers.action === 'exit') {
            process.exit(0);
        } else {
            options.action = answers.action;
        }
    }
    if (!options.templateType || validTemplates.indexOf(options.templateType) === -1) {
        questions.push({
            type: 'list',
            name: 'templateType',
            message: 'Please choose what you want to generate',
            choices: ['microservice', //'internal-service', 'route'
            ]
        });
    }

    if (!options.targetPath) {
        questions.push({
            type: 'input',
            name: 'targetPath',
            message: 'Please enter a valid path'
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

    if (!options.install) {
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
    options.templateType = !options.templateType ? answers.templateType : options.templateType;
    options.targetPath = !options.targetPath ? answers.targetPath : options.targetPath;
    options.git = options.git || answers.git;
    options.install = options.install || answers.install;
    return options;
}

export async function cli(args) {
    let options = await parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    console.log(options);
    await generate(options);
}