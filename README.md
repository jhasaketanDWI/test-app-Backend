# YouthConnect

**YouthConnect** is a comprehensive platform designed to bridge the gap between emerging startups and potential investors or evaluators. Built on a robust and scalable **microservices architecture**, the system provides a seamless experience for all users.

## Key Features

- Connects startups with evaluators and investors  
- Modular microservices architecture  
- Cloud-native and highly scalable  
- Secure and reliable communication between services  

## Architecture Overview

The platform's architecture leverages **modern cloud-native technologies** to ensure resilience and maintainability.

### Frontend

- **React.js**: A dynamic and responsive user interface.
- Communicates with backend services via **Spring Cloud Gateway**.

### Backend

- **Spring Boot Microservices**: Each service is responsible for a specific business domain:
  - **User Management**
  - **Startup Profile Management**
  - **Evaluation Workflows**
  - **Payment Processing**
  - **Document Management**
  - **User Verification**

- **Spring Cloud Gateway**: Acts as a secure entry point to route API requests.
- **Eureka**: Handles **service discovery**, allowing microservices to register and communicate dynamically.
- **Event-Driven Communication**: For example, a startup submission triggers an automatic evaluation process.

## Benefits

- **Loose Coupling**: Ensures that services remain independent, enabling easier updates and scalability.  
- **High Performance**: Event-driven architecture enhances responsiveness and resource utilization.  
- **Reliability**: Designed for robustness and fault tolerance to support critical operations.  

---

YouthConnect offers a sophisticated, **feature-rich ecosystem** aimed at fostering innovation. It empowers the **next generation of entrepreneurs** by connecting them with the resources they need to **succeed**.

---

## System Architecture Diagram

```mermaid
graph TD
    subgraph "User's Browser"
        Frontend[React Frontend]
    end

    subgraph "Cloud Platform (e.g., AWS)"
        API_Gateway["API Gateway<br>(Spring Cloud Gateway)"]

        subgraph "Core Business Services"
            User_Service[User Service]
            Startup_Service[Startup Service]
            Evaluation_Service[Evaluation Service]
        end
        
        subgraph "Specialized Support Services"
            Verification_Service[Verification Service]
            Payment_Service[Payment Service]
            Document_Service[Document Service]
            Notification_Service[Notification Service]
        end

        subgraph "Infrastructure & Databases"
            Service_Registry["Service Registry<br>(Eureka)"]
            User_DB[(User DB)]
            Startup_DB[(Startup DB)]
            Evaluation_DB[(Evaluation DB)]
            Verification_DB[(Verification DB)]
            Payment_DB[(Payment DB)]
            Document_DB[(Document DB)]
        end
    end

    %% --- Connections ---

    %% Client to Gateway
    Frontend -->|HTTPS API Calls| API_Gateway

    %% Gateway to Services
    API_Gateway -->|Routes Requests| User_Service
    API_Gateway -->|Routes Requests| Startup_Service
    API_Gateway -->|Routes Requests| Evaluation_Service
    API_Gateway -->|Routes Requests| Verification_Service
    API_Gateway -->|Routes Requests| Payment_Service
    API_Gateway -->|Routes Requests| Document_Service
    API_Gateway -->|Routes Requests| Notification_Service

    %% Service Discovery
    User_Service <-->|Registers & Discovers| Service_Registry
    Startup_Service <-->|Registers & Discovers| Service_Registry
    Evaluation_Service <-->|Registers & Discovers| Service_Registry
    Verification_Service <-->|Registers & Discovers| Service_Registry
    Payment_Service <-->|Registers & Discovers| Service_Registry
    Document_Service <-->|Registers & Discovers| Service_Registry
    Notification_Service <-->|Registers & Discovers| Service_Registry
    
    %% Service to DB Connections
    User_Service --- User_DB
    Startup_Service --- Startup_DB
    Evaluation_Service --- Evaluation_DB
    Verification_Service --- Verification_DB
    Payment_Service --- Payment_DB
    Document_Service --- Document_DB

    %% Inter-Service Communication (Examples)
    User_Service -.->|User Created Event| Notification_Service
    Startup_Service -.->|Profile Submitted Event| Evaluation_Service
    Verification_Service -.->|Investor Verified Event| Payment_Service
    Verification_Service -.->|Investor Verified Event| Notification_Service
```
