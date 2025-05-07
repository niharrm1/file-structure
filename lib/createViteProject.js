const { execSync } = require('child_process');
const path = require('path');

async function createViteProject(projectName) {
    try {
        // Create new Vite+React project
        console.log(`Creating new React project with Vite: ${projectName}`);
        execSync(`npm create vite@latest ${projectName} -- --template react`, { stdio: 'inherit' });

        // Change directory to the new project
        process.chdir(projectName);

        // Install dependencies
        console.log('Installing dependencies...');
        execSync('npm install', { stdio: 'inherit' });

        return true;
    } catch (error) {
        console.error('Error creating Vite project:', error);
        return false;
    }
}

module.exports = { createViteProject };