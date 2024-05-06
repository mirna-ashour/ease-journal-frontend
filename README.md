
<p align="center">
    <img src="src/EaseJournalLOGO_V1_vector.png" alt="logo">
</p>

<p align="center">
<strong>[EASE-JOURNAL]</strong>
</p>

# Ease Journal Frontend

The frontend of a journaling application powered by OpenAI's GPT-3, offering journaling insights and prompts based on the user's journal entries.

This project is built using React and integrates with a Flask backend to manage journal entries, users, and categories. The frontend utilizes React Router for navigation between different pages and Axios for API requests.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: You will need Node.js to run the React application. Install it from [nodejs.org](https://nodejs.org/).
- **React**: After installing Node.js, install React by running `npm install react`.

## Installation

Follow these steps to get your development environment set up:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/ease-journal-frontend.git
   cd ease-journal-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   - On **Windows** using Ubuntu (WSL):
     ```bash
     cd /mnt/c/users/<your-username>/ease-journal-frontend
     ./cloud.sh
     ```
   - On **MacOS**:
     ```bash
     npm start
     ```

   The application will start running on `http://localhost:3000`.

## Usage

The application consists of several components, each responsible for different functionalities:

- **Home Page**: Displays the logged-in user's information and a logout button.
- **Categories Page**: Manage (add, update, delete) categories.
- **Users Page**: Manage (add, delete) users and show user details.
- **Journals Page**: Display and manage (add, delete) journal entries within a specific category.
- **Login Page**: For user authentication.
- **Register Page**: Allows new users to register.

### Navigating the Application

Use the navigation bar to move between different sections of the application. Depending on your current login status, you will have access to different functionalities.

## Building and Deployment

To prepare the app for production, execute the following command:
```bash
npm run build
```
This will create a `build` folder, optimized for deployment.

## Flask API

This React frontend interacts with the Ease Journal Flask API for backend operations, including CRUD actions for journals, categories, and user management.

## Contributing

Contributions are welcome! Please refer to the issues section on GitHub to report bugs or request features.

## Recent Updates

- Enhanced category management including user-specific categories.
- Improved error handling across login and registration forms.
- User authentication enhancements for security and usability.
- Performance optimizations for faster loading times and smoother user interactions.

For more information and ongoing updates, visit our GitHub repository.
