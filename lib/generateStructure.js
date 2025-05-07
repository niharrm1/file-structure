const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

async function generateStructure() {
  console.log("Generating file structure...");
  const srcDir = path.join(process.cwd(), 'src');

  if (!fs.existsSync(srcDir)) {
    console.error("Error: 'src' directory not found. Please run this inside a React project.");
    return;
  }

  const folders = [
    'redux/action',
    'redux/reducer',
    'hooks',
    'utils',
    'routes',
    'pages/HomePage/components',
    'layouts',
    'components/Button',
    'components/Card',
    'components/Navbar',
    'assets/svgs',
    'assets/gifs',
    'assets/images'
  ];

  const files = {
    // Redux files
    [path.join(srcDir, 'redux', 'store.js')]: `
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';

export const store = configureStore({
  reducer: rootReducer
});`,

    [path.join(srcDir, 'redux', 'action', 'authActions.js')]: `
export const SET_TOKEN = 'SET_TOKEN';
export const SET_USER_DATA = 'SET_USER_DATA';

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: { token }
});

export const setUserData = (userDetails) => ({
  type: SET_USER_DATA,
  payload: { userDetails }
});`,

    [path.join(srcDir, 'redux', 'reducer', 'authReducer.js')]: `
import { SET_TOKEN, SET_USER_DATA } from '../action/authActions';

const initialState = {
  token: null,
  userDetails: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    case SET_USER_DATA:
      return {
        ...state,
        userDetails: action.payload.userDetails,
      };
    default:
      return state;
  }
};

export default authReducer;`,

    [path.join(srcDir, 'redux', 'reducer', 'index.js')]: `
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authReducer';

export default combineReducers({
  auth: authReducer,
});`,

    // Hooks
    [path.join(srcDir, 'hooks', 'useApi.js')]: `
import axios from "axios";
import useAuth from "./useAuth";
import { setToken, setUserData } from '../redux/action/authActions';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { BASE_URL } from "../utils/constants";

const useApi = () => {
  const [config] = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleApi = async (url, configuration, dataToSend, method) => {
    const configToSend = configuration || config;
    const Axios = method === "post" ? axios.post 
                  : method === "delete" ? axios.delete 
                  : method === "put" ? axios.put 
                  : axios.get;

    try {
      const fetchApi = method === "post" || method === "put"
        ? await Axios(\`\${BASE_URL}/\${url}\`, dataToSend, configToSend)
        : await Axios(\`\${BASE_URL}/\${url}\`, configToSend);
      return fetchApi.data;
    } catch (error) {
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        dispatch(setToken(""));
        dispatch(setUserData(""));
        navigate("/");
      }
      throw error;
    }
  };
  return [handleApi];
};

export default useApi;`,

    [path.join(srcDir, 'hooks', 'useAuth.js')]: `
import { useSelector } from "react-redux";

const useAuth = () => {
  const token = useSelector((state) => state.auth.token);

  const config = {
    headers: {
      Authorization: \`Bearer \${token}\`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };

  const configFormData = {
    headers: {
      Authorization: \`Bearer \${token}\`,
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  };

  return [config, configFormData];
};

export default useAuth;`,

    // Utils files
    [path.join(srcDir, 'utils', 'api.js')]: `
const BASE_URL = 'https://api.example.com';

export const fetchWrapper = async (endpoint, options = {}) => {
  const response = await fetch(\`\${BASE_URL}\${endpoint}\`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return response.json();
};`,

    [path.join(srcDir, 'utils', 'helper.js')]: `
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};`,

    [path.join(srcDir, 'utils', 'constants.js')]: `
export const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
`,

    // Routes
    [path.join(srcDir, 'routes', 'AppRoutes.jsx')]: `
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout';
import HomePage from '../pages/HomePage/HomePage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BaseLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;`,

    // Layouts
    [path.join(srcDir, 'layouts', 'BaseLayout.jsx')]: `
import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const BaseLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2024 Your Company
      </footer>
    </div>
  );
};

export default BaseLayout;`,

    // Components
    [path.join(srcDir, 'components', 'Button', 'Button.jsx')]: `
import React from 'react';

const Button = ({ children, onClick, variant = 'primary' }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
  };

  return (
    <button
      className={\`\${baseClasses} \${variantClasses[variant]}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;`,

    [path.join(srcDir, 'components', 'Navbar', 'Navbar.jsx')]: `
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Logo
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/about" className="hover:text-blue-600">About</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;`,

    // Pages
    [path.join(srcDir, 'pages', 'HomePage', 'HomePage.jsx')]: `
import React from 'react';
import Hero from './components/Hero';
import Features from './components/Features';

const HomePage = () => {
  return (
    <div className="space-y-8">
      <Hero />
      <Features />
    </div>
  );
};

export default HomePage;`,

    [path.join(srcDir, 'pages', 'HomePage', 'components', 'Hero.jsx')]: `
import React from 'react';
import Button from '../../../components/Button/Button';

const Hero = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our App</h1>
      <p className="mb-6">Start building something amazing</p>
      <Button onClick={() => console.log('Get Started clicked')}>
        Get Started
      </Button>
    </div>
  );
};

export default Hero;`,

    [path.join(srcDir, 'pages', 'HomePage', 'components', 'Features.jsx')]: `
import React from 'react';

const Features = () => {
  const features = [
    { title: 'Feature 1', description: 'Description 1' },
    { title: 'Feature 2', description: 'Description 2' },
    { title: 'Feature 3', description: 'Description 3' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;`,
  };

  // Create the directories
  for (let folder of folders) {
    await fs.ensureDir(path.join(srcDir, folder));
  }

  // Create the files
  for (let filePath in files) {
    await fs.outputFile(filePath, files[filePath].trim());
  }

  // Update package.json to add required dependencies
  console.log('Adding required dependencies...');
  const dependencies = [
    '@reduxjs/toolkit',
    'react-redux',
    'react-router-dom',
    'axios'
  ];

  try {
    execSync(`npm install ${dependencies.join(' ')}`, { stdio: 'inherit' });
  } catch (error) {
    console.warn('Warning: Could not install additional dependencies automatically.');
    console.log('Please manually install: ' + dependencies.join(', '));
  }

  console.log('File structure created successfully!');
}

module.exports = { generateStructure };
