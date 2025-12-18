## Time To Buy – Full-Stack E‑Commerce App

**Time To Buy** is a production-style full‑stack e‑commerce web app built with:

- **Frontend**: React (Vite), React Router, Context API, Bootstrap 5, CSS
- **Backend**: Node.js, Express, MongoDB (Mongoose)
- **Auth**: JWT (access + refresh tokens, httpOnly cookies)
- **Features**: Product listing + details, auth (signup/login/logout), protected routes, cart with quantity updates, mock checkout + order confirmation.

---

### 1. Folder structure

- **backend**
  - `src/server.js` – Express app + Mongo connection
  - `src/models/` – `User`, `Product`, `Cart`, `Order`
  - `src/controllers/` – `auth`, `product`, `cart`, `order`
  - `src/routes/` – REST API routes
  - `src/middleware/` – auth + error handlers
  - `src/utils/` – token helpers
  - `src/seed/seed.js` – sample user + products
- **frontend**
  - `src/App.jsx`, `src/main.jsx`
  - `src/context/` – `AuthContext`, `CartContext`
  - `src/components/` – `Navbar`, `Footer`, `ProtectedRoute`
  - `src/pages/` – Home, Product details, Cart, Checkout, Order confirmation, Login, Signup
  - `src/styles/global.css`

---

### 2. Backend setup

From the project root:

```bash
cd backend
npm install
```

Create a `.env` file in `backend`:

```bash
MONGO_URI=mongodb://localhost:27017/time-to-buy
JWT_ACCESS_SECRET=replace-with-strong-access-secret
JWT_REFRESH_SECRET=replace-with-strong-refresh-secret
CLIENT_URL=http://localhost:5173
NODE_ENV=development
PORT=5000
```

Seed the database:

```bash
npm run seed
```

Run the backend in dev mode:

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

---

### 3. Frontend setup

In a second terminal, from the project root:

```bash
cd frontend
npm install
npm run dev
```

By default Vite runs at `http://localhost:5173`. The dev server proxies `/api` calls to the backend (see `vite.config.mts`).

---

### 4. Core flows

- **Auth**
  - Signup with name, email, password (bcrypt‑hashed).
  - Login returns access token + sets httpOnly cookies (access + refresh).
  - Logout clears refresh token server‑side and cookies.
  - Protected routes on the frontend use `AuthContext` + `ProtectedRoute`.
- **Products**
  - `GET /api/products` – all products.
  - `GET /api/products/featured` – featured products for the home hero grid.
  - `GET /api/products/:id` – product details page.
- **Cart**
  - Authenticated, user‑bound cart with:
    - add/update/remove items
    - quantity and total price calculation on backend
  - Frontend uses `CartContext` to show counts, total, and maintain state between pages.
- **Checkout**
  - `/checkout` (protected) shows order summary + address form.
  - Submits to `POST /api/orders/checkout` to create an order from the user’s cart.
  - Payment is mocked; order is stored with `paymentStatus = paid`.
  - User is redirected to `/order/:id` confirmation page.

---

### 5. Sample credentials & seed data

After running `npm run seed` in `backend`:

- **Admin user**
  - Email: `admin@timetobuy.com`
  - Password: `Password123`
- **Products**
  - A few watch/clock themed products with images, prices, and ratings ready to browse.

---

### 6. Production notes

- For production, configure:
  - Strong `JWT_ACCESS_SECRET` / `JWT_REFRESH_SECRET`
  - `NODE_ENV=production` and proper CORS `CLIENT_URL`
  - HTTPS so secure cookies work end‑to‑end
- Build the frontend (`npm run build` in `frontend`) and host it separately or behind a reverse proxy with the Node backend.


