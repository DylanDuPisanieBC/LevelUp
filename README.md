# Level Up Assessment

Project completed for the Level Up assessment!🚀

## Starting Project

> [!WARNING]
> While in development mode, the backend uses a EF Core in-memory database. Switching to production mode without further configurationto the DbContext  for it to connect to a SQLserver will cause errors.

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

