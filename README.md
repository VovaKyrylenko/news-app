# Article Management Project

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Overview

This project is an article management system. Articles are parsed on schedule from BBC feed and managed (CRUD operations) in the admin panel. Access to the admin panel is restricted by authorization. The public route displays a list of articles with pagination and search functionality. Public routes are SEO optimized with Server-Side Rendering (SSR) and Meta Information.

## Features

- **RSS Feed Parsing**: Scheduled parsing of articles from RSS BBC feeds, articles are parsed every 10 minutes from official BBC RSS Feed
- **CRUD Operations**: Read, Update, Delete articles in the admin panel.
- **Authorization**: Access control to the admin panel through credentials sign-in.
- **Public Routes**: Display articles with pagination and search capabilities. Sorting is not available with BBC RSS Feed.
- **SEO Optimization**: Server-Side Rendering (SSR) and Meta Information for public routes.

## Technologies Used

- **Main Language**: TypeScript
- **Framework**: Next.js
- **Validation**: Zod
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Auth**: JWT, @auth/prisma-adapter, bcryptjs, next-auth
- **UI Library**: Tailwind CSS, shadcn UI, @radix-ui
- **Code Quality Tools**: ESLint, Prettier, Husky, lint-staged
- **Form Handling**: react-hook-form, @hookform/resolvers
- **Documentation**: README.md
- **Project Architecture**: Monorepo
- **Version Control System**: GitHub

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/VovaKyrylenko/news-app.git
   cd article-management
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   Create a `.env` file in the root of the project and add the necessary environment variables. Example:

   ```env
   DATABASE_URL=your-database-url
   NEXTAUTH_SECRET=your-next-secret
   ```

4. Apply database migrations:

   ```bash
   npx prisma migrate deploy
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. RSS Feed Update Configuration

To ensure that the RSS feed is regularly updated in your database, you have a couple of options:

### Option 1: Using Docker and a Cron Job

1. **Configure Docker**: Set up a Docker container to handle the RSS feed updates.
2. **Set Up Cron Job**: Create a cron job within the Docker container to periodically execute the feed update script.

   Example Docker configuration might include:

   ```Dockerfile
   # Dockerfile
   FROM node:14

   # Install dependencies
   WORKDIR /app
   COPY package*.json ./
   RUN npm install

   # Copy application files
   COPY . .

   # Install cron
   RUN apt-get update && apt-get install -y cron

   # Add the cron job to the crontab
   COPY crontab /etc/cron.d/rss-feed-cron
   RUN chmod 0644 /etc/cron.d/rss-feed-cron
   RUN crontab /etc/cron.d/rss-feed-cron

   # Start cron and the server
   CMD ["sh", "-c", "cron && npm start"]
   ```

   **crontab** file example:

   ```
   */10 * * * * curl -X POST http://localhost:3000/api/news
   ```

   This setup runs a `POST /api/news` request every 10 minutes to update the RSS feed.

### Option 2: Using External Cron Job Services

You can also use external services like [cron-job.org](https://cron-job.org) to periodically trigger the RSS feed update:

1. **Create a Cron Job**: Set up a cron job on [cron-job.org](https://cron-job.org) to make a `POST` request to your `/api/news` endpoint.
2. **Configure Interval**: Choose how frequently you want the RSS feed to be updated (e.g., every 10 minutes).

   Example configuration on [cron-job.org](https://cron-job.org):

   - **URL**: `http://your-domain.com/api/news`
   - **Request Method**: POST
   - **Frequency**: Every 10 minutes

## Usage

- **Admin Panel**: Access the admin panel at `http://localhost:3000/dashboard` (ensure you are authorized).  
   **Test Credentials**:

  - **Email**: `admin@admin.com`
  - **Password**: `admin123`
    Also you can create a new test user for yourself [using Create User API](#create-user)

- **Public Routes**: Access the public articles at `http://localhost:3000`.

## API Endpoints

### Create User

- **Endpoint**: `/api/create-user`
- **Method**: POST
- **Description**: Creates a new user.
- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }
  ```

### Update RSS Feed

- **Endpoint**: `/api/update-rss`
- **Method**: POST
- **Description**: Updates articles by parsing the RSS feed.

- **Response**:

  ```json
  {
    "message": "RSS feed updated successfully"
  }
  ```
