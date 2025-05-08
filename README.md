📄 README.md
markdown
Copy
Edit
# Brighte Eats Leads API

Brighte Eats is a new product initiative by Brighte, and this backend API allows users to register interest in services (delivery, pick-up, payment). Admins can query leads via a simple GraphQL dashboard.

---

## 🧰 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/) (with GraphQL)
- **Language**: TypeScript
- **Database**: SQLite3 (via TypeORM)
- **Validation**: `class-validator`
- **Testing**: Jest + Supertest
- **API Style**: GraphQL (code-first)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/brighte-eats.git
cd brighte-eats
2. Install dependencies
bash
Copy
Edit
npm install
3. Run the app
bash
Copy
Edit
npm run start:dev
The GraphQL playground will be available at http://localhost:3000/graphql

📦 Features
Mutations
register(input: RegisterInput): Register a new lead with name, email, mobile, postcode, and selected services.

Queries
leads: Get all registered leads.

lead(id: Int): Fetch a single lead by ID.

🧪 Testing
bash
Copy
Edit
npm run test
Includes:

✅ Successful lead registration

❌ Invalid input validation errors

🔍 Query all leads

🔎 Query lead by ID

🧱 Database
SQLite is used for simplicity in local development. The database is created in the root as data.sqlite.

🔒 Validation
All inputs are validated using class-validator. Invalid data will return meaningful GraphQL errors.

🛣️ Roadmap
✅ MVP
 Register mutation

 Fetch all/single leads

 Validation and error handling

 E2E testing with Jest

🛠️ Future Enhancements
 Pagination and filtering for leads

 Admin authentication

 Email confirmation workflow

 Export leads to CSV

 Deployment (Docker + CI/CD)

📜 License
MIT

👤 Author
Built for Brighte's Senior Backend Engineer take-home exercise by [Your Name].

css
Copy
Edit

Let me know if you want a section added for environment configuration or Docker setup.