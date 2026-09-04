import { useState, useMemo } from 'react';
import { Landmark, Search, X, CheckCircle2, FileText, IndianRupee, Users } from 'lucide-react';
import { schemes, type Scheme } from '@/data/demoData';

const categories: ('All' | Scheme['category'])[] = ['All', 'Income Support', 'Insurance', 'Loan', 'Subsidy', 'Infrastructure'];

const categoryColor: Record<Scheme['category'], string> = {
  'Income Support': 'bg-agri-100 text-agri-700',
  'Insurance': 'bg-sky-100 text-sky-700',
  'Loan': 'bg-amber-100 text-amber-700',
  'Subsidy': 'bg-purple-100 text-purple-700',
  'Infrastructure': 'bg-teal-100 text-teal-700',
};

export default function GovtSchemes() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<typeof categories[number]>('All');
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return schemes.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === 'All' || s.category === category;
      return matchSearch && matchCat;
    });
  }, [search, category]);

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-br from-earth-600 to-earth-900 text-white">
        <div className="container-app px-4 sm:px-6 lg:px-8 py-12">
          <span className="badge bg-white/15 text-earth-100 mb-3"><Landmark className="w-3.5 h-3.5" /> Government Schemes</span>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">Central Government Schemes for Farmers</h1>
          <p className="text-earth-100 max-w-xl">Explore subsidies, insurance, loans, and support programs designed to empower Indian farmers.</p>
        </div>
      </div>

      <div className="container-app px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter */}
        <div className="bg-white rounded-2xl shadow-card p-5 mb-6">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search schemes by name or keyword..." value={search} onChange={e => setSearch(e.target.value)} className="input-field !pl-12" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${category === c ? 'bg-earth-600 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{c}</button>
            ))}
          </div>
          {(search || category !== 'All') && (
            <button onClick={() => { setSearch(''); setCategory('All'); }} className="mt-4 text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1 transition-colors"><X className="w-4 h-4" /> Clear filters</button>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-4">Showing <span className="font-semibold text-gray-700">{filtered.length}</span> schemes</p>

        {/* Scheme Cards */}
        <div className="space-y-4">
          {filtered.map(scheme => (
            <div key={scheme.id} className="card overflow-hidden">
              <button onClick={() => setExpanded(expanded === scheme.id ? null : scheme.id)} className="w-full text-left p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-earth-500 to-earth-700 flex items-center justify-center shrink-0 shadow-md">
                    <Landmark className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`badge ${categoryColor[scheme.category]}`}>{scheme.category}</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><FileText className="w-3 h-3" /> {scheme.ministry}</span>
                    </div>
                    <h3 className="text-lg font-display font-bold text-gray-900 mb-1.5">{scheme.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{scheme.description}</p>
                  </div>
                </div>
              </button>
              {expanded === scheme.id && (
                <div className="px-6 pb-6 sm:pl-24 animate-slide-up">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="bg-agri-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-agri-700 mb-2">
                        <IndianRupee className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Benefits</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{scheme.benefits}</p>
                    </div>
                    <div className="bg-sky-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-sky-700 mb-2">
                        <Users className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Eligibility</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{scheme.eligibility}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4 sm:ml-0">
                    <button className="btn-primary !py-2.5 !text-sm">Apply Now</button>
                    <button className="btn-secondary !py-2.5 !text-sm">Learn More</button>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-agri-500" /> Official scheme by {scheme.ministry}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Landmark className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400">No schemes found. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
