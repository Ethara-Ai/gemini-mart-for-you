import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Providers } from './context/Providers';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  // Ensure basename doesn't have a trailing slash for React Router
  const basename = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL.slice(0, -1) 
    : import.meta.env.BASE_URL;

  return (
    <Router basename={basename}>
      <Providers>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Layout>
      </Providers>
    </Router>
  );
}

export default App;
