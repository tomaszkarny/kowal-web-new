#!/usr/bin/env node

/**
 * Translation Key Mapping Generator
 * 
 * This script generates a mapping of all translation keys from the locale files.
 * It can output in different formats:
 * - JSON: A structured JSON with namespaces and keys
 * - TS: TypeScript enums for type-safe access to translation keys
 * 
 * Usage: node generate-key-mapping.js --format=json|ts
 */

const fs = require('fs');
const path = require('path');

// Configuration
const LOCALES_DIR = path.join(process.cwd(), 'locales');
const DEFAULT_LANGUAGE = 'pl'; // Use Polish as the source for keys
const OUTPUT_DIR = path.join(process.cwd(), 'src/i18n');

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Reads all translation namespaces and keys for a given language
 * @param {string} language Language code (e.g., 'pl', 'en')
 * @returns {Object} Mapping of namespaces to their keys
 */
function readTranslationKeys(language) {
  const langDir = path.join(LOCALES_DIR, language);
  const files = fs.readdirSync(langDir).filter(file => file.endsWith('.json'));
  
  // Group keys by namespace
  const namespaces = {};
  
  files.forEach(file => {
    const namespace = path.basename(file, '.json');
    const content = fs.readFileSync(path.join(langDir, file), 'utf8');
    const data = JSON.parse(content);
    
    namespaces[namespace] = Object.keys(data);
  });
  
  return namespaces;
}

/**
 * Generates a JSON mapping file with all translation keys
 * @param {Object} namespaces Mapping of namespaces to their keys
 */
function generateJsonMapping(namespaces) {
  const outputPath = path.join(OUTPUT_DIR, 'translationKeys.json');
  
  // Create a structured mapping
  const mapping = {};
  
  Object.entries(namespaces).forEach(([namespace, keys]) => {
    mapping[namespace] = {};
    keys.forEach(key => {
      // Convert the key to a valid property name
      const safeKey = key.replace(/[-\s.]/g, '_');
      mapping[namespace][safeKey] = key;
    });
  });
  
  fs.writeFileSync(outputPath, JSON.stringify(mapping, null, 2));
  console.log(`✓ JSON mapping generated at: ${outputPath}`);
}

/**
 * Generates TypeScript enum files for translation keys
 * @param {Object} namespaces Mapping of namespaces to their keys
 */
function generateTypeScriptEnums(namespaces) {
  // Create one enum file per namespace
  Object.entries(namespaces).forEach(([namespace, keys]) => {
    const outputPath = path.join(OUTPUT_DIR, `${namespace}Keys.ts`);
    
    let tsContent = `/**
 * Translation keys for the "${namespace}" namespace
 * AUTO-GENERATED - DO NOT EDIT MANUALLY
 */

export enum ${namespace.charAt(0).toUpperCase() + namespace.slice(1)}Keys {
`;
    
    // Add each key to the enum
    keys.forEach(key => {
      // Convert the key to a valid enum name (camelCase or UPPER_CASE)
      const safeKey = key.replace(/[-\s.]/g, '_');
      tsContent += `  ${safeKey} = "${key}",\n`;
    });
    
    tsContent += '}\n';
    
    fs.writeFileSync(outputPath, tsContent);
    console.log(`✓ TypeScript enum generated at: ${outputPath}`);
  });
  
  // Also generate an index file to export all the enums
  const indexPath = path.join(OUTPUT_DIR, 'index.ts');
  let indexContent = '/**\n * Auto-generated index file for translation keys\n */\n\n';
  
  Object.keys(namespaces).forEach(namespace => {
    const enumName = `${namespace.charAt(0).toUpperCase() + namespace.slice(1)}Keys`;
    indexContent += `export { ${enumName} } from './${namespace}Keys';\n`;
  });
  
  fs.writeFileSync(indexPath, indexContent);
  console.log(`✓ TypeScript index file generated at: ${indexPath}`);
}

/**
 * Main function to run the generator
 */
function main() {
  try {
    console.log('\n🔑 Generating Translation Key Mapping\n');
    
    // Parse command-line arguments
    const args = process.argv.slice(2);
    const formatArg = args.find(arg => arg.startsWith('--format='));
    const format = formatArg ? formatArg.split('=')[1] : 'both'; // Default to both formats
    
    // Read translation keys from the default language
    const namespaces = readTranslationKeys(DEFAULT_LANGUAGE);
    console.log(`✓ Found ${Object.keys(namespaces).length} namespaces with translations`);
    
    // Generate the requested format(s)
    if (format === 'json' || format === 'both') {
      generateJsonMapping(namespaces);
    }
    
    if (format === 'ts' || format === 'both') {
      generateTypeScriptEnums(namespaces);
    }
    
    console.log('\n✅ Translation key mapping generated successfully!\n');
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Execute main function
main();
