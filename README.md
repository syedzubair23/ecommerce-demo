# E-commerce Demo - Mindwhiz

A full-stack e-commerce module built with **Next.js**, **Node.js/TypeScript**, and **MongoDB**.

## 🚀 Quick Start

### 1. Environment Setup
Create a `.env` file in the `backend` directory and a `.env.local` file in the `frontend` directory.

**Backend (.env)**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5231
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_BASE_URL=http://localhost:5231
```

### 2. Install & Run
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

### 3. Seed Database
```bash
cd backend
npm run seed
```

## 🏗️ Architecture & Design Choices

### 1. Database: MongoDB & Cloud Atlas
We chose **MongoDB** for its flexible schema, which is ideal for product catalogs where items might have varying attributes. **Cloud Atlas** provides a reliable, distributed database layer that is easy to set up and scale without manual server management.

### 2. Speed: Pagination & Performance
To ensure the application remains fast even as the catalog grows, we implemented **backend pagination** for the product listing. This reduces payload sizes and speeds up initial page loads.

### 3. User Flow & Security
-   **Authentication Enforcement**: The Home page is protected; unauthenticated users are redirected to the Login page to ensure data privacy.
-   **RBAC (Role-Based Access Control)**: We implemented roles (Admin and Customer). Admins have exclusive access to the "Add Product" functionality, while Customers have a view-only experience.
-   **Session Management**: Logged-in users see a personalized Navbar with a Logout option, while guests see Login/Signup options, making the flow intuitive.

### 4. Code Quality & Styling
-   **CSS Modules**: We refactored all styles into scoped CSS modules to prevent style leakage and maintain a clean, standardized UI.
-   **API Layer**: A centralized service layer handles all asynchronous requests, including automatic JWT injection into headers.

## 🧪 Testing
Run `npm test` in the `backend` directory to execute unit tests for the product API. The tests are written with a clear ARRANGE-ACT-ASSERT structure for better maintainability.

### 5. Screenshots
![Login](./login.png)
![Signup](./signup.png)
![Product Listing](./product-listing.png)
![Add New Product](./add-new-product.png)
![View Product Details](./view-product-details.png)
![New Product Listing](./new-product-listing.png)
