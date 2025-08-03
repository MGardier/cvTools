import "./App.css";
import { Header } from "./shared/components/header/header";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ROUTES } from "./shared/data/routes";
import { Home } from "./pages/Home";


// Nombres de candidatures envoyées  
// Récape des derniéres candidatures
//récap des derniéres relances  par priorité
// Les résultats trié par étapes
// 


// Tableau des candidatures 
// Nb de candidature envoyées 
// Nombre de retoursls
// POurcentage de réussite par rapport au candidature

function App() {
  return (
    <main className=" w-full  relative flex flex-col min-h-screen bg-white">
      
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.home} element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
