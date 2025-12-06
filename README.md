# CampusConnect

**Your One-Stop Shop for Student Life**

A full-stack web application that serves as a comprehensive marketplace and communication platform for university students. Built with modern technologies to facilitate buying, selling, and connecting within the campus community.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Team](#team)
- [License](#license)

---

## Overview

**CampusConnect** is a student-focused platform designed to streamline campus life by providing a secure marketplace for buying and selling products and services, real-time messaging capabilities, comprehensive analytics for tracking transactions, and an administrative dashboard for platform management.

### Course Information

- **CSIT321G2** - Application Development
- **CSIT340** - Industry Elective 1

### Project Location

```
x:\campusconnect
```

---

## Features

### Authentication System

- Secure login and logout functionality
- University email verification for user registration
- JWT-based token authentication
- Protected routes with role-based access control
- Session management and token refresh

### E-commerce Marketplace

- Product and service listings with detailed descriptions and images
- Comprehensive buy and sell functionality
- Advanced search and filtering capabilities
- Category-based product organization
- Transaction history and management
- Real-time inventory updates

### Direct Messaging

- Real-time communication between buyers and sellers
- WebSocket-based messaging infrastructure
- Message history and conversation threads
- Instant notification system
- Online status indicators

### Administrative Dashboard

- Comprehensive platform activity overview
- User account management and moderation
- Content moderation tools and workflows
- Advanced analytics and reporting:
  - Active listings monitoring
  - Popular category analysis
  - User engagement metrics
  - Transaction volume tracking
  - Revenue analytics

### Student Analytics

- Personal sales tracking
- Service booking statistics
- Total earnings calculation
- Transaction history visualization
- Performance metrics over time

---

## Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | User Interface Framework |
| Vite | 5.4.8 | Build Tool and Development Server |
| Material-UI | 6.1.10 | Component Library and Design System |
| React Router DOM | 6.28.0 | Client-side Routing |
| Axios | 1.7.7 | HTTP Client for API Communication |
| Chart.js | 4.4.6 | Data Visualization and Analytics |
| React Chart.js 2 | 5.2.0 | React Wrapper for Chart.js |
| STOMP.js | 7.0.0 | WebSocket Client Protocol |
| SockJS Client | 1.6.1 | WebSocket Fallback Support |
| JWT Decode | 4.0.0 | JWT Token Parsing |
| React Hook Form | 7.53.2 | Form Management and Validation |
| Lottie Web | 5.12.2 | Animation Library |
| Emotion | 11.13.3 | CSS-in-JS Styling |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Spring Boot | 3.3.4 | Application Framework |
| Java | 17 | Programming Language |
| Spring Security | Latest | Authentication and Authorization |
| Spring Data JPA | Latest | Data Access and ORM |
| Hibernate | Latest | JPA Implementation |
| MySQL Connector | Latest | Database Driver |
| JWT (jjwt) | 0.12.6 | JSON Web Token Implementation |
| Spring Boot Actuator | Latest | Application Monitoring |
| Spring Cloud | 2023.0.3 | Cloud-native Features |
| Maven | Latest | Build and Dependency Management |

### Development Tools

| Tool | Purpose |
|------|---------|
| IntelliJ IDEA | Recommended IDE |
| ESLint | JavaScript Linting |
| Maven | Backend Dependency Management |
| npm | Frontend Package Management |
| Git | Version Control |

---

## Architecture

### Frontend Architecture

The frontend follows a component-based architecture with the following key principles:

- **Component Modularity**: Reusable React components organized by feature
- **State Management**: React Context API for global state management
- **Routing Strategy**: Single Page Application (SPA) with React Router
- **API Communication**: Centralized Axios configuration for REST API calls
- **Real-time Communication**: WebSocket integration using STOMP protocol over SockJS
- **Responsive Design**: Mobile-first approach using Material-UI components
- **Code Splitting**: Lazy loading for optimized bundle sizes

### Backend Architecture

The backend implements a layered architecture pattern:

#### Controller Layer
- Handles HTTP requests and responses
- Request validation and data binding
- REST API endpoint definitions
- Exception handling

#### Service Layer
- Business logic implementation
- Transaction management
- Data transformation
- Service orchestration

#### Repository Layer
- Data access abstraction
- JPA repository interfaces
- Custom query implementations
- Database operations

#### Entity Layer
- JPA entity definitions
- Database table mappings
- Relationship configurations
- Validation constraints

#### Security Layer
- JWT token generation and validation
- Authentication filters
- Authorization rules
- CORS configuration

#### DTO Layer
- Data transfer objects
- Request/Response models
- Data validation rules

#### Utility Layer
- Helper functions
- Common utilities
- Constants and enumerations

---

## Project Structure

```
campusconnect/
│
├── frontend/                           # React Application
│   ├── src/
│   │   ├── components/                # React Components
│   │   │   ├── authentication/        # Login, Register, Password Reset
│   │   │   ├── landingpage/           # Landing Page Components
│   │   │   ├── Product_Listing/       # Product Display Components
│   │   │   ├── product/               # Product Management
│   │   │   ├── userprofile/           # User Profile Components
│   │   │   ├── registration/          # Registration Flow
│   │   │   ├── shared-theme/          # Shared UI Theme Components
│   │   │   └── ProtectedRoute.jsx     # Route Protection HOC
│   │   │
│   │   ├── dashboard-toolpad/         # Admin Dashboard
│   │   │   ├── components/            # Dashboard Components
│   │   │   ├── layouts/               # Dashboard Layouts
│   │   │   └── pages/                 # Dashboard Pages
│   │   │
│   │   ├── context/                   # React Context Providers
│   │   ├── assets/                    # Static Assets (Images, Icons)
│   │   ├── dev/                       # Development Utilities
│   │   ├── App.jsx                    # Main Application Component
│   │   ├── App.css                    # Application Styles
│   │   ├── main.jsx                   # Application Entry Point
│   │   └── index.css                  # Global Styles
│   │
│   ├── public/                        # Public Static Files
│   ├── node_modules/                  # Node Dependencies
│   ├── package.json                   # NPM Configuration
│   ├── package-lock.json              # NPM Lock File
│   ├── vite.config.js                 # Vite Configuration
│   ├── eslint.config.js               # ESLint Configuration
│   ├── index.html                     # HTML Template
│   ├── .gitignore                     # Git Ignore Rules
│   └── README.md                      # Frontend Documentation
│
├── backend/                            # Spring Boot Application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/teamnullpointer/campusconnect/
│   │   │   │   ├── controller/        # REST API Controllers
│   │   │   │   ├── service/           # Business Logic Services
│   │   │   │   │   └── impl/          # Service Implementations
│   │   │   │   ├── repository/        # JPA Repositories
│   │   │   │   ├── entity/            # JPA Entity Classes
│   │   │   │   ├── DTO/               # Data Transfer Objects
│   │   │   │   ├── security/          # Security Configuration
│   │   │   │   ├── config/            # Application Configuration
│   │   │   │   ├── response/          # API Response Models
│   │   │   │   └── util/              # Utility Classes
│   │   │   │
│   │   │   └── resources/             # Application Resources
│   │   │       ├── application.properties
│   │   │       └── static/            # Static Resources
│   │   │
│   │   └── test/                      # Test Classes
│   │
│   ├── target/                        # Build Output
│   ├── .mvn/                          # Maven Wrapper
│   ├── pom.xml                        # Maven Configuration
│   ├── mvnw                           # Maven Wrapper Script (Unix)
│   ├── mvnw.cmd                       # Maven Wrapper Script (Windows)
│   ├── .gitignore                     # Git Ignore Rules
│   ├── .gitattributes                 # Git Attributes
│   └── README.md                      # Backend Documentation
│
└── README.md                          # Project Documentation (This File)
```

---

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

- **Java Development Kit (JDK)** 17 or higher
  - Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://openjdk.org/)
  - Verify installation: `java -version`

- **Node.js** 16 or higher
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node -v`

- **npm** 8 or higher (comes with Node.js)
  - Verify installation: `npm -v`

- **MySQL** 8.0 or higher
  - Download from [mysql.com](https://dev.mysql.com/downloads/)
  - Ensure MySQL service is running

- **Git** for version control
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Recommended Software

- **IntelliJ IDEA** (Community or Ultimate Edition)
  - Download from [jetbrains.com](https://www.jetbrains.com/idea/)
  - Alternative: Eclipse, VS Code, or any Java IDE

- **MySQL Workbench** for database management
  - Download from [mysql.com](https://dev.mysql.com/downloads/workbench/)

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/pawekz/campusconnect.git
cd campusconnect
```

### Step 2: Database Setup

1. Start your MySQL server

2. Create the database:

```sql
CREATE DATABASE campusconnect;
```

3. (Optional) Create a dedicated database user:

```sql
CREATE USER 'campusconnect_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON campusconnect.* TO 'campusconnect_user'@'localhost';
FLUSH PRIVILEGES;
```

### Step 3: Backend Setup

#### Using IntelliJ IDEA

1. Open IntelliJ IDEA
2. Select **File** → **Open** and navigate to the `campusconnect` directory
3. Click **Open**
4. When prompted, click **Load Maven Project** or **Trust Project**
5. Wait for Maven to download all dependencies (this may take a few minutes)
6. IntelliJ will automatically configure the project

#### Using Command Line

```bash
cd backend
./mvnw clean install
```

On Windows:
```cmd
cd backend
mvnw.cmd clean install
```

### Step 4: Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

If you encounter any issues, try:

```bash
npm install --legacy-peer-deps
```

---

## Configuration

### Backend Configuration

The backend requires environment variables for database connectivity and application settings.

#### Using IntelliJ IDEA

1. Go to **Run** → **Edit Configurations**
2. Select **CampusconnectApplication** (or create a new Spring Boot configuration)
3. In the **Environment variables** field, add the following (adjust values as needed):

```
LOGGING_LEVEL_ROOT=INFO;SERVER_PORT=8080;SPRING_APPLICATION_NAME=campusconnect;SPRING_DATASOURCE_PASSWORD=your_mysql_password;SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/campusconnect;SPRING_DATASOURCE_USERNAME=your_mysql_username;SPRING_JPA_HIBERNATE_DDL_AUTO=update;SPRING_JPA_SHOW_SQL=true
```

#### Environment Variable Breakdown

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `LOGGING_LEVEL_ROOT` | Application logging level | `INFO` |
| `SERVER_PORT` | Backend server port | `8080` |
| `SPRING_APPLICATION_NAME` | Application identifier | `campusconnect` |
| `SPRING_DATASOURCE_URL` | Database connection URL | `jdbc:mysql://localhost:3306/campusconnect` |
| `SPRING_DATASOURCE_USERNAME` | Database username | `root` or `campusconnect_user` |
| `SPRING_DATASOURCE_PASSWORD` | Database password | Your MySQL password |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | Schema generation strategy | `update` |
| `SPRING_JPA_SHOW_SQL` | Show SQL queries in logs | `true` or `false` |

#### Using application.properties (Alternative)

You can also create an `application.properties` file in `backend/src/main/resources/`:

```properties
# Server Configuration
server.port=8080
spring.application.name=campusconnect

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/campusconnect
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Logging Configuration
logging.level.root=INFO
logging.level.com.teamnullpointer.campusconnect=DEBUG
```

### Frontend Configuration

The frontend is pre-configured to connect to the backend at `http://localhost:8080`.

If you need to change the API base URL, create or modify the Axios configuration file.

---

## Running the Application

### Starting the Backend

#### Method 1: Using IntelliJ IDEA

1. Locate the **CampusconnectApplication** run configuration in the top-right corner
2. Click the green **Run** button (or press `Shift + F10`)
3. The application will start, and you should see logs in the Run window
4. Wait for the message: `Started CampusconnectApplication in X seconds`

#### Method 2: Using Command Line

```bash
cd backend
./mvnw spring-boot:run
```

On Windows:
```cmd
cd backend
mvnw.cmd spring-boot:run
```

The backend server will start at: **http://localhost:8080**

### Starting the Frontend

Open a new terminal window and run:

```bash
cd frontend
npm run dev
```

The frontend development server will start at: **http://localhost:5173** (or the next available port)

You should see output similar to:
```
VITE v5.4.8  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Accessing the Application

1. Open your web browser
2. Navigate to **http://localhost:5173**
3. You should see the CampusConnect landing page

---

## Development

### Development Workflow

1. **Backend Development**:
   - Make changes to Java files
   - Spring Boot DevTools will automatically reload the application
   - Check logs in IntelliJ or terminal

2. **Frontend Development**:
   - Make changes to React components
   - Vite will automatically hot-reload the browser
   - Check browser console for errors

### Available Scripts

#### Frontend Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

#### Backend Scripts

| Command | Description |
|---------|-------------|
| `./mvnw spring-boot:run` | Start the Spring Boot application |
| `./mvnw clean install` | Clean and build the project |
| `./mvnw test` | Run all unit and integration tests |
| `./mvnw clean package` | Create executable JAR file |
| `./mvnw dependency:tree` | Display dependency tree |

### Building for Production

#### Frontend Production Build

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `frontend/dist/` directory with:
- Minified JavaScript and CSS
- Optimized assets
- Source maps for debugging

To preview the production build:
```bash
npm run preview
```

#### Backend Production Build

```bash
cd backend
./mvnw clean package
```

This creates an executable JAR file in `backend/target/campusconnect-0.0.1-SNAPSHOT.jar`

To run the production JAR:
```bash
java -jar target/campusconnect-0.0.1-SNAPSHOT.jar
```

---

## API Documentation

The backend exposes RESTful APIs at the base URL: **http://localhost:8080/api/**

### Authentication Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | Register new user | None |
| POST | `/api/auth/login` | User login | None |
| POST | `/api/auth/logout` | User logout | Required |
| POST | `/api/auth/refresh` | Refresh JWT token | Required |
| POST | `/api/auth/verify-email` | Verify email address | None |

### User Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/users/profile` | Get user profile | Required |
| PUT | `/api/users/profile` | Update user profile | Required |
| GET | `/api/users/{id}` | Get user by ID | Required |
| DELETE | `/api/users/{id}` | Delete user account | Required (Admin) |

### Product Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/products` | List all products | None |
| GET | `/api/products/{id}` | Get product details | None |
| POST | `/api/products` | Create new product | Required |
| PUT | `/api/products/{id}` | Update product | Required (Owner) |
| DELETE | `/api/products/{id}` | Delete product | Required (Owner) |
| GET | `/api/products/search` | Search products | None |
| GET | `/api/products/category/{category}` | Get products by category | None |

### Message Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/messages` | Get user messages | Required |
| POST | `/api/messages` | Send message | Required |
| GET | `/api/messages/conversation/{userId}` | Get conversation | Required |
| DELETE | `/api/messages/{id}` | Delete message | Required |

### Admin Endpoints

| Method | Endpoint | Description | Authentication |
|--------|----------|-------------|----------------|
| GET | `/api/admin/dashboard` | Get dashboard data | Required (Admin) |
| GET | `/api/admin/users` | List all users | Required (Admin) |
| PUT | `/api/admin/users/{id}/status` | Update user status | Required (Admin) |
| GET | `/api/admin/analytics` | Get platform analytics | Required (Admin) |
| POST | `/api/admin/moderate/{contentId}` | Moderate content | Required (Admin) |

### WebSocket Endpoints

| Endpoint | Description |
|----------|-------------|
| `/ws` | WebSocket connection endpoint |
| `/topic/messages` | Subscribe to messages |
| `/app/chat` | Send chat messages |

---

## Security

### Authentication Flow

1. User registers with university email
2. Email verification link sent
3. User verifies email and logs in
4. Server generates JWT access token
5. Client stores token (localStorage/sessionStorage)
6. Client includes token in Authorization header for protected requests
7. Server validates token on each request

### Security Features

- **Password Encryption**: BCrypt hashing algorithm
- **JWT Tokens**: Stateless authentication with configurable expiration
- **CORS Configuration**: Controlled cross-origin resource sharing
- **SQL Injection Prevention**: JPA parameterized queries
- **XSS Protection**: Input sanitization and validation
- **CSRF Protection**: Token-based CSRF prevention
- **Role-Based Access Control**: Admin and user roles
- **Secure Headers**: Security headers configured in Spring Security

### Best Practices

- Never commit sensitive credentials to version control
- Use environment variables for configuration
- Regularly update dependencies for security patches
- Implement rate limiting for API endpoints
- Use HTTPS in production environments
- Implement proper session timeout
- Regular security audits and penetration testing

---

## Troubleshooting

### Backend Issues

#### Application won't start

**Problem**: Backend fails to start or crashes immediately

**Solutions**:
- Verify MySQL service is running
- Check database credentials in environment variables
- Ensure port 8080 is not already in use
- Try reloading the Maven project in IntelliJ
- Check Java version: `java -version` (should be 17+)
- Review application logs for specific errors

#### Database connection errors

**Problem**: Cannot connect to MySQL database

**Solutions**:
- Verify MySQL is running: `mysql --version`
- Check database exists: `SHOW DATABASES;`
- Verify credentials are correct
- Ensure MySQL is listening on port 3306
- Check firewall settings
- Try connecting with MySQL Workbench to verify credentials

#### Port already in use

**Problem**: `Port 8080 is already in use`

**Solutions**:
- Stop other applications using port 8080
- Change the port in environment variables
- On Windows: `netstat -ano | findstr :8080` to find the process
- On Linux/Mac: `lsof -i :8080` to find the process

### Frontend Issues

#### Development server won't start

**Problem**: `npm run dev` fails or crashes

**Solutions**:
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`
- Try using `npm install --legacy-peer-deps`
- Check Node.js version: `node -v` (should be 16+)
- Ensure port 5173 is available

#### Build errors

**Problem**: `npm run build` fails

**Solutions**:
- Check for TypeScript/ESLint errors
- Ensure all dependencies are installed
- Clear Vite cache: Delete `.vite` folder
- Check for circular dependencies
- Review build logs for specific errors

#### API connection issues

**Problem**: Frontend cannot connect to backend

**Solutions**:
- Verify backend is running on port 8080
- Check browser console for CORS errors
- Verify API base URL configuration
- Check network tab in browser DevTools
- Ensure no proxy/firewall blocking requests

### Common Issues

#### Maven dependency download fails

**Problem**: Maven cannot download dependencies

**Solutions**:
- Check internet connection
- Clear Maven cache: Delete `.m2/repository` folder
- Try using a different Maven repository mirror
- Check corporate proxy settings

#### Hot reload not working

**Problem**: Changes not reflecting automatically

**Solutions**:
- **Frontend**: Restart Vite dev server
- **Backend**: Ensure Spring Boot DevTools is enabled
- Check file watchers in IDE settings
- Disable antivirus temporarily to test

#### Database schema issues

**Problem**: Entity/table mismatch errors

**Solutions**:
- Set `spring.jpa.hibernate.ddl-auto=create` temporarily (WARNING: drops tables)
- Manually update database schema
- Use database migration tools (Flyway/Liquibase)
- Check entity annotations

---

## Team

**Team NullPointer**

| Name | Role | Responsibilities |
|------|------|------------------|
| Paulo Carabuena | Developer | Full-stack Development / Team Leader |
| Neil Adrian Bas | Developer | Full-stack Development |
| Jenelyn Mendoza | Developer | Full-stack Development |

### Contact

For questions or support, please contact the development team through the university portal.

---

## License

This project is developed as part of academic coursework for:
- **CSIT321G2** - Application Development
- **CSIT340** - Industry Elective 1

All rights reserved by Team NullPointer and the respective university.

---

## Acknowledgments

This project was built using the following open-source technologies and resources:

### Frameworks and Libraries
- Spring Framework and Spring Boot Team
- React Core Team
- Vite Team
- Material-UI (MUI) Team

### Documentation and Resources
- Spring Boot Documentation
- React Documentation
- MySQL Documentation
- MDN Web Docs

### Community
- Stack Overflow Community
- GitHub Open Source Community
- All contributors to the dependencies used in this project

---

**Last Updated**: November 2025

**Version**: 0.0.1-SNAPSHOT
