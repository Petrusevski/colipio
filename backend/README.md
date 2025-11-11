# GTM CRM Backend (NestJS + Prisma + Supabase)

This is a backend starter for your GTM-native CRM. It uses:

- **NestJS** as the HTTP framework
- **Prisma** as ORM
- **Supabase Postgres** as the database
- **Supabase Auth JWT** for authentication
- All routes are prefixed with `/api`

## Getting started

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Configure environment:

   Copy `.env.example` to `.env` and fill in your Supabase values:

   ```bash
   cp .env.example .env
   ```

3. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

4. Run migrations (optional if you already created tables directly in Supabase):

   ```bash
   npx prisma migrate dev --name init
   ```

5. Start dev server:

   ```bash
   npm run start:dev
   ```

API will run on `http://localhost:3000/api`.

## Auth model

The backend expects a **Supabase JWT** in the `Authorization` header:

```http
Authorization: Bearer <token>
```

The guard uses `SUPABASE_JWT_SECRET` to verify the token and attaches `req.user` with the Supabase JWT payload (including `sub` for the user id).

## Main endpoints

- `GET /api/users/me` – ensure user exists in local `User` table (creates on first call)
- `GET /api/deals` – list deals for the current user
- `POST /api/deals` – create a new deal
- `GET /api/accounts` – list accounts
- `POST /api/accounts` – create an account
- `GET /api/contacts` – list contacts
- `POST /api/contacts` – create contact
- `GET /api/tasks` – list tasks assigned to current user
- `POST /api/tasks` – create task
- `PUT /api/tasks/:id` – update task

You can expand modules following the same pattern.
