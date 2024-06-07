# Medicare Diagnostic Center Management System

## Objective
Develop a robust Diagnostic Center Management System for Medicare, a full-stack web application that effectively manages appointments, patient records, test results, and administrative tasks for a diagnostic center.

## Features

### 1. User Authentication and Profile Management
- **User Authentication**: Secure email/password login implemented using Firebase Authentication.
- **User Registration**: Users can register with their email, name, avatar (uploaded via imageBB), blood group, district, upazila, password, and confirm password.
  - **User Status**: Every user has a default status of "active". Admins can block users, changing their status to "blocked".
- **Login Page**: Registered users can log in using their email and password.

### 2. User Dashboard (private🔒)
- **Redirection**: Upon successful login, users are redirected to the user dashboard.
- **Dashboard Features**:
  - **My Profile**: Users can view and edit their profile details.
  - **My Upcoming Appointments**: Users can view a list of upcoming appointments, with options to cancel them.
  - **Test Results**: Users can view, download, or print their test results.

### 3. Homepage
- **Navbar**: Dynamic routes based on login status (admin/user). Private routes are hidden if the user is not logged in.
- **Dynamic Banner**: Admin-uploaded banners are displayed based on `isActive=true` status. Banners include title, image, text, coupon code, discount rate, etc.
  - **Navigation Button**: Button to navigate to the 'All Tests' page.
- **Featured Tests and Promotions**: Display most booked tests and static promotions.
- **Personalized Recommendations**: Slider displaying health tips, preventive measures, or upcoming tests suggested by healthcare professionals.
- **Footer**: Displays relevant information.

### 4. All Tests Page
- **Display Tests**: Available tests are displayed with details such as image, available dates, slots, title, and short description.
- **Search Feature**: Users can filter tests by date.
- **Test Details**: Detailed view of the test via a button.

### 5. Details Page
- **Test Details**: Detailed information of a test is displayed.
- **Booking**: Users can book tests if available slots > 0.
  - **Booking Details**: Default report status is "pending".
  - **Payment**: Popup for payment, including promocode application and Stripe payment integration.

### 6. Admin Dashboard
- **User Management**:
  - Admins can view all users.
  - Admins can view user details in a modal.
  - Admins can change user status (active/blocked).
  - Admins can change user roles to admin.
- **Test Management**:
  - **Add Test**: Admins can add new tests with details (name, image URL, details, price, date, slots).
  - **View Tests**: Display all tests in table format.
  - **Update/Delete Test**: Admins can update or delete test data.
  - **View Reservations**: Admins can view all reservations under a specific test.
- **Reservation Management**:
  - Search reservations by user email.
  - Cancel reservations.
  - Submit test results, changing report status to "delivered".
- **Banner Management**:
  - Add new banners with details (name, image, title, description, coupon code, coupon rate, `isActive` status).
  - View all banners in table format.
  - Delete banners.
  - Activate one banner for display on the homepage.

### Bonus Features
- Implemented JWT for enhanced security.
- Pagination in the "All Tests" page.
- Designed three additional relevant pages with proper text content.

## Live Preview
[Live Preview](https://medicare-client-dcdfd.web.app/) : [(https://medicare-client-dcdfd.web.app/)](https://medicare-client-dcdfd.web.app/) 



