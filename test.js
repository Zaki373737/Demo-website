#!/usr/bin/env node

/**
 * Influencer Elite - Website Test Suite
 * Run this to verify all systems are working
 */

const fs = require('fs');
const path = require('path');

console.log('\n' + '='.repeat(50));
console.log('🧪 INFLUENCER ELITE - SYSTEM CHECK');
console.log('='.repeat(50) + '\n');

let passedChecks = 0;
let totalChecks = 0;

function check(name, condition, errorMsg = '') {
    totalChecks++;
    if (condition) {
        console.log(`✅ ${name}`);
        passedChecks++;
    } else {
        console.log(`❌ ${name}`);
        if (errorMsg) console.log(`   └─ ${errorMsg}`);
    }
}

// Check 1: Node.js version
console.log('\n📦 ENVIRONMENT CHECKS');
console.log('-'.repeat(50));
const nodeVersion = process.version;
check('Node.js installed', nodeVersion.includes('v'), `Found: ${nodeVersion}`);

// Check 2: Package.json exists
const packageJsonPath = path.join(__dirname, 'package.json');
check('package.json exists', fs.existsSync(packageJsonPath));

// Check 3: .env file exists
const envPath = path.join(__dirname, '.env');
check('.env configuration exists', fs.existsSync(envPath), 'Copy .env.example to .env');

// Check 4: Required directories
console.log('\n📁 DIRECTORY STRUCTURE');
console.log('-'.repeat(50));

const requiredDirs = [
    'models',
    'routes',
    'controllers',
    'services',
    'middleware',
    'admin',
    'influencer_elite_homepage',
    'influencer_elite_for_brands',
    'influencer_elite_for_influencers',
    'influencer_elite_campaign_gallery'
];

requiredDirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    check(`${dir}/ directory`, fs.existsSync(dirPath));
});

// Check 5: Required files
console.log('\n📄 REQUIRED FILES');
console.log('-'.repeat(50));

const requiredFiles = [
    'server.js',
    'package.json',
    '.env',
    'Procfile',
    'README.md',
    'DEPLOYMENT.md',
    'models/Proposal.js',
    'models/User.js',
    'models/Campaign.js',
    'routes/proposals.js',
    'controllers/proposalController.js',
    'services/emailService.js',
    'admin/index.html'
];

requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    check(`${file}`, fs.existsSync(filePath));
});

// Check 6: Configuration
console.log('\n⚙️ CONFIGURATION CHECK');
console.log('-'.repeat(50));

try {
    require('dotenv').config();
    check('Environment variables loaded', true);
    
    const requiredEnvVars = [
        'EMAIL_USER',
        'EMAIL_PASS',
        'MONGODB_URI'
    ];
    
    const envFile = fs.readFileSync(envPath, 'utf-8');
    requiredEnvVars.forEach(envVar => {
        check(`${envVar} configured`, envFile.includes(envVar));
    });
} catch (error) {
    check('Environment variables loaded', false, error.message);
}

// Check 7: Dependencies
console.log('\n📚 DEPENDENCIES');
console.log('-'.repeat(50));

try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const requiredDeps = [
        'express',
        'mongoose',
        'nodemailer',
        'cors',
        'body-parser',
        'dotenv',
        'validator'
    ];
    
    requiredDeps.forEach(dep => {
        const isInstalled = packageJson.dependencies[dep] !== undefined;
        check(`${dep} dependency`, isInstalled);
    });
} catch (error) {
    console.log(`❌ Could not read package.json: ${error.message}`);
}

// Check 8: HTML files
console.log('\n🌐 WEB PAGES');
console.log('-'.repeat(50));

const htmlFiles = [
    'influencer_elite_homepage/code.html',
    'influencer_elite_for_brands/code.html',
    'influencer_elite_for_influencers/code.html',
    'influencer_elite_campaign_gallery/code.html'
];

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const hasContent = content.length > 100;
        check(`${file}`, hasContent, 'File is empty');
    } else {
        check(`${file}`, false, 'File not found');
    }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`\n📊 RESULTS: ${passedChecks}/${totalChecks} checks passed\n`);

if (passedChecks === totalChecks) {
    console.log('✅ ALL SYSTEMS OPERATIONAL!');
    console.log('\nYour website is ready to launch:');
    console.log('  1. npm install       - Install dependencies');
    console.log('  2. npm start         - Start development server');
    console.log('  3. Open http://localhost:5000 in browser');
    console.log('\n🚀 Ready to deploy to Heroku or production!');
} else {
    console.log('⚠️ SOME ISSUES DETECTED');
    console.log('\nPlease fix the following:');
    console.log('  - Copy .env.example to .env and configure');
    console.log('  - Run: npm install');
    console.log('  - Check missing directories/files');
    console.log('  - Verify MongoDB is running');
}

console.log('\n' + '='.repeat(50) + '\n');

// Return exit code
process.exit(passedChecks === totalChecks ? 0 : 1);
