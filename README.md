# Tab Rank API

REST API for managing games, matches, lobbies and users with real-time features.

## Description

Tab Rank API is a Node.js/TypeScript backend service that provides endpoints for game ranking and match management. It includes real-time functionality using Socket.IO for live match updates and lobby management.

**Tech Stack:**
- Node.js & TypeScript
- Express.js
- TypeORM with PostgreSQL
- Socket.IO for real-time events
- JWT for authentication
- Bcrypt for password hashing

## Project Structure

```
src/
├── @types/          # TypeScript type definitions
├── controllers/     # Request handlers
├── database/        # TypeORM configuration and migrations
├── entities/        # Database entities (User, Game, Match, Lobby)
├── repositories/    # Data access layer
├── routes/          # API route definitions
├── services/        # Business logic layer
└── shared/          # Shared utilities, middlewares, and events
```

## Setup

### Prerequisites
- Node.js 24.11.1
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd api-tab-rank
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and set your configuration:
- `PORT` - Server port (default: 3333)
- `PG_HOST`, `PG_PORT`, `PG_USER`, `PG_PASSWORD`, `PG_NAME` - PostgreSQL credentials
- `CORS_ORIGINS` - Allowed CORS origins
- `JWT_SECRET` - Secret key for JWT tokens

4. Start PostgreSQL (using Docker)
```bash
docker-compose up -d
```

5. Run database migrations
```bash
npm run migration:run
```

6. Start the development server
```bash
npm run dev
```

The API will be available at `http://localhost:3333/api`

## Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run migration:create --name=<migration-name>` - Create new migration
- `npm run migration:run` - Run pending migrations
- `npm run migration:revert` - Revert last migration

## License

MIT
