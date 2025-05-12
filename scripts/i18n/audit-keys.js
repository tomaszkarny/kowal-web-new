#!/usr/bin/env node

/**
 * Translation Keys Audit Tool
 * 
 * This script compares translation files between languages to find:
 * 1. Missing keys (present in one language but not in another)
 * 2. Similar but inconsistent keys (e.g., 'specialties_section_title' vs 'specialties_title')
 * 
 * Usage: node audit-keys.js
 */

// Fix for Chalk v5 (ESM-only)
const fs = require('fs');
const path = require('path');

// Simple color functions to replace chalk
const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  magenta: (text) => `\x1b[35m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  white: (text) => `\x1b[37m${text}\x1b[0m`,
  bold: (text) => `\x1b[1m${text}\x1b[0m`
};

// Create a chalk-like API
const chalk = {
  red: colors.red,
  green: colors.green,
  yellow: colors.yellow,
  blue: colors.blue,
  bold: colors.bold,
  cyan: colors.cyan
};

// Add methods for combined styles
chalk.red.bold = (text) => colors.red(colors.bold(text));
chalk.green.bold = (text) => colors.green(colors.bold(text));
chalk.yellow.bold = (text) => colors.yellow(colors.bold(text));
chalk.blue.bold = (text) => colors.blue(colors.bold(text));

// Configuration
const LOCALES_DIR = path.join(process.cwd(), 'locales');
const LANGUAGES = ['pl', 'en'];
const SIMILARITY_THRESHOLD = 0.7; // Threshold for detecting similar keys

/**
 * Simple string similarity check using Levenshtein distance
 * @param {string} str1 First string to compare
 * @param {string} str2 Second string to compare
 * @returns {number} Similarity score between 0 and 1
 */
function stringSimilarity(str1, str2) {
  if (str1 === str2) return 1.0;
  if (str1.length === 0 || str2.length === 0) return 0.0;
  
  // Levenshtein distance implementation
  const matrix = Array(str1.length + 1).fill().map(() => Array(str2.length + 1).fill(0));
  
  for (let i = 0; i <= str1.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= str2.length; j++) matrix[0][j] = j;
  
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      const cost = str1[i-1] === str2[j-1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i-1][j] + 1,        // deletion
        matrix[i][j-1] + 1,        // insertion
        matrix[i-1][j-1] + cost    // substitution
      );
    }
  }
  
  const distance = matrix[str1.length][str2.length];
  const maxLength = Math.max(str1.length, str2.length);
  return 1 - distance / maxLength;
}

/**
 * Reads all translation files for a given language
 * @param {string} language Language code (e.g., 'en', 'pl')
 * @returns {Object} Combined translations from all namespaces
 */
function readTranslations(language) {
  const langDir = path.join(LOCALES_DIR, language);
  const files = fs.readdirSync(langDir).filter(file => file.endsWith('.json'));
  
  // Read and merge all translation files for this language
  const translations = {};
  
  files.forEach(file => {
    const namespace = path.basename(file, '.json');
    const content = fs.readFileSync(path.join(langDir, file), 'utf8');
    const data = JSON.parse(content);
    
    // Add namespace prefix to keys for better tracking
    Object.keys(data).forEach(key => {
      translations[`${namespace}:${key}`] = data[key];
    });
  });
  
  return translations;
}

/**
 * Finds missing keys between two sets of translations
 * @param {Object} sourceTranslations Source translations
 * @param {Object} targetTranslations Target translations
 * @returns {Array} List of keys present in source but missing in target
 */
function findMissingKeys(sourceTranslations, targetTranslations) {
  return Object.keys(sourceTranslations).filter(key => !targetTranslations[key]);
}

/**
 * Finds similar but inconsistent keys
 * @param {Array} keys1 First set of keys
 * @param {Array} keys2 Second set of keys
 * @returns {Array} List of potentially inconsistent key pairs
 */
function findSimilarKeys(keys1, keys2) {
  const results = [];
  
  // Find keys that are in keys1 but not in keys2
  const uniqueKeys1 = keys1.filter(key => !keys2.includes(key));
  const uniqueKeys2 = keys2.filter(key => !keys1.includes(key));
  
  // Check for similar keys using string similarity
  uniqueKeys1.forEach(key1 => {
    uniqueKeys2.forEach(key2 => {
      // Extract the key part after the namespace
      const [ns1, actualKey1] = key1.split(':');
      const [ns2, actualKey2] = key2.split(':');
      
      // Only compare keys in the same namespace
      if (ns1 === ns2) {
        const similarity = stringSimilarity(actualKey1, actualKey2);
        if (similarity >= SIMILARITY_THRESHOLD) {
          results.push({
            key1,
            key2,
            similarity: similarity.toFixed(2)
          });
        }
      }
    });
  });
  
  return results;
}

/**
 * Main function to run the audit
 */
async function main() {
  try {
    console.log(chalk.blue.bold('\n🔍 Translation Keys Audit\n'));
    
    // Check if languages directories exist
    for (const lang of LANGUAGES) {
      const langDir = path.join(LOCALES_DIR, lang);
      if (!fs.existsSync(langDir)) {
        console.error(chalk.red(`Error: Language directory not found: ${langDir}`));
        process.exit(1);
      }
    }
    
    // Read translations for all languages
    const translations = {};
    LANGUAGES.forEach(lang => {
      translations[lang] = readTranslations(lang);
      console.log(chalk.green(`✓ Read ${Object.keys(translations[lang]).length} keys for ${lang}`));
    });
    
    console.log(chalk.blue.bold('\nMissing Keys:'));
    
    // Find missing keys for each language pair
    let totalMissingKeys = 0;
    for (let i = 0; i < LANGUAGES.length; i++) {
      for (let j = i + 1; j < LANGUAGES.length; j++) {
        const lang1 = LANGUAGES[i];
        const lang2 = LANGUAGES[j];
        
        // Keys in lang1 missing from lang2
        const missingInLang2 = findMissingKeys(translations[lang1], translations[lang2]);
        if (missingInLang2.length > 0) {
          console.log(chalk.yellow(`\n${lang2} is missing ${missingInLang2.length} keys that exist in ${lang1}:`));
          missingInLang2.forEach(key => {
            console.log(`  - ${key}`);
          });
          totalMissingKeys += missingInLang2.length;
        }
        
        // Keys in lang2 missing from lang1
        const missingInLang1 = findMissingKeys(translations[lang2], translations[lang1]);
        if (missingInLang1.length > 0) {
          console.log(chalk.yellow(`\n${lang1} is missing ${missingInLang1.length} keys that exist in ${lang2}:`));
          missingInLang1.forEach(key => {
            console.log(`  - ${key}`);
          });
          totalMissingKeys += missingInLang1.length;
        }
      }
    }
    
    if (totalMissingKeys === 0) {
      console.log(chalk.green('  ✓ No missing keys found'));
    }
    
    // Find similar keys that might be inconsistent naming
    console.log(chalk.blue.bold('\nPotentially Inconsistent Keys:'));
    let totalInconsistentKeys = 0;
    
    for (let i = 0; i < LANGUAGES.length; i++) {
      for (let j = i + 1; j < LANGUAGES.length; j++) {
        const lang1 = LANGUAGES[i];
        const lang2 = LANGUAGES[j];
        
        const keys1 = Object.keys(translations[lang1]);
        const keys2 = Object.keys(translations[lang2]);
        
        const similarKeys = findSimilarKeys(keys1, keys2);
        if (similarKeys.length > 0) {
          console.log(chalk.yellow(`\nPotentially inconsistent keys between ${lang1} and ${lang2}:`));
          similarKeys.forEach(({key1, key2, similarity}) => {
            console.log(`  - ${key1} ↔ ${key2} (${similarity} similarity)`);
          });
          totalInconsistentKeys += similarKeys.length;
        }
      }
    }
    
    if (totalInconsistentKeys === 0) {
      console.log(chalk.green('  ✓ No inconsistent keys found'));
    }
    
    // Summary
    console.log(chalk.blue.bold('\nSummary:'));
    if (totalMissingKeys === 0 && totalInconsistentKeys === 0) {
      console.log(chalk.green('✓ All translation keys are consistent across languages'));
    } else {
      console.log(chalk.yellow(`⚠ Found ${totalMissingKeys} missing keys and ${totalInconsistentKeys} potentially inconsistent keys`));
      console.log(chalk.yellow('Please review and fix these issues to ensure consistent translations'));
    }
    
  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
    process.exit(1);
  }
}

// Execute main function
main();
