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
  signatureBox: { height: 40, justifyContent: 'center', alignItems: 'center' },
  signatureImage: { width: 120, height: 'auto' },
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
          <Text style={styles.companyName}>THDS </Text>
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
          <Text style={[styles.infoValue, {marginBottom: 5}]}>Seulement une CNI ou pièces d'identité en cours de validité</Text>
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
          <Text style={styles.companyName}>THDS </Text>
        </View>
      </View>

      <View style={styles.mapPageContainer}>
        <Text style={styles.mapTitle}>OÙ NOUS TROUVER ?</Text>
        <Text style={styles.addressLarge}>102 rue du port 93300 Aubervilliers</Text>

        <View style={styles.mapImageContainer}>
          <Image src="/map.png" style={styles.mapImage} />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>THDS  - 5 Rue Pleyel, 93200 SAINT DENIS</Text>
        <Text style={styles.footerText}>Tél : 06 09 96 85 95 - Email : contact@thds.fr</Text>
      </View>
    </Page>

    {/* ================= PAGE 3 : EMAIL GMAIL ================= */}
    <Page size="A4" style={styles.page}>
      
      {/* HEADER GMAIL STYLE */}
      <View style={{ backgroundColor: '#f8f9fa', padding: 10, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#dadce0' }}>
        <Image src="/gmail.png" style={styles.logo} />
      </View>

     

      {/* MESSAGE CONTAINER */}
      <View style={{ borderWidth: 1, borderColor: '#e8eaed', borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff' }}>
        
        {/* EMAIL HEADER - FROM/TO/DATE */}
        <View style={{ backgroundColor: '#f8f9fa', paddingVertical: 12, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: '#e8eaed' }}>
          
          {/* Subject Line */}
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#202124' }}>Convocation Formation : {data.intituleFormation}</Text>
          </View>

          {/* Sender Info avec Avatar */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 }}>
            {/* Avatar Circle */}
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#7c3aed', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
              <Text style={{ fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#fff' }}>T</Text>
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#202124' }}>THDS Formation &lt;{data.contactEmail}&gt;</Text>
              <Text style={{ fontSize: 9, color: '#5f6368' }}>À : {data.prenom} {data.nom}</Text>
            </View>

            {/* Date à droite */}
            <Text style={{ fontSize: 8, color: '#5f6368', textAlign: 'right' }}>
              {new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })} à {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>

          

          {/* Additional Headers */}
          <View style={{ backgroundColor: '#fff', padding: 8, marginTop: 8, borderRadius: 4 }}>
            <View style={{ flexDirection: 'row', marginBottom: 3, fontSize: 8, color: '#5f6368' }}>
              <Text style={{ width: 45, fontFamily: 'Helvetica-Bold' }}>De :</Text>
              <Text>THDS Formation &lt;{data.contactEmail}&gt;</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 3, fontSize: 8, color: '#5f6368' }}>
              <Text style={{ width: 45, fontFamily: 'Helvetica-Bold' }}>À :</Text>
              <Text>{data.prenom} {data.nom}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 3, fontSize: 8, color: '#5f6368' }}>
              <Text style={{ width: 45, fontFamily: 'Helvetica-Bold' }}>Date :</Text>
              <Text>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })} à {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
            <View style={{ flexDirection: 'row', fontSize: 8, color: '#5f6368' }}>
              <Text style={{ width: 45, fontFamily: 'Helvetica-Bold' }}>Objet :</Text>
              <Text>Convocation Formation : {data.intituleFormation}</Text>
            </View>
          </View>
        </View>

        {/* EMAIL BODY */}
        <View style={{ paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#fff' }}>
          
          <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#202124', marginBottom: 8 }}>Bonjour {data.prenom},</Text>
          
          <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#202124', marginBottom: 8 }}>
            J'ai le plaisir de vous transmettre votre convocation pour votre formation "{data.intituleFormation}".
          </Text>

          <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#202124', marginBottom: 8 }}>
            Cette formation se déroulera du {new Date(data.dateDebut).toLocaleDateString('fr-FR')} au {new Date(data.dateFin).toLocaleDateString('fr-FR')}, à partir de {data.heureDebut}.
          </Text>

          <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#202124', marginBottom: 8 }}>
            Vous trouverez le document officiel de convocation et planning complet des sessions de formation en pièce jointe de ce courriel  
          </Text>

          <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#202124', marginBottom: 8 }}>
            Venir 15 minutes avant avec la CNI ou une pièce d'identité en cours de validité, 102 rue du Port, 93300 Aubervilliers.
          </Text>

          <Text style={{ fontSize: 10, fontWeight: 'bold', lineHeight: 1.6, color: '#202124', marginBottom: 8 }}>
            Si désistement merci de nous prévenir
          </Text>

          <Text style={{ fontSize: 10, lineHeight: 1.6, color: '#202124', marginBottom: 8 }}>
            En cas de question, n'hésitez pas à me contacter directement.
          </Text>
          
          <Text style={{ fontSize: 10, color: '#202124', marginBottom: 4 }}>Bien à vous,</Text>

          {/* SIGNATURE */}
          <View style={{ borderTopWidth: 1, borderTopColor: '#e8eaed', paddingTop: 12, marginTop: 4 }}>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#202124' }}>{data.contactNom}</Text>
            <Text style={{ fontSize: 9, color: '#5f6368' }}>Responsable Pédagogique</Text>
            <Text style={{ fontSize: 9, color: '#5f6368', marginTop: 3 }}>THDS Formation</Text>
            <Text style={{ fontSize: 8, color: '#5f6368' }}>5 Rue Pleyel, 93200 SAINT DENIS</Text>
            <Text style={{ fontSize: 8, color: '#5f6368' }}>{data.contactTel}</Text>
            <Text style={{ fontSize: 8, color: '#1f2937' }}>{data.contactEmail}</Text>
          </View>
        </View>

       {/* ================= SECTION PIÈCE JOINTE : STYLE "CHIP" COMPACT ================= */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 10,  backgroundColor: '#fff' }}>
          
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            width: 260, // Largeur contenue, pas plein écran
            backgroundColor: '#fff', 
            borderWidth: 1, 
            borderColor: '#dadce0', 
            borderRadius: 4, 
            padding: 8
          }}>
            
            {/* 1. Petite Icône PDF Rouge */}
            <View style={{ 
              width: 26, 
              height: 26, 
              backgroundColor: '#ea4335', 
              borderRadius: 3, 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: 10
            }}>
               <Text style={{ color: '#fff', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>PDF</Text>
            </View>

            {/* 2. Infos Fichier */}
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ 
                fontSize: 10, 
                fontFamily: 'Helvetica-Bold', 
                color: '#3c4043',
                marginBottom: 2 
              }} numberOfLines={1}>
                Convocation-{data.nom}.pdf
              </Text>
              <Text style={{ fontSize: 9, color: '#5f6368' }}>254 Ko</Text>
            </View>

           

          </View>
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            width: 260, // Largeur contenue, pas plein écran
            backgroundColor: '#fff', 
            borderWidth: 1, 
            borderColor: '#dadce0', 
            borderRadius: 4, 
            padding: 8
            , marginTop: 8
          }}>
            
            {/* 1. Petite Icône PDF Rouge */}
            <View style={{ 
              width: 26, 
              height: 26, 
              backgroundColor: '#ea4335', 
              borderRadius: 3, 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: 10
            }}>
               <Text style={{ color: '#fff', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>PDF</Text>
            </View>

            {/* 2. Infos Fichier */}
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ 
                fontSize: 10, 
                fontFamily: 'Helvetica-Bold', 
                color: '#3c4043',
                marginBottom: 2 
              }} numberOfLines={1}>
                Planning.pdf
              </Text>
              <Text style={{ fontSize: 9, color: '#5f6368' }}>254 Ko</Text>
            </View>

           

          </View>
        </View>

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