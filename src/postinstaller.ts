import {exec} from 'child_process';
import {ValidArgument, validArguments, ArgumentMap} from './constants';

/**
 * @description checks whether a given argument name is contained in the args
 * sent
 * @param {string[]} args - the arguments provided
 * @param {ValidArgument} arg - the argument you are looking for
 * @return {string|boolean|undefined} if the argument is found and is of type
 * String then the value assigned to the argument is returned, if it is a Flag
 * then true is returned. If it is not found undefined is returned
 */
export const getArgumentPair = (
  args: string[],
  arg: ValidArgument,
): string | boolean | undefined => {
  const index: number = args.indexOf(`--${arg.parameter}`);

  if (index >= 0) {
    if (arg.type === 'String') {
      if (index + 1 >= args.length) {
        throw new Error(`${arg.parameter} must be accompanied by parameters`);
      }

      return args[index + 1];
    } else {
      return true;
    }
  }

  return;
};

/**
 * @description takes the parsed arguments and goes through valid arguments
 * to construct the arguments map
 * @param {string[]} args - the command line arguments
 * @return {ArgumentMap} map of the build parameters and their values
 * or boolean to indicate the Flag was set
 */
export const parseAndFormatArguments = (args: string[]): ArgumentMap => {
  // Checks for each possible build arg and if found will store it
  const result: ArgumentMap = {};

  for (const validArgument of validArguments.values()) {
    const argumentResult = getArgumentPair(args, validArgument);
    if (argumentResult) {
      result[validArgument.parameter] = argumentResult;
    }
  }
  return result;
};

/**
 * @description runs the post install process for all of the subModules listed
 * in subModuleList
 * @param {ArgumentMap} argumentMap - the argumentMap used to install dependencies
 */
export const runPostInstall = (argumentMap: ArgumentMap): void => {
  const subPaths: string[] = (argumentMap['subModuleList'] as string).split(
    ',',
  );

  const subModulePath: string = argumentMap['subModulePath']
    ? (argumentMap['subModulePath'] as string)
    : (validArguments.get('subModulePath')?.default as string);

  const installCommand: string = argumentMap['useInstall'] ? 'install' : 'ci';

  const currentDirectory = process.cwd();

  for (const subPath of subPaths) {
    console.log(`Installing dependencies for ${subPath}`);
    exec(
      `cd ${currentDirectory}/${subModulePath}/${subPath} && npm ${installCommand} && cd ${currentDirectory}`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(`${subPath}_error: ${error.message}`);
        }
        if (stderr) {
          console.log(`${subPath}_stderr: ${stderr}`);
        }

        console.log(`${subPath}_stdout: ${stdout}`);
      },
    );
  }
  return;
};

/**
 * @description Takes the arguments from the command line to create argument
 * map and run the subModule installs
 */
export const runInstallJob = (): void => {
  console.log(process.argv);
  const argumentMap: ArgumentMap = parseAndFormatArguments(
    process.argv.slice(2),
  );
  console.log(argumentMap);
  if (!argumentMap['subModuleList']) {
    throw new Error('subModuleList is a required parameter to be set');
  }

  runPostInstall(argumentMap);
};
