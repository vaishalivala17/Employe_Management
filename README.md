# Employee Management

A full-stack Employee Management app with:
- **Backend**: Node.js + Express + MongoDB Atlas
- **Frontend**: React + Vite

It supports **CRUD** for employees plus **search/filtering** and **pagination** on the list page.

---

## Live Preview

Frontend : https://employe-management-frontend.vercel.app/

## Features

- Add employee
- Edit employee
- Delete employee
- List employees
- Search by **full name** (case-insensitive)
- Filter by **department**
- Pagination (server-side)
- Sorting (server-side; used by the UI)

---

## Data Model (Employee)

Employee fields:
- `fullName` *(string, required)*
- `email` *(string, required, unique, email format)*
- `phoneNumber` *(string, required)*
- `department` *(string, required)*
- `salary` *(number, required, min: 0)*
- `joiningDate` *(date, required)*

---

## API Endpoints

Base path: `http://localhost:3001/api/employees`

### Create
- `POST /api/employees`

### Read (list)
- `GET /api/employees?search=&department=&page=&limit=&sortBy=&sortOrder=`

Example:
- `GET /api/employees?search=john&department=IT&page=1&limit=10&sortBy=joiningDate&sortOrder=desc`

### Read (single)
- `GET /api/employees/:id`

### Update
- `PUT /api/employees/:id`

### Delete
- `DELETE /api/employees/:id`

---

## Environment Variables

### Backend (.env)
Create a `.env` file inside the `Backend/` folder with:

- `MONGO_URI=your_mongodb_connection_string`

Notes:
- Backend uses `process.env.MONGO_URI` (or `process.env.MONGODB_URI`).

### Frontend (optional)
The frontend uses:
- `VITE_API_URL` (defaults to `http://localhost:3001`)

---

## Project Structure

- `Backend/`
  - `index.js` (Express server + MongoDB connection)
  - `Models/Employee.js` (Mongoose schema)
  - `routes/employees.js` (API routes)
- `Frontend/Employe_Management/`
  - `src/pages/EmployeeList.jsx` (list + search/filter + pagination)
  - `src/pages/AddEditEmployee.jsx` (add/edit page)
  - `src/components/EmployeeForm.jsx` (form + validation)
  - `src/api.js` (Axios API client)

---

## Setup & Run

### 1) Backend

```bash
cd "Backend"
npm install
npm run dev
```

Default backend port: **3001**

### 2) Frontend

```bash
cd "Frontend/Employe_Management"
npm install
npm run dev
```

Frontend will run on the Vite default port (commonly **5173**).

---

## Using the App

1. Open the frontend URL in your browser.
2. Use **Search name** and **Department** filters on the list page.
3. Click **Add Employee** to create a new record.
4. Use **Edit** to update an employee.
5. Use **Delete** to remove an employee.

---

## Default UI Routes

- `/` : Employee list
- `/add` : Add employee
- `/edit/:id` : Edit employee

---

## Notes

- Deleting requires browser confirmation (`confirm('Delete this employee?')`).
- The list uses `limit: 10` and sorts by `joiningDate` (descending) as wired in `EmployeeList.jsx`.


