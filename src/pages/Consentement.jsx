import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { ArrowLeft, Download, User, FileCheck, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 1. STYLES PDF (THDS SYSTEM) ---
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10, color: '#334155', lineHeight: 1.5 },
  
  // Header Global
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30, borderBottomWidth: 2, borderBottomColor: '#4c1d95', paddingBottom: 15 },
  logo: { width: 50, height: 'auto' },
  headerInfo: { textAlign: 'right' },
  companyName: { fontSize: 18, fontWeight: 'bold', color: '#4c1d95', textTransform: 'uppercase', marginBottom: 4 },
  companySub: { fontSize: 9, color: '#64748b', marginTop: 4 },

  // --- STYLES PAGE 1 (LETTRE) ---
  titleLetter: { fontSize: 14, fontWeight: 'bold', color: '#4c1d95', marginBottom: 20, textTransform: 'uppercase' },
  
  recipientBlock: { marginBottom: 30, marginTop: 10 },
  recipientText: { fontSize: 11, fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  
  paragraph: { marginBottom: 15, textAlign: 'justify', fontSize: 10 },
  linkBox: { backgroundColor: '#f3e8ff', padding: 15, borderRadius: 5, marginVertical: 15, borderLeftWidth: 4, borderLeftColor: '#4c1d95' },
  linkText: { color: '#4c1d95', textDecoration: 'underline', fontSize: 10 },

  signatureBlock: { marginTop: 40, borderLeftWidth: 2, borderLeftColor: '#cbd5e1', paddingLeft: 15 },
  sigName: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#4c1d95' },
  sigRole: { fontSize: 9, color: '#64748b', marginBottom: 5 },
  sigImage: { width: 100, height: 'auto', marginVertical: 5 },

  // --- STYLES PAGE 2 (PREUVE FORMULAIRE) ---
  proofHeader: { backgroundColor: '#f8fafc', padding: 20, marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  proofTitle: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#1e293b', marginBottom: 5 },
  proofSub: { fontSize: 10, color: '#64748b' },

  // Tableau de preuve style "Google Forms"
  formTable: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8, overflow: 'hidden' },
  formRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#e2e8f0', minHeight: 40 },
  formLabel: { width: '35%', backgroundColor: '#f8fafc', padding: 10, fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#475569', justifyContent: 'center' },
  formValue: { width: '65%', padding: 10, fontSize: 10, color: '#1e293b', justifyContent: 'center' },
  
  consentBox: { backgroundColor: '#f0fdf4', padding: 15, marginTop: 20, borderRadius: 6, border: '1px solid #bbf7d0' },
  consentText: { color: '#166534', fontSize: 10, fontFamily: 'Helvetica-Bold', textAlign: 'center' },

  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 10, alignItems: 'center' },
  footerText: { fontSize: 7, color: '#94a3b8', textAlign: 'center' }
});

// --- 2. DOCUMENT PDF ---
const ConsentementDocument = ({ data }) => (
  <Document>
    
    {/* === PAGE 1 : LA DEMANDE === */}
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Image src="/logo.png" style={styles.logo} />
        <View style={styles.headerInfo}>
          <Text style={styles.companyName}>THDS </Text>
          <Text style={styles.companySub}>5 Rue Pleyel, 93200 SAINT DENIS</Text>
          <Text style={styles.companySub}>contact@thds.fr</Text>
        </View>
      </View>

      <View style={styles.recipientBlock}>
        <Text style={{fontSize: 9, color:'#94a3b8', marginBottom:5}}>À l'attention de :</Text>
        <Text style={styles.recipientText}>{data.civilite} {data.nom} {data.prenom}</Text>
        <Text style={{fontSize: 10, color:'#334155'}}>{data.email}</Text>
      </View>

      <Text style={styles.titleLetter}>Objet : Confirmation de votre consentement</Text>

      <Text style={styles.paragraph}>
        Monsieur {data.nom},
      </Text>
      <Text style={styles.paragraph}>
        Vous avez récemment complété un formulaire concernant votre désir de réaliser une formation au sein de notre organisme de formation et nous vous en remercions.
      </Text>
      <Text style={styles.paragraph}>
        Avant de vous adresser plus d'informations, et conformément à l'article L.6323-8-1 du Code du travail, nous souhaitons obtenir votre consentement explicite afin de vous contacter.
      </Text>

      <View style={styles.linkBox}>
        <Text style={{fontFamily:'Helvetica-Bold', marginBottom:5, color:'#4c1d95'}}>Action requise :</Text>
        <Text>Si vous souhaitez être contacté, merci de cliquer sur le lien ci-dessous :</Text>
        <Text style={styles.linkText}>https://forms.thds.fr/consentement/{data.nom.toLowerCase()}-{data.prenom.toLowerCase()}</Text>
      </View>

      <Text style={styles.paragraph}>
        Dans le cas contraire, aucune action n'est nécessaire de votre part.
      </Text>
      <Text style={styles.paragraph}>
        Vous remerciant pour votre compréhension, en espérant avoir le plaisir d'échanger avec vous prochainement.
      </Text>

      <View style={styles.signatureBlock}>
        <Text style={{marginBottom:10}}>Bien à vous,</Text>
        <Image src="/signature.png" style={styles.sigImage} />
        <Text style={styles.sigName}>La Direction</Text>
        <Text style={styles.sigRole}>THDS </Text>
        <Text style={{fontSize:8, color:'#94a3b8'}}>Tél : 06 09 96 85 95</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>THDS  - 5 Rue Pleyel, 93200 SAINT DENIS - SIRET : 832 774 087 00023</Text>
      </View>
    </Page>

    {/* === PAGE 2 : LA PREUVE (RÉPONSE) === */}
    <Page size="A4" style={styles.page}>
      
      {/* Header Preuve */}
      <View style={{flexDirection:'row', alignItems:'center', marginBottom:20}}>
         <Image src="/logo.png" style={{width: 60, height:'auto', marginRight: 15}} />
         <View>
            <Text style={{fontSize:14, fontFamily:'Helvetica-Bold', color:'#4c1d95'}}>ARCHIVE DE CONSENTEMENT</Text>
            <Text style={{fontSize:9, color:'#64748b'}}>Preuve numérique de validation</Text>
         </View>
      </View>

      <View style={styles.proofHeader}>
        <Text style={styles.proofTitle}>Nouvelle notification de réponse au formulaire</Text>
        <Text style={styles.proofSub}>Reçu le : {new Date(data.dateReponse).toLocaleDateString('fr-FR')} à 11:59</Text>
        <Text style={styles.proofSub}>Source : Formulaire Web THDS</Text>
      </View>

      <View style={styles.formTable}>
        <View style={styles.formRow}>
          <View style={styles.formLabel}><Text>Nom</Text></View>
          <View style={styles.formValue}><Text>{data.nom}</Text></View>
        </View>
        <View style={styles.formRow}>
          <View style={styles.formLabel}><Text>Prénom</Text></View>
          <View style={styles.formValue}><Text>{data.prenom}</Text></View>
        </View>
        <View style={styles.formRow}>
          <View style={styles.formLabel}><Text>E-mail</Text></View>
          <View style={styles.formValue}><Text>{data.email}</Text></View>
        </View>
        <View style={styles.formRow}>
          <View style={styles.formLabel}><Text>Numéro de téléphone</Text></View>
          <View style={styles.formValue}><Text>{data.telephone}</Text></View>
        </View>
        <View style={[styles.formRow, {borderBottomWidth:0}]}>
          <View style={styles.formLabel}><Text>Confirmation de votre consentement</Text></View>
          <View style={styles.formValue}>
            <Text style={{color:'#166534', fontFamily:'Helvetica-Bold'}}>
              "J'autorise par la présente l'organisme de formation THDS à procéder à des appels téléphoniques, des envois de courriels, ou tout autre moyen de communication."
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.consentBox}>
        <Text style={styles.consentText}>✓ CONSENTEMENT VALIDÉ ET ARCHIVÉ</Text>
      </View>

      <View style={{marginTop: 40, alignItems:'center'}}>
         <Text style={{fontSize:8, color:'#cbd5e1'}}>Empreinte numérique : {Math.random().toString(36).substring(7).toUpperCase()}-{Date.now()}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Document généré automatiquement par le système d'information de THDS .</Text>
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
                <li>Page 1 : La lettre de demande de consentement.</li>
                <li>Page 2 : Le récapitulatif de la réponse (Preuve).</li>
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