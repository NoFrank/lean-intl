function assert(mustBeTrue, message) {
  if (mustBeTrue === true) {
    return;
  }

  if (message === undefined) {
    message = 'Expected true but got ' + String(mustBeTrue);
  }
  throw new Error(message);
}

assert._isSameValue = function (a, b) {
  if (a === b) {
    // Handle +/-0 vs. -/+0
    return a !== 0 || 1 / a === 1 / b;
  }

  // Handle NaN vs. NaN
  return a !== a && b !== b;
};

assert.sameValue = function (actual, expected, message) {
  if (assert._isSameValue(actual, expected)) {
    return;
  }

  if (message === undefined) {
    message = '';
  } else {
    message += ' ';
  }

  message += 'Expected SameValue(«' + String(actual) + '», «' + String(expected) + '») to be true';

  throw new Error(message);
};

assert.notSameValue = function (actual, unexpected, message) {
  if (!assert._isSameValue(actual, unexpected)) {
    return;
  }

  if (message === undefined) {
    message = '';
  } else {
    message += ' ';
  }

  message += 'Expected SameValue(«' + String(actual) + '», «' + String(unexpected) + '») to be false';

  throw new Error(message);
};

assert.throws = function (expectedErrorConstructor, func, message) {
  if (typeof func !== "function") {
    throw new Error('assert.throws requires two arguments: the error constructor ' +
      'and a function to run');
    return;
  }
  if (message === undefined) {
    message = '';
  } else {
    message += ' ';
  }

  try {
    func();
  } catch (thrown) {
    if (typeof thrown !== 'object' || thrown === null) {
      message += 'Thrown value was not an object!';
      throw new Error(message);
    } else if (thrown.constructor !== expectedErrorConstructor) {
      message += 'Expected a ' + expectedErrorConstructor.name + ' but got a ' + thrown.constructor.name;
      throw new Error(message);
    }
    return;
  }

  message += 'Expected a ' + expectedErrorConstructor.name + ' to be thrown but no exception was thrown at all';
  throw new Error(message);
};

assert.throws.early = function(err, code) {
  let wrappedCode = `function wrapperFn() { ${code} }`;
  let ieval = eval;

  assert.throws(err, () => { Function(wrappedCode); }, `Function: ${code}`);
};

"use strict";var __globalObject = Function("return this;")();function fnGlobalObject() {    return __globalObject;}function Test262Error(message) {  this.message = message || "";}IntlPolyfill.__applyLocaleSensitivePrototypes();function runner() {    var passed = false;    runTheTest();    passed = true;    return passed;}function runTheTest () {// Copyright 2016 Mozilla Corporation. All rights reserved.
// This code is governed by the license found in the LICENSE file.

/*---
esid: sec-intl.getcanonicallocales
description: Test IntlPolyfill.getCanonicalLocales.name for step 7.b. 
info: |
  9.2.1 CanonicalizeLocaleList (locales)
    7. Repeat, while k < len.
      b. Let kPresent be HasProperty(O, Pk).
features: [Proxy]
---*/

var locales = {
  '0': 'en-US',
  '1': 'pt-BR',
  length: 2
};

var p = new Proxy(locales, {
  has: function(_, prop) {
    if (prop === '0') {
      throw new Test262Error();
    }
  }
});

assert.throws(Test262Error, function() {
  IntlPolyfill.getCanonicalLocales(p);
});
 }