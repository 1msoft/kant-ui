import jsdom from 'jsdom';
const { JSDOM } = jsdom;

if (typeof document === 'undefined') {
    const dom=new JSDOM('<!doctype html><html><head></head><body></body></html>');
    global.window =dom.window;
    global.document = global.window.document;
    global.navigator = global.window.navigator;
}
