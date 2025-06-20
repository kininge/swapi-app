import '@testing-library/jest-dom';
import { server } from './mocks/server';

// Start API mocking before all tests
beforeAll(() => server.listen());
// Reset handlers after each test
afterEach(() => server.resetHandlers());
// Clean up once tests are done
afterAll(() => server.close());
