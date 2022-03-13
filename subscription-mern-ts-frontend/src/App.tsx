import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './component/Nav/Nav';
import Articles from './pages/articles';
import LandingPage from './pages/LandingPage';
import { ProtectedRoute } from './routes/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route  path="/articles" element={<ProtectedRoute />}>
          <Route path="/articles" element={<Articles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
