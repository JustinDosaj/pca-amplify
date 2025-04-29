# Private Chat Project - Frontend
This repository contains the frontend application for the private chat app, built with [Next.js](https://nextjs.org/) and deployed via [AWS Amplify](https://aws.amazon.com/amplify/).

## Project Overview
The PCA frontend provides the user interface and client-side functionality. It interacts with serverless APIs deployed 
separately through the [pca-serverless](https://github.com/JustinDosaj/pca-serverless) repository.


### Features
- Built with Next.js for server-side rendering and optimized performance
- Hosted and managed with AWS Amplify
- Integrated with APIs for dynamic data integration
- Modern UI with responsive design

## Tech Stack
- **Web Framework**: [Next.js](https://nextjs.org/)
- **JavaScript Library**: [React](https://reactjs.org/)
- **Responsive UI/UX**: [TailwindCSS](https://tailwindcss.com/)
- **Hosting**: [AWS Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- **CI/CD**: [Github Actions](https://github.com/features/actions)
- **Unit Testing**: [Jest](https://jestjs.io/)

## Environment Variables
The following environment variables are required for the app to function properly:

| Variable Name | Description |
|---------------|-------------|
| `NEXT_PUBLIC_CHAT_API_ROUTE` | The base URI of the backend APIs deployed by [pca-serverless](https://github.com/JustinDosaj/pca-serverless) |

You can configure these environment variables directly in the Amplify console or locally using a `.env.local` file during development.

## Installation

### Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [pca-serverless](https://github.com/JustinDosaj/pca-serverless) (Set up your own supporting infrastructure)

### Steps to Install

1. Clone Repository
```bash
git clone https://github.com/your-username/pca-amplify.git
```

2. Navigate to Project Directory
```bash
cd pca-amplify
```

3. Install Dependencies
```bash
npm install
```

4. Create a .env.local file in the root of the project and add the required environment variables:
```bash
NEXT_PUBLIC_API_ENDPOINT=https://<your-api-gateway-url>.amazonaws.com/<env>/
```
5. Run Tests to Confirm Installation
```bash
npm test
``` 

6. Run Development Server
```bash
npm run dev
```

## Using the Chat App
The chat application requires a valid JWT to authorize API calls, please following the [AWS Amplify Setup Instructions](https://docs.amplify.aws/react/start/quickstart/) to setup hosting and authentication to get conversations to work. Alternatively, you can entirely remove the authorization requirement from API Gateway insde the pca-sererless repository.

## Project Status
Project currently in the process of migrating from [AWS Amplify Functions](https://docs.amplify.aws/react/build-a-backend/functions/set-up-function/) to AWS Lambda behind API Gateway.

### Affected Features
| Feature Name | Description |
|---------------|-------------|
| `PII Removal` | Application migrated to serverless functions from [pca-serverless](https://github.com/JustinDosaj/pca-serverless) but do not integrate AWS Comphrehend yet |