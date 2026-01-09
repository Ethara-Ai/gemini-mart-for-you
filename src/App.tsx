import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Providers } from './context/Providers';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfilePage } from './pages/ProfilePage';

import { useLocation } from 'react-router-dom';

function DebugView() {
  const location = useLocation();
  return (
    <div className="p-4 bg-red-100 text-red-900 border border-red-300 rounded m-4">
      <h2 className="text-lg font-bold">Debug: Route Not Found</h2>
      <p>Current Path: <code>{location.pathname}</code></p>
      <p>Full URL: <code>{window.location.href}</code></p>
    </div>
  );
}

function App() {
  return (
    <Router basename="/mart-for-you">
      <Providers>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<DebugView />} />
          </Routes>
        </Layout>
      </Providers>
    </Router>
  );
}

export default App;
