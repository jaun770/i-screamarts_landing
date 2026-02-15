import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Layout } from '@/components/corporate/Layout';
import HomePage from '@/pages/corporate/HomePage';
import ProductsPage from '@/pages/corporate/ProductsPage';
import BlogPage from '@/pages/corporate/BlogPage';
import BlogPostPage from '@/pages/corporate/BlogPostPage';
import NewsPage from '@/pages/corporate/NewsPage';
import ContactPage from '@/pages/corporate/ContactPage';
import NotFound from '@/pages/NotFound';

export default function App() {
  // Corporate Hub with bilingual support
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
          <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
          <Route path="/blog/:slug" element={<Layout><BlogPostPage /></Layout>} />
          <Route path="/news" element={<Layout><NewsPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
