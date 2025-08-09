import "./App.css";
import { Header } from "./shared/components/header/header";
import { Routes, BrowserRouter } from "react-router-dom";
import { generateRoutes } from "./routing /route-generator";
import { appRoutes } from "./routing /routes.config";


function App() {

    console.log(generateRoutes(appRoutes))
  return (
    <main className=" w-full  relative flex flex-col min-h-screen bg-white">
      <Header />
      <BrowserRouter>
        <Routes>
          {generateRoutes(appRoutes)}
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
