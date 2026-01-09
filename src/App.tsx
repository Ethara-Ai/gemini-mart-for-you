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
  // Ensure basename doesn't have a trailing slash for React Router
  const basename = import.meta.env.BASE_URL.endsWith('/') 
    ? import.meta.env.BASE_URL.slice(0, -1) 
    : import.meta.env.BASE_URL;

  // #region agent log
  try {
    // Log to console as fallback
    console.log('App Config:', { basename, envBase: import.meta.env.BASE_URL, href: window.location.href });
    fetch('http://127.0.0.1:7244/ingest/e77be3d7-62e4-4f30-befe-05a8a93d4dd1',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'src/App.tsx:16',message:'App Render Config',data:{basename, envBase: import.meta.env.BASE_URL, location: window.location.pathname},timestamp:Date.now(),sessionId:'debug-session'})}).catch(()=>{});
  } catch(e) {}
  // #endregion

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
            <Route path="*" element={<DebugView />} />
          </Routes>
        </Layout>
      </Providers>
    </Router>
  );
}

export default App;
