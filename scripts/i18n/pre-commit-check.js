#!/usr/bin/env node

/**
 * i18n Pre-commit Validation Script
 * 
 * Specialized version of the validation script designed for git pre-commit hooks.
 * It runs in silent mode and provides concise error messages.
 * 
 * Usage: Called automatically by husky pre-commit hook via lint-staged
 */

const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SCRIPT_DIR = path.dirname(__filename);
const VALIDATE_SCRIPT = path.join(SCRIPT_DIR, 'validate-i18n.js');

try {
  // Run the validation script in silent mode
  execSync(`node "${VALIDATE_SCRIPT}" --silent`, { stdio: 'pipe' });
  process.exit(0);
} catch (error) {
  // If validation fails, show a concise error message
  console.error('\n🛑 i18n Validation Failed');
  console.error('Translation files have issues that need to be fixed before committing.');
  console.error('Run "npm run i18n:check" for detailed information.\n');
  process.exit(1);
}
