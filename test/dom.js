/**
 * Require this to have a fake dom
 * mocha -r test/dom test/spec/*
 */

if (typeof window === 'undefined') {
    console.log('booting jsdom');
    jsdom = require('jsdom').jsdom;
    document = jsdom('<html><head><script></script></head><body></body></html>');
    window = document.createWindow();
}
