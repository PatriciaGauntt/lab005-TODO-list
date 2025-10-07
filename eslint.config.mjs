import path from 'node:path';

import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import { configs, plugins, rules } from 'eslint-config-airbnb-extended';

const gitignorePath = path.resolve('.', '.gitignore');

const jsConfig = [
  // ESLint Recommended Rules
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  // Stylistic Plugin
  plugins.stylistic,
  // Import X Plugin
  plugins.importX,
  // Airbnb Base Recommended Config
  ...configs.base.recommended,
  // Strict Import Config
  rules.base.importsStrict,
];

const nodeConfig = [
  // Node Plugin
  plugins.node,
  // Airbnb Node Recommended Config
  ...configs.node.recommended,
];

export default [
  // Ignore .gitignore files/folder in eslint
  includeIgnoreFile(gitignorePath),
  // Javascript Config
  ...jsConfig,
  // Node Config
  ...nodeConfig,
  {
    // Custom rules/overrides go here
    rules: {
      '@stylistic/max-len': ['error', { code: 120 }],
      'import-x/prefer-default-export': ['off'],
      'import-x/extensions': ['off'],
    },
  },
];
