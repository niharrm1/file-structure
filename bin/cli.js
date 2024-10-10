#!/usr/bin/env node
const inquirer = require('inquirer');
const { generateStructure } = require('../lib/generateStructure');

async function promptUser() {
  console.log("Prompting user...");  // Debugging log

  const questions = [
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Do you want to add additional structure to the current React project?',
      default: true
    }
  ];

  return inquirer.prompt(questions);
}

async function init() {
  console.log("Initializing...");  // Debugging log

  const { confirm } = await promptUser();
  console.log("User response:", confirm);  // Debugging log

  if (confirm) {
    console.log("Generating structure...");  // Debugging log
    await generateStructure();
  } else {
    console.log("Operation canceled by user.");
  }
}

init();
