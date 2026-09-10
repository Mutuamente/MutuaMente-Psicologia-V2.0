import React, { useState } from 'react';
import { 
  MessageCircle, 
  Instagram, 
  Linkedin, 
  Headphones, 
  Play, 
  Pause,
  ExternalLink, 
  ArrowUpRight,
  Share2,
  Heart
} from 'lucide-react';
import { MutuaMenteSymbol } from './MutuaMenteLogo';
import { CLINIC_INFO } from '../data/mockData';
import { useBooking } from '../context/BookingContext';

export const SocialIntegrations: React.FC = () => {
  const { currentLanguage } = useBooking();
  const [isPlaying, setIsPlaying] = useState(false);

  const instagramPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80',
      titlePt: '3 Técnicas de Respiração para Ataques de Pânico',
      titleEn: '3 Breathing Techniques for Panic Attacks',
      likes: '428',
      comments: '34'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=500&q=80',
      titlePt: 'Como Dizer "Não" Sem Culpa no Trabalho',
      titleEn: 'How to Say "No" Without Guilt at Work',
      likes: '612',
      comments: '58'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=500&q=80',
      titlePt: 'A Diferença Entre Tristeza e Depressão',
      titleEn: 'The Difference Between Sadness and Depression',
      likes: '890',
      comments: '92'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=500&q=80',
      titlePt: 'Relações Tóxicas vs. Relações Conscientes',
      titleEn: 'Toxic Patterns vs. Conscious Relationships',
      likes: '745',
      comments: '63'
    }
  ];

  return (
    <>
      {/* Floating WhatsApp Quick-Chat Button */}
      <a
        href={CLINIC_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-all duration-200 group focus:outline-none"
        title="Fale connosco no WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline text-xs font-bold tracking-wide">
          {currentLanguage === 'pt' ? 'Falar no WhatsApp' : 'Chat on WhatsApp'}
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-[#C9A84C] animate-ping absolute -top-0.5 -right-0.5 sm:hidden" />
      </a>

      {/* Social Media & Community Showcase Section */}
      <section className="py-20 bg-stone-50 border-t border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Podcast & Community Hub */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#9A7A2E] bg-[#F5EED8] border border-[#E8D5A0] px-3.5 py-1 rounded-full">
                <MutuaMenteSymbol className="w-3.5 h-3.5 text-[#C9A84C]" />
                {currentLanguage === 'pt' ? 'Comunidade & Psicoeducação' : 'Community & Education'}
              </span>

              <h2 className="font-serif-display text-3xl font-medium text-[#2C2822] leading-snug">
                {currentLanguage === 'pt' 
                  ? 'Acompanhe as nossas reflexões nas redes sociais e podcast' 
                  : 'Follow our insights on social media and podcast'}
              </h2>

              <p className="text-sm text-[#6B6560] leading-relaxed font-normal">
                {currentLanguage === 'pt'
                  ? 'Promovemos conteúdos semanais sobre saúde psicológica, parentalidade e gestão emocional para aproximar a psicologia do quotidiano.'
                  : 'We publish weekly evidence-based content on mental wellness, parenting, and emotional resilience.'}
              </p>

              {/* Spotify Podcast Feature Box */}
              <div className="bg-[#1C2C39] text-white rounded-3xl p-6 shadow-lg border border-[#2A6496]/40 relative overflow-hidden group">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#2A6496] flex items-center justify-center text-white shrink-0 shadow-sm">
                      <Headphones className="w-6 h-6 text-[#F5EED8]" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-wider uppercase font-semibold text-[#C9A84C]">
                        Podcast MutuaMente
                      </span>
                      <h4 className="text-base font-bold text-white">Mente em Sintonia</h4>
                    </div>
                  </div>

                  <span className="text-xs text-stone-400 font-mono">Ep. 24</span>
                </div>

                <p className="text-xs text-stone-300 mt-4 leading-relaxed">
                  "Como desarmar o crítico interno e abraçar a auto-compaixão" — Conversa com a Dra. Sofia Godinho Cabrita.
                </p>

                <div className="mt-5 pt-4 border-t border-stone-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-8 h-8 rounded-full bg-[#C9A84C] hover:bg-[#B3933C] text-[#1C2C39] flex items-center justify-center transition cursor-pointer"
                      title={isPlaying ? "Pausar prévia" : "Ouvir prévia"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    </button>
                    <span className="text-xs text-stone-300 font-medium">
                      {isPlaying ? 'A reproduzir excerto...' : '18 min de escuta'}
                    </span>
                  </div>

                  <a
                    href="https://open.spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-[#C9A84C] hover:text-[#E8D5A0] flex items-center gap-1"
                  >
                    <span>Ouvir no Spotify</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Direct Social Links */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-100 text-xs font-semibold transition flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4 text-rose-500" />
                  <span>Instagram @mutuamente.psicologia</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-100 text-xs font-semibold transition flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Right: Instagram Feed Visual Preview */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-[#2C2822]" />
                  <span className="text-xs font-bold text-[#2C2822]">
                    Últimas Publicações do Instagram
                  </span>
                </div>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#2A6496] hover:text-[#1A4A72] flex items-center gap-1"
                >
                  <span>Seguir Página</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {instagramPosts.map((post) => (
                  <div
                    key={post.id}
                    className="group relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm aspect-square"
                  >
                    <img
                      src={post.image}
                      alt={post.titlePt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent p-4 flex flex-col justify-end text-white">
                      <p className="text-xs font-bold line-clamp-2 leading-snug">
                        {currentLanguage === 'pt' ? post.titlePt : post.titleEn}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-stone-300 font-medium">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-3 h-3" />
                          {post.comments} partilhas
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
