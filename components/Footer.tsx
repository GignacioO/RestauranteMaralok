import React, { useContext, useState } from 'react';
import { Utensils, Lock, RefreshCcw, Info, X, ShieldCheck, Database, Globe } from 'lucide-react';
import { RESTAURANT_DATA, APP_VERSION } from '../constants';
import { AdminContext } from '../AdminContext';

const Footer: React.FC = () => {
  const admin = useContext(AdminContext);
  const [showVersionModal, setShowVersionModal] = useState(false);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
  };

  const handleAdminAccess = () => {
    if (admin?.isAdmin) return;
    admin?.setShowLoginModal(true);
  };

  const forceAppUpdate = () => {
    if (confirm("¿Forzar actualización? Se borrarán todos los cambios locales no publicados y se recargará la versión del servidor.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const localVersion = localStorage.getItem('maral_version') || 'No detectada';

  return (
    <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-900 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Utensils className="w-6 h-6 text-amber-500" />
              <span className="text-2xl font-bold tracking-widest serif text-zinc-100 uppercase">
                {RESTAURANT_DATA.name}
              </span>
            </div>
            <p className="text-zinc-500 max-w-sm leading-relaxed text-sm">
              Dedicados a brindar la mejor experiencia gastronómica en el corazón de Buenos Aires. Calidad, tradición y confort en cada detalle.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-zinc-100 font-bold uppercase tracking-widest text-xs">Navegación</h4>
            <ul className="space-y-4 text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">
              <li><button onClick={() => scrollToId('inicio')} className="hover:text-amber-500">Inicio</button></li>
              <li><button onClick={() => scrollToId('menu')} className="hover:text-amber-500">Menú</button></li>
              <li><button onClick={() => scrollToId('opiniones')} className="hover:text-amber-500">Opiniones</button></li>
              <li>
                <button 
                  onClick={handleAdminAccess} 
                  className={`flex items-center gap-2 transition-colors ${admin?.isAdmin ? 'text-amber-500' : 'text-amber-500 hover:text-white'}`}
                >
                  <Lock size={10} /> {admin?.isAdmin ? 'Modo Admin Activo' : 'Acceso Privado'}
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-zinc-100 font-bold uppercase tracking-widest text-xs">Información</h4>
            <div className="space-y-4 text-zinc-500 text-sm">
              <p>{RESTAURANT_DATA.address}</p>
              <p>{RESTAURANT_DATA.phone}</p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} {RESTAURANT_DATA.name}. Buenos Aires, Argentina.
          </p>
          <button 
            onClick={() => setShowVersionModal(true)}
            className="text-zinc-800 text-[9px] font-bold tracking-widest uppercase flex items-center gap-2 hover:text-amber-500 transition-colors"
          >
            <Info size={12} /> Ver Versión
          </button>
        </div>
      </div>

      {showVersionModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-sm p-8 rounded-sm shadow-2xl relative">
            <button onClick={() => setShowVersionModal(false)} className="absolute top-4 right-4 text-zinc-600 hover:text-white"><X size={20} /></button>
            <h3 className="text-lg font-bold serif text-zinc-100 uppercase tracking-widest text-center mb-6">Estado del Sistema</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-3 bg-zinc-900/50 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-bold">Servidor</span>
                <span className="text-xs font-mono font-black text-white">v{APP_VERSION}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-zinc-900/50 border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-bold">Local</span>
                <span className="text-xs font-mono font-black text-white">v{localVersion}</span>
              </div>
            </div>

            <button onClick={forceAppUpdate} className="w-full bg-amber-600 text-white py-4 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3">
              <RefreshCcw size={14} /> Forzar Actualización
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;