# WTWR (What to Wear)

[Live Demo](https://prneiderball.github.io/se_project_react/)  
[Repository](https://github.com/prneiderball/se_project_react/tree/main/wtwr)

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

- **Real-Time Weather Retrieval**: Fetches live weather information including temperature, condition, and day/night status.
- **Dynamic Clothing Recommendations**: Displays clothing items filtered by weather conditions (e.g., hot, warm, cold).
- **Item Management**: Users can add new clothing items with metadata (name, image URL, applicable weather types).
- **User Interaction**: “Like” feature for favorite items with state persistence.
- **Responsive Design**: Fully responsive layout for desktop and mobile viewports.

---

## Architecture and Technologies

- **React**: Functional components with Hooks (`useState`, `useEffect`) for UI and state management.
- **CSS Modules**: Scoped styling to avoid class name collisions and improve maintainability.
- **JavaScript (ES6+)**: Modern syntax, module imports/exports, and Promise-based API calls.
- **GitHub Pages**: Hosting and continuous deployment of the production build.
- **Utilities**: Custom `apiService.js` for encapsulating fetch logic; `constants.js` for static mappings (e.g., weather conditions).

---

## Installation

To run the application locally, ensure you have Node.js (v14+) and npm installed.

```bash
# Clone the repository
git clone https://github.com/prneiderball/se_project_react.git

# Change into the WTWR project directory
cd se_project_react/wtwr

# Install dependencies
npm install

# Start the development server
npm start

## Running the backend
The backend for this project is stored in this repo’s `backend` directory. To run it:
cd backend
npm install && npm run dev
