# Assignment Next JS - Courier Application Theme

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

- **CMS** (Content Management System) for managing content on the website.
- **Login and Logout functionality**, add server auth or google login and then save to cookies.
- **Admin Profile page** with the ability to edit email addresses, long names, phone numbers, and add profile photo. Profile photo should be uploaded to a CDN (such as Cloudinary), then its URL can be saved to JSON server database.
- **Manage addresses**: View a list of addresses.
- **Manage shippings**: View a list of shippings with sorting options based on size, category, payment, and status. Detailed information and reviews of each shipping can be viewed by clicking on it.
- Page to view **earnings reports** by month.
- Page to **Update shipping status**.
- **Manage promos**: View the list of promos with sorting options based on quota and expiration date. Ability to update a promo.
- Implement **search and pagination** for possible pages.

### Feature User Side

- **Login and Logout** functionality.
- **Profile page** with the ability to edit email addresses, long names, phone numbers, and add profile photo. Profile photo should be uploaded to a CDN (such as Cloudinary), then its URL can be saved to the database. User can use **their own** referral code to add balance ti their account.
- **Register page** with input fields for email, password, full name, phone number, and referral codes. A new user who registers using a referral code will get an additional balance of Rp. 50,000 after completing cumulative transactions amounting to Rp. 350,000. Existing users whose referral code is used are entitled to an additional balance of Rp. 25,000 when a new user has completed cumulative transactions of Rp. 500,000.
- **Shipping page** with input fields for package dimensions, weight, starting point address, category, add-ons, and shipping address. Calculate shipping price statically using static data (e.g: Jakarta to Bandung: Rp. 20,000. Bandung to Medan: Rp. 100,000) you can add static dummy data to contain the shipping price.
- **Shipping list page** to display created shippings and their status. Users can view shipping details and make payments.
- **Addresses page** to enter new shipping addresses. City and Province input fields will be used to determine the price of a shipment using a third-party API Raja Ongkir.
- **Address list page** to display created addresses.
- **Edit addresses page** to edit saved addresses.
- **Payments page** to make payments for a shipping. Users can choose which promotions to use (if available).
- **Top-up page** to top-up user balances. The minimum top-up is Rp. 10,000 and the maximum is Rp. 10,000,000.
- **Gacha game** feature to provide users with a chance to "win" account balance (top up) and player will gain a chance to play the game after completing a shipment.

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
- Implement a mock authentication flow using JSON Server for pages based on logged-in user.
- Upload images to an image sharing platform and save the image URL to the JSON Server.
- Ensure Mobile Responsive design.
- Deploy the web application

### Backend

- Create a REST API server using JSON Server.
- Define endpoints to fulfill application features with appropriate URL parameters, URL query, header, request body, response status, and response body.
- Document API for each endpoint.
- Simulate authentication and authorization flow using JSON Server.
