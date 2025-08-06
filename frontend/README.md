# WTWR (What to Wear)

[Live Demo](https://prneiderball.github.io/se_project_react/)  
[Repository](https://github.com/prneiderball/se_project_react/tree/main/wtwr)

---

## Structure

se_project_react/
│
└───wtwr/
├── public/ # Static assets and HTML template
├── src/
│ ├── components/ # Reusable React components (WeatherCard, CardList, etc.)
│ ├── utils/ # Utility modules (API.js, constants.js)
│ ├── styles/ # CSS module files
│ ├── App.jsx # Root application component
│ └── index.jsx # Entry point and ReactDOM.render
├── .gitignore
├── package.json
└── README.md # Project README

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Architecture and Technologies](#architecture-and-technologies)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Project Structure](#project-structure)
7. [Future Work](#future-work)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

---

## Project Overview

WTWR ("What to Wear") is a single-page React application that provides clothing recommendations based on current weather conditions in the user’s location. The application retrieves real-time weather data, processes temperature and condition values, and displays a curated set of clothing items appropriate for the forecast.

Key objectives:

- Demonstrate modular component design in React
- Illustrate asynchronous data fetching and state management
- Employ responsive and maintainable CSS styling via modules

---

## Features

- **Real-Time Weather Retrieval**: Fetches live weather information (temperature, condition, day/night) using a RESTful API interface.
- **Dynamic Clothing Recommendations**: Displays a collection of clothing items filtered by weather conditions (e.g., clear, cloudy, rain).
- **Item Management**: Allows users to add new clothing items with metadata (name, image URL, applicable weather types).
- **User Interaction**: Implements a “like” feature to mark favourite items and persists state locally.
- **Responsive Design**: Fully responsive layout for desktop and mobile viewports.

---

## Architecture and Technologies

- **React**: Functional components and Hooks (useState, useEffect) for UI and state management.
- **CSS Modules**: Scoped styling to avoid class name collisions and improve maintainability.
- **JavaScript (ES6+)**: Modern syntax, module imports/exports, and Promise-based API calls.
- **GitHub Pages**: Hosting and continuous deployment of the production build.
- **Utilities**: Custom `API.js` for encapsulating fetch logic; `constants.js` for static mappings (e.g., weather conditions).

---

## Installation

To run the application locally, ensure you have Node.js (v14+) and npm installed.

```bash
# Clone the repository
$ git clone https://github.com/prneiderball/se_project_react.git

# Change into the WTWR project directory
$ cd se_project_react/wtwr

# Install dependencies
$ npm install

# Start the development server
$ npm start

---
## Future Work
Authentication and Persistence: Integrate user accounts and backend storage for climates and favourites.

Enhanced Recommendations: Extend recommendation logic to include outfit combinations and accessory suggestions.

Offline Support: Implement caching strategies for offline access and Progressive Web App features.

UI Enhancements: Add theme toggles (dark/light mode) and accessibility improvements.
---
```
