# Brighte Eats Leads API

A NestJS GraphQL API that allows users to register interest in Brighte Eats services (delivery, pick-up, payment). It stores lead data in a local SQLite database and exposes queries for dashboard usage.

---

## 🧰 Tech Stack

- **Backend**: NestJS
- **Language**: TypeScript
- **API Style**: GraphQL (code-first)
- **Database**: SQLite (via TypeORM)
- **Validation**: class-validator
- **Testing**: Jest, Supertest
- **CI/CD**: GitHub Actions

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/brighte-eats.git
cd brighte-eats
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app locally

```bash
npm run start:dev
```

GraphQL playground: [http://localhost:3000/graphql](http://localhost:3000/graphql)

---

## 📬 GraphQL Usage

Access the playground at: [http://localhost:3000/graphql](http://localhost:3000/graphql)

### 🧾 Mutation: Register a Lead

```graphql
mutation {
  register(input: {
    name: "Jane Doe",
    email: "jane@example.com",
    mobile: "0400000000",
    postcode: "2000",
    services: ["delivery", "payment"]
  }) {
    id
    name
    email
    services {
      type
    }
  }
}
```

### 🔍 Query: Get All Leads

```graphql
query {
  leads {
    id
    name
    email
    mobile
    postcode
    services {
      type
    }
  }
}
```

### 🔎 Query: Get a Single Lead by ID

```graphql
query {
  lead(id: 1) {
    id
    name
    email
    services {
      type
    }
  }
}
```
//add this
query {
  leadsWithPagination(page: 1, limit:3) {
    id
    name
    email
    services {
      type
    }
  }
}
---

## 🧪 Testing

Run unit and e2e tests:

```bash
npm run test
```

Includes:
- Successful registration
- Input validation
- Lead query tests

---

## 🔒 Validation

Input validation is enforced using `class-validator`:
- Required fields: name, email, mobile, postcode, services
- Valid email format
- Mobile number pattern
- Only allowed services: delivery, pick-up, payment

---

## ⚙️ CI/CD: GitHub Actions

Continuous integration runs on:
- Every `push` to `main`
- Every `pull_request` to `main`

### Workflow steps:
- Install dependencies
- Lint code
- Run tests
- Build application

Workflow file: `.github/workflows/ci.yml`

---

## 🛣️ Roadmap

### MVP
- [x] Register mutation
- [x] Fetch all/single leads
- [x] Validation and error handling
- [x] E2E tests
- [x] GitHub Actions CI pipeline

### Future Enhancements
- [ ] Pagination and filtering on leads
- [ ] Admin dashboard with authentication
- [ ] Email verification flow
- [ ] Export to CSV
- [ ] Docker & cloud deployment (Fly.io, Railway, etc.)

---

## 📜 License

MIT

---

## 🧠 Design Patterns 

To enhance maintainability, scalability, and clarity, the following design patterns can be applied to this project:

- Factory Pattern: For encapsulating the creation of Lead entities and managing instantiation logic.
- Strategy Pattern: To handle different lead intake sources (e.g., website, mobile) via interchangeable processing strategies.
- Observer Pattern: Enables event-driven actions like sending notifications after lead creation.
- Decorator Pattern: Leverages class-validator decorators on DTOs to enforce input validation rules.
- Repository Pattern: Separates data access logic from business logic to promote cleaner service layers.

These patterns are optional but recommended as the project scales.



## 👤 Author

Built for Brighte's Senior Backend Engineer take-home exercise by Jan Nickson Altura.
