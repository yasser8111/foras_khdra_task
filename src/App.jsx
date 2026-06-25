import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import { ReactLenis } from "lenis/react";

export default function App() {
  return (
    <ReactLenis root>
      <div className="min-h-screen flex flex-col bg-brand-bg relative overflow-x-hidden pt-20">
        <Navbar />

        <main className="grow pt-24 pb-16 relative">
          <Dashboard />
        </main>

        <Footer />
      </div>
    </ReactLenis>
  );
}