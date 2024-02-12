# ease-journal-frontend
The frontend of a journaling application powered by OpenAI's GPT3. Offers journaling insights and prompts based on the user's journal entries.

This project is built using React and integrates with a Flask backend to manage journal entries, users, and categories. The frontend utilizes React Router for navigation between different pages.

## Functionality of Each Page

### Home Page
- Displays a welcoming message or a brief overview of the application.

### Categories Page 
- Displays all categories available for journaling.
- Allows users to add a new category to categorize their journal entries.

### Users Page
- Displays a list of all current users of the application.
- Provides a feature to add a new user, facilitating user management and personalization of journal entries.

### Journals Page
- Displays all journal entries submitted by users.
- Users can view their past entries and gain insights from their journaling habits.

### Navigation Bar Includes
- **Home:** Navigates to the home page.
- **Categories:** Navigates to the Categories page where users can view or add categories.
- **Users:** Navigates to the Users page for user management.
- **Journals:** Navigates to the Journals page to view all journal entries.

## Setup and Run

- Clone the repository and navigate into the project directory.
- Run `npm install` to install all required dependencies.
- Use `npm start` to run the application in development mode.
- Navigate to `http://localhost:3000` to view the app in your browser.

## Building and Deployment

- Run `npm run build` to build the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.

## Flask API
This React frontend interacts with the Ease Journal Flask API for backend operations. For more details on the backend, visit the [Ease Journal backend repository](https://github.com/mirna-ashour/ease-journal).

## Contributing
Contributions to the project are welcome! Please refer to the project's issues and pull requests for areas of improvement or feature additions.

