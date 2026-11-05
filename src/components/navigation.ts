import { Home, LayoutDashboard, Sprout, TrendingUp, Landmark, Cloud, MessageCircleQuestion, Users } from 'lucide-react';

export type PageId =
  | 'home' | 'dashboard' | 'crops' | 'market' | 'schemes'
  | 'weather' | 'expert' | 'community' | 'login';

export const navItems: { id: PageId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'crops', label: 'Crop Info', icon: Sprout },
  { id: 'market', label: 'Market Prices', icon: TrendingUp },
  { id: 'schemes', label: 'Govt. Schemes', icon: Landmark },
  { id: 'weather', label: 'Weather', icon: Cloud },
  { id: 'expert', label: 'Ask Expert', icon: MessageCircleQuestion },
  { id: 'community', label: 'Community', icon: Users },
];
