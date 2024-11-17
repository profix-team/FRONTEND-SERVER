// src/mocks/browser.js
import { setupWorker } from 'msw/browser'; // '/browser' 추가
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);
