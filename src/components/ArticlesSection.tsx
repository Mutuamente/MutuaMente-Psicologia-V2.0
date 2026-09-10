import React, { useState } from 'react';
import { Clock, User, ArrowRight, X, BookOpen, Share2 } from 'lucide-react';
import { MutuaMenteSymbol } from './MutuaMenteLogo';
import { ARTICLES } from '../data/mockData';
import { Article } from '../types';
import { useBooking } from '../context/BookingContext';

export const ArticlesSection: React.FC = () => {
  const { currentLanguage } = useBooking();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="artigos" className="py-20 bg-stone-50 border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#9A7A2E] bg-[#F5EED8] border border-[#E8D5A0] px-3.5 py-1 rounded-full">
            <MutuaMenteSymbol className="w-3.5 h-3.5 text-[#C9A84C]" />
            {currentLanguage === 'pt' ? 'Artigos & Psicoeducação' : 'Articles & Psychoeducation'}
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-medium text-[#2C2822] mt-4">
            {currentLanguage === 'pt'
              ? 'Conhecimento clínico para o seu bem-estar diário'
              : 'Clinical knowledge for your daily wellness'}
          </h2>
          <p className="text-[#6B6560] text-sm sm:text-base mt-3 font-normal">
            {currentLanguage === 'pt'
              ? 'Artigos e reflexões clínicas redigidos pela Dra. Sofia Godinho Cabrita para compreender a mente e cultivar relações saudáveis.'
              : 'Clinical insights and reflections authored by Dr. Sofia Godinho Cabrita to understand the human mind and cultivate healthy relationships.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((art) => {
            const title = currentLanguage === 'pt' ? art.title : art.titleEn;
            const excerpt = currentLanguage === 'pt' ? art.excerpt : art.excerptEn;
            const category = currentLanguage === 'pt' ? art.category : art.categoryEn;

            return (
              <div
                key={art.id}
                className="bg-white rounded-3xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={art.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#1C2C39]/85 text-[#F5EED8] backdrop-blur-xs">
                      {category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-2">
                      <span>{art.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>

                    <h3 className="font-serif-display text-lg font-bold text-[#2C2822] group-hover:text-[#2A6496] transition-colors leading-snug">
                      {title}
                    </h3>

                    <p className="text-xs text-[#6B6560] mt-2.5 line-clamp-3 leading-relaxed">
                      {excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between border-t border-stone-100 mt-4">
                  <span className="text-[11px] font-medium text-stone-500">{art.author}</span>
                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="text-xs font-semibold text-[#2A6496] hover:text-[#1A4A72] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Ler Artigo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9A7A2E] bg-[#F5EED8] border border-[#E8D5A0] px-2.5 py-0.5 rounded-full">
                {currentLanguage === 'pt' ? selectedArticle.category : selectedArticle.categoryEn}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1 text-stone-400 hover:text-stone-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="font-serif-display text-2xl font-bold text-[#2C2822]">
              {currentLanguage === 'pt' ? selectedArticle.title : selectedArticle.titleEn}
            </h2>

            <div className="flex items-center gap-3 text-xs text-stone-500 border-b border-stone-100 pb-3">
              <span>Por {selectedArticle.author}</span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <div className="rounded-2xl overflow-hidden h-56 bg-stone-100">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-sm text-stone-700 leading-relaxed space-y-4 font-normal">
              <p>
                {currentLanguage === 'pt' ? selectedArticle.excerpt : selectedArticle.excerptEn}
              </p>
              <p>
                No contexto clínico atual, observamos um aumento expressivo de pessoas que funcionam com elevados níveis de exigência sem reconhecer o desgaste somático. Quando normalizamos o estado constante de alerta, o corpo e a mente começam a manifestar sinais de desregulação: alterações no ciclo do sono, irritabilidade interpessoal e sensação de sufoco interior.
              </p>
              <p>
                O acompanhamento psicológico não visa apenas mitigar o sofrimento imediato, mas fornecer competências metacognitivas duradouras. Aprender a reconhecer gatilhos, validar as próprias necessidades sem culpa e traçar fronteiras assertivas constituem etapas cruciais para uma vida com significado e serenidade.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-[#2A6496] hover:bg-[#1A4A72] text-white text-xs font-semibold cursor-pointer"
              >
                Fechar Artigo
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
