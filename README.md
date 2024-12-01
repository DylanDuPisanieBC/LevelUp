# Level Up Assessment

## Starting Project

> [!WARNING]
> The backend builds the in memory database while in development mode, changing the development mode to production will cause errors.

### Starting Backend
```
cd backend_level_up
dotnet run
```
### Starting Frontend
```
cd frontend_level_up
npm install (if node modules are missing)
npm start
```
## About This Project

### Backend

the backend is built using ASP.net Web API, using EF Core in memory database which automatically populates the database with dummy data.
You can test the API directly by using the command ```dotnet watch run```, this will open a swagger user interface to interact with the API.

### Frontend

The frontend is built using ReactJS, animations were created using the framer-motion library.
