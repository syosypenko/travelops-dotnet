# Travel Task Manager 🌍

A simple task management app for organizing your travel plans.

**What it does:**
- Create and manage travel tasks (book flights, reserve hotels, etc.)
- Mark tasks as complete or incomplete
- Full test coverage to ensure everything works

**Tech used:**
- Backend: C# .NET 10 (REST API)
- Frontend: React + TypeScript
- Testing: xUnit (backend) + Playwright (E2E)
- CI/CD: Azure Pipelines

---

## ✨ Features

- Create, edit, and delete travel tasks
- Mark tasks as complete/incomplete
- Real-time task counter
- Form validation with helpful error messages
- Clean, responsive interface
- RESTful API with full CRUD operations

---

## 🛠️ Tech Stack

**Backend:**
- C# .NET 10 Web API
- In-memory data storage
- xUnit for testing

**Frontend:**
- React 18 with TypeScript
- Vite (fast build tool)
- Axios for API calls

**Testing:**
- Backend: xUnit unit tests
- Frontend: Playwright E2E tests (17 tests covering forms, API, workflows)

**CI/CD:**
- Azure Pipelines for automated testing

---

## � Project Structure

```
Travel_Task_Manager/
├── backend/
│   ├── TravelOps.Api/              # REST API (Controllers, Models, Services)
│   └── TravelTaskManager.Tests/    # Unit tests (xUnit)
├── frontend/
│   └── src/
│       ├── components/             # React components
│       ├── api/                    # API client
│       └── App.tsx                 # Main app
├── ui-tests/
│   └── tests/
│       ├── task-manager.spec.ts    # E2E tests
│       └── test-data.ts            # Test helpers
└── azure-pipelines.yml             # CI/CD config
```

---

## 🚀 Quick Start

### Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18+)

### 1. Start the Backend

```bash
cd backend/TravelOps.Api
dotnet restore
dotnet run
```

API runs on: **http://localhost:5107**  
Swagger docs: **http://localhost:5107/swagger**

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on: **http://localhost:5173**

### 3. Run Tests

**Backend tests:**
```bash
cd backend/TravelTaskManager.Tests
dotnet test
```

**E2E tests** (requires backend running):
```bash
cd ui-tests
npm install
npx playwright test
```

View test report:
```bash
npx playwright show-report
```

---

## 🧪 Test Coverage

### Backend Unit Tests (4 tests)
Tests core business logic:
- Creating tasks
- Retrieving tasks
- Updating task status
- Deleting tasks

### E2E Tests (17 tests)
Tests the full application:

**Form Validation:**
- Required fields
- Minimum/maximum length
- Error message display

**Task Operations:**
- Create new tasks
- Toggle completion status
- Delete tasks (with confirmation dialog)
- Task counter updates

**API Contracts:**
- GET /tasks
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id
- Error responses (404)

**UI Scenarios:**
- Empty state display
- Task list rendering
- Form reset after submission

---

## 🎯 Key Highlights

**For QA/Test Engineers:**
- Playwright E2E test suite with 17 passing tests
- Test data management and cleanup fixtures
- API contract validation
- Form validation testing
- Dialog handling and user interactions

**For Backend Developers:**
- Clean REST API design with proper HTTP status codes
- Dependency injection and service layer pattern
- xUnit unit tests with 100% service coverage
- Swagger/OpenAPI documentation

**For Frontend Developers:**
- Modern React with TypeScript and type safety
- Component composition and reusability
- Form validation and error handling
- CSS modules for scoped styling

**CI/CD:**
- Azure Pipelines configuration
- Automated build and test execution
- Multi-stage pipeline setup

---

## 📝 API Endpoints

```
GET    /api/tasks          # Get all tasks
GET    /api/tasks/:id      # Get task by ID
POST   /api/tasks          # Create new task
PUT    /api/tasks/:id      # Update task
DELETE /api/tasks/:id      # Delete task
```

**Example Task:**
```json
{
  "id": 1,
  "title": "Book Flight",
  "description": "Book round-trip tickets to Tokyo",
  "isCompleted": false
}
```

---

## 🔧 Development

**Backend hot reload:**
```bash
cd backend/TravelOps.Api
dotnet watch run
```

**Frontend hot reload:**
```bash
cd frontend
npm run dev
```

**Run tests in watch mode:**
```bash
cd ui-tests
npx playwright test --ui
```
