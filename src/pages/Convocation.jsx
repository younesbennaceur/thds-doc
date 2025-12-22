import React, { useState, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { ArrowLeft, Download, User } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 1. STYLES (DESIGN SYSTEM THDS) ---
const styles = StyleSheet.create({
  page: { 
    padding: 40, 
    fontFamily: 'Helvetica', 
    fontSize: 10, 
    color: '#334155', 
    lineHeight: 1.5 
  },
  
  // HEADER
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#4c1d95',
    paddingBottom: 15
  },
  logo: { width: 50, height: 'auto' },
  headerInfo: { textAlign: 'right' },
  companyName: { fontSize: 18, fontWeight: 'bold', color: '#4c1d95', textTransform: 'uppercase', marginBottom: 4 },
  companySub: { fontSize: 9, color: '#64748b', marginTop: 4 },

  // TITRES
  titleContainer: {
    backgroundColor: '#f3e8ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 25,
    borderRadius: 6,
    alignSelf: 'center',
    width: '100%'
  },
  mainTitle: {
    fontSize: 14,
    fontWeight: 'heavy',
    color: '#4c1d95',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2
  },

  // CONTENU PAGE 1
  recipientBlock: { marginBottom: 20, paddingLeft: 10, borderLeftWidth: 3, borderLeftColor: '#cbd5e1' },
  recipientLabel: { fontSize: 9, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 2 },
  recipientName: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#0f172a' },
  
  textSection: { marginBottom: 15, textAlign: 'justify' },

  boxContainer: {
    borderWidth: 1, borderColor: '#e2e8f0', backgroundColor: '#f8fafc',
    borderRadius: 8, padding: 15, marginBottom: 20
  },
  boxRow: { flexDirection: 'row', marginBottom: 8 },
  boxLabel: { width: 100, fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#4c1d95' },
  boxValue: { flex: 1, fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#1e293b' },

  sectionTitle: {
    fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#4c1d95', textTransform: 'uppercase',
    borderBottomWidth: 1, borderBottomColor: '#e2e8f0', marginBottom: 8, paddingBottom: 4, marginTop: 10
  },
  infoRow: { flexDirection: 'row', marginBottom: 4 },
  infoLabel: { width: 80, fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#64748b' },
  infoValue: { flex: 1, fontSize: 9 },
  bulletPoint: { fontSize: 9, marginLeft: 10, marginBottom: 2 },

  // SIGNATURE (NOUVEAU STYLE)
  signatureBlock: { marginTop: 20, alignSelf: 'flex-end', width: 180, textAlign: 'center' },
  dateLocation: { fontSize: 10, marginBottom: 5 },
  signatureBox: { height: 40, justifyContent: 'center', alignItems: 'center' }, // Plus haut pour l'image
  signatureImage: { width: 120, height: 'auto' }, // Style de l'image
  signatureText: { fontSize: 8, fontStyle: 'italic', color: '#94a3b8', marginTop: 2 },

  // --- STYLES PAGE 2 (PLAN ACCÈS) ---
  mapPageContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 20 },
  mapTitle: { fontSize: 20, fontWeight: 'bold', color: '#4c1d95', textTransform: 'uppercase', marginBottom: 10 },
  addressLarge: { fontSize: 14, fontFamily: 'Helvetica-Bold', textAlign: 'center', marginBottom: 2 },
  addressSub: { fontSize: 12, textAlign: 'center', color: '#64748b', marginBottom: 30 },
  
  mapImageContainer: {
    width: '100%',
    height: 350,
    borderWidth: 3,
    borderColor: '#4c1d95',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20
  },
  mapImage: { width: '100%', height: '100%', objectFit: 'cover' },

  // --- STYLES PAGE 3 (EMAIL SIMULATION) ---
  emailFrame: { borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 30, backgroundColor: '#fff', marginTop: 10 },
  emailHeader: { borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 15, marginBottom: 15 },
  emailSubject: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#1e293b', marginBottom: 10 },
  emailMetaRow: { flexDirection: 'row', marginBottom: 4 },
  emailMetaLabel: { width: 60, fontSize: 9, color: '#64748b' },
  emailMetaValue: { flex: 1, fontSize: 9, color: '#334155' },
  emailBody: { fontSize: 10, lineHeight: 1.6, color: '#334155', marginBottom: 20 },
  
  // Signature Email
  emailSigBlock: { marginTop: 20, borderLeftWidth: 3, borderLeftColor: '#4c1d95', paddingLeft: 10 },
  emailSigName: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#4c1d95' },
  emailSigRole: { fontSize: 9, color: '#64748b', marginBottom: 5 },
  emailSigLogo: { width: 60, height: 'auto', marginVertical: 5 },
  emailSigContact: { fontSize: 8, color: '#64748b' },

  // Pièce jointe Email
  attachmentBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f1f5f9', padding: 10, borderRadius: 6, borderWidth: 1, borderColor: '#cbd5e1', width: 250, marginTop: 20 },
  attachmentIcon: { width: 20, height: 20, backgroundColor: '#ef4444', borderRadius: 3, marginRight: 10, alignItems: 'center', justifyContent: 'center' },
  attachmentName: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#334155' },
  attachmentSize: { fontSize: 8, color: '#94a3b8' },

  // FOOTER GLOBAL
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingTop: 10, alignItems: 'center' },
  footerText: { fontSize: 7, color: '#94a3b8', textAlign: 'center', marginBottom: 2 }
});

// --- 2. DOCUMENT PDF COMPLET ---
const ConvocationDocument = ({ data }) => (
  <Document>
    
    {/* ================= PAGE 1 : CONVOCATION ================= */}
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Image src="/logo.png" style={styles.logo} />
        <View style={styles.headerInfo}>
          <Text style={styles.companyName}>THDS LEARNING</Text>
          <Text style={styles.companySub}>Organisme de Formation Professionnelle</Text>
          <Text style={styles.companySub}>5 Rue Pleyel, 93200 SAINT DENIS</Text>
          <Text style={styles.companySub}>contact@thds.fr | 06 09 96 85 95</Text>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Convocation de Formation</Text>
      </View>

      <View style={styles.recipientBlock}>
        <Text style={styles.recipientLabel}>Stagiaire convoqué :</Text>
        <Text style={styles.recipientName}>{data.civilite} {data.prenom} {data.nom}</Text>
      </View>

      <View style={styles.textSection}>
        <Text>Madame, Monsieur,</Text>
        <Text style={{ marginTop: 8 }}>Nous avons le plaisir de vous confirmer votre inscription et de vous convoquer à l'action de formation suivante :</Text>
      </View>

      <View style={styles.boxContainer}>
        <View style={styles.boxRow}><Text style={styles.boxLabel}>Intitulé :</Text><Text style={styles.boxValue}>{data.intituleFormation}</Text></View>
        <View style={styles.boxRow}><Text style={styles.boxLabel}>Dates :</Text><Text style={styles.boxValue}>Du {new Date(data.dateDebut).toLocaleDateString('fr-FR')} au {new Date(data.dateFin).toLocaleDateString('fr-FR')}</Text></View>
        <View style={styles.boxRow}><Text style={styles.boxLabel}>Horaires :</Text><Text style={styles.boxValue}>Démarrage à {data.heureDebut}</Text></View>
        <View style={styles.boxRow}><Text style={styles.boxLabel}>Lieu :</Text><Text style={styles.boxValue}>{data.lieu}</Text></View>
      </View>

      <View style={{ flexDirection: 'row', gap: 20 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>Informations Pratiques</Text>
          <Text style={[styles.infoValue, {marginBottom: 5}]}>Le lien de connexion (si distanciel) vous sera transmis par email 24h avant.</Text>
          <Text style={[styles.infoValue, {marginBottom: 5}]}>Votre planning détaillé vous sera communiqué en amont.</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>Matériel Requis</Text>
          <Text style={styles.bulletPoint}>• Ordinateur (PC/Mac) avec Webcam</Text>
          <Text style={styles.bulletPoint}>• Connexion Internet stable</Text>
          <Text style={styles.bulletPoint}>• Casque avec micro</Text>
        </View>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={styles.sectionTitle}>Contact Pédagogique</Text>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Référent :</Text><Text style={styles.infoValue}>{data.contactNom}</Text></View>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Téléphone :</Text><Text style={styles.infoValue}>{data.contactTel}</Text></View>
        <View style={styles.infoRow}><Text style={styles.infoLabel}>Email :</Text><Text style={styles.infoValue}>{data.contactEmail}</Text></View>
      </View>

      <View style={styles.signatureBlock}>
        <Text style={styles.dateLocation}>Fait à 5 Rue Pleyel, 93200 Saint-Denis, le {new Date().toLocaleDateString('fr-FR')}</Text>
        
        {/* ICI : INSERTION DE L'IMAGE DE SIGNATURE */}
        <View style={styles.signatureBox}>
          <Image src="/signature.png" style={styles.signatureImage} />
        </View>
        
      </View>

    </Page>

    {/* ================= PAGE 2 : PLAN D'ACCÈS ================= */}
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Image src="/logo.png" style={styles.logo} />
        <View style={styles.headerInfo}>
          <Text style={styles.companyName}>THDS LEARNING</Text>
        </View>
      </View>

      <View style={styles.mapPageContainer}>
        <Text style={styles.mapTitle}>OÙ NOUS TROUVER ?</Text>
        <Text style={styles.addressLarge}>102 rue du port 93300 Aubervilliers</Text>
        <Text style={[styles.addressSub, {marginTop: 10}]}>Métro : Carrefour Pleyel (Ligne 13)</Text>

        <View style={styles.mapImageContainer}>
          <Image src="/map.png" style={styles.mapImage} />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>THDS LEARNING - 5 Rue Pleyel, 93200 SAINT DENIS</Text>
        <Text style={styles.footerText}>Tél : 06 09 96 85 95 - Email : contact@thds.fr</Text>
      </View>
    </Page>

    {/* ================= PAGE 3 : COPIE EMAIL ================= */}
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Image src="/logo.png" style={styles.logo} />
        <View style={styles.headerInfo}>
          <Text style={styles.companyName}>ARCHIVE COURRIEL</Text>
          <Text style={styles.companySub}>Copie du message envoyé au stagiaire</Text>
        </View>
      </View>

      <View style={styles.emailFrame}>
        {/* En-tête Email */}
        <View style={styles.emailHeader}>
          <Text style={styles.emailSubject}>Convocation Formation : {data.intituleFormation}</Text>
          
          <View style={styles.emailMetaRow}>
            <Text style={styles.emailMetaLabel}>De :</Text>
            <Text style={styles.emailMetaValue}>THDS Formation &lt;{data.contactEmail}&gt;</Text>
          </View>
          <View style={styles.emailMetaRow}>
            <Text style={styles.emailMetaLabel}>À :</Text>
            <Text style={styles.emailMetaValue}>{data.prenom} {data.nom}</Text>
          </View>
          <View style={styles.emailMetaRow}>
            <Text style={styles.emailMetaLabel}>Date :</Text>
            <Text style={styles.emailMetaValue}>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
          </View>
        </View>

        {/* Corps Email */}
        <View>
          <Text style={styles.emailBody}>Bonjour,</Text>
          <Text style={styles.emailBody}>
            J'ai le plaisir de vous transmettre votre convocation pour votre formation "{data.intituleFormation}" qui se déroulera du {new Date(data.dateDebut).toLocaleDateString('fr-FR')} au {new Date(data.dateFin).toLocaleDateString('fr-FR')}.
          </Text>
          <Text style={styles.emailBody}>
            Vous trouverez le document officiel en pièce jointe de ce courriel.
          </Text>
          <Text style={styles.emailBody}>Bien à vous,</Text>
        </View>

        {/* Signature Email */}
        <View style={styles.emailSigBlock}>
          <Text style={styles.emailSigName}>{data.contactNom}</Text>
          <Text style={styles.emailSigRole}>Responsable Pédagogique</Text>
          <Image src="/logo.png" style={styles.emailSigLogo} />
          <Text style={[styles.emailSigContact, {fontFamily: 'Helvetica-Bold', color: '#4c1d95'}]}>THDS LEARNING</Text>
          <Text style={styles.emailSigContact}>VOTRE FUTUR, NOTRE SAVOIR</Text>
          <Text style={[styles.emailSigContact, {marginTop: 5}]}>Tél: {data.contactTel}</Text>
          <Text style={styles.emailSigContact}>Email: {data.contactEmail}</Text>
          <Text style={styles.emailSigContact}>Site internet: https://thds.fr</Text>
        </View>

        

      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Ceci est une copie générée automatiquement pour archivage administratif.</Text>
      </View>
    </Page>

  </Document>
);

// --- 3. COMPOSANT REACT ---
export default function GenerateurConvocation() {
  const [formData, setFormData] = useState({
    civilite: 'M.',
    nom: 'KRIM',
    prenom: 'Mourad',
    intituleFormation: 'Communiquer en français dans les secteurs du social et du médico-social (Niveau B1)',
    dateDebut: '2025-03-18',
    dateFin: '2025-03-20',
    heureDebut: '09:00',
    lieu: 'Distanciel / Visio-conférence',
    contactNom: 'Responsable Pédagogique',
    contactTel: '06 09 96 85 95',
    contactEmail: 'contact@thds.fr'
  });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowLeft className="text-slate-600" />
          </Link>
          <h1 className="text-xl font-bold text-purple-900 flex items-center gap-2">
            <span className="bg-purple-100 p-1 rounded">📄</span> Éditeur de Convocation
          </h1>
        </div>
        <div>
           {isClient && (
            <PDFDownloadLink 
                document={<ConvocationDocument data={formData} />} 
                fileName={`Convocation-${formData.nom}.pdf`}
                className="flex items-center gap-2 bg-purple-900 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-purple-800 transition shadow-lg shadow-purple-200 hover:-translate-y-0.5"
            >
                {({ loading }) => (loading ? 'Préparation...' : <><Download size={18} /> Télécharger le PDF</>)}
            </PDFDownloadLink>
           )}
        </div>
      </div>

      <div className="flex-1 w-full max-w-[1800px] mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- FORMULAIRE --- */}
        <div className="lg:col-span-4 space-y-6 h-[calc(100vh-120px)] overflow-y-auto pr-2">
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <User size={14}/> Informations Stagiaire
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
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Détails Formation</h2>
            <div className="space-y-4">
              <div><label className="label-form">Intitulé</label><textarea name="intituleFormation" rows="3" value={formData.intituleFormation} onChange={handleChange} className="input-form" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label-form">Date Début</label><input type="date" name="dateDebut" value={formData.dateDebut} onChange={handleChange} className="input-form" /></div>
                <div><label className="label-form">Date Fin</label><input type="date" name="dateFin" value={formData.dateFin} onChange={handleChange} className="input-form" /></div>
              </div>
              <div><label className="label-form">Heure de démarrage</label><input type="time" name="heureDebut" value={formData.heureDebut} onChange={handleChange} className="input-form w-1/2" /></div>
              <div>
                  <label className="label-form">Lieu / Lien</label>
                  <input name="lieu" value={formData.lieu} onChange={handleChange} className="input-form" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Contact</h2>
            <div className="space-y-3">
               <input name="contactNom" value={formData.contactNom} onChange={handleChange} className="input-form" placeholder="Nom du référent" />
               <input name="contactTel" value={formData.contactTel} onChange={handleChange} className="input-form" placeholder="Tél" />
               <input name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="input-form" placeholder="Email" />
            </div>
          </div>

        </div>

        {/* --- PREVIEW --- */}
        <div className="lg:col-span-8 bg-slate-500/10 rounded-2xl border border-slate-300 overflow-hidden h-[calc(100vh-120px)] relative shadow-inner flex flex-col">
            <div className="bg-slate-700 text-white text-xs py-1 px-4 text-center">Aperçu en temps réel</div>
            {isClient ? (
                <PDFViewer width="100%" height="100%" className="border-none flex-1" showToolbar={false}>
                    <ConvocationDocument data={formData} />
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