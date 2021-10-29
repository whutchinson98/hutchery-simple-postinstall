export type ValidArgument = {
  parameter: string;
  type: 'String' | 'Flag';
  default: string | boolean;
};

export type ArgumentMap = {[name: string]: string | boolean};

export const validArguments: Map<string, ValidArgument> = new Map([
  [
    'subModulePath',
    {
      parameter: 'subModulePath',
      type: 'String',
      default: 'src',
    },
  ],
  [
    'useInstall',
    {
      parameter: 'useInstall',
      type: 'Flag',
      default: false,
    },
  ],
  [
    'subModuleList',
    {
      parameter: 'subModuleList',
      type: 'String',
      default: '',
    },
  ],
]);
