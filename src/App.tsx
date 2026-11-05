import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import type { PageId } from '@/components/navigation';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Dashboard from '@/pages/Dashboard';
import CropInfo from '@/pages/CropInfo';
import MarketPrices from '@/pages/MarketPrices';
import GovtSchemes from '@/pages/GovtSchemes';
import Weather from '@/pages/Weather';
import AskExpert from '@/pages/AskExpert';
import Community from '@/pages/Community';
import Login from '@/pages/Login';

function App() {
  const [page, setPage] = useState<PageId>(() =>
    window.location.hash.includes('type=recovery') ? 'login' : 'home'
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (next: PageId) => {
    setPage(next);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const isAuthPage = page === 'login';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar current={page} onNavigate={handleNavigate} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <main className="flex-1">
        {page === 'home' && <Home onNavigate={handleNavigate} />}
        {page === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        {page === 'crops' && <CropInfo />}
        {page === 'market' && <MarketPrices />}
        {page === 'schemes' && <GovtSchemes />}
        {page === 'weather' && <Weather />}
        {page === 'expert' && <AskExpert />}
        {page === 'community' && <Community />}
        {page === 'login' && <Login onNavigate={handleNavigate} />}
      </main>
      {!isAuthPage && <Footer onNavigate={handleNavigate} />}
    </div>
    
  );
}

export default App;
