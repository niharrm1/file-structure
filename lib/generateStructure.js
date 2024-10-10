const fs = require('fs-extra');
const path = require('path');

// Function to create the required folder structure
async function generateStructure() {
  console.log("Generating file structure...");

  const srcDir = path.join(process.cwd(), 'src');
  
  if (!fs.existsSync(srcDir)) {
    console.error("Error: 'src' directory not found. Please run this inside a React project.");
    return;
  }

  // Define the new folders and subfolders, including action and reducer inside redux
  const folders = [
    'redux/action',
    'redux/reducer',
    'utils',
    'routes',
    'pages',
    'layouts',
    'components',  // Will remain empty
    'assets/svgs',
    'assets/gifs',
    'assets/images'
  ];

  // Define the initial files to be created
  const files = {
    [path.join(srcDir, 'redux', 'store.js')]: `// Redux store configuration`,
    [path.join(srcDir, 'utils', 'helper.js')]: `export const helperFunction = () => { console.log('Helper Function!'); };`,
    [path.join(srcDir, 'routes', 'AppRoutes.js')]: `// Define your app routes here`,
    [path.join(srcDir, 'pages', 'HomePage.js')]: `import React from 'react';\n\nconst HomePage = () => {\n  return <div>Welcome to the Home Page</div>;\n};\n\nexport default HomePage;`,
    [path.join(srcDir, 'layouts', 'MainLayout.js')]: `import React from 'react';\n\nconst MainLayout = ({ children }) => {\n  return <div>{children}</div>;\n};\n\nexport default MainLayout;`
  };

  // Create the directories
  for (let folder of folders) {
    await fs.ensureDir(path.join(srcDir, folder));
  }

  // Create the files
  for (let filePath in files) {
    await fs.outputFile(filePath, files[filePath]);
  }

  console.log('File structure created successfully!');
}

module.exports = { generateStructure };
