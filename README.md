## React File Structure Generator 🚀
A powerful CLI tool that generates standardized and scalable file structures for React projects, supporting both new Vite-based projects and existing React applications.

## 🌟 Features
  
<br>🏗️ Add standardized folder structure to existing React projects<br>
<br>🏗️ Add standardized folder structure to existing React projects<br>
<br>📦 Built-in Redux setup with authentication boilerplate<br>
<br>🎣 Custom hooks for API handling and authentication<br>
<br>🧩 Component templates following best practices<br>
<br>🎨 Tailwind CSS styling integration<br>


## Installation
```
npm install -g react-file-structure-generator
# or
yarn global add react-file-structure-generator
```

## 🚀 Quick Start
Create New Project
```
npx file-structure-react
```

Select "Create new React project with file structure" and follow the prompts.

Add to Existing Project
```
cd your-react-project
npx file-structure-react
```
Select "Add file structure to existing React project".

### Generated Structure
```
src/
├── assets/              # Static assets
│   ├── svgs/
│   ├── gifs/
│   └── images/
├── components/          # Reusable components
│   ├── Button/
│   ├── Card/
│   └── Navbar/
├── hooks/              # Custom hooks
│   ├── useApi.js
│   └── useAuth.js
├── layouts/           # Layout components
│   └── BaseLayout.jsx
├── pages/            # Page components
│   └── HomePage/
│       ├── components/
│       │   ├── Hero.jsx
│       │   └── Features.jsx
│       └── HomePage.jsx
├── redux/           # Redux state management
│   ├── action/
│   ├── reducer/
│   └── store.js
├── routes/         # Routing configuration
│   └── AppRoutes.jsx
└── utils/         # Utility functions
    ├── api.js
    ├── constants.js
    └── helper.js
```

## 🛠️ Key Components
# Redux Setup
Pre-configured store with authentication reducer
Action creators for token management
Combined reducers setup
# Custom Hooks
useApi: API calls with error handling and auth management
useAuth: Authentication state and headers management
# Layout System
Flexible BaseLayout with navbar and footer
Extensible for different layout types

### Dependencies
The generated project includes:

@reduxjs/toolkit
react-redux
react-router-dom
axios
tailwindcss (optional)

```json
{
  "dependencies": {
    "@reduxjs/toolkit": "^2.0.0",
    "react-redux": "^9.0.0",
    "react-router-dom": "^6.0.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.0.0"
  }
}
```

## Development
To contribute to this package:

Clone the repository
Install dependencies
Link for local development

## Author
Nihar Ranjan, Subhrajeet Swain

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support
If you found this package helpful, please give it a ⭐️ on GitHub!