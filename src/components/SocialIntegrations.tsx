import React from 'react';
import { 
  MessageCircle, 
  Instagram, 
  ExternalLink, 
  Share2,
  Heart,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { MutuaMenteSymbol } from './MutuaMenteLogo';
import { CLINIC_INFO } from '../data/mockData';
import { useBooking } from '../context/BookingContext';

export const SocialIntegrations: React.FC = () => {
  const { currentLanguage } = useBooking();

  const instagramPosts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80',
      titlePt: '3 Técnicas de Respiração para Ataques de Pânico',
      titleEn: '3 Breathing Techniques for Panic Attacks',
      likes: '428',
      comments: '34',
      url: CLINIC_INFO.instagramUrl
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=500&q=80',
      titlePt: 'Como Dizer "Não" Sem Culpa no Trabalho',
      titleEn: 'How to Say "No" Without Guilt at Work',
      likes: '612',
      comments: '58',
      url: CLINIC_INFO.instagramUrl
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=500&q=80',
      titlePt: 'A Diferença Entre Tristeza e Depressão',
      titleEn: 'The Difference Between Sadness and Depression',
      likes: '890',
      comments: '92',
      url: CLINIC_INFO.instagramUrl
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=500&q=80',
      titlePt: 'Relações Tóxicas vs. Relações Conscientes',
      titleEn: 'Toxic Patterns vs. Conscious Relationships',
      likes: '745',
      comments: '63',
      url: CLINIC_INFO.instagramUrl
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
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#9A7A2E] bg-[#F5EED8] border border-[#E8D5A0] px-3.5 py-1 rounded-full">
              <MutuaMenteSymbol className="w-3.5 h-3.5 text-[#C9A84C]" />
              {currentLanguage === 'pt' ? 'Comunidade & Redes Sociais' : 'Community & Social Networks'}
            </span>

            <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#2C2822] mt-3 leading-snug">
              {currentLanguage === 'pt' 
                ? 'Acompanhe as nossas publicações e artigos clínicos' 
                : 'Follow our insights and clinical reflections'}
            </h2>

            <p className="text-sm text-[#6B6560] mt-3 leading-relaxed">
              {currentLanguage === 'pt'
                ? 'Partilhamos regularmente conteúdos práticos sobre regulação emocional, bem-estar psicológico e dinâmicas relacionais no Instagram e Facebook.'
                : 'We regularly publish evidence-based guidance on emotional balance and mental wellness on Instagram and Facebook.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Official Facebook Card & Quick Access */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Facebook Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#1877F2] text-white flex items-center justify-center font-bold text-xl shrink-0 shadow-xs">
                      f
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900">
                        MutuaMente Psicologia
                      </h3>
                      <p className="text-xs text-stone-500">Página Oficial no Facebook</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                    Comunidade
                  </span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  Artigos explicativos, avisos de novos horários de consulta e respostas a dúvidas frequentes sobre saúde psicológica em Portugal.
                </p>

                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between text-xs text-stone-600">
                  <div className="flex items-center gap-1.5 font-medium">
                    <ThumbsUp className="w-4 h-4 text-[#1877F2]" />
                    <span>Publicações semanais e esclarecimentos</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-stone-500">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Contacto direto</span>
                  </div>
                </div>

                <a
                  href={CLINIC_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  <span>Seguir no Facebook</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Instagram Profile Quick Access */}
              <div className="bg-gradient-to-br from-[#FAF3E7] to-white rounded-3xl p-6 border border-[#E5B468]/40 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2C2822]">
                        {CLINIC_INFO.instagram}
                      </h4>
                      <p className="text-[11px] text-stone-500">Lisboa • Psicologia Clínica</p>
                    </div>
                  </div>

                  <a
                    href={CLINIC_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 text-xs font-bold text-stone-800 hover:bg-stone-50 transition shadow-xs flex items-center gap-1"
                  >
                    <span>Ver Perfil</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  Infográficos de psicoeducação, dicas para lidar com a ansiedade e partilhas clínicas da Dra. Sofia Godinho Cabrita.
                </p>
              </div>

            </div>

            {/* Right: Instagram Feed Visual Cards */}
            <div className="lg:col-span-7">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Instagram className="w-5 h-5 text-rose-600" />
                  <span className="text-xs font-bold text-[#2C2822]">
                    Publicações Clínicas no Instagram
                  </span>
                </div>
                <a
                  href={CLINIC_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#2A6496] hover:text-[#1A4A72] flex items-center gap-1"
                >
                  <span>Ver todas as publicações</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {instagramPosts.map((post) => (
                  <a
                    key={post.id}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-sm aspect-square block cursor-pointer"
                  >
                    <img
                      src={post.image}
                      alt={post.titlePt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent p-4 flex flex-col justify-end text-white">
                      <p className="text-xs font-bold line-clamp-2 leading-snug">
                        {currentLanguage === 'pt' ? post.titlePt : post.titleEn}
                      </p>
                      <div className="flex items-center justify-between mt-2 text-[10px] text-stone-300 font-medium">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                          {post.likes} gostos
                        </span>
                        <span className="flex items-center gap-1 text-amber-200">
                          <Share2 className="w-3 h-3" />
                          {post.comments} partilhas
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
