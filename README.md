# 🏋️ FitTrack AI

A full-stack fitness tracking application built with **Spring Boot Microservices**, **React**, and **AI-powered recommendations** using Google Gemini.

## 🏗️ Architecture

This project follows a microservices architecture with the following components:

| Service | Port | Description |
|---------|------|-------------|
| **Eureka Server** | 8761 | Service Discovery |
| **Config Server** | 8888 | Centralized Configuration |
| **API Gateway** | 8080 | Gateway + OAuth2 Security |
| **User Service** | 8081 | User Management (PostgreSQL) |
| **Activity Service** | 8082 | Activity Tracking (MongoDB) |
| **AI Service** | 8083 | AI Recommendations (Gemini API) |
| **Frontend** | 5173 | React + Vite UI |

## ✨ Features

- **User Authentication** via Keycloak (OAuth2 + PKCE)
- **Activity Tracking** - Log running, cycling, swimming, yoga, and more
- **AI-Powered Recommendations** - Get personalized fitness insights from Google Gemini
- **Real-time Messaging** - RabbitMQ for async activity processing
- **Service Discovery** - Netflix Eureka for microservice registration
- **Centralized Config** - Spring Cloud Config Server
- **API Gateway** - Spring Cloud Gateway with JWT validation

## 🛠️ Tech Stack

### Backend
- Java 17+ / Spring Boot 3.4.3
- Spring Cloud (Eureka, Config, Gateway)
- Spring Security + OAuth2 Resource Server
- Spring Data JPA (PostgreSQL)
- Spring Data MongoDB
- RabbitMQ (AMQP)
- Lombok

### Frontend
- React 19 + Vite
- Material UI (MUI)
- Redux Toolkit
- Axios
- OAuth2 PKCE Authentication

### Infrastructure
- Keycloak (Identity Provider)
- PostgreSQL (User data)
- MongoDB (Activities & Recommendations)
- RabbitMQ (Message broker)

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL
- MongoDB
- RabbitMQ
- Keycloak

### Running the Services

Start the services in the following order:

1. **Eureka Server** → `cd eureka && ./mvnw spring-boot:run`
2. **Config Server** → `cd configserver && ./mvnw spring-boot:run`
3. **User Service** → `cd userservice && ./mvnw spring-boot:run`
4. **Activity Service** → `cd activityservice && ./mvnw spring-boot:run`
5. **AI Service** → `cd aiservice && ./mvnw spring-boot:run`
6. **API Gateway** → `cd gateway && ./mvnw spring-boot:run`
7. **Frontend** → `cd fitness-app-frontend && npm install && npm run dev`

## 📁 Project Structure

```
FitTrack-AI/
├── eureka/                  # Service Discovery Server
├── configserver/             # Centralized Configuration
├── gateway/                  # API Gateway + Security
├── userservice/              # User Management Service
├── activityservice/          # Activity Tracking Service
├── aiservice/                # AI Recommendation Service
└── fitness-app-frontend/     # React Frontend
```

## 📄 License

This project is for educational purposes.
