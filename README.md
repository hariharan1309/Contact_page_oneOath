This React component is a simple and customizable contact form built using Vite, React, and Tailwind CSS. It allows users to input their first name, last name, email, phone number, and a message, and then submits the form data to a specified Google Apps Script URL.

Installation
Make sure you have Node.js and npm installed on your machine.

Clone the repository:
```git clone <repository-url>```

Change into the project directory:
```cd <project-directory>```

Install dependencies:
```npm install```

Start the development server:
```npm run dev```

This will open the development server on http://localhost:3000 by default.

Usage :

-> The form collects information such as first name, last name, email, phone number, and a message.

-> Validation is performed for each input field, ensuring that valid data is entered. Invalid entries trigger error messages.

-> The form includes a hidden honeypot field to prevent spam submissions.

-> Upon successful submission, the form data is sent to the specified Google Apps Script URL.

Loading, success, and error states are displayed to provide feedback to the user during form submission.

Built With
Vite - Next Generation Frontend Tooling
React - A JavaScript library for building user interfaces
Tailwind CSS - A utility-first CSS framework
