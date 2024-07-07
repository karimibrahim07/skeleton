// src/inversify.config.ts

import 'reflect-metadata';
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import * as glob from 'glob';
import * as path from 'path';

const container = new Container();

// Adjust the glob pattern to include both .ts and .js files
const filePatterns = [
  path.resolve(__dirname, './**/*.ts'),
  path.resolve(__dirname, './**/*.js')
];

// Load files using glob pattern
filePatterns.forEach(pattern => {
  const files = glob.sync(pattern);
  files.forEach(file => {
    if (!file.includes('node_modules') && !file.includes('inversify.config') && !file.includes('express')) {
      require(file);
    }
  });
});

container.load(buildProviderModule());

export default container;
