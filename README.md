
<p align="center">
    <img src="src/EaseJournalLOGO_V1_vector.png" alt="logo">
</p>

<p align="center">
[EASE-JOURNAL]
</p>

# ease-journal-frontend
The frontend of a journaling application powered by OpenAI's GPT3, offering journaling insights and prompts based on the user's journal entries.

This project is built using React and integrates with a Flask backend to manage journal entries, users, and categories. The frontend utilizes React Router for navigation between different pages and Axios for API requests.

## Functionality of Each Page

### Home Page
- Displays a welcoming message or a brief overview of the application.

### Categories Page 
- Allows users to add a new category with title and user ID.
- Displays all categories available for journaling, including detailed information like category ID, category name, user ID, created date, and associated journals.

### Users Page
- Provides user login functionality with error handling for incorrect passwords or login issues.
- Displays a list of all current users and offers a feature for new user registration, including first name, last name, date of birth, and email fields.

### Journals Page
- Displays all journal entries submitted by users, with the ability to add new entries.
- Each journal entry includes detailed information such as timestamp, title, prompt, content, and last modification date.

### Login Page
- Offers users the ability to log in using their email and password. Includes error handling for incorrect login attempts.

### Register Page
- Allows new users to register by providing their first name, last name, date of birth, email, and password.

### Navigation Bar Includes
- **Home:** Navigates to the home page.
- **Categories:** Access to the Categories page for viewing or adding categories.
- **Users:** User management via the Users page.
- **Journals:** Viewing all journal entries through the Journals page.

## Setup and Run

- Clone the repository and navigate to the project directory.
- Run `npm install` to install all dependencies.
- Use `npm start` to launch the application in development mode.
- The app is accessible at `http://localhost:3000`.

## Building and Deployment

- Execute `npm run build` to prepare the app for production in the `build` folder.

## Flask API
This React frontend interacts with the Ease Journal Flask API for backend operations, including CRUD actions for journals, categories, and user management.

## Contributing
Contributions are welcome. For enhancements or features, please check the issues section or create a new issue or pull request.

## Recent Updates

- Enhanced category management including user-specific categories.
- Improved error handling across login and registration forms.
- User authentication enhancements for security and usability.
- Performance optimizations for faster loading times and smoother user interactions.

Visit our GitHub repository for more information and ongoing updates.
