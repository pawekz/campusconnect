# <span style="font-family: 'Arial', sans-serif; font-weight: bold; color: #2E8B57;">**Campus Connect**: Your One-Stop Shop for Student Life</span>


**CSIT321G2 - App Dev**<br>
**CSIT340 - Industry Elective 1****

**Members: <br>**
_Paulo Carabuena<br>
Neil Adrian Bas<br>
Jenelyn Mendoza<br>_

## Features

- **Secure Login/Logout**: University email verification for user authentication
- **E-commerce Marketplace**:
   - Basic product/service listings with descriptions and images
   - Simple buy/sell functionality
- **Direct Messaging**: Basic communication between buyers and sellers
- **Search Functionality**: Simple search to find products and services
- **CampusConnectDashboard (for admin)**:
   - Basic overview of platform activity
   - User account management
   - Basic content moderation
- **Analytics**:
   - **For Students**:
      - Number of items sold/services booked
      - Total earnings
   - **For Admin**:
      - Number of active listings
      - Most popular product/service categories


### Instructions for Setting Up the CampusConnect Project in IntelliJ IDEA on Windows

1. **Clone the repository by clicking `Get from VCS`**:
    - URL: `https://github.com/pawekz/campusconnect.git`

2. **IntelliJ IDEA will automatically download and install the Java dependencies listed in the `pom.xml` file, just click `Load Maven Project`**.

3. **Open the Terminal within IntelliJ IDEA** (`View` > `Tool Windows` > `Terminal`).

4. **Navigate to the frontend directory (if applicable)**:
    ```sh
    cd campusconnect-react
    ```

5. **Install JavaScript dependencies**:
    ```sh
    npm install
    ```

6. **Install axios**:
   ```sh
   npm install axios
   ```

7. **Install MUI**:
   ```sh
   npm install @mui/material @emotion/react @emotion/styled
   ```

7.1 **Install MUI Icons Material**
   ```sh
   npm install @mui/icons-material
   ```

8. **Install React Router DOM**
    ```sh
    npm install react-router-dom
    ```

8.1 **Install React Buddy IDE Toolbox**
   ```sh
   npm install @react-buddy/ide-toolbox
```


9 **In the `application.properties`, adjust the username / password**
```
spring.application.name=campusconnect

spring.datasource.url=jdbc:mysql://localhost:3306/campusconnect
spring.datasource.username=root
spring.datasource.password=Iamroot96
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=create
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```


10. **In the `Current File` the configurations `ReactJS` and `CampusconnectApplication` are already setup, try to run each (CampusconnectApplication, then ReactJS)**


![image](https://github.com/user-attachments/assets/5f85766f-99ec-423b-ae9b-b9984d12e888)


11. **If it runs, congrats, if not, reload MAVEN project**



