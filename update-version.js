#!/usr/bin/env node

/**
 * Cache Busting Version Updater for Elfi's Angels
 * 
 * This script automatically increments the cache version in sw.js
 * to ensure users get the latest version when you deploy updates.
 * 
 * Usage:
 * node update-version.js
 * 
 * Or add to package.json scripts:
 * "scripts": {
 *   "update-cache": "node update-version.js"
 * }
 */

const fs = require('fs');
const path = require('path');

const SW_FILE = path.join(__dirname, 'sw.js');

function updateCacheVersion() {
    try {
        // Read the service worker file
        let swContent = fs.readFileSync(SW_FILE, 'utf8');
        
        // Find current version
        const versionMatch = swContent.match(/const CACHE_VERSION = '([^']+)'/);
        
        if (!versionMatch) {
            console.error('❌ Could not find CACHE_VERSION in sw.js');
            process.exit(1);
        }
        
        const currentVersion = versionMatch[1];
        console.log('📋 Current version:', currentVersion);
        
        // Parse version (assuming semantic versioning)
        const versionParts = currentVersion.split('.');
        const major = parseInt(versionParts[0] || '1');
        const minor = parseInt(versionParts[1] || '0');
        const patch = parseInt(versionParts[2] || '0');
        
        // Increment patch version
        const newPatch = patch + 1;
        const newVersion = `${major}.${minor}.${newPatch}`;
        
        // Update the service worker file
        const updatedContent = swContent.replace(
            /const CACHE_VERSION = '[^']+'/,
            `const CACHE_VERSION = '${newVersion}'`
        );
        
        fs.writeFileSync(SW_FILE, updatedContent, 'utf8');
        
        console.log('✅ Version updated:', currentVersion, '->', newVersion);
        console.log('🚀 New cache version will be used on next deployment');
        
        // Also log the timestamp for reference
        console.log('🕒 Updated at:', new Date().toISOString());
        
    } catch (error) {
        console.error('❌ Error updating version:', error.message);
        process.exit(1);
    }
}

// Run the update
updateCacheVersion();
