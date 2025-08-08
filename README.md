# Nusa Backend

A modern, scalable, and type-safe backend for a local e-commerce/marketplace platform, built with the latest TypeScript, Bun, Drizzle ORM, and Hono.js.  
Designed for speed, developer happiness, and easy extensibility.

---

## 🚀 Tech Stack

- **Runtime:** [Bun](https://bun.sh/) (super-fast JS/TS runtime)
- **Language:** TypeScript
- **Web Framework:** [Hono.js](https://hono.dev/) (Express-style, ultra-fast, OpenAPI-ready)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (type-safe, migration-friendly)
- **Database:** PostgreSQL
- **Validation:** [Zod](https://zod.dev/) (schema validation, OpenAPI integration)
- **API Docs:** OpenAPI 3.1, Swagger UI, Scalar API Reference
- **Auth:** Better-Auth, JWT, session, and custom middleware
- **Other:** CSV seeding, S3 integration (R2 Cloudflare), ESlint, Prettier

---

## 📦 Key Libraries

- `hono`, `@hono/zod-openapi`, `@hono/swagger-ui` - API framework & docs
- `drizzle-orm`, `drizzle-zod`, `drizzle-kit` - ORM, migrations, type-safe schemas
- `zod` - Validation and OpenAPI schema generation
- `csv-parser` - CSV-based data seeding
- `bcryptjs` - Password hashing
- `dotenv` - Environment config
- `@aws-sdk/client-s3` - S3 file uploads
- `uuid` - ID generation
- `better-auth` - Authentication

---

## 🛠️ How to Use

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your database, S3, and other secrets.

### 3. Run migrations

```bash
bun run db:migrate
```

### 4. Seed the database (from CSV) (Optional)

```bash
bun run scripts/seed.ts
```

### 5. Start the server

```bash
bun run dev
# or for production
bun run start
```

---

## 🌟 Features

- Full CRUD for users, stores, products, cart, favorites, transactions, payments, collaborations, and more
- Soft relations (no hard DB constraints, all in app logic)
- CSV-based seeding for easy demo/testing
- Auth-protected routes with session/user context
- OpenAPI 3.1 docs auto-generated from Zod schemas
- Modular repository/controller pattern
- Modern error handling and response factory
- S3 file upload support
- Ready for cloud deployment

---

## 📚 API Documentation

- **OpenAPI JSON:** [https://localhost:5001/openapi.json](https://localhost:5001/openapi.json)
- **Scalar Reference:** [https://localhost:5001/docs](https://localhost:5001/docs) (tabbed)

All endpoints are documented with request/response schemas, error codes, and tags.

---

## 🗂️ Project Structure

```
src/
  configs/         # Env and config
  controllers/     # API controllers (Hono routers)
  db/              # Drizzle schemas, migrations, seeders
  lib/             # Auth, response, S3, router helpers
  middlewares/     # Auth and other middleware
  repositories/    # Data access logic
  routes/          # OpenAPI route definitions
  types/           # Zod and TypeScript types
  ...
```

---

## 🧪 Testing & Linting

- Type check: `bun run typecheck`
- Lint: `bun run codecheck`
- Format: `bun run format`
- Prettier: `bun run pretty`

---

## 📜 License

MIT

---

## 📣 Credits

Built with ❤️ by `Tuhan Yang Atur`.

- Shabrina Maharani (13522134)
- Auralea Alvinia Syaikha (13522148)
- Valentino Chryslie Triadi (13522164)
