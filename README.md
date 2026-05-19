# Angular Chat App 💬

A full-stack chat application built using Angular and Supabase featuring Google OAuth authentication, persistent PostgreSQL data storage, user profile management, and responsive chat functionality.

[Live application](https://angular-chat-app-one.vercel.app/)

---

## Features

- Google OAuth authentication via Supabase
- Session-based user management
- Persistent message storage with PostgreSQL
- User profile creation and avatar support
- Real-time chat updates
- Message ownership controls
- Responsive interface built with Bootstrap
- Hosted with Vercel
- GitHub version control and CI workflow

---

## Tech Stack

### Frontend
- Angular
- TypeScript
- Bootstrap

### Backend / Services
- Supabase
- PostgreSQL
- Google OAuth

### Deployment
- Vercel
- GitHub

---

## Architecture Overview

Authentication is handled through Supabase Auth using Google OAuth.

Upon successful login:

1. User authenticates with Google
2. Supabase creates an auth session
3. Trigger functions populate profile data
4. User information is stored in `public.users`
5. Chat messages reference users through foreign keys

---

## Database Schema

### users

| Field | Type |
|---|---|
| id | uuid |
| full_name | text |
| avatar_url | text |

Relationships:

- `id → auth.users(id)`

---

### chat

| Field | Type |
|---|---|
| id | uuid |
| sender | uuid |
| chat_text | text |
| created_at | timestamp |
| editable | boolean |

Relationships:

- `sender → users.id`

---

## Sample Schema

```sql
CREATE TABLE public.users (
 id uuid references auth.users on delete cascade,
 full_name text,
 avatar_url text,
 primary key(id)
);
```

---

## Acknowledgements

This project was initially inspired by and built with guidance from a FreeCodeCamp tutorial. The application was extended and customized with additional functionality including custom message deletion behaviour, deployment configuration, and ongoing feature development.

---

## Local Setup

Clone repository:

```bash
git clone https://github.com/pashamo/Angular-Chat-App.git
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```env
SUPABASE_URL=your_url
SUPABASE_ANON_KEY=your_key
```

Run locally:

```bash
ng serve
```

Navigate to:

```text
http://localhost:4200
```

---

## Future Improvements

- Typing indicators
- Edit message functionality
- Read receipts
- Search functionality

---

## Author

Mohammed Pasha