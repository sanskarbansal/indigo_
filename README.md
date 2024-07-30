# Sanskar-Indigo

This project is a comprehensive flight status management system providing real-time updates and notifications to passengers. It includes both an admin dashboard for managing flights and a user interface for subscribing to flight updates. The system utilizes a MERN stack with additional technologies such as Socket.IO for real-time notifications and Kafka for messaging.

## Technologies Used

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
- ![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
- ![Kafka](https://img.shields.io/badge/Apache%20Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)
- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB
- Apache Kafka
- Zookeeper

### Installation

#### Backend
1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2. Install backend dependencies:
    ```sh
    npm install
    ```
3. Start the backend server:
    ```sh
    npm run dev
    ```
4. Start the Kafka consumer:
    ```sh
    node kafkaConsumer.js
    ```

#### Frontend
1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2. Install frontend dependencies:
    ```sh
    npm install
    ```
3. Start the frontend server:
    ```sh
    npm run dev
    ```

`Note: Admin Credentials Email: admin@indigo.in, Password: admin`

### Environment Variables
A sample `.env` file is provided in the `backend` directory as `.env.sample`. Create a `.env` file in the `backend` directory and add the necessary credentials and configurations based on the sample file. Below is an example of what might be needed:

```plaintext
DB_CONNECTION_STRING=<your_mongodb_connection_string>
SOCKET_PORT=<your_socket_port>
KAFKA_BROKER=<your_kafka_broker>
```
### Here are some screenshots: 

#### Admin Panel: 
<img width="1194" alt="Screenshot 2024-07-30 at 8 10 23 PM" src="https://github.com/user-attachments/assets/7b9ee89a-af5e-4f0a-897f-58cf35513285">
<img width="598" alt="Screenshot 2024-07-30 at 8 10 45 PM" src="https://github.com/user-attachments/assets/78dfc363-5e28-404f-98a6-a7d482adbc63">
<img width="543" alt="Screenshot 2024-07-30 at 8 12 45 PM" src="https://github.com/user-attachments/assets/5cf45ca9-eb6e-4767-b5dc-543fed63a044">
<img width="1194" alt="Screenshot 2024-07-30 at 8 12 59 PM" src="https://github.com/user-attachments/assets/a10b5125-9bac-4b82-8996-20de9b130d7e">

#### User Dashboard: 
<img width="598" alt="Screenshot 2024-07-30 at 8 13 58 PM" src="https://github.com/user-attachments/assets/189595be-a96a-4fa5-848a-d9c859962154">
<img width="1188" alt="Screenshot 2024-07-30 at 8 14 46 PM" src="https://github.com/user-attachments/assets/181c7c20-7f9e-4d1a-a914-1e5a267a1490">

