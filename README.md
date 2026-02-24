# Travel Task Manager 🌍✈️

A full-stack, production-ready portfolio application demonstrating **QA & Test Automation** expertise with **C# / .NET 10**, **React + TypeScript**, **Playwright**, and **Azure DevOps CI/CD**.

Designed specifically to showcase competencies for **Quality Assurance Engineer** and **Full-Stack Developer** roles, with emphasis on:
- **Backend**: RESTful API with clean architecture and SOLID principles (C# .NET 10).
- **Frontend**: Modern React with TypeScript, component-based architecture, and form validation.
- **QA & Automation**: Comprehensive test coverage including unit tests, integration tests, E2E testing, test data management, and regression testing.
- **DevOps**: Azure Pipelines CI/CD with automated build, test, and deployment stages.

---

## 🚀 Features

- **Task Management**: Create, Read, Update, and Delete (CRUD) travel-related tasks (e.g., "Book Flight", "Confirm Hotel").
- **Status Tracking**: Mark tasks as Complete/Incomplete.
- **REST API**: Fully functional backend API serving JSON data.
- **Automated Quality Assurance**:
  - **Unit Tests**: Backend logic validation.
  - **Integration Tests**: API endpoint verification.
  - **E2E Tests**: Full UI and API workflow automation using Playwright.

---

## 🛠️ Tech Stack

| Layer | Technology | Relevance |
|-------|------------|---10 Web API | Clean architecture, OOP, RESTful design |
| **Frontend** | React 18 + TypeScript 5 | Modern UI, component composition, type safety |
| **Package Manager** | npm, Vite | Fast builds, dev server, module bundling |
| **Database** | In-Memory (Singleton) | Stateful service for demo purposes |
| **Testing** | xUnit (Backend), Playwright (E2E) | Unit tests, API contract testing, regression tests |
| **CI/CD** | Azure Pipelines | Multi-stage build, test, artifact management |
| **API Documentation** | Swagger/OpenAPI | Auto-generated API docs for integration teams
| **Tools** | Git, Azure DevOps (Concepts) | Version control, Pipeline integration |

---

## 📂 Project Structure

```bash
│   ├── TravelOps.Api/          # ASP.NET Core 10 Web API
│   │   ├── Controllers/        # REST API endpoints (CRUD)
│   │   ├── Models/             # Data entities (TravelTask)
│   │   ├── Services/           # Business logic (TravelTaskService)
│   │   ├── Program.cs          # DI, CORS, Swagger setup
│   │   └── TravelOps.Api.csproj
│   ├── TravelTaskManager.Tests/ # xUnit Test Suite
│   │   ├── TravelTaskServiceTests.cs # Service unit tests
│   │   └── TravelTaskManager.Tests.csproj
│   └── TravelOps.slnx          # Solution file
├── frontend/
│   ├── src/
│   │   ├── components/         # React components (TaskForm, TaskList, TaskItem)
│   │   ├── api/                # API client (Axios)
│   │   ├── types.ts            # TypeScript interfaces
│   │   ├── App.tsx             # Main app component
│   │   └── main.tsx            # React entry point
│   ├── index.html              # HTML entry
│   ├── package.json            # Dependencies
│   ├── tsconfig.json           # TypeScript config
│   └── vite.config.ts          # Vite config
├── ui-tests/
│   ├── tests/
│   │   ├── task-manager.spec.ts    # E2E test suite (50+ tests)
│   │   ├── fixtures.ts             # Test setup & cleanup
│   │   └── test-data.ts            # Test data management
│   ├── playwright.config.ts
│   └── package.json
├── azure-pipelines.yml # Multi-stage CI/CD pipeline
│   └── playwright.config.ts
├── azure-pipelines.yml     # CI/CD Pipeline Configuration
└── README.md
```

## 🔄 CI/CD & DevOps Integration

This project includes a fully configured `azure-pipelines.yml` file to demonstrate:
- **Build Pipelines**: Automated restoration and building of .NET services.
- **Unit Testing**: Execution of backend xUnit tests with detailed report publishing.
- **Integration/E2E Testing**: Headless execution of Playwright tests within a pipeline agent.

This setup aligns perfectly with modern agile workflows requiring reliable regression testing on every commit.

---

## 🏁 Getting Started

### Prer10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (for Playwright)

### 1. Run the Backend (API)
The backend serves as the core data provider.

```bash
cd backend/TravelOps.Api
dotnet restore
dotnet run
Comprehensive test coverage demonstrating professional QA practices aligned with job requirements:

### Backend Unit Tests (xUnit)
Validates service layer logic with isolated unit tests.
```bash
cd backend/TravelTaskManager.Tests
dotnet test
```
**Covered Scenarios:**
- ✅ Task creation and ID incrementing
- ✅ Task retrieval (all, by ID)
- ✅ Task updates and state management
- ✅ Task deletion

### API Integration Tests (Playwright)
Validates REST API contracts and responses.
```bash
cd ui-tests
npm install
npx playwright test --grep "API Contract"
```
**Contract Validation:**
- ✅ GET /tasks (array structure, task properties)
- ✅ POST /tasks (201 response, created task returned)
- ✅ PUT /tasks/:id (204 response, state updated)
- ✅ DELETE /tasks/:id (204 response)
- ✅ GET /tasks/:id (404 for non-existent)

### E2E UI Tests (Playwright + React)
Complete user workflows across React frontend and C# backend.
```bash
cd ui-tests
npx playwright test
```
**50+ Test Cases Covering:**

**Form Validation & Submission:**
- Required field validation (title must be provided)
- Minimum length validation (3+ characters)
- Maximum length validation (description ≤ 500 chars)
- Error message display and styling
- Form auto-clear after successful submission

**Task Management Workflows:**
- Create, read, update, delete (CRUD) operations
- Mark task as complete/incomplete
- Task count display updates
- Empty state messaging

**Test Data Management:**
- Fixture-based test cleanup (auto-delete after each test)
- API-based task pre-creation for test conditions
- Test data segregation and isolation
- Stateful cleanup in test hooks

**Regression Testing:**
- Complete user workflow: create → view → complete → delete
- Multi-task state management
- Error handling and recovery
- Cross-browser compatibility

### Run All Tests
```bash
# Backend unit tests
cd backend && dotnet test

# Frontend E2E tests (requires API running)
cd ui-tests && npx playwright test

# View test results
cd ui-tests && npx playwright show-report
```

### Test Coverage Highlights
- **Unit Test Coverage**: Service layer logic, data transformations
- **Integration Test Coverage**: API endpoints, request/response contracts
- **E2E Test Coverage**: User workflows, form validation, error scenarios
- **Regression Test Suite**: Complete workflows to catch breaking changes
## 🧪 Testing & Quality Assurance

This project places a heavy emphasis on automated testing, aligning with QA engineering requirements.

### Backend: Unit & Integration Tests (xUnit)
Validates internal logic and API responses.

```bash
cd backend
dotnet test
```

### UI & API Systems Tests (Playwright)
Validates the end-to-end user journey and API contracts.

```bash
cd ui-tests
npm install
npx playwright test
```

---

## 🎯 Alignment with Job Requirements

### **For QA & Test Automation Roles** ✅
- **Playwright & TypeScript**: Implements comprehensive E2E testing with 50+ test cases covering form validation, API contracts, and user workflows
- **Test Data Management**: Fixture-based cleanup, pre-condition setup via API, test data factories in `test-data.ts`
- **Test Coverage Strategy**: Unit tests (xUnit), integration tests (API contracts), E2E tests (UI workflows), regression tests (full scenarios)
- **CI/CD Integration**: Azure Pipelines with multi-stage build, test execution, and report publishing
- **API Testing**: Contract validation, status codes, response structure verification
- **Regression Prevention**: Automated test suite runs on every commit to catch breaking changes

### **For .NET Developer Roles** ✅
- **C# & .NET 10**: Modern async/await patterns, dependency injection, clean architecture
- **RESTful API Design**: Proper HTTP verbs, status codes, CORS configuration, Swagger documentation
- **Clean Code & SOLID**: Single Responsibility Service, dependency-injected controllers, proper error handling
- **Web API Best Practices**: Content negotiation, problem details error responses, OpenAPI documentation

### **For Full-Stack Developer Roles** ✅
- **React + TypeScript**: Component composition, hooks (useState, useEffect), form validation, error handling
- **Type Safety**: Strict TypeScript interfaces for API contracts, component props, test data
- **Modern Build Tools**: Vite for fast development, npm for dependency management
- **API Client Patterns**: Axios integration, request/response interceptors, error handling
- **Responsive Design**: Mobile-first CSS, flexible layouts, accessibility considerations
