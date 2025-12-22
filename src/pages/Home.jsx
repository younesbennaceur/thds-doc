import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, FileText, CheckCircle, ArrowRight, Wand2, } from 'lucide-react';

export default function Home() {
  const cards = [
    {
      id: 1,
      title: "Convocation",
      description: "Générez la convocation officielle avec les dates, lieux et informations légales.",
      icon: <FileText size={32} />,
      link: "/convocation",
      color: "from-blue-500 to-blue-700"
    },
    {
      id: 2,
      title: "Planning",
      description: "Créez le planning détaillé heures par heures et jours par jours pour le stagiaire.",
      icon: <Calendar size={32} />,
      link: "/planning", // Vous créerez cette page plus tard
      color: "from-purple-500 to-purple-700"
    },
    {
      id: 3,
      title: "Consentement",
      description: "Éditez le formulaire de consentement RGPD et contact pour l'élève.",
      icon: <CheckCircle size={32} />,
      link: "/consentement", // Vous créerez cette page plus tard
      color: "from-emerald-500 to-emerald-700"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* --- HERO SECTION --- */}
      <div className="relative bg-purple-950 text-white overflow-hidden pb-32">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        {/* Cercle décoratif */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-800 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-900 rounded-full blur-3xl opacity-50"></div>

        <div className="max-w-6xl mx-auto px-6 pt-20 pb-10 relative z-10 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
            <Wand2 size={18} className="mr-2 text-purple-300" />
            <span className="text-sm font-medium tracking-wide uppercase">Outils Administratifs</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Générateur de Documents <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-200">THDS</span>
          </h1>
          <p className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto mb-10">
            Créez vos PDF officiels (Convocations, Plannings, Consentements) en quelques clics, prêts à être envoyés et signés.
          </p>
        </div>
      </div>

      {/* --- CARDS SECTION (Overlap sur le Hero) --- */}
      <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {cards.map((card) => (
            <Link key={card.id} to={card.link} className="group">
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-slate-100 h-full flex flex-col">
                
                {/* Header coloré de la carte */}
                <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-purple-900 transition-colors">
                    {card.title}
                  </h3>
                  
                  <p className="text-slate-500 mb-8 leading-relaxed flex-1">
                    {card.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-bold uppercase tracking-wider text-slate-400 group-hover:text-purple-700 transition-colors mt-auto">
                    Commencer
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>

    </div>
  );
}