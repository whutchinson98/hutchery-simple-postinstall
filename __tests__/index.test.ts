import {getArgumentPair, parseAndFormatArguments} from '../src/postinstaller';
import {ValidArgument} from '../src/constants';

describe('getArgumentPair', () => {
  const validArgumentString: ValidArgument = {
    parameter: 'valid',
    default: 'valid',
    type: 'String',
  };

  const validArgumentFlag: ValidArgument = {
    parameter: 'valid',
    default: true,
    type: 'Flag',
  };

  const invalidArgument: ValidArgument = {
    parameter: 'invalid',
    default: 'invalid',
    type: 'String',
  };
  test('Handles Flag', () => {
    expect(
      getArgumentPair(['--a', 'a', '--valid', '--c', 'c'], validArgumentFlag),
    ).toEqual(true);
  });

  test('Handles String', () => {
    expect(
      getArgumentPair(['--a', 'a', '--b', '--valid', 'c'], validArgumentString),
    ).toEqual('c');
  });

  test('Returns undefined when argument not found', () => {
    expect(
      getArgumentPair(['--a', 'a', '--b', '--c', 'c'], invalidArgument),
    ).toEqual(undefined);
  });
});

describe('retrieveAndFormatArguments', () => {
  test('Handles Flag', () => {
    const result = parseAndFormatArguments(['--useInstall']);
    expect(result).toEqual({useInstall: true});
  });
  test('Handles String', () => {
    const result = parseAndFormatArguments(['--useInstall']);
    expect(result).toEqual({useInstall: true});
  });
  test('Handles String without parameters', () => {
    expect(() => parseAndFormatArguments(['--subModuleList'])).toThrow(
      'subModuleList must be accompanied by parameter',
    );
  });
});
