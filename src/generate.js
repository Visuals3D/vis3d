import inquirer from 'inquirer';
import { MicroserviceCli } from './microservice/microservice-cli';

const validTemplateTypes = ['microservice', 'service'];

async function promptForMissingTemplateType(args, options) {
  if ('templateType' in options || args.length < 3 || validTemplateTypes.indexOf(args[3]) === -1) {
      const answers = await inquirer.prompt([{
          type: 'list',
          name: 'templateType',
          message: 'Please choose the type of what you want to generate',
          choices: validTemplateTypes //'internal-service', 'route'
      }]);
      options['templateType'] = answers.templateType
      args.push(answers.templateType);
  }
  return options;
}


export async function generate(args, options) {
  await promptForMissingTemplateType(args, options);
  if (options.templateType === 'microservice') {
    MicroserviceCli.cliRun(args, options);
  } else if (options.templateType === 'service') {

  }
}