import "./App.css";

import { Routes, Route, BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { HomePage } from "./pages/home-page";
import { SignUpPage } from "./pages/auth/sign-up-page";

import { Header } from "./components/header/header";
import { ROUTES } from "./data/routes";
import { ConfirmAccountPage } from "./pages/auth/confirm-account-page";
import { ResetPasswordPage } from "./pages/auth/reset-password-page";


function App() {
  const queryClient = new QueryClient();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <main className=" w-full  relative flex flex-col min-h-screen bg-white">
        <Header />
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            
            {/* HOME */}
            <Route key="home" path={ROUTES.home} element={<HomePage />} />

            {/* SIGNUP */}
            <Route key="signUp" path={ROUTES.auth.signUp} element={<SignUpPage />} />

            {/* CONFIRM ACCOUNT */}
            <Route key="confirmAccount" path={ROUTES.auth.confirmAccount}  element={<ConfirmAccountPage />} />

            {/*  RESET PASSWORD */}
            <Route key="resetPassword" path={ROUTES.auth.resetPassword}  element={<ResetPasswordPage />} />

            {/* SIGNIN */}
            {/* <Route key="signIn" path={ROUTES.auth.signIn}  element={<SignInPage />} /> */}

          </Routes>
        </BrowserRouter>
      </main>
      <button onClick={() => setIsOpen(!isOpen)}>{`${
        isOpen ? "Close" : "Open"
      } Query Tanstack devtools`}</button>
      {isOpen && <ReactQueryDevtoolsPanel onClose={() => setIsOpen(false)} />}
    </QueryClientProvider>
  );
}

 export default App;
