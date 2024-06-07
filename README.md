# Gobananas

## Overview
This is a React application that displays users and posts using Material-UI components and the DataGrid from `@mui/x-data-grid`. The application includes features such as searching, sorting, pagination, and a dark mode toggle.

## Features
- Display users and posts in a table format using DataGrid.
- Search functionality to filter the list.
- Sorting on different fields.
- Pagination for managing large data sets.
- Modal to show detailed information.
- Dark mode toggle.

## Getting Started

### Prerequisites
- Node.js (>=14.x)
- npm (>=6.x) or yarn (>=1.x)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/ravi0js/gobananas-app.git
    cd gobananas-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

 3. Running the Application
    ```bash
    npm start
    ```
## Project Structure
```bash
   src/
   components/
      PostList.js: Component to display and manage posts using DataGrid.
      UserList.js: Component to display and manage users using DataGrid.
      Footer.js: Footer component to display information.
      ThemeContext.js: Context for managing dark mode.
   api/
      index.js: API functions to fetch users and posts.
   App.js: Main application component.
   index.js: Entry point of the application.
```
### Hosted Link:
https://gobananas-intern.netlify.app/
