# Restaurant Management System

Welcome to the Restaurant Management System repository! This project is built using Nest.js and MongoDB, providing a comprehensive solution for restaurant management and geospatial querying.

## Features

- User Authentication: Register and login with role-based authentication.
- User Profile: Update user information and add favorite cuisines.
- Restaurant Management: Admins can add, update, and delete restaurants.
- Geospatial Querying: Find the nearest restaurant within a specified range (e.g., 1 km).

## Getting Started

Follow these steps to set up the project locally:

1. Clone the repository: `git clone https://github.com/yourusername/restaurant-management.git`
2. Navigate to the project directory: `cd restaurant-management`
3. Install dependencies: `npm install`
4. Create a `.env` file with your MongoDB database URL: `DataBaseUrl="your-database-url"`
5. Start the project: `npm start`

Access the API documentation at:

- [Postman API Documentation](https://documenter.getpostman.com/view/14303754/UVyuREXN)
  
## Project Structure

The project follows the Model-View-Controller (MVC) design pattern for a well-organized codebase. Key directories include:

- `controllers/`: Handles API requests and responses.
- `dtos/`: Data Transfer Objects for validation.
- `middleware/`: Custom middleware for request processing.
- `modules/`: Feature modules encapsulating related functionality.
- `services/`: Business logic and database interactions.
- `utils/`: Utility functions and helpers.

## Geospatial Querying

The project leverages MongoDB's geospatial capabilities to find the nearest restaurant. The logic is optimized to efficiently retrieve restaurants within a specified distance.

## Role-Based Authentication

The system uses role-based guards to control access to certain routes. Admins have special privileges for restaurant management.

## Validation and Error Handling

Incoming data is validated using DTOs (Data Transfer Objects) and class-validator. Custom exception filters ensure proper error handling.


---

Feel free to explore the code and documentation for a deeper understanding of the project's capabilities and implementation details.
