import './App.css';
import React, { useState, useEffect } from 'react';
import Mail from './Mail.js';
import Users from './Users.js';
import { BrowserRouter, Outlet, Routes, Route } from 'react-router-dom';
import { Fab } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":id" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Home() {

  const [isAppearing, setIsAppearing] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [anchors] = useState(document.getElementsByClassName('anchor'));
  
  

  useEffect(() => {   
    const listenToScroll = () => {
      const rect = anchors[anchors.length-1].getBoundingClientRect();
      if (rect.top < 600) {  
           isVisible && setIsVisible(false);
      } else {
           setIsVisible(true);
      }  
    };
    window.addEventListener("scroll", listenToScroll);
    return () => 
       window.removeEventListener("scroll", listenToScroll); 
  }, [anchors, isVisible])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAppearing(false);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);


  const scroll = () => {
    for (let i = 0; i < anchors.length - 1; i++) {
      const anchor = anchors[i];
      const rect = anchor.getBoundingClientRect();
      if (rect.top >= -300 && rect.top < 300) {
        anchors[i+1].scrollIntoView({behavior: 'smooth'});
        return;
      }
    }
  }
  return (
    <div className="App">
      <img alt="Birds" src="./birds.svg" className="birds appearing" />
      <img alt="People" src="./people.svg" className="people appearing" />
      <header className="App-header fullscreen anchor c1">
        <p className="header-content">
          <span className="col-he">Anna</span><br/> 
          e<br/>
          <span className="col-hi">Domenico</span>
        </p>
        <Mail />
        <Fab 
          className={`
            button
            fixed
            ${isAppearing ? 'appearing' : 'bouncing'}
            ${isVisible ? '' : 'hidden'}
          `} onClick={scroll}>
          <ArrowDownwardIcon />
        </Fab>
      </header>
      <section className="fullscreen anchor c2">
        <p>
          Ciao!
        </p>
        <p>
          Abbiamo pensato di non usare carta e inchiostro
        </p>
        <p>
          🙃
        </p>
      </section>
      <section className="fullscreen anchor c3">
        <p>
          Con questo messaggio siete invitati al nostro
        </p>
        <p>
          <span className="col-ei">Matrimonio</span>
        </p>
        <img src="./gif.webp" alt="Gif Barney e Robin" />
      </section>
      <section className="fullscreen anchor c4">
        <p>
          28 Aprile 2024
        </p>
        <p>
          Ore 11:00
        </p>
        <p>
          Parrocchia SS Crocifisso
        </p>
        <p className="smaller">
          dei Frati Minori Cappuccini
        </p>
        <p>
          <span className="address">
            <a href="https://maps.app.goo.gl/Mh6PXJpYPg4oJXHc8">
              Via Canal Grande, 57, Faenza (Ra)
              📍
            </a>
          </span>
        </p>
        </section>
        <section className="fullscreen anchor c5">
        <p>
          Dopo si va a
        </p>
        <p>
          Borgo Fregnano
        </p>
        <p>
          <span className="address">
            <a href="https://maps.app.goo.gl/wy6TrgTWbbWrjNB47">
              Via Baccagnano, 37, Brisighella (Ra)
              📍
            </a>
          </span>
        </p>
        <p>
          🫡
        </p>
        </section>
        <section className="fullscreen anchor c6">
        <p>
          Confermate la presenza
          selezionando il vostro nome.
          Entro Pasqua dai!
          🫶
        </p>
        <Outlet />
      </section>
      <section className="fullscreen anchor c7">
        <p>
          Non ci interessano regali,
          ma solo far festa con voi,
          quindi, se volete offrirci un gin tonic, cliccate qua sotto.
        </p>
        <a href="https://paypal.me/DDiIorio">
          <img alt="Paga con PayPal" className="payment" src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-color.svg">
          </img>
        </a>
        <a href="https://www.satispay.com/download/qrcode/S6Y-SVN--8440F70B-130F-4949-BD32-FC8B0DD2EC7E">
          <img alt="Paga con Satispay" className="payment" src="https://www.satispay.com/static/958587bb44021b34c855f7fcdbee6ee2/logo.svg">
          </img>
        </a>
      </section>
      <section className="fullscreen anchor c8 noi">
        <p className="col-ei">Grazie!</p>
      </section>
    </div>
  );
}

export default App;