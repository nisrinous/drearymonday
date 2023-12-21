# Assignment Next JS - Events Application Theme

## Overview

For the Assignment Next.js, you will work individually to build the front end of an application using Next.js. There will be three different themes for the Assignment Next.js, each with a different set of application flow and requirements. Each project will have general requirements as a minimum, including Admin Panel, Client Side, List of Items, Search, Sorting, and Pagination, User Profile, Landing Page, Data Seeding, etc.

After developing the projects based on the requirements, you have to present your project in front of the trainers and the other trainees. The presentation will have the following guidelines:

- Presentation duration: maximum 15 minutes.
- Before starting the demonstration, show the git status of your project and switch to the latest commit before the deadline.
- App demonstration.
- Brief code explanation.
- Q&A session.

Important things that you have to keep in mind when you do the final project:

- Repository name: `assignment-nextjs-frontend-<yourname>`.
- Add `README.md` with instructions on how to run your app smoothly and include some useful information.
- Make frequent commits with meaningful commit messages.
- Only commits before the defined deadline will be accepted.
- It is better to review your own MR.
- Attach a screenshot of your test coverage to your MR description.
- You can use any component library for your front end.
- The objective of the requirement document is to explain briefly what the minimum requirements are when developing the product. You are still expected to develop your product with good common process practices, as well as good user experience with necessary validation, sorting, pagination, etc., even if it is not described in the document.
- Your application language should be presented in English.

## Application Features

### Features Admin Side

- CMS (Content Management System) for managing content on the website.
- Login and Logout functionality.
- Profile page.
- Manage users: View the user list (passwords are not displayed).
- Manage events: View the event list with sorting options based on start time, duration, price, and category name. Ability to create a new event with information including name, image, description, start time, duration, ticket price, capacity, and category. Event images can be stored in the database as BLOBs. Ability to edit events.
- View a list of participants who participated in an event along with the payment status of those participants.
- View earnings reports by month, including the results of merchandise sales.
- Manage merchandise: View a list of merchandise with sorting options based on event, price, and stock. Ability to add new merchandise for an event with information including name, stock, price, and event id. Ability to edit merchandise.
- Implement search and pagination for possible pages.

### Feature User Side

- Login and Logout functionality.
- Profile page.
- Register page with input fields for email and passwords.
- Membership page for increasing the user's membership level. Membership-level options are silver, gold, and platinum, with price of Rp. 200,000, Rp. 250,000, and Rp. 300,000. Membership is lifetime.
- Event list page to see available events with sorting options based on name, start time, duration, and category name. Ability to view event details and bookmark events.
- Bookmarked event list page to display bookmarked events with the option to view event details, make payments, and delete previously bookmarked events.
- Merchandise purchase page ony appear after buying selected event for special merchandise related to an event. Users can choose merchandise, add to cart, and make a payment (checkout).
- Payments page for making payments to participate in an event. Users get a fee discount of 10% (silver member), 15% (gold member), and 20% (platinum member) for every purchase event & merchandise.
- Purchase history page to view the history of previous purchases.
- Top-up page for topping up user balances.
- Implement search and pagination for possible pages.

## Technical Requirements

### Frontend

- Using Next JS (with Typescript).
- Separate clients for users with the User role and users with the Admin role.
- Use state management like Redux, Zustand, or Redux toolkit for both user and admin sites.
- Ensure every page is reactive and does not require a website refresh to change the display.
- Use server-side rendering, static generation, or Incremental Static Regeneration appropriately.
- Utilize CSS modules, frameworks, or style components (SCSS, styled-components).
- Create reusable components like Table, TableRow/TableItem, Form (Add & Edit in one form), Button, footer, and Card/Item.
- Communicate with JSON Server via REST API for frontend-backend communication.
- Implement a mock authentication flow using JSON Server Auth / google login for pages based on logged-in user.
- Upload images to an cloudinary and save the image URL to the JSON Server.
- Ensure Mobile Responsive design.
- Deploy the web application

### Backend

- Create a REST API server using JSON Server.
- Define endpoints to fulfill application features with appropriate URL parameters, URL query, header, request body, response status, and response body.
- Document API for each endpoint.
- Simulate authentication and authorization flow using JSON Server.
