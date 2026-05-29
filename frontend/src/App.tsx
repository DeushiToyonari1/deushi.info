import { Routes, Route } from 'react-router-dom';
import './styles/additional.scss';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { PostPage } from './pages/PostPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProfilePage } from './pages/ProfilePage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ImportHelper } from './pages/ImportHelper';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <div className="wrapper" id="wrap">
      <SiteHeader />
      <div className="container">
        <main className="mainContainer">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/posts/:slug" element={<PostPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/profile/*" element={<ProfilePage />} />
              <Route path="/contact/*" element={<ContactPage />} />
              <Route path="/import-helper" element={<ImportHelper />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <ErrorBoundary>
          <Sidebar />
        </ErrorBoundary>
      </div>
      <SiteFooter />
    </div>
  );
}
