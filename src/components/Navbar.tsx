import { LogIn, Menu, X, Leaf } from 'lucide-react';
import { navItems, type PageId } from './navigation';

type NavbarProps = {
  current: PageId;
  onNavigate: (page: PageId) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
};

export default function Navbar({ current, onNavigate, mobileOpen, setMobileOpen }: NavbarProps) {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-agri-100 shadow-soft">
      <nav className="container-app flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button onClick={() => handleNav('home')} className="flex items-center gap-2 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-agri-500 to-agri-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="text-left">
            <span className="font-display font-extrabold text-lg text-agri-800 leading-none block">AgriConnect</span>
            <span className="text-[10px] text-gray-400 font-medium leading-none">Farmer Support Portal</span>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = current === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active ? 'text-agri-700 bg-agri-50' : 'text-gray-600 hover:text-agri-700 hover:bg-agri-50/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
                {active && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-agri-600" />}
              </button>
            );
          })}
        </div>

        {/* Login Button */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleNav('login')}
            className="btn-primary !px-5 !py-2.5 !text-sm"
          >
            <LogIn className="w-4 h-4" />
            Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-agri-50 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-agri-100 bg-white animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = current === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active ? 'text-agri-700 bg-agri-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNav('login')}
              className="w-full btn-primary mt-3"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
