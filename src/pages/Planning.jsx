import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { ArrowLeft, Download, Plus, Trash2, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 1. STYLES PDF (THDS SYSTEM) ---
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#334155', lineHeight: 1.4 },
  
  // Header
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottomWidth: 2, borderBottomColor: '#4c1d95', paddingBottom: 15 },
  logo: { width: 50, height: 'auto' },
  headerInfo: { textAlign: 'right' },
  companyName: { fontSize: 18, fontWeight: 'bold', color: '#4c1d95', textTransform: 'uppercase', marginBottom: 4 },
  companySub: { fontSize: 9, color: '#64748b', marginTop: 4 },

  // Titre
  titleContainer: { backgroundColor: '#f3e8ff', paddingVertical: 8, marginBottom: 20, borderRadius: 6 },
  mainTitle: { fontSize: 14, fontWeight: 'black', color: '#4c1d95', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 },

  // Infos Générales (Grille)
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20, backgroundColor: '#f8fafc', padding: 10, borderRadius: 6, border: '1px solid #e2e8f0' },
  infoItem: { width: '50%', marginBottom: 8 },
  infoLabel: { fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'Helvetica-Bold' },
  infoValue: { fontSize: 10, color: '#1e293b', fontFamily: 'Helvetica-Bold' },

  // TABLEAU PLANNING
  tableContainer: { marginTop: 10, marginBottom: 20, border: '1px solid #cbd5e1', borderRadius: 6, overflow: 'hidden' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#4c1d95', padding: 8 },
  tableHeaderCell: { color: 'white', fontSize: 9, fontFamily: 'Helvetica-Bold', textAlign: 'center' },
  
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingVertical: 8, paddingHorizontal: 4 },
  tableRowAlt: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', backgroundColor: '#f8fafc', paddingVertical: 8, paddingHorizontal: 4 },
  
  colDate: { width: '25%', textAlign: 'center' },
  colHeure: { width: '55%', textAlign: 'center' },
  colDuree: { width: '20%', textAlign: 'center', fontFamily: 'Helvetica-Bold' },

  // Signatures
  signatureSection: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  signatureBox: { width: '45%', border: '1px solid #cbd5e1', height: 100, borderRadius: 6, padding: 10, justifyContent: 'space-between' },
  signatureLabel: { fontSize: 9, color: '#64748b', marginBottom: 5, textAlign: 'center' },
  signatureImage: { width: 100, height: 'auto', alignSelf: 'center' }, // ✅ Style ajouté pour l'image
  
  // Footer
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 10, alignItems: 'center' },
  footerText: { fontSize: 7, color: '#94a3b8', textAlign: 'center' }
});

// --- 2. DOCUMENT PDF ---
const PlanningDocument = ({ data, sessions }) => {
  const totalHeures = sessions.reduce((acc, curr) => acc + (parseFloat(curr.duree) || 0), 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image src="/logo.png" style={styles.logo} />
          <View style={styles.headerInfo}>
            <Text style={styles.companyName}>THDS LEARNING</Text>
            <Text style={styles.companySub}>5 Rue Pleyel, 93200 SAINT DENIS</Text>
            <Text style={styles.companySub}>Mise à jour : {new Date().toLocaleDateString('fr-FR')}</Text>
          </View>
        </View>

        {/* Titre */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Planning de Formation</Text>
        </View>

        {/* Infos Clés */}
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Stagiaire</Text>
            <Text style={styles.infoValue}>{data.stagiaire}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Formation</Text>
            <Text style={styles.infoValue}>{data.formation}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Formateur</Text>
            <Text style={styles.infoValue}>{data.formateur}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Lieu / Modalité</Text>
            <Text style={styles.infoValue}>{data.lieu}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Période</Text>
            <Text style={styles.infoValue}>Du {data.dateDebut} au {data.dateFin}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Durée Totale</Text>
            <Text style={[styles.infoValue, {color: '#4c1d95'}]}>{totalHeures} Heures</Text>
          </View>
        </View>

        {/* Tableau */}
        <View style={styles.tableContainer}>
          {/* En-têtes */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colDate]}>DATE</Text>
            <Text style={[styles.tableHeaderCell, styles.colHeure]}>HORAIRES</Text>
            <Text style={[styles.tableHeaderCell, styles.colDuree]}>DURÉE</Text>
          </View>

          {/* Lignes */}
          {sessions.map((session, index) => (
            <View key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
              <Text style={styles.colDate}>{new Date(session.date).toLocaleDateString('fr-FR')}</Text>
              <Text style={styles.colHeure}>
                {session.matinDebut} - {session.matinFin}  /  {session.apresMidiDebut} - {session.apresMidiFin}
              </Text>
              <Text style={styles.colDuree}>{session.duree} H</Text>
            </View>
          ))}
        </View>

        {/* Signatures */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Le Stagiaire (Lu et approuvé)</Text>
            <Text style={{fontSize: 8, textAlign:'center', marginTop: 'auto'}}>{data.stagiaire}</Text>
          </View>
          
          {/* ✅ CORRECTION ICI : Signature avec image */}
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Pour l'Organisme</Text>
            <Image src="/signature.png" style={styles.signatureImage} />
            <Text style={{fontSize: 8, textAlign:'center', color: '#4c1d95', fontFamily: 'Helvetica-Bold'}}>THDS LEARNING</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>THDS LEARNING - SAS au capital de 1000€ - SIRET : 832 774 087 00023</Text>
          <Text style={styles.footerText}>Organisme de formation déclaré sous le n°11931056093 - contact@thds.fr</Text>
        </View>

      </Page>
    </Document>
  );
};

// --- 3. PAGE GÉNÉRATEUR (REACT) ---
export default function GenerateurPlanning() {
  // Données générales
  const [generalData, setGeneralData] = useState({
    stagiaire: 'Mourad KRIM',
    formation: 'Français B1 - Social & Médico-social',
    formateur: 'Andrea DOTTELLO',
    lieu: 'Distanciel / Visio',
    dateDebut: '18/03/2025',
    dateFin: '20/03/2025'
  });

  // Liste des sessions (Lignes du tableau)
  const [sessions, setSessions] = useState([
    { date: '2025-03-18', matinDebut: '09:00', matinFin: '12:00', apresMidiDebut: '13:00', apresMidiFin: '17:00', duree: '7' },
    { date: '2025-03-19', matinDebut: '09:00', matinFin: '12:00', apresMidiDebut: '13:00', apresMidiFin: '17:00', duree: '7' },
    { date: '2025-03-20', matinDebut: '09:00', matinFin: '12:00', apresMidiDebut: '13:00', apresMidiFin: '16:00', duree: '6' },
  ]);

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const handleGeneralChange = (e) => setGeneralData({ ...generalData, [e.target.name]: e.target.value });

  // Gestion des sessions
  const addSession = () => {
    setSessions([...sessions, { date: '', matinDebut: '09:00', matinFin: '12:00', apresMidiDebut: '13:00', apresMidiFin: '17:00', duree: '7' }]);
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
           {isClient && (
            <PDFDownloadLink 
                document={<PlanningDocument data={generalData} sessions={sessions} />} 
                fileName={`Planning-${generalData.stagiaire}.pdf`}
                className="flex items-center gap-2 bg-purple-900 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-purple-800 transition shadow-lg shadow-purple-200 hover:-translate-y-0.5"
            >
                {({ loading }) => (loading ? 'Préparation...' : <><Download size={18} /> Télécharger PDF</>)}
            </PDFDownloadLink>
           )}
        </div>
      </div>

      <div className="flex-1 w-full max-w-[1800px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- COLONNE GAUCHE : FORMULAIRE --- */}
        <div className="lg:col-span-5 space-y-6 h-[calc(100vh-120px)] overflow-y-auto pr-2 scrollbar-thin">
          
          {/* Bloc Infos Générales */}
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

          {/* Bloc Sessions (Tableau dynamique) */}
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
                <div key={index} className="bg-slate-50 border border-slate-200 rounded-lg p-3 relative group">
                  <button onClick={() => removeSession(index)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition">
                    <Trash2 size={16} />
                  </button>
                  
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

        {/* --- COLONNE DROITE : PREVIEW --- */}
        <div className="lg:col-span-7 bg-slate-500/10 rounded-2xl border border-slate-300 overflow-hidden h-[calc(100vh-120px)] relative shadow-inner flex flex-col">
            <div className="bg-slate-700 text-white text-xs py-1 px-4 text-center">Aperçu en temps réel</div>
            {isClient ? (
                <PDFViewer width="100%" height="100%" className="border-none flex-1" showToolbar={false}>
                    <PlanningDocument data={generalData} sessions={sessions} />
                </PDFViewer>
            ) : <div className="flex h-full items-center justify-center text-slate-400">Chargement...</div>}
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