// src/inversify.config.ts

import 'reflect-metadata';
import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import * as glob from 'glob';
import * as path from 'path';

const container = new Container();

// Automatically bind all injectables using glob pattern
const files = glob.sync(path.resolve(__dirname, './**/*.ts')); // Adjust the path pattern as per your project structure

files.forEach((file) => {
  if (!file.includes('node_modules') && !file.includes('inversify.config' ) && !file.includes('express')) {
    require(file);
  }
});

container.load(buildProviderModule());

export default container;
