#!/usr/bin/env node

/**
 * JSON Schema Generator for Translation Files
 * 
 * This script creates JSON Schema files for validating translation files.
 * It analyzes existing translation files and generates a schema that 
 * requires all existing keys to be present in each language version.
 * 
 * Usage: node generate-json-schemas.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const LOCALES_DIR = path.join(process.cwd(), 'locales');
const SCHEMAS_DIR = path.join(process.cwd(), 'scripts/i18n/schemas');
const DEFAULT_LANGUAGE = 'pl'; // Use Polish as the source for schema generation

/**
 * Reads all translation files for a given language
 * @param {string} language Language code (e.g., 'pl', 'en')
 * @returns {Object} Object containing namespaces and their translation data
 */
function readTranslations(language) {
  const langDir = path.join(LOCALES_DIR, language);
  const files = fs.readdirSync(langDir).filter(file => file.endsWith('.json'));
  
  const translations = {};
  
  files.forEach(file => {
    const namespace = path.basename(file, '.json');
    const content = fs.readFileSync(path.join(langDir, file), 'utf8');
    const data = JSON.parse(content);
    
    translations[namespace] = data;
  });
  
  return translations;
}

/**
 * Generates JSON Schema for a translation namespace
 * @param {string} namespace The translation namespace (e.g., 'common', 'about')
 * @param {Object} translationData The translation data for this namespace
 * @returns {Object} JSON Schema object
 */
function generateSchemaForNamespace(namespace, translationData) {
  // Create the basic schema structure
  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: `Translation Schema for "${namespace}" namespace`,
    description: `Validates translation files for the "${namespace}" namespace`,
    type: 'object',
    additionalProperties: false, // Prevent extra keys not defined in the schema
    required: [], // Will be filled with all keys
    properties: {} // Will be filled with property definitions
  };
  
  // Recursively generate schema for nested objects
  function generatePropertiesSchema(obj, parentPath = '') {
    const properties = {};
    const required = [];
    
    Object.entries(obj).forEach(([key, value]) => {
      const path = parentPath ? `${parentPath}.${key}` : key;
      
      // Add key to required list for this level
      required.push(key);
      
      if (typeof value === 'object' && value !== null) {
        // For nested objects, create a nested schema
        const nestedSchema = generatePropertiesSchema(value, path);
        properties[key] = {
          type: 'object',
          description: `Nested translations for "${key}"`,
          additionalProperties: false,
          required: nestedSchema.required,
          properties: nestedSchema.properties
        };
      } else {
        // For string values, create a string property
        properties[key] = {
          type: 'string',
          description: `Translation for "${path}"`
        };
      }
    });
    
    return { properties, required };
  }
  
  // Generate schema structure
  const schemaDetails = generatePropertiesSchema(translationData);
  schema.required = schemaDetails.required;
  schema.properties = schemaDetails.properties;
  
  return schema;
}

/**
 * Main function to run the generator
 */
function main() {
  try {
    console.log('\n📝 Generating JSON Schemas for Translation Validation\n');
    
    // Create schemas directory if it doesn't exist
    if (!fs.existsSync(SCHEMAS_DIR)) {
      fs.mkdirSync(SCHEMAS_DIR, { recursive: true });
    }
    
    // Read translations from the default language
    const translations = readTranslations(DEFAULT_LANGUAGE);
    console.log(`✓ Found ${Object.keys(translations).length} translation namespaces to generate schemas for`);
    
    // Generate schema for each namespace
    Object.entries(translations).forEach(([namespace, data]) => {
      const schema = generateSchemaForNamespace(namespace, data);
      const outputPath = path.join(SCHEMAS_DIR, `${namespace}.schema.json`);
      
      fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2));
      console.log(`✓ Generated schema for "${namespace}" namespace (${Object.keys(data).length} keys)`);
    });
    
    // Generate a master schema file that references all namespace schemas
    const namespaces = Object.keys(translations);
    const masterSchema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: 'Master Schema for All Translation Namespaces',
      description: 'References schemas for all translation namespaces',
      oneOf: namespaces.map(namespace => ({
        $ref: `./${namespace}.schema.json`
      }))
    };
    
    const masterSchemaPath = path.join(SCHEMAS_DIR, 'master.schema.json');
    fs.writeFileSync(masterSchemaPath, JSON.stringify(masterSchema, null, 2));
    console.log(`✓ Generated master schema referencing all ${namespaces.length} namespaces`);
    
    console.log('\n✅ JSON Schemas generated successfully!\n');
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Execute main function
main();
