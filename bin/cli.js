#!/usr/bin/env node
const inquirer = require('inquirer');
const { generateStructure } = require('../lib/generateStructure');
const { createViteProject } = require('../lib/createViteProject');

async function promptUser() {
  const questions = [
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Create new React project with file structure',
        'Add file structure to existing React project'
      ]
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter project name:',
      when: (answers) => answers.action === 'Create new React project with file structure',
      validate: (input) => {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        return 'Project name may only include letters, numbers, underscores and hashes.';
      }
    }
  ];

  return inquirer.prompt(questions);
}

async function init() {
  console.log("Initializing...");

  const answers = await promptUser();

  if (answers.action === 'Create new React project with file structure') {
    const success = await createViteProject(answers.projectName);
    if (success) {
      console.log('Creating file structure in new project...');
      await generateStructure();
    }
  } else {
    console.log('Adding file structure to existing project...');
    await generateStructure();
  }
}

init().catch(console.error);
