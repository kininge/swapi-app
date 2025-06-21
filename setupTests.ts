import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { TextEncoder, TextDecoder } from 'util';

beforeAll(() => {
  global.IntersectionObserver = class {
    constructor(cb: any, options?: any) {}
    observe() {}
    disconnect() {}
    unobserve() {}
  } as any;
});

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
