import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { ArrowLeft, Download, User, FileCheck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 1. STYLES PDF (THDS SYSTEM) ---
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#334155', lineHeight: 1.5 },
  logo: { width: 50, height: 'auto' },
  
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 10, alignItems: 'center' },
  footerText: { fontSize: 7, color: '#94a3b8', textAlign: 'center' }
});

// --- 2. DOCUMENT PDF ---
const ConsentementDocument = ({ data }) => (
  <Document>
    
    {/* === PAGE 1 : GMAIL EMAIL REQUEST === */}
    <Page size="A4" style={styles.page}>
      
      {/* GMAIL HEADER */}
      <View style={{ backgroundColor: '#f8f9fa', padding: 10, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#dadce0' }}>
        <Image src="/gmail.png" style={styles.logo} />
      </View>

     

      {/* MESSAGE CONTAINER */}
      <View style={{ borderWidth: 1, borderColor: '#e8eaed', borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff' }}>
        
        {/* EMAIL HEADER */}
        <View style={{ backgroundColor: '#f8f9fa', paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#e8eaed' }}>
          
          {/* Subject */}
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#202124' }}>Confirmation de votre consentement</Text>
          </View>

          {/* Sender Info with Avatar */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
            {/* Avatar Circle - Purple */}
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#7c3aed', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
              <Text style={{ fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#fff' }}>T</Text>
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#202124' }}>THDS Formation &lt;contact@thds.fr&gt;</Text>
              <Text style={{ fontSize: 9, color: '#5f6368' }}>À : {data.prenom} {data.nom}</Text>
            </View>

            {/* Date */}
            <Text style={{ fontSize: 8, color: '#5f6368', textAlign: 'right' }}>
              {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
            </Text>
          </View>

          {/* Show Details Link */}
          <Text style={{ fontSize: 8, color: '#1f2937', marginBottom: 5 }}>Afficher les détails ▼</Text>

          {/* Additional Headers */}
          <View style={{ backgroundColor: '#fff', padding: 8, marginTop: 8, borderRadius: 4 }}>
            <View style={{ flexDirection: 'row', marginBottom: 3, fontSize: 8, color: '#5f6368' }}>
              <Text style={{ width: 45, fontFamily: 'Helvetica-Bold' }}>De :</Text>
              <Text>THDS Formation &lt;contact@thds.fr&gt;</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 3, fontSize: 8, color: '#5f6368' }}>
              <Text style={{ width: 45, fontFamily: 'Helvetica-Bold' }}>À :</Text>
              <Text>{data.prenom} {data.nom} &lt;{data.email}&gt;</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 3, fontSize: 8, color: '#5f6368' }}>
              <Text style={{ width: 45, fontFamily: 'Helvetica-Bold' }}>Date :</Text>
              <Text>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })} à {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
            <View style={{ flexDirection: 'row', fontSize: 8, color: '#5f6368' }}>
              <Text style={{ width: 45, fontFamily: 'Helvetica-Bold' }}>Objet :</Text>
              <Text>Confirmation de votre consentement</Text>
            </View>
          </View>
        </View>

        {/* EMAIL BODY */}
        <View style={{ paddingVertical: 20, paddingHorizontal: 16, backgroundColor: '#fff' }}>
          
          <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#202124', marginBottom: 12 }}>
            Bonjour {data.prenom},
          </Text>
          
          <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#202124', marginBottom: 12 }}>
            Vous avez récemment complété un formulaire concernant votre désir de réaliser une formation au sein de notre organisme de formation et nous vous en remercions.
          </Text>

          <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#202124', marginBottom: 12 }}>
            Avant de vous adresser plus d'informations, et conformément à l'article L.6323-8-1 du Code du travail, nous souhaitons obtenir votre consentement explicite afin de vous contacter.
          </Text>

          {/* Action Box - CTA Style */}
          <View style={{ backgroundColor: '#f3e8ff', padding: 15, borderRadius: 8, marginVertical: 15, borderLeftWidth: 4, borderLeftColor: '#7c3aed' }}>
            <Text style={{ fontSize: 10, color: '#202124', marginBottom: 10 }}>Si vous souhaitez être contacté, merci de cliquer sur le lien ci-dessous :</Text>
            <Text style={{ fontSize: 10, color: '#4c1d95', textDecoration: 'underline', fontFamily: 'Helvetica-Bold' }}>
              https://forms.thds.fr/consentement/{data.nom.toLowerCase()}-{data.prenom.toLowerCase()}
            </Text>
          </View>

          <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#202124', marginBottom: 12 }}>
            Dans le cas contraire, aucune action n'est nécessaire de votre part.
          </Text>

          <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#202124', marginBottom: 16 }}>
            Vous remerciant pour votre compréhension, en espérant avoir le plaisir d'échanger avec vous prochainement.
          </Text>

          <Text style={{ fontSize: 10, color: '#202124', marginBottom: 16 }}>Bien à vous,</Text>

          {/* SIGNATURE */}
          <View style={{ borderTopWidth: 1, borderTopColor: '#e8eaed', paddingTop: 12, marginTop: 16 }}>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#7c3aed' }}>La Direction</Text>
            <Text style={{ fontSize: 9, color: '#5f6368' }}>THDS Formation</Text>
            <Text style={{ fontSize: 9, color: '#5f6368', marginTop: 8 }}>5 Rue Pleyel, 93200 SAINT DENIS</Text>
            <Text style={{ fontSize: 8, color: '#5f6368' }}>06 09 96 85 95</Text>
            <Text style={{ fontSize: 8, color: '#1f2937' }}>contact@thds.fr</Text>
            <Text style={{ fontSize: 8, color: '#5f6368' }}>https://thds.fr</Text>
          </View>
        </View>

      </View>

  

    </Page>

    {/* === PAGE 2 : GMAIL RESPONSE EMAIL === */}
    <Page size="A4" style={styles.page}>
      
       <View style={{ backgroundColor: '#f8f9fa', padding: 10, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#dadce0' }}>
        <Image src="/gmail.png" style={styles.logo} />
      </View>

      

      {/* MESSAGE CONTAINER */}
      <View style={{ borderWidth: 1, borderColor: '#e8eaed', borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff' }}>
        
        {/* EMAIL HEADER */}
        <View style={{ backgroundColor: '#f8f9fa', paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#e8eaed' }}>
          
          {/* Subject */}
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#202124' }}>Nouvelle notification de réponse au formulaire</Text>
          </View>

          {/* Sender Info with Avatar */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
            {/* Avatar Circle - Google Green */}
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#34a853', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
              <Text style={{ fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#fff' }}>F</Text>
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#202124' }}>Google Forms &lt;noreply@docs.google.com&gt;</Text>
              <Text style={{ fontSize: 9, color: '#5f6368' }}>À : THDS Formation</Text>
            </View>

            {/* Date */}
            <Text style={{ fontSize: 8, color: '#5f6368', textAlign: 'right' }}>
              {new Date(data.dateReponse).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
            </Text>
          </View>

          {/* Show Details Link */}
          <Text style={{ fontSize: 8, color: '#1f2937', marginBottom: 5 }}>Afficher les détails ▼</Text>

          {/* Additional Headers */}
          <View style={{ backgroundColor: '#fff', padding: 8, marginTop: 8, borderRadius: 4 }}>
            <View style={{ flexDirection: 'row', marginBottom: 3, fontSize: 8, color: '#5f6368' }}>
              <Text style={{ width: 45, fontFamily: 'Helvetica-Bold' }}>De :</Text>
              <Text>Google Forms &lt;noreply@docs.google.com&gt;</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 3, fontSize: 8, color: '#5f6368' }}>
              <Text style={{ width: 45, fontFamily: 'Helvetica-Bold' }}>À :</Text>
              <Text>THDS Formation &lt;contact@thds.fr&gt;</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 3, fontSize: 8, color: '#5f6368' }}>
              <Text style={{ width: 45, fontFamily: 'Helvetica-Bold' }}>Date :</Text>
              <Text>{new Date(data.dateReponse).toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })} à 11:59</Text>
            </View>
            <View style={{ flexDirection: 'row', fontSize: 8, color: '#5f6368' }}>
              <Text style={{ width: 45, fontFamily: 'Helvetica-Bold' }}>Objet :</Text>
              <Text>Nouvelle notification de réponse au formulaire</Text>
            </View>
          </View>
        </View>

        {/* EMAIL BODY */}
        <View style={{ paddingVertical: 20, paddingHorizontal: 16, backgroundColor: '#fff' }}>
          
          <Text style={{ fontSize: 9, lineHeight: 1.6, color: '#202124', marginBottom: 12 }}>
            Une nouvelle réponse à votre formulaire « Demande de Consentement pour Formation THDS »
          </Text>

          {/* Google Forms Style Table */}
          <View style={{ backgroundColor: '#f8f9fa', marginVertical: 15, borderWidth: 1, borderColor: '#dadce0', borderRadius: 6, overflow: 'hidden' }}>
            
            {/* Row 1 - Nom */}
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#dadce0' }}>
              <View style={{ width: '40%', backgroundColor: '#f1f3f4', padding: 8 }}>
                <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#5f6368' }}>Nom</Text>
              </View>
              <View style={{ width: '60%', padding: 8 }}>
                <Text style={{ fontSize: 9, color: '#202124' }}>{data.nom}</Text>
              </View>
            </View>

            {/* Row 2 - Prénom */}
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#dadce0' }}>
              <View style={{ width: '40%', backgroundColor: '#f1f3f4', padding: 8 }}>
                <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#5f6368' }}>Prénom</Text>
              </View>
              <View style={{ width: '60%', padding: 8 }}>
                <Text style={{ fontSize: 9, color: '#202124' }}>{data.prenom}</Text>
              </View>
            </View>

            {/* Row 3 - Email */}
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#dadce0' }}>
              <View style={{ width: '40%', backgroundColor: '#f1f3f4', padding: 8 }}>
                <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#5f6368' }}>E-mail</Text>
              </View>
              <View style={{ width: '60%', padding: 8 }}>
                <Text style={{ fontSize: 9, color: '#202124' }}>{data.email}</Text>
              </View>
            </View>

            {/* Row 4 - Téléphone */}
            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#dadce0' }}>
              <View style={{ width: '40%', backgroundColor: '#f1f3f4', padding: 8 }}>
                <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#5f6368' }}>Téléphone</Text>
              </View>
              <View style={{ width: '60%', padding: 8 }}>
                <Text style={{ fontSize: 9, color: '#202124' }}>{data.telephone}</Text>
              </View>
            </View>

            {/* Row 5 - Consentement */}
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '40%', backgroundColor: '#f1f3f4', padding: 8 }}>
                <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#5f6368' }}>Consentement</Text>
              </View>
              <View style={{ width: '60%', padding: 8 }}>
                <Text style={{ fontSize: 9, color: '#166534', fontFamily: 'Helvetica-Bold' }}>J'autorise par la présente l'organisme de formation IDRIFORM à procéder
à des appels téléphoniques, des envois de courriels, ou tout autre moyen
de communication.</Text>
              </View>
            </View>

          </View>

         
          <Text style={{ fontSize: 8, color: '#5f6368', marginTop: 15 }}>
            Vous avez reçu cet e-mail, car vous êtes propriétaire de ce formulaire Google.
          </Text>
        </View>

        {/* SIGNATURE - Google Style */}
        <View style={{ backgroundColor: '#f8f9fa', paddingVertical: 12, paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: '#e8eaed' }}>
          <Text style={{ fontSize: 8, color: '#5f6368', marginBottom: 5 }}>Google Forms</Text>
          <Text style={{ fontSize: 8, color: '#5f6368', fontStyle: 'italic' }}>Créez et analysez des sondages en ligne – C'est gratuit.</Text>
          <Text style={{ fontSize: 8, color: '#1f2937', marginTop: 8, textDecoration: 'underline' }}>Gestion de nos préférences</Text>
        </View>

      </View>

      {/* FOOTER - Gmail Style */}
      <View style={{ marginTop: 15, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#dadce0', alignItems: 'center' }}>
        <Text style={{ fontSize: 7, color: '#5f6368', textAlign: 'center' }}>Ceci est une copie d'archivage du formulaire de consentement reçu le {new Date(data.dateReponse).toLocaleDateString('fr-FR')}</Text>
      </View>

    </Page>

  </Document>
);

// --- 3. PAGE GÉNÉRATEUR (REACT) ---
export default function GenerateurConsentement() {
  const [formData, setFormData] = useState({
    civilite: 'M.',
    nom: 'KRIM',
    prenom: 'Mourad',
    email: 'mourad_krim@yahoo.fr',
    telephone: '06 80 34 33 16',
    dateReponse: new Date().toISOString().split('T')[0]
  });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="text-slate-600" />
          </Link>
          <h1 className="text-xl font-bold text-purple-900 flex items-center gap-2">
            <span className="bg-purple-100 p-1 rounded">✅</span> Éditeur de Consentement
          </h1>
        </div>
        <div>
           {isClient && (
            <PDFDownloadLink 
                document={<ConsentementDocument data={formData} />} 
                fileName={`Consentement-${formData.nom}.pdf`}
                className="flex items-center gap-2 bg-purple-900 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-purple-800 transition shadow-lg shadow-purple-200 hover:-translate-y-0.5"
            >
                {({ loading }) => (loading ? 'Préparation...' : <><Download size={18} /> Télécharger PDF</>)}
            </PDFDownloadLink>
           )}
        </div>
      </div>

      <div className="flex-1 w-full max-w-[1800px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- COLONNE GAUCHE : FORMULAIRE --- */}
        <div className="lg:col-span-4 space-y-6 h-[calc(100vh-120px)] overflow-y-auto pr-2">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <User size={14}/> Informations Candidat
            </h2>
            <div className="grid grid-cols-1 gap-4">
                <div className="flex gap-4">
                    <div className="w-1/3">
                        <label className="label-form">Civilité</label>
                        <select name="civilite" value={formData.civilite} onChange={handleChange} className="input-form">
                            <option>M.</option>
                            <option>Mme</option>
                        </select>
                    </div>
                    <div className="w-2/3">
                        <label className="label-form">Prénom</label>
                        <input name="prenom" value={formData.prenom} onChange={handleChange} className="input-form" />
                    </div>
                </div>
                <div><label className="label-form">Nom</label><input name="nom" value={formData.nom} onChange={handleChange} className="input-form font-bold" /></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <FileCheck size={14}/> Coordonnées & Preuve
            </h2>
            <div className="space-y-4">
              <div><label className="label-form">Email</label><input name="email" value={formData.email} onChange={handleChange} className="input-form" /></div>
              <div><label className="label-form">Téléphone</label><input name="telephone" value={formData.telephone} onChange={handleChange} className="input-form" /></div>
              <div><label className="label-form">Date de Réponse</label><input type="date" name="dateReponse" value={formData.dateReponse} onChange={handleChange} className="input-form" /></div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-800 text-xs">
            <p><strong>Note :</strong> Ce document génère automatiquement :</p>
            <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Page 1 : Email Gmail de demande de consentement.</li>
                <li>Page 2 : Email Google Forms de réponse (Preuve).</li>
            </ul>
          </div>

        </div>

        {/* --- COLONNE DROITE : PREVIEW --- */}
        <div className="lg:col-span-8 bg-slate-500/10 rounded-2xl border border-slate-300 overflow-hidden h-[calc(100vh-120px)] relative shadow-inner flex flex-col">
            <div className="bg-slate-700 text-white text-xs py-1 px-4 text-center">Aperçu en temps réel</div>
            {isClient ? (
                <PDFViewer width="100%" height="100%" className="border-none flex-1" showToolbar={false}>
                    <ConsentementDocument data={formData} />
                </PDFViewer>
            ) : <div className="flex h-full items-center justify-center text-slate-400">Chargement...</div>}
        </div>

      </div>

      <style>{`
        .label-form { display: block; font-size: 0.75rem; font-weight: 600; color: #475569; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
        .input-form { width: 100%; padding: 8px 12px; font-size: 0.9rem; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; color: #1e293b; transition: all 0.2s; }
        .input-form:focus { outline: none; border-color: #7c3aed; background: white; box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1); }
      `}</style>
    </div>
  );
}