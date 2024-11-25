import { App } from './app';

const PORT = process.env.APP_PORT || 8080;

new App().start(PORT);