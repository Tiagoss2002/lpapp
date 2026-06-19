import React from 'react';
import { MapPin, Phone, Clock} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="mb-4">
              <p className="text-xs text-white/40 uppercase tracking-[0.2em] mb-1">Lomitería</p>
              <h3 className="font-heading text-3xl font-black text-yellow-400">La Perlita</h3>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-2">
              Solo take away y delivery. Lomitos, pizzas, hamburguesas y empanadas hechos con amor.
            </p>
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-3 py-1 text-xs text-yellow-400 font-medium mt-2">
              🛵 Sin mesas — retiro o envío
            </div>
            <div className="flex gap-3 mt-6">
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Navegación</h3>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-white/50 hover:text-yellow-400 transition-colors">Inicio</Link>
              <Link to="/menu" className="text-sm text-white/50 hover:text-yellow-400 transition-colors">Menú Completo</Link>
              <Link to="/carrito" className="text-sm text-white/50 hover:text-yellow-400 transition-colors">Mi Carrito</Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contacto</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-white/50">
                <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                Tu dirección, Ciudad
              </div>
              <a href="tel:3534018582" className="flex items-center gap-3 text-sm text-white/50 hover:text-yellow-400 transition-colors">
                <Phone className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                353 401-8582
              </a>
              <div className="flex items-start gap-3 text-sm text-white/50">
                <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>Todos los días: 11:00 - 23:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/30">
          © {new Date().getFullYear()} Lomitería La Perlita. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}