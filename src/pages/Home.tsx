import { Sprout, TrendingUp, Cloud, Landmark, MessageCircleQuestion, Users, ArrowRight, Droplets, Sun, Wheat, ShieldCheck, Award, Quote } from 'lucide-react';
import { images } from '@/data/demoData';
import type { PageId } from '@/components/Navbar';

type HomeProps = { onNavigate: (page: PageId) => void };

const features: { id: PageId; title: string; desc: string; icon: typeof Sprout; color: string }[] = [
  { id: 'crops', title: 'Crop Information', desc: 'Detailed guides on crops, seasons, soil, water needs, and expected yields.', icon: Sprout, color: 'from-agri-500 to-agri-700' },
  { id: 'market', title: 'Market Prices', desc: 'Real-time mandi prices across India with trend analysis and alerts.', icon: TrendingUp, color: 'from-sky-500 to-sky-700' },
  { id: 'weather', title: 'Weather Updates', desc: '7-day forecasts, rainfall probability, and farming advisories.', icon: Cloud, color: 'from-blue-400 to-blue-600' },
  { id: 'schemes', title: 'Govt. Schemes', desc: 'Central and state government subsidies, loans, and insurance schemes.', icon: Landmark, color: 'from-earth-500 to-earth-700' },
  { id: 'expert', title: 'Ask an Expert', desc: 'Connect with agriculture scientists and get answers to your questions.', icon: MessageCircleQuestion, color: 'from-emerald-500 to-teal-700' },
  { id: 'community', title: 'Farmer Community', desc: 'Share experiences, ask questions, and learn from fellow farmers.', icon: Users, color: 'from-lime-500 to-green-700' },
];

const stats = [
  { value: '12,000+', label: 'Farmers Registered', icon: Users },
  { value: '9', label: 'Crop Guides', icon: Sprout },
  { value: '50+', label: 'Mandis Tracked', icon: TrendingUp },
  { value: '6', label: 'Govt. Schemes', icon: Landmark },
];

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.hero} alt="Farmer in rice field" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-agri-950/90 via-agri-900/70 to-agri-800/30" />
        </div>
        <div className="relative container-app px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-2xl">
            <span className="badge bg-agri-500/20 text-agri-200 border border-agri-400/30 mb-5 animate-slide-up">
              <Sprout className="w-3.5 h-3.5" />
              Local Farmer Support Portal
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight text-balance mb-5 animate-slide-up">
              Empowering Farmers with <span className="text-agri-300">Knowledge</span> & Resources
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-8 max-w-xl animate-slide-up">
              From crop information to real-time market prices, weather forecasts, and government schemes — AgriConnect brings everything a farmer needs into one easy-to-use platform.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-up">
              <button onClick={() => onNavigate('dashboard')} className="btn-primary !bg-agri-500 hover:!bg-agri-400">
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => onNavigate('crops')} className="btn-secondary !bg-white/10 !border-white/30 !text-white hover:!bg-white/20">
                Explore Crops
              </button>
            </div>
          </div>
        </div>
        {/* Stats Bar */}
        <div className="relative bg-white/95 backdrop-blur-sm border-t border-agri-100">
          <div className="container-app px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-agri-50 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-agri-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-display font-bold text-gray-900 leading-none">{s.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-gray-50">
        <div className="container-app">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge bg-agri-100 text-agri-700 mb-3">Everything You Need</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-3">A Complete Agriculture Toolkit</h2>
            <p className="text-gray-500">Access reliable information and services designed specifically for the needs of Indian farmers.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <button
                  key={i}
                  onClick={() => onNavigate(f.id)}
                  className="card p-7 text-left group cursor-pointer"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-900 mb-2 group-hover:text-agri-700 transition-colors">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{f.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-agri-600 group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlight Banner */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.heroAlt} alt="Green rice fields" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-agri-900/95 to-agri-700/80" />
        </div>
        <div className="relative container-app px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">Smart Farming Starts Here</h2>
            <p className="text-lg text-agri-100 leading-relaxed mb-8">
              AgriConnect delivers timely, actionable information to help you make better farming decisions — increase yields, reduce costs, and maximize profits.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: Droplets, title: 'Water Smart', desc: 'Optimize irrigation with weather-aware advisories' },
                { icon: Sun, title: 'Climate Ready', desc: '7-day forecasts to plan sowing and harvesting' },
                { icon: ShieldCheck, title: 'Risk Covered', desc: 'Insurance and scheme info at your fingertips' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors">
                    <Icon className="w-7 h-7 text-agri-300 mb-3" />
                    <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                    <p className="text-sm text-agri-100/80">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section-padding bg-white">
        <div className="container-app">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="badge bg-agri-100 text-agri-700 mb-3">Simple & Accessible</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-3">How AgriConnect Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Register Your Farm', desc: 'Sign up and add details about your land, crops, and location to get personalized information.' },
              { step: '02', title: 'Get Tailored Updates', desc: 'Receive crop advisories, mandi prices, and weather alerts specific to your region and crops.' },
              { step: '03', title: 'Grow with Confidence', desc: 'Make informed decisions with expert advice, community support, and government scheme access.' },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-display font-extrabold text-agri-100 mb-3">{s.step}</div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 w-16 h-px bg-agri-200" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-agri-50">
        <div className="container-app">
          <div className="text-center mb-10">
            <span className="badge bg-white text-agri-700 border border-agri-200 mb-3"><Award className="w-3.5 h-3.5" /> Farmer Stories</span>
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900">What Our Farmers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Suresh Patel', location: 'Anand, Gujarat', text: 'Earlier I used to sell my tomato crop to local agents at whatever price they offered. With AgriConnect market prices, I now check mandi rates daily and sell at the right time. My income has increased by 20%.' },
              { name: 'Geeta Kumari', location: 'Muzaffarpur, Bihar', text: 'The weather forecast helped me save my mango crop from an unexpected hailstorm. I harvested a week early. The expert advice section is also very helpful for disease identification.' },
            ].map((t, i) => (
              <div key={i} className="card p-7 bg-white">
                <Quote className="w-8 h-8 text-agri-200 mb-4" />
                <p className="text-gray-600 leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-agri-400 to-agri-700 flex items-center justify-center text-white font-bold">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-agri-700 to-agri-900">
        <div className="container-app text-center max-w-2xl mx-auto">
          <Wheat className="w-12 h-12 text-agri-300 mx-auto mb-5" />
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">Join the AgriConnect Community Today</h2>
          <p className="text-agri-100 text-lg mb-8">Register now and connect with thousands of farmers across India sharing knowledge, tips, and market insights.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => onNavigate('login')} className="btn-primary !bg-white !text-agri-700 hover:!bg-gray-100">
              Register Now
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onNavigate('community')} className="btn-secondary !bg-transparent !border-white/30 !text-white hover:!bg-white/10">
              Explore Community
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
