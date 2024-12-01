import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Welcome from './pages/Welcome';
import CreateGraduate from './pages/CreateGraduate';
import UpdateGraduate from './pages/UpdateGraduate';
import ViewAllGraduates from './pages/ViewAllGraduates';
import ViewGraduate from './pages/ViewGraduate';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"
          element={
            <PageTransition>
              <Welcome />
            </PageTransition>
          }
        />
        <Route path="create" 
        element={
            <PageTransition>
              <CreateGraduate />
            </PageTransition>
          }
        />
        <Route path="update/:id"
          element={
            <PageTransition>
              <UpdateGraduate />
            </PageTransition>
          }
        />
        <Route path="viewall"
          element={
            <PageTransition>
              <ViewAllGraduates />
            </PageTransition>
          }
        />
        <Route path="view/:id"
          element={
            <PageTransition>
              <ViewGraduate/>
            </PageTransition>
          }
        />
        <Route path="customer/:id"
          element={
            <PageTransition>
              <ViewGraduate />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      transition={{ duration: 0.5 }} 
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
