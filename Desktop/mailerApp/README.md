#  UI Project

A React-based UI project for managing contacts, composing, and sending emails. Built with **React**, **Tailwind CSS**, and **React Router DOM**.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [ Components](#pages--components)
- [Setup](#setup)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Updates & Changes](#updates--changes)
- [Author](#author)


## Features

- User registration with a standalone page
- Contact management table with avatars
- Compose and send emails
- Sidebar navigation and topbar for all pages except registration
- Responsive UI using Tailwind CSS
- Navigation handled with React Router DOM
- Logout button redirects to the registration page


## Project Structure
src/ ├─ assets/          # Images and logos ├─ components/      # React components │  ├─ ComposeMails.jsx │  ├─ SendMails.jsx │  ├─ ContactsTable.jsx │  ├─ RegisterForm.jsx │  ├─ Sidebar.jsx │  └─ Layout.jsx ├─ App.jsx           # Main app routing ├─ index.css         # Tailwind CSS imports └─ index.js

## Technologies Used
React 19
React Router DOM
Tailwind CSS
Lucide React (icons)
PostCSS & Autoprefixer
## Updates & Changes
Implemented Layout component with Topbar and Sidebar
Made RegisterForm standalone page
Logout button navigates to RegisterForm
Fixed ComposeMails, SendMails, and ContactsTable rendering issues
Fixed Tailwind CSS setup and PostCSS configuration
Corrected JSX syntax and applied proper styling
Updated routing for React Router DOM
Ensured all pages display correctly with sidebar and layout