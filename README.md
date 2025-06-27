# Auth Client Sample

A simple React + Vite app that integrates with a **[federated tenant-based auth server](https://github.com/magnumjs/auth-client-sample)**.  
Supports login redirects, token handling, and refresh token logic.

---

## 🛠 Features

- Redirects to tenant-based auth server login
- Handles `token` and `refreshToken` via return URL
- Stores tokens in `localStorage`
- Automatically calls `/refresh` on expired access token
- Fetches authenticated user via `/me`
- Subdomain-based tenant detection (`{tenant}.client-app.com`)

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
npm install
```

### 2. Configure

Create a `.env` file:

```
VITE_AUTH_SERVER_URL=https://auth.example.com
```

> Replace with your federated login server base URL.

---

### 3. Run Dev Server

```bash
npm run dev
```

---

## 🌐 How It Works

1. When not authenticated, the app redirects to:
   ```
   https://auth.example.com/{tenant}/login?returnUrl=http://localhost:5173/login/callback
   ```

2. After login, the auth server redirects back with:
   ```
   /login/callback?token=...&refreshToken=...
   ```

3. Tokens are stored, and the app calls:
   ```
   GET /me   with Authorization: Bearer <token>
   ```

4. If token is expired, it silently refreshes using:
   ```
   POST /refresh   with { refreshToken }
   ```

---

## 🧠 Customize for Your App

- Replace `Home.tsx` with your main dashboard
- Use `getToken()` for authenticated API calls
- Add your own GraphQL or REST requests

---

## 🧪 Testing

- You can simulate an expired token by manually clearing `token` in dev tools and keeping `refreshToken`
- Logs out fully by clearing both tokens and redirecting

---

## 📁 Folder Structure

```
src/
  pages/
    Login.tsx       # Handles login redirect/callback
    Home.tsx        # Protected home view
  utils/
    auth.ts         # Token helpers and refresh logic
```

---

## ✅ Requirements

- A federated login server that:
  - Supports `returnUrl` on `/login`
  - Returns `token` and `refreshToken` as query params
  - Supports `/me` and `/refresh` endpoints

---

Made with ❤️ to help you plug into federated auth fast.
