


# FinApp

FinApp is a comprehensive financial application that provides users with the ability to manage their stock portfolios, view stock details, and perform various financial operations. The application is built using a .NET backend and a React frontend.

## Table of Contents
- [Screen_Shot](#ScreenShots)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)

## ScreenShots
**Login Page**:
<img width="1895" height="894" alt="image" src="https://github.com/user-attachments/assets/1fb1d34b-d636-40da-ad83-709edbecfdb9" />
**Home Page**:
<img width="1095" height="882" alt="image" src="https://github.com/user-attachments/assets/48f1aee2-6bec-4247-b99a-9b3382572215" />
**Portfolio Page**
<img width="1919" height="668" alt="image" src="https://github.com/user-attachments/assets/9fe188b4-e18a-4aec-b78c-c531a6ea8ca8" />
**Company details Page**
<img width="1882" height="784" alt="image" src="https://github.com/user-attachments/assets/91e08017-90a0-4f31-a306-6827061b7103" />

## Features

- User authentication and authorization
- Manage stock portfolios
- View detailed stock information
- Responsive design

## Technologies Used

- **Backend**: .NET 6, Entity Framework Core, SQL Server
- **Frontend**: React, TypeScript, React Router
- **Database**: SQL Server
- **Authentication**: ASP.NET Core Identity, JWT

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

- .NET 6 SDK
- Node.js
- SQL Server

## Backend Setup

1. Clone the repository:
  ```sh
  git clone https://github.com/yourusername/FinApp.git
  ```
2. Navigate to the backend directory:
  ```sh
  cd FinApp/api/BackEnd API
  ```
3. Update the database connection string in `appsettings.json`.
4. Apply migrations and update the database:
  ```sh
  dotnet ef database update
  ```
5. Run the backend server:
  ```sh
  dotnet run
  ```

## Frontend Setup

1. Navigate to the frontend directory:
  ```sh
  cd FinApp/frontend
  ```
2. Install NPM packages:
  ```sh
  npm install
  ```
3. Start the frontend development server:
  ```sh
  npm start
  ```

## Available Scripts

In the frontend project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

Ejects the configuration files and dependencies.

## API Endpoints

### Authentication

- `POST /api/auth/login`: User login
- `POST /api/auth/register`: User registration

### Stocks

- `GET /api/stocks`: Get all stocks
- `GET /api/stocks/{id}`: Get stock by ID
- `POST /api/stocks`: Create a new stock
- `PUT /api/stocks/{id}`: Update a stock
- `DELETE /api/stocks/{id}`: Delete a stock

### Portfolios

- `GET /api/portfolio`: Get user portfolios
- `POST /api/portfolio`: Create a new portfolio
- `DELETE /api/portfolio/{symbol}`: Delete a portfolio
