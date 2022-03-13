import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './component/Nav/Nav';
import Articles from './pages/Articles';
import ArticlesPlan from './pages/ArticlesPlan';
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
        <Route  path="/articles-plan" element={<ProtectedRoute />}>
          <Route path="/articles-plan" element={<ArticlesPlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
