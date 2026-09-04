import { useState } from 'react';
import { MessageCircleQuestion, Search, Star, Clock, MessageSquare, Send, ThumbsUp, CheckCircle2, MapPin } from 'lucide-react';
import { experts } from '@/data/demoData';

type QandA = { question: string; answer: string; expert: string; date: string; likes: number; tags: string[] };

const previousQAs: QandA[] = [
  {
    question: 'My tomato leaves are curling and turning yellow. What could be the cause?',
    answer: 'Leaf curling with yellowing in tomatoes is typically caused by either tomato leaf curl virus (ToLCV) transmitted by whiteflies, or micronutrient deficiency. Given the current humid conditions, whitefly infestation is more likely. Apply neem oil (5ml/litre) as a foliar spray, and install yellow sticky traps. If the problem persists, consult your nearest Krishi Vigyan Kendra for virus testing.',
    expert: 'Dr. Sunita Patil', date: '01 Sep 2026', likes: 34, tags: ['tomato', 'disease', 'pest-control'],
  },
  {
    question: 'When is the best time to sow mustard in Rajasthan?',
    answer: 'The optimal sowing window for mustard in Rajasthan is from the last week of September to the first week of October. Sowing before 15 September can lead to Sclerotinia stem rot infection, while delaying beyond 15 October reduces yield significantly. Use varieties like RH-725 or DRMR-150-35. Apply 40 kg nitrogen, 40 kg phosphorus, and 20 kg potash per hectare at sowing.',
    expert: 'Dr. Rajesh Verma', date: '30 Aug 2026', likes: 52, tags: ['mustard', 'sowing', 'rajasthan'],
  },
  {
    question: 'How can I improve soil fertility without chemical fertilizers?',
    answer: 'You can improve soil fertility organically through: (1) Apply 10-15 tonnes of well-decomposed farmyard manure or compost per hectare before sowing. (2) Use green manuring crops like dhaincha or sunhemp and incorporate them 30-40 days after sowing. (3) Practice crop rotation with legumes to fix atmospheric nitrogen. (4) Apply vermicompost at 2.5 tonnes/hectare. Get your soil tested every 2 years under the Soil Health Card scheme for targeted nutrient management.',
    expert: 'Dr. Rajesh Verma', date: '28 Aug 2026', likes: 78, tags: ['soil', 'organic', 'fertility'],
  },
];

export default function AskExpert() {
  const [search, setSearch] = useState('');
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filteredQAs = previousQAs.filter(q =>
    q.question.toLowerCase().includes(search.toLowerCase()) ||
    q.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      setSubmitted(true);
      setQuestion('');
      setCategory('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white">
        <div className="container-app px-4 sm:px-6 lg:px-8 py-12">
          <span className="badge bg-white/15 text-emerald-100 mb-3"><MessageCircleQuestion className="w-3.5 h-3.5" /> Ask an Expert</span>
          <h1 className="text-3xl lg:text-4xl font-display font-bold text-white mb-2">Connect with Agriculture Experts</h1>
          <p className="text-emerald-100 max-w-xl">Get answers to your farming questions from qualified agriculture scientists and agronomists.</p>
        </div>
      </div>

      <div className="container-app px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ask a Question Form */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Ask Your Question</h2>
              {submitted && (
                <div className="bg-agri-50 border border-agri-200 rounded-xl p-4 mb-4 flex items-start gap-3 animate-slide-up">
                  <CheckCircle2 className="w-5 h-5 text-agri-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-agri-800">Your question has been submitted! An expert will respond within 24 hours.</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="input-field cursor-pointer">
                    <option value="">Select category</option>
                    <option value="crop-disease">Crop Disease</option>
                    <option value="pest-control">Pest Control</option>
                    <option value="soil-fertility">Soil & Fertility</option>
                    <option value="irrigation">Irrigation</option>
                    <option value="weather">Weather & Climate</option>
                    <option value="market">Market & Pricing</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Your Question</label>
                  <textarea
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    rows={5}
                    placeholder="Describe your problem in detail. Mention crop name, symptoms, duration, and your location..."
                    className="input-field resize-none"
                  />
                </div>
                <button type="submit" className="btn-primary w-full" disabled={!question.trim()}>
                  <Send className="w-4 h-4" />
                  Submit Question
                </button>
              </form>
              <div className="mt-5 pt-5 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center"><Clock className="w-5 h-5 text-emerald-600" /></div>
                  <div>
                    <p className="font-semibold text-gray-700">Avg. Response Time</p>
                    <p className="text-xs text-gray-400">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experts + Q&A */}
          <div className="lg:col-span-2 space-y-6">
            {/* Experts */}
            <div>
              <h2 className="text-lg font-display font-bold text-gray-900 mb-4">Our Experts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {experts.map(exp => (
                  <div key={exp.id} className="card p-5 flex gap-4">
                    <img src={exp.image} alt={exp.name} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{exp.name}</h3>
                      <p className="text-xs text-agri-600 font-medium mb-1.5">{exp.specialization}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="flex items-center gap-1 text-xs font-semibold text-amber-600"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{exp.rating}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400"><MessageSquare className="w-3.5 h-3.5" />{exp.queries} queries</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Previous Q&A */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-bold text-gray-900">Recent Q&A</h2>
              </div>
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search questions by keyword or tag..." value={search} onChange={e => setSearch(e.target.value)} className="input-field !pl-12" />
              </div>
              <div className="space-y-4">
                {filteredQAs.map((qa, i) => (
                  <div key={i} className="card p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0"><MessageCircleQuestion className="w-5 h-5 text-emerald-600" /></div>
                      <h3 className="font-semibold text-gray-900">{qa.question}</h3>
                    </div>
                    <div className="bg-agri-50/50 rounded-xl p-4 mb-3 border-l-4 border-agri-400">
                      <p className="text-sm text-gray-700 leading-relaxed">{qa.answer}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {qa.tags.map(t => <span key={t} className="badge bg-gray-100 text-gray-500">#{t}</span>)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="font-medium text-agri-600">— {qa.expert}</span>
                        <span>{qa.date}</span>
                        <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" />{qa.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredQAs.length === 0 && (
                <div className="text-center py-12"><MessageCircleQuestion className="w-10 h-10 text-gray-300 mx-auto mb-3" /><p className="text-gray-400">No questions found.</p></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
