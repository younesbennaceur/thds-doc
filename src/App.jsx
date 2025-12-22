import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Convocation from './pages/Convocation';
import Planning from './pages/Planning';
import Consentement from './pages/Consentement';




// ✅ ScrollToTop reste ici
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div>
      <ScrollToTop />
   

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/convocation' element={<Convocation />} />
        <Route path='/planning' element={<Planning />} />
        <Route path='/consentement' element={<Consentement />} />
        
        
        

       
      </Routes>

   


    

    
    </div>
  );
}

export default App;