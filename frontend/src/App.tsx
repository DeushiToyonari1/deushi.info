import { Routes, Route } from 'react-router-dom';
import './styles/additional.scss';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './pages/HomePage';
import { PostPage } from './pages/PostPage';
import { CategoryPage } from './pages/CategoryPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="wrapper" id="wrap">
      <SiteHeader />
      <div className="container">
        <main className="mainContainer">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts/:slug" element={<PostPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Sidebar />
      </div>
      <SiteFooter />
    </div>
  );
}
