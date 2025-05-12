#!/usr/bin/env node

/**
 * i18n Complete Validation Script
 * 
 * This script is a comprehensive validator for i18n translations.
 * It performs the following validations:
 * 1. Checks for missing keys between languages
 * 2. Validates all translation files against JSON schemas
 * 3. Generates TypeScript enums for type-safe usage (optional)
 * 
 * Usage: node validate-i18n.js [options]
 * Options:
 *   --generate-types: Also generate TypeScript enums
 *   --silent: Only output on errors
 *   --help: Show this help message
 */

const { execSync } = require('child_process');
const path = require('path');
const chalk = require('./chalk-compatibility');

// Configuration
const SCRIPT_DIR = path.dirname(__filename);
const AUDIT_SCRIPT = path.join(SCRIPT_DIR, 'audit-keys.js');
const VALIDATION_SCRIPT = path.join(SCRIPT_DIR, 'validate-translations.js');
const GENERATE_SCRIPT = path.join(SCRIPT_DIR, 'generate-key-mapping.js');
const GENERATE_SCHEMAS_SCRIPT = path.join(SCRIPT_DIR, 'generate-json-schemas.js');

/**
 * Parses command-line arguments
 * @returns {Object} Parsed arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  return {
    generateTypes: args.includes('--generate-types'),
    silent: args.includes('--silent'),
    help: args.includes('--help')
  };
}

/**
 * Shows help message
 */
function showHelp() {
  console.log(`
${chalk.bold('i18n Complete Validation Script')}

This script validates all i18n translation files to ensure consistency and correctness.

${chalk.bold('Usage:')} 
  node validate-i18n.js [options]
  npm run i18n:check [-- options]

${chalk.bold('Options:')}
  --generate-types    Also generate TypeScript enums for type-safe usage
  --silent            Only output on errors
  --help              Show this help message

${chalk.bold('Examples:')}
  node validate-i18n.js
  node validate-i18n.js --generate-types
  npm run i18n:check -- --generate-types
  `);
}

/**
 * Executes a command and returns its result
 * @param {string} command Command to execute
 * @param {boolean} silent Whether to suppress output
 * @returns {boolean} Whether the command succeeded
 */
function runCommand(command, silent = false) {
  try {
    const options = { stdio: silent ? 'ignore' : 'inherit' };
    execSync(command, options);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Main function
 */
function main() {
  const args = parseArgs();
  
  if (args.help) {
    showHelp();
    return;
  }
  
  let exitCode = 0;
  const silent = args.silent;
  
  // Welcome message
  if (!silent) {
    console.log(chalk.blue.bold('\n📋 Starting i18n validation\n'));
  }
  
  // Step 1: Generate schemas
  if (!silent) {
    console.log(chalk.yellow('Generating JSON Schemas for validation...'));
  }
  const schemasGenerated = runCommand(`node "${GENERATE_SCHEMAS_SCRIPT}"`, silent);
  
  // Step 2: Check for missing keys between languages
  if (!silent) {
    console.log(chalk.yellow('\nChecking for missing translation keys...'));
  }
  const auditPassed = runCommand(`node "${AUDIT_SCRIPT}"`, silent);
  
  if (!auditPassed) {
    console.error(chalk.red('\n❌ Translation key audit failed!'));
    console.error(chalk.red('Some languages are missing translation keys. Please fix these issues.'));
    exitCode = 1;
  } else if (!silent) {
    console.log(chalk.green('\n✓ Translation key audit passed!'));
  }
  
  // Step 3: Validate against JSON schemas
  if (!silent) {
    console.log(chalk.yellow('\nValidating translation files against schemas...'));
  }
  const validationPassed = runCommand(`node "${VALIDATION_SCRIPT}"`, silent);
  
  if (!validationPassed) {
    console.error(chalk.red('\n❌ Schema validation failed!'));
    console.error(chalk.red('Some translation files do not match their schemas. Please fix these issues.'));
    exitCode = 1;
  } else if (!silent) {
    console.log(chalk.green('\n✓ Schema validation passed!'));
  }
  
  // Step 4 (Optional): Generate TypeScript enums
  if (args.generateTypes) {
    if (!silent) {
      console.log(chalk.yellow('\nGenerating TypeScript enums...'));
    }
    const typesGenerated = runCommand(`node "${GENERATE_SCRIPT}"`, silent);
    
    if (!typesGenerated) {
      console.error(chalk.red('\n❌ TypeScript enum generation failed!'));
      exitCode = 1;
    } else if (!silent) {
      console.log(chalk.green('\n✓ TypeScript enums generated successfully!'));
    }
  }
  
  // Final summary
  if (!silent) {
    if (exitCode === 0) {
      console.log(chalk.green.bold('\n✅ All i18n validations passed!\n'));
    } else {
      console.log(chalk.red.bold('\n❌ i18n validation failed! Please fix the issues above.\n'));
    }
  }
  
  process.exit(exitCode);
}

// Run the main function
main();
