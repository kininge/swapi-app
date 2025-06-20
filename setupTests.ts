import '@testing-library/jest-dom';
import 'whatwg-fetch';

beforeAll(() => {
  global.IntersectionObserver = class {
    constructor(cb: any, options?: any) {}
    observe() {}
    disconnect() {}
    unobserve() {}
  } as any;
});
