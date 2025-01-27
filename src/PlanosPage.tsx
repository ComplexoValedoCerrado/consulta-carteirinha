import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { WhatsappIcon } from './WhatsappIcon';
import { Beneficiario, Plano } from './App';


interface PlanosPageProps {
  setPlanos: (planos: Plano[]) => void;
  planos: Plano[];
  setBeneficiarios: (beneficiarios: {[key: string]: Beneficiario[]}) => void;
  beneficiarios: {[key: string]: Beneficiario[]};
}

function PlanosPage({ planos, beneficiarios, setPlanos, setBeneficiarios }: PlanosPageProps) {
  const [openAccordions, setOpenAccordions] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    window.addEventListener('beforeunload', handleBack);
    window.addEventListener('popstate', handleBack);

    window.history.pushState({ page: 'planos' }, '');

    return () => {
      window.removeEventListener('beforeunload', handleBack);
      window.removeEventListener('popstate', handleBack);
    };
  }, [setPlanos, setBeneficiarios]);
  

  const toggleAccordion = (contrato: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [contrato]: !prev[contrato]
    }));
  };

  const handleBack = () => {
    setPlanos([]);
    setBeneficiarios({});
  };

  return (
    <div className="min-h-screen w-full px-4 py-8 bg-gray-50">
      <div className="relative w-full max-w-7xl mx-auto px-4 mb-8">
        <button 
          onClick={handleBack}
          className="cursor-pointer hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 bg-midnight-blue text-white rounded-xl py-2 px-4 font-semibold hover:bg-opacity-90 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        
        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold text-midnight-blue">
          SELECIONE SEU <span className="text-green-vale">PLANO</span>
        </h2>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 lg:gap-16">
          {planos.map((plano) => (
            <div key={plano.contrato} className="w-full sm:w-5/7 lg:w-2/5 flex flex-col gap-4">
              {/* Card do Plano */}
              <div className={`
                w-full rounded-2xl p-4 shadow-lg
                ${plano.status === "Ativo" ? 'bg-green-vale' : 'bg-midnight-blue'}
              `}>
                <div className="space-y-2">
                  <span className="block text-white italic text-base lg:text-lg">
                    Nome: {plano.nome}
                  </span>
                  <span className="block text-white italic text-base lg:text-lg">
                    Plano: {plano.plano}
                  </span>
                  <span className="block text-white italic text-base lg:text-lg">
                    Contrato: <span className="font-bold">{plano.contrato}</span>
                  </span>
                </div>
                
                <div className="mt-6 text-center">
                  <span className="text-white italic font-bold text-lg">
                    Status: {plano.status}
                  </span>
                </div>
              </div>

              {/* Seção de Cartões */}
              <div className="space-y-4 w-full">
                <div className="flex justify-center">
                  <button 
                    onClick={() => toggleAccordion(plano.contrato)}
                    className={`w-full ${plano.status === "Ativo" ? 'bg-green-vale' : 'bg-gray-400'} text-white rounded-xl py-2 px-4 font-semibold text-sm lg:text-base relative`}
                  >
                    Baixar Cartão de Benefício
                    {openAccordions[plano.contrato] ? 
                      <ChevronUp className="absolute right-3 top-1/2 transform -translate-y-1/2" size={20} /> : 
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" size={20} />
                    }
                  </button>
                </div>

                {(openAccordions[plano.contrato] && plano.status === "Ativo") &&
                  (
                    <div className="space-y-3">
                      {/* Cartão Titular */}
                      <div className="bg-gray-200 rounded-xl p-3">
                        <button 
                          onClick={() => toggleAccordion(`${plano.contrato}-titular`)}
                          className="w-full bg-green-vale text-white rounded-xl py-2 px-4 font-semibold text-sm lg:text-base relative"
                        >
                          Cartão Titular
                          {openAccordions[`${plano.contrato}-titular`] ? 
                            <ChevronUp className="absolute right-3 top-1/2 transform -translate-y-1/2" size={20} /> : 
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" size={20} />
                          }
                        </button>
                        
                        {openAccordions[`${plano.contrato}-titular`] && (
                          <div className="mt-3 p-3 bg-white rounded-lg">
                            <p className="text-gray-800">Cartão</p>
                          </div>
                        )}
                      </div>

                      {/* Cartão Dependentes */}
                      <div className="bg-gray-200 rounded-xl p-3">
                        <button 
                          onClick={() => toggleAccordion(`${plano.contrato}-dependentes`)}
                          className="w-full bg-green-vale text-white rounded-xl py-2 px-4 font-semibold text-sm lg:text-base relative"
                        >
                          Cartão Dependentes
                          {openAccordions[`${plano.contrato}-dependentes`] ? 
                            <ChevronUp className="absolute right-3 top-1/2 transform -translate-y-1/2" size={20} /> : 
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2" size={20} />
                          }
                        </button>
                        
                        {openAccordions[`${plano.contrato}-dependentes`] && (
                          <div className="mt-3 space-y-2">
                            {beneficiarios[`${plano.contrato}-${plano.filial}`]?.map((beneficiario) => (
                              <div 
                                key={beneficiario.Nome} 
                                className="p-3 bg-white rounded-lg"
                              >
                                <p className="text-gray-800">{beneficiario.Nome}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                )}
                {openAccordions[plano.contrato] && plano.status !== "Ativo" && (
                  <div className="bg-gray-200 rounded-xl p-3">
                    <p className="text-gray-800 sm:text-base md:text-lg text-center">
                      Para ultilização dos serviços
                      é necessário contato com
                      área financeira para
                      regularização de planos,
                      favor entrar em contato
                      através do 

                      tel. (62) 4006-0033 ou
                      clique no botão abaixo.
                    </p>
                    <div className='flex w-full items-center justify-center mt-3'>
                      <a className='flex flex-row items-center justify-center gap-2 bg-green-vale w-4/5 text-black rounded-xl text-white p-1 cursor-pointer hover:bg-green-500' href="https://api.whatsapp.com/send?phone=556240060041" target='_blank'>
                        Atendimento Financeiro
                        <WhatsappIcon/>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlanosPage;