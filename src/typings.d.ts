// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

/// <reference path="../typings/index.d.ts" />
declare var module: { id: string };

/**
 * Add the browser API to the Navigator object and make TypeScript happy ^^
 */
interface ExtendedNavigator extends Navigator {
  bluetooth: any;
}

interface ExtendedWindow extends Window {
  TextDecoder: any;
}
