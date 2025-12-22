import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Download, Plus, Trash2, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// --- 1. LE TEMPLATE PDF (STYLE SÉCURISÉ) ---
// Note : J'ai remplacé toutes les classes Tailwind type 'text-slate-500' par des codes hexadécimaux '#xxxxxx'
// pour éviter le bug "oklch" de html2canvas.
const PlanningTemplate = React.forwardRef(({ data, sessions, totalHeures }, ref) => {
  
  // Palette de couleurs "en dur" pour éviter le bug
  const c = {
    purple: '#4c1d95',
    lightPurple: '#f3e8ff',
    textDark: '#1e293b',
    textGray: '#334155', 
    textLight: '#64748b',
    textLighter: '#94a3b8',
    border: '#cbd5e1',
    borderLight: '#e2e8f0',
    bgLight: '#f8fafc',
    white: '#ffffff'
  };

  return (
    <div ref={ref} style={{ width: '210mm', minHeight: '297mm', padding: '40px', backgroundColor: c.white, fontFamily: 'Arial, sans-serif' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: `2px solid ${c.purple}`, paddingBottom: '16px' }}>
        <img src="/logo.png" alt="Logo" style={{ width: '64px', height: 'auto', objectFit: 'contain' }} />
        <div style={{ textAlign: 'right' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: c.purple, textTransform: 'uppercase', margin: 0 }}>THDS LEARNING</h1>
          <p style={{ fontSize: '10px', color: c.textLight, margin: '4px 0 0 0' }}>5 Rue Pleyel, 93200 SAINT DENIS</p>
          <p style={{ fontSize: '10px', color: c.textLight, margin: '4px 0 0 0' }}>Mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
      </div>

      {/* TITRE */}
      <div style={{ backgroundColor: c.lightPurple, padding: '8px 0', marginBottom: '24px', borderRadius: '6px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '900', color: c.purple, textTransform: 'uppercase', letterSpacing: '2px', margin: 0 }}>Planning de Formation</h2>
      </div>

      {/* GRILLE INFOS */}
      <div style={{ backgroundColor: c.bgLight, padding: '16px', borderRadius: '6px', border: `1px solid ${c.borderLight}`, marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* Ligne 1 */}
          <div style={{ width: '50%', marginBottom: '16px' }}>
            <p style={{ fontSize: '9px', fontWeight: 'bold', color: c.textLighter, textTransform: 'uppercase', margin: '0 0 4px 0' }}>Stagiaire</p>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: c.textDark, margin: 0 }}>{data.stagiaire}</p>
          </div>
          <div style={{ width: '50%', marginBottom: '16px' }}>
            <p style={{ fontSize: '9px', fontWeight: 'bold', color: c.textLighter, textTransform: 'uppercase', margin: '0 0 4px 0' }}>Formation</p>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: c.textDark, margin: 0 }}>{data.formation}</p>
          </div>
          {/* Ligne 2 */}
          <div style={{ width: '50%', marginBottom: '16px' }}>
            <p style={{ fontSize: '9px', fontWeight: 'bold', color: c.textLighter, textTransform: 'uppercase', margin: '0 0 4px 0' }}>Formateur</p>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: c.textDark, margin: 0 }}>{data.formateur}</p>
          </div>
          <div style={{ width: '50%', marginBottom: '16px' }}>
            <p style={{ fontSize: '9px', fontWeight: 'bold', color: c.textLighter, textTransform: 'uppercase', margin: '0 0 4px 0' }}>Lieu / Modalité</p>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: c.textDark, margin: 0 }}>{data.lieu}</p>
          </div>
          {/* Ligne 3 */}
          <div style={{ width: '50%' }}>
            <p style={{ fontSize: '9px', fontWeight: 'bold', color: c.textLighter, textTransform: 'uppercase', margin: '0 0 4px 0' }}>Période</p>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: c.textDark, margin: 0 }}>Du {data.dateDebut} au {data.dateFin}</p>
          </div>
          <div style={{ width: '50%' }}>
            <p style={{ fontSize: '9px', fontWeight: 'bold', color: c.textLighter, textTransform: 'uppercase', margin: '0 0 4px 0' }}>Durée Totale</p>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: c.purple, margin: 0 }}>{totalHeures} Heures</p>
          </div>
        </div>
      </div>

      {/* TABLEAU */}
      <div style={{ border: `1px solid ${c.border}`, borderRadius: '6px', overflow: 'hidden', marginBottom: '32px' }}>
        {/* En-tête Tableau */}
        <div style={{ display: 'flex', backgroundColor: c.purple, color: c.white, padding: '8px 4px' }}>
          <div style={{ width: '25%', textAlign: 'center', fontSize: '10px', fontWeight: 'bold' }}>DATE</div>
          <div style={{ width: '50%', textAlign: 'center', fontSize: '10px', fontWeight: 'bold' }}>HORAIRES</div>
          <div style={{ width: '25%', textAlign: 'center', fontSize: '10px', fontWeight: 'bold' }}>DURÉE</div>
        </div>
        
        {/* Lignes Tableau */}
        {sessions.map((session, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              padding: '8px 4px', 
              borderBottom: index === sessions.length - 1 ? 'none' : `1px solid ${c.borderLight}`,
              backgroundColor: index % 2 !== 0 ? c.bgLight : c.white 
            }}
          >
            <div style={{ width: '25%', textAlign: 'center', fontSize: '10px', color: c.textGray }}>
              {session.date ? new Date(session.date).toLocaleDateString('fr-FR') : '-'}
            </div>
            <div style={{ width: '50%', textAlign: 'center', fontSize: '10px', color: c.textGray }}>
              {session.matinDebut} - {session.matinFin} &nbsp;/&nbsp; {session.apresMidiDebut} - {session.apresMidiFin}
            </div>
            <div style={{ width: '25%', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', color: c.textDark }}>
              {session.duree} H
            </div>
          </div>
        ))}
      </div>

      {/* SIGNATURES */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', marginBottom: '40px' }}>
        <div style={{ width: '45%', border: `1px solid ${c.border}`, borderRadius: '6px', height: '120px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '10px', color: c.textLight, textAlign: 'center', margin: 0 }}>Le Stagiaire (Lu et approuvé)</p>
          <p style={{ fontSize: '10px', textAlign: 'center', fontWeight: 'bold', margin: 0 }}>{data.stagiaire}</p>
        </div>
        <div style={{ width: '45%', border: `1px solid ${c.border}`, borderRadius: '6px', height: '120px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '10px', color: c.textLight, textAlign: 'center', margin: 0 }}>Pour l'Organisme</p>
          <img src="/signature.png" alt="Signature" style={{ width: '100px', height: 'auto', objectFit: 'contain' }} />
          <p style={{ fontSize: '10px', color: c.purple, fontWeight: 'bold', margin: 0 }}>THDS LEARNING</p>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: `1px solid ${c.borderLight}`, paddingTop: '12px', textAlign: 'center' }}>
        <p style={{ fontSize: '8px', color: c.textLighter, margin: '0 0 2px 0' }}>THDS LEARNING - SAS au capital de 1000€ - SIRET : 832 774 087 00023</p>
        <p style={{ fontSize: '8px', color: c.textLighter, margin: 0 }}>Organisme de formation déclaré sous le n°11931056093 - contact@thds.fr</p>
      </div>
    </div>
  );
});

// --- 2. LOGIQUE PRINCIPALE ---
export default function GenerateurPlanning() {
  const [generalData, setGeneralData] = useState({
    stagiaire: 'Mourad KRIM',
    formation: 'Français B1 - Social & Médico-social',
    formateur: 'Andrea DOTTELLO',
    lieu: 'Distanciel / Visio',
    dateDebut: '18/03/2025',
    dateFin: '20/03/2025'
  });

  const [sessions, setSessions] = useState([
    { id: 1, date: '2025-03-18', matinDebut: '09:00', matinFin: '12:00', apresMidiDebut: '13:00', apresMidiFin: '17:00', duree: '7' },
    { id: 2, date: '2025-03-19', matinDebut: '09:00', matinFin: '12:00', apresMidiDebut: '13:00', apresMidiFin: '17:00', duree: '7' },
    { id: 3, date: '2025-03-20', matinDebut: '09:00', matinFin: '12:00', apresMidiDebut: '13:00', apresMidiFin: '16:00', duree: '6' },
  ]);

  const [isClient, setIsClient] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Référence vers le template caché
  const printRef = useRef();

  useEffect(() => setIsClient(true), []);

  const totalHeures = sessions.reduce((acc, curr) => acc + (parseFloat(curr.duree) || 0), 0);

  const handleDownloadPDF = async () => {
    const input = printRef.current;
    if (!input) return;

    setIsGenerating(true);

    try {
      const canvas = await html2canvas(input, {
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#ffffff', // Forcer le fond blanc Hex
        // Ignore les images qui plantent pour éviter un crash total
        ignoreElements: (element) => element.classList.contains('no-print')
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Planning-${generalData.stagiaire}.pdf`);
    } catch (err) {
      console.error("Erreur génération PDF:", err);
      alert("Erreur lors de la génération. Détails console.");
    } finally {
      setIsGenerating(false);
    }
  };

  // --- Gestion du Formulaire ---
  const handleGeneralChange = (e) => setGeneralData({ ...generalData, [e.target.name]: e.target.value });
  
  const addSession = () => {
    setSessions([...sessions, { id: Date.now(), date: '', matinDebut: '09:00', matinFin: '12:00', apresMidiDebut: '13:00', apresMidiFin: '17:00', duree: '7' }]);
  };

  const removeSession = (index) => {
    const newSessions = [...sessions];
    newSessions.splice(index, 1);
    setSessions(newSessions);
  };

  const updateSession = (index, field, value) => {
    const newSessions = [...sessions];
    newSessions[index][field] = value;
    setSessions(newSessions);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* --- ZONE CACHÉE POUR LA GÉNÉRATION DU PDF --- */}
      <div style={{ position: 'absolute', top: -10000, left: -10000 }}>
         <PlanningTemplate 
            ref={printRef} 
            data={generalData} 
            sessions={sessions} 
            totalHeures={totalHeures} 
         />
      </div>

      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="text-slate-600" />
          </Link>
          <h1 className="text-xl font-bold text-purple-900 flex items-center gap-2">
            <span className="bg-purple-100 p-1 rounded">📅</span> Éditeur de Planning
          </h1>
        </div>
        <div>
           <button 
             onClick={handleDownloadPDF}
             disabled={isGenerating}
             className="flex items-center gap-2 bg-purple-900 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-purple-800 transition shadow-lg shadow-purple-200 hover:-translate-y-0.5 disabled:opacity-50"
           >
             <Download size={18} /> {isGenerating ? 'Génération...' : 'Télécharger PDF'}
           </button>
        </div>
      </div>

      <div className="flex-1 w-full max-w-[1800px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- COLONNE GAUCHE : FORMULAIRE --- */}
        <div className="lg:col-span-5 space-y-6 h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-thin">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
               <Calendar size={14}/> Informations Globales
             </h2>
             <div className="space-y-3">
               <div className="grid grid-cols-2 gap-3">
                  <div><label className="label-form">Stagiaire</label><input name="stagiaire" value={generalData.stagiaire} onChange={handleGeneralChange} className="input-form font-bold" /></div>
                  <div><label className="label-form">Formateur</label><input name="formateur" value={generalData.formateur} onChange={handleGeneralChange} className="input-form" /></div>
               </div>
               <div><label className="label-form">Formation</label><input name="formation" value={generalData.formation} onChange={handleGeneralChange} className="input-form" /></div>
               <div className="grid grid-cols-2 gap-3">
                  <div><label className="label-form">Début</label><input name="dateDebut" value={generalData.dateDebut} onChange={handleGeneralChange} className="input-form" /></div>
                  <div><label className="label-form">Fin</label><input name="dateFin" value={generalData.dateFin} onChange={handleGeneralChange} className="input-form" /></div>
               </div>
               <div><label className="label-form">Lieu / Modalité</label><input name="lieu" value={generalData.lieu} onChange={handleGeneralChange} className="input-form" /></div>
             </div>
           </div>

           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
             <div className="flex justify-between items-center mb-4">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={14}/> Sessions ({sessions.length})
                </h2>
                <button onClick={addSession} className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-bold hover:bg-purple-200 flex items-center gap-1">
                  <Plus size={12}/> Ajouter un jour
                </button>
             </div>
             <div className="space-y-4">
               {sessions.map((session, index) => (
                 <div key={session.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3 relative group">
                   <button onClick={() => removeSession(index)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition"><Trash2 size={16} /></button>
                   <div className="grid grid-cols-12 gap-2 items-end">
                     <div className="col-span-4">
                       <label className="text-[10px] uppercase text-slate-400 font-bold">Date</label>
                       <input type="date" value={session.date} onChange={(e) => updateSession(index, 'date', e.target.value)} className="input-mini" />
                     </div>
                     <div className="col-span-2">
                       <label className="text-[10px] uppercase text-slate-400 font-bold">Durée (H)</label>
                       <input type="number" value={session.duree} onChange={(e) => updateSession(index, 'duree', e.target.value)} className="input-mini font-bold text-center" />
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 mt-2 border-t border-slate-100 pt-2">
                     <div>
                        <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Matin</label>
                        <div className="flex gap-1">
                          <input type="time" value={session.matinDebut} onChange={(e) => updateSession(index, 'matinDebut', e.target.value)} className="input-mini" />
                          <span className="text-slate-300 self-center">-</span>
                          <input type="time" value={session.matinFin} onChange={(e) => updateSession(index, 'matinFin', e.target.value)} className="input-mini" />
                        </div>
                     </div>
                     <div>
                        <label className="text-[10px] uppercase text-slate-400 font-bold mb-1 block">Après-Midi</label>
                        <div className="flex gap-1">
                          <input type="time" value={session.apresMidiDebut} onChange={(e) => updateSession(index, 'apresMidiDebut', e.target.value)} className="input-mini" />
                          <span className="text-slate-300 self-center">-</span>
                          <input type="time" value={session.apresMidiFin} onChange={(e) => updateSession(index, 'apresMidiFin', e.target.value)} className="input-mini" />
                        </div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
        </div>

        {/* --- COLONNE DROITE : PREVIEW EN TEMPS RÉEL --- */}
        <div className="lg:col-span-7 bg-slate-200 rounded-2xl border border-slate-300 overflow-hidden h-[calc(100vh-120px)] relative shadow-inner flex flex-col">
           <div className="bg-slate-700 text-white text-xs py-1 px-4 text-center">Aperçu du document final</div>
           <div className="flex-1 overflow-auto p-8 flex justify-center">
              <div className="scale-75 origin-top shadow-2xl"> 
                 {/* On réutilise le template avec styles "in-line" pour l'aperçu aussi, pour être sûr de la cohérence */}
                 <PlanningTemplate data={generalData} sessions={sessions} totalHeures={totalHeures} />
              </div>
           </div>
        </div>

      </div>

      <style>{`
        .label-form { display: block; font-size: 0.7rem; font-weight: 700; color: #64748b; margin-bottom: 3px; text-transform: uppercase; }
        .input-form { width: 100%; padding: 8px; font-size: 0.9rem; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; color: #1e293b; }
        .input-form:focus { outline: none; border-color: #7c3aed; background: white; }
        .input-mini { width: 100%; padding: 4px; font-size: 0.8rem; background: white; border: 1px solid #e2e8f0; border-radius: 4px; color: #334155; }
        .input-mini:focus { border-color: #7c3aed; }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}</style>
    </div>
  );
}