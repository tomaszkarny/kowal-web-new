#!/usr/bin/env node

/**
 * Translation Validator using JSON Schema
 * 
 * This script validates all translation files against their JSON schemas.
 * It ensures that all required translation keys are present in each language.
 * 
 * Usage: node validate-translations.js
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const chalk = require('./chalk-compatibility');

// Configuration
const LOCALES_DIR = path.join(process.cwd(), 'locales');
const SCHEMAS_DIR = path.join(process.cwd(), 'scripts/i18n/schemas');
const LANGUAGES = ['pl', 'en'];

/**
 * Validates a translation file against its schema
 * @param {string} namespace The translation namespace (e.g., 'common', 'about')
 * @param {string} language The language code (e.g., 'pl', 'en')
 * @returns {Object} Validation result with success flag and any errors
 */
function validateTranslation(namespace, language) {
  // Initialize Ajv
  const ajv = new Ajv({ allErrors: true });
  
  // Load the schema
  const schemaPath = path.join(SCHEMAS_DIR, `${namespace}.schema.json`);
  const translationPath = path.join(LOCALES_DIR, language, `${namespace}.json`);
  
  // Check if files exist
  if (!fs.existsSync(schemaPath)) {
    return { 
      success: false, 
      errors: [`Schema not found for namespace "${namespace}"`] 
    };
  }
  
  if (!fs.existsSync(translationPath)) {
    return { 
      success: false, 
      errors: [`Translation file not found for namespace "${namespace}" in language "${language}"`] 
    };
  }
  
  // Load schema and translation data
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const translationData = JSON.parse(fs.readFileSync(translationPath, 'utf8'));
  
  // Validate
  const validate = ajv.compile(schema);
  const valid = validate(translationData);
  
  if (valid) {
    return { success: true };
  } else {
    // Format validation errors
    const errors = validate.errors.map(error => {
      if (error.keyword === 'required') {
        return `Missing required key: "${error.params.missingProperty}"`;
      } else if (error.keyword === 'additionalProperties') {
        return `Unexpected extra key: "${error.params.additionalProperty}"`;
      } else if (error.keyword === 'type') {
        const path = error.dataPath || '';
        return `Key "${path.slice(1)}" should be a ${error.params.type}`;
      } else {
        const path = error.dataPath || '';
        return `${path}: ${error.message}`;
      }
    });
    
    return { success: false, errors };
  }
}

/**
 * Main function to run the validator
 */
function main() {
  try {
    console.log(chalk.blue.bold('\n🔍 Validating Translation Files\n'));
    
    // Find all available namespaces from schema files
    const schemaFiles = fs.readdirSync(SCHEMAS_DIR)
      .filter(file => file.endsWith('.schema.json') && file !== 'master.schema.json');
    
    const namespaces = schemaFiles.map(file => path.basename(file, '.schema.json'));
    console.log(chalk.green(`Found ${namespaces.length} translation namespaces to validate`));
    
    // Track validation results
    let totalErrors = 0;
    let validFiles = 0;
    
    // Validate each namespace for each language
    namespaces.forEach(namespace => {
      console.log(chalk.yellow(`\nValidating namespace: ${namespace}`));
      
      LANGUAGES.forEach(language => {
        const result = validateTranslation(namespace, language);
        
        if (result.success) {
          console.log(chalk.green(`  ✓ ${language}: Valid`));
          validFiles++;
        } else {
          console.log(chalk.red(`  ✗ ${language}: Invalid`));
          result.errors.forEach(error => {
            console.log(chalk.red(`    - ${error}`));
            totalErrors++;
          });
        }
      });
    });
    
    console.log(chalk.blue.bold('\nValidation Summary:'));
    console.log(`Total files validated: ${namespaces.length * LANGUAGES.length}`);
    console.log(`Valid files: ${validFiles}`);
    console.log(`Files with errors: ${(namespaces.length * LANGUAGES.length) - validFiles}`);
    console.log(`Total validation errors: ${totalErrors}`);
    
    if (totalErrors === 0) {
      console.log(chalk.green.bold('\n✅ All translation files are valid!\n'));
      process.exit(0);
    } else {
      console.log(chalk.red.bold('\n❌ Validation failed with errors!\n'));
      process.exit(1);
    }
    
  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}

// Execute main function
main();
