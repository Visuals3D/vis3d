import inquirer from 'inquirer';
import { generate } from './generate';

const valideActions = ['generate', 'exit']

async function promptForMissingAction(args, options) {
    if (args.length < 2 || valideActions.indexOf(args[2]) === -1) {
        const answers = await inquirer.prompt([{
            type: 'list',
            name: 'action',
            message: 'Please choose an action',
            choices: valideActions //'internal-service', 'route'
        }]);
        if (answers.action === 'exit') {
            process.exit(0);
        } else {
            args.push(answers.action);
            options.action = answers.action;
        }
    } else {
        options['action'] = args[2];
    }

    return options;
}

export async function cli(args) {
    var options = await promptForMissingAction(args, {});
    if (options.action === 'generate') {
        await generate(args, options);
    } else {
        process.exit(0); 
    }
}