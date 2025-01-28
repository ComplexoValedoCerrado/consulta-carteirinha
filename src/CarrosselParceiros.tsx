import { Info } from 'lucide-react';
import logo6 from './assets/6.png';
import logo7 from './assets/7.png';
import logo8 from './assets/8.png';
import logo14 from './assets/14.png';
import logo15 from './assets/15.png';
import logo16 from './assets/16.png';
import logo17 from './assets/17.png';
import logo23 from './assets/23.png';
import logo24 from './assets/24.png';
import logo25 from './assets/25.png';
import logo26 from './assets/26.png';
import logo27 from './assets/27.png';
import logo28 from './assets/28.png';
import logo29 from './assets/29.png';
import logo30 from './assets/30.png';
import logo31 from './assets/31.png';
import logo32 from './assets/32.png';
import logo33 from './assets/33.png';
import logo34 from './assets/34.png';
import logo35 from './assets/35.png';
import logo36 from './assets/36.png';
import logo37 from './assets/37.png';
import logo38 from './assets/38.png';
import logo39 from './assets/39.png';
import logo40 from './assets/40.png';
import logo41 from './assets/41.png';
import logo42 from './assets/42.png';
import logo43 from './assets/43.png';
import logo44 from './assets/44.png';
import logo45 from './assets/45.png';
import logo46 from './assets/46.png';
import logo47 from './assets/47.png';
import logo48 from './assets/48.png';
import logo49 from './assets/49.png';
import logo50 from './assets/50.png';
import logo51 from './assets/51.png';
import logo52 from './assets/52.png';
import logo53 from './assets/53.png';
import logo54 from './assets/54.png';
import logo55 from './assets/55.png';
import logo56 from './assets/56.png';
import logo57 from './assets/57.png';
import logo58 from './assets/58.png';
import logo59 from './assets/59.png';
import logo60 from './assets/60.png';
import logo61 from './assets/61.png';
import logo62 from './assets/62.png';
import logo63 from './assets/63.png';
import logo64 from './assets/64.png';
import logo65 from './assets/65.png';
import logo66 from './assets/66.png';
import logo67 from './assets/67.png';
import logo68 from './assets/68.png';
import logo69 from './assets/69.png';
import logo70 from './assets/70.png';
import logo71 from './assets/71.png';
import logo72 from './assets/72.png';
import logo73 from './assets/73.png';
import logo74 from './assets/74.png';
import logo75 from './assets/75.png';
import logo76 from './assets/76.png';
import logo77 from './assets/77.png';
import logo78 from './assets/78.png';
import logo79 from './assets/79.png';
import logo80 from './assets/80.png';
import logo81 from './assets/81.png';
import logo82 from './assets/82.png';
import logo83 from './assets/83.png';
import logo84 from './assets/84.png';
import logo85 from './assets/85.png';
import logo86 from './assets/86.png';

import './CarrosselParceiros.css';

const CarrosselParceiros = () => {
  const partners = [
    { id: 1, logo: logo6, name: 'Parceiro 1' },
    { id: 2, logo: logo7, name: 'Parceiro 2' },
    { id: 3, logo: logo8, name: 'Parceiro 3'  },
    { id: 4, logo: logo14, name: 'Parceiro 4' },
    { id: 5, logo: logo15, name: 'Parceiro 1' },
    { id: 6, logo: logo16, name: 'Parceiro 2' },
    { id: 7, logo: logo17, name: 'Parceiro 3' },
    { id: 8, logo: logo23, name: 'Parceiro 4' },
    { id: 9, logo: logo24, name: 'Parceiro 1' },
    { id: 10, logo: logo25, name: 'Parceiro 2' },
    { id: 11, logo: logo26, name: 'Parceiro 3' },
    { id: 12, logo: logo27, name: 'Parceiro 4' },
    { id: 13, logo: logo28, name: 'Parceiro 1' },
    { id: 14, logo: logo29, name: 'Parceiro 2' },
    { id: 15, logo: logo30, name: 'Parceiro 3' },
    { id: 16, logo: logo31, name: 'Parceiro 4' },
    { id: 17, logo: logo32, name: 'Parceiro 1' },
    { id: 18, logo: logo33, name: 'Parceiro 2' },
    { id: 19, logo: logo34, name: 'Parceiro 3' },
    { id: 20, logo: logo35, name: 'Parceiro 4' },
    { id: 21, logo: logo36, name: 'Parceiro 1' },
    { id: 22, logo: logo37, name: 'Parceiro 2' },
    { id: 23, logo: logo38, name: 'Parceiro 3' },
    { id: 24, logo: logo39, name: 'Parceiro 4' },
    { id: 25, logo: logo40, name: 'Parceiro 1' },
    { id: 26, logo: logo41, name: 'Parceiro 2' },
    { id: 27, logo: logo42, name: 'Parceiro 3' },
    { id: 28, logo: logo43, name: 'Parceiro 4' },
    { id: 29, logo: logo44, name: 'Parceiro 1' },
    { id: 30, logo: logo45, name: 'Parceiro 2' },
    { id: 31, logo: logo46, name: 'Parceiro 3' },
    { id: 32, logo: logo47, name: 'Parceiro 4' },
    { id: 33, logo: logo48, name: 'Parceiro 1' },
    { id: 34, logo: logo49, name: 'Parceiro 2' },
    { id: 35, logo: logo50, name: 'Parceiro 3' },
    { id: 36, logo: logo51, name: 'Parceiro 4' },
    { id: 37, logo: logo52, name: 'Parceiro 1' },
    { id: 38, logo: logo53, name: 'Parceiro 2' },
    { id: 39, logo: logo54, name: 'Parceiro 3' },
    { id: 40, logo: logo55, name: 'Parceiro 4' },
    { id: 41, logo: logo56, name: 'Parceiro 1' },
    { id: 42, logo: logo57, name: 'Parceiro 2' },
    { id: 43, logo: logo58, name: 'Parceiro 3' },
    { id: 44, logo: logo59, name: 'Parceiro 4' },
    { id: 45, logo: logo60, name: 'Parceiro 1' },
    { id: 46, logo: logo61, name: 'Parceiro 2' },
    { id: 47, logo: logo62, name: 'Parceiro 3' },
    { id: 48, logo: logo63, name: 'Parceiro 4' },
    { id: 49, logo: logo64, name: 'Parceiro 1' },
    { id: 50, logo: logo65, name: 'Parceiro 2' },
    { id: 51, logo: logo66, name: 'Parceiro 3' },
    { id: 52, logo: logo67, name: 'Parceiro 4' },
    { id: 53, logo: logo68, name: 'Parceiro 1' },
    { id: 54, logo: logo69, name: 'Parceiro 2' },
    { id: 55, logo: logo70, name: 'Parceiro 3' },
    { id: 56, logo: logo71, name: 'Parceiro 4' },
    { id: 57, logo: logo72, name: 'Parceiro 1' },
    { id: 58, logo: logo73, name: 'Parceiro 2' },
    { id: 59, logo: logo74, name: 'Parceiro 3' },
    { id: 60, logo: logo75, name: 'Parceiro 4' },
    { id: 61, logo: logo76, name: 'Parceiro 1' },
    { id: 62, logo: logo77, name: 'Parceiro 2' },
    { id: 63, logo: logo78, name: 'Parceiro 3' },
    { id: 64, logo: logo79, name: 'Parceiro 4' },
    { id: 65, logo: logo80, name: 'Parceiro 1' },
    { id: 66, logo: logo81, name: 'Parceiro 2' },
    { id: 67, logo: logo82, name: 'Parceiro 3' },
    { id: 68, logo: logo83, name: 'Parceiro 4' },
    { id: 69, logo: logo84, name: 'Parceiro 1' },
    { id: 70, logo: logo85, name: 'Parceiro 2' },
    { id: 71, logo: logo86, name: 'Parceiro 3' },

  ];
  const allPartners = [...partners, ...partners];

  return (
    <div className="w-full bg-gray-100 overflow-hidden relative flex flex-col justify-center pb-4">
      <div className="w-full mx-auto px-4 pt-5">
        <div className="flex items-center gap-2 justify-center">
          <h3 className="text-xl font-semibold text-gray-800">Parceiros</h3>
          <a
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
            href='https://www.mkt.valedocerradodigital.com.br/parceiros'
            target='_blank'
            rel="noopener noreferrer"
          >
            Ver todos
            <Info size={16} className="transition-all group-hover:scale-110" />
          </a>
        </div>
      </div>

      <div className="relative">
        {/* Gradientes */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-100 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-100 to-transparent z-10" />

        {/* Carrossel */}
        <div className="flex gap-8 animate-scroll">
          {allPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-none relative group"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-30 w-auto object-contain"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarrosselParceiros;