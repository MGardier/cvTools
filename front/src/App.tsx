import "./App.css";
import { Header } from "./shared/components/header/header";
import { Routes, BrowserRouter } from "react-router-dom";
import { generateRoutes } from "./routing /route-generator";
import { appRoutes } from "./routing /routes.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { useState } from "react";
  import { ToastContainer } from 'react-toastify';
function App() {
  const queryClient = new QueryClient();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <main className=" w-full  relative flex flex-col min-h-screen bg-white">
        <Header />
        <ToastContainer />
        <BrowserRouter>
          <Routes>{generateRoutes(appRoutes)}</Routes>
        </BrowserRouter>
      </main>
      <button onClick={() => setIsOpen(!isOpen)}>{`${
        isOpen ? "Close" : "Open"
      } the devtools panel`}</button>
      {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />}
    </QueryClientProvider>
  );
}

export default App;
