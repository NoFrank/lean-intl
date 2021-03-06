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

"use strict";var __globalObject = Function("return this;")();function fnGlobalObject() {    return __globalObject;}function Test262Error(message) {  this.message = message || "";}IntlPolyfill.__applyLocaleSensitivePrototypes();function runner() {    var passed = false;    runTheTest();    passed = true;    return passed;}function runTheTest () {// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es5id: 11.1.1_17
description: Tests that the option currency is processed correctly.
author: Norbert Lindenberg
---*/

var validValues = ["CNY", "USD", "EUR", "IDR", "jpy", {toString: function () {return "INR";}}];
var invalidValues = ["$", "SFr.", "US$", "ßP", {toString: function () {return;}}];

var defaultLocale = new IntlPolyfill.NumberFormat().resolvedOptions().locale;

validValues.forEach(function (value) {
    var format, actual, expected;

    // with currency style, we should get the upper case form back
    format = new IntlPolyfill.NumberFormat([defaultLocale], {style: "currency", currency: value});
    actual = format.resolvedOptions().currency;
    expected = value.toString().toUpperCase();
    assert.sameValue(actual, expected, "Incorrect resolved currency with currency style.");
    
    // without currency style, we shouldn't get any currency back
    format = new IntlPolyfill.NumberFormat([defaultLocale], {currency: value});
    actual = format.resolvedOptions().currency;
    expected = undefined;
    assert.sameValue(actual, expected, "Incorrect resolved currency with non-currency style.");
    
    // currencies specified through the locale must be ignored
    format = new IntlPolyfill.NumberFormat([defaultLocale + "-u-cu-krw"], {style: "currency", currency: value});
    actual = format.resolvedOptions().currency;
    expected = value.toString().toUpperCase();
    assert.sameValue(actual, expected, "Incorrect resolved currency with -u-cu- and currency style.");
    
    format = new IntlPolyfill.NumberFormat([defaultLocale + "-u-cu-krw"], {currency: value});
    actual = format.resolvedOptions().currency;
    expected = undefined;
    assert.sameValue(actual, expected, "Incorrect resolved currency with -u-cu- and non-currency style.");
});

invalidValues.forEach(function (value) {
    assert.throws(RangeError, function () {
            return new IntlPolyfill.NumberFormat([defaultLocale], {style: "currency", currency: value});
    }, "Invalid currency value " + value + " was not rejected.");
    assert.throws(RangeError, function () {
            return new IntlPolyfill.NumberFormat([defaultLocale], {currency: value});
    }, "Invalid currency value " + value + " was not rejected.");
    assert.throws(RangeError, function () {
            return new IntlPolyfill.NumberFormat([defaultLocale + "-u-cu-krw"], {style: "currency", currency: value});
    }, "Invalid currency value " + value + " was not rejected.");
    assert.throws(RangeError, function () {
            return new IntlPolyfill.NumberFormat([defaultLocale + "-u-cu-krw"], {currency: value});
    }, "Invalid currency value " + value + " was not rejected.");
});
 }