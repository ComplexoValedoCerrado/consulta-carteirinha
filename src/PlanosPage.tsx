import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ArrowLeft, ChevronRight, X } from 'lucide-react';
import { WhatsappIcon } from './WhatsappIcon';
import { Beneficiario, Plano } from './App';
import logoVale from './assets/logo_vale.png';
import CarrosselParceiros from './CarrosselParceiros';

interface PlanosPageProps {
  setPlanos: (planos: Plano[]) => void;
  planos: Plano[];
  setBeneficiarios: (beneficiarios: {[key: string]: Beneficiario[]}) => void;
  beneficiarios: {[key: string]: Beneficiario[]};
}

type SelectedPerson = {
  type: 'titular' | 'dependente';
  data: Plano | Beneficiario;
};

function PlanosPage({ planos, beneficiarios, setPlanos, setBeneficiarios }: PlanosPageProps) {
  const [openAccordions, setOpenAccordions] = useState<{[key: string]: boolean}>({});
  const [selectedPerson, setSelectedPerson] = useState<SelectedPerson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBack);
    window.addEventListener('popstate', handleBack);

    window.history.pushState({ page: 'planos' }, '');

    return () => {
      window.removeEventListener('beforeunload', handleBack);
      window.removeEventListener('popstate', handleBack);
    };
  }, [setPlanos, setBeneficiarios]);

  useEffect(() => {
    const img = new Image();
    img.src = logoVale;
  }, []);
  
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
    <div className="min-h-screen w-full bg-gray-50 flex flex-col justify-between">
      <div className="w-full px-4 py-8 bg-gray-50">
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

        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 lg:gap-16">
            {planos.map((plano) => (
              <div key={plano.contrato} className="w-full sm:w-5/7 lg:w-2/5">
                {/* Card Principal */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  {/* Cabeçalho com nome do plano */}
                  <div className={`${plano.status === 'Ativo' ? 'bg-green-vale' : 'bg-midnight-blue'} p-4`}>
                    <h3 className="text-white text-xl font-bold text-center">
                      {plano.plano}
                    </h3>
                  </div>

                  {/* Conteúdo do card */}
                  <div className="">
                    <div className="space-y-4">
                      {/* Grid para informações */}
                      <div className="grid grid-cols-[80px_1fr] gap-y-4 pb-1 pt-6 pl-6 pr-6">
                        <span className="text-gray-600 font-semibold">Titular:</span>
                        <span className="text-gray-800">{plano.nome}</span>
                        
                        <span className="text-gray-600 font-semibold">Contrato:</span>
                        <span className="text-gray-800 font-bold">{plano.contrato}</span>
                        
                        <span className="text-gray-600 font-semibold">Status:</span>
                        <span className={`${plano.status === "Ativo" ? "text-green-vale" : "text-red-800"} font-bold`}>
                          {plano.status}
                        </span>
                      </div>

                      {/* Seção de Cartões */}
                      <div className="p-2 pb-4">
                        {/* Botão Principal */}
                        <button
                          onClick={() => toggleAccordion(plano.contrato)}
                          className={`w-full ${plano.status === "Ativo" ? 'bg-green-vale hover:bg-green-700' : 'bg-gray-400'} 
                            text-white ${openAccordions[plano.contrato] ? 'rounded-t-xl' : 'rounded-xl'} py-3 px-4 font-semibold transition-colors relative flex items-center justify-center`}
                        >
                          <span>Visualizar carteirinhas</span>
                          <div className="absolute right-4">
                            {openAccordions[plano.contrato] ? 
                              <ChevronUp size={20} /> : 
                              <ChevronDown size={20} />
                            }
                          </div>
                        </button>

                        {/* Container dos Accordions */}
                        {(openAccordions[plano.contrato] && plano.status === "Ativo") && (
                          <div className="bg-gray-50 rounded-b-xl border border-t-0 border-gray-200">
                            {/* Accordion Titular */}
                            <div className="p-3">
                              <button 
                                onClick={() => toggleAccordion(`${plano.contrato}-titular`)}
                                className="w-full bg-green-800 hover:bg-green-900 text-white rounded-lg py-2.5 px-4 
                                  font-semibold transition-colors relative flex items-center justify-between"
                              >
                                <span>Carteirinha titular</span>
                                {openAccordions[`${plano.contrato}-titular`] ? 
                                  <ChevronUp size={20} /> : 
                                  <ChevronDown size={20} />
                                }
                              </button>
                              
                              {openAccordions[`${plano.contrato}-titular`] && (
                                <div className="mt-2">
                                  <button 
                                    onClick={() => {
                                      setSelectedPerson({ type: 'titular', data: plano });
                                      setIsModalOpen(true);
                                    }}
                                    className="w-full flex items-center px-4 py-2.5 bg-midnight-blue hover:bg-blue-900 
                                      rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                  >
                                    <div className="flex items-center justify-between w-full">
                                      <span className="text-white font-medium">{plano.nome}</span>
                                      <div className="flex items-center text-white">
                                        <span className="hidden sm:inline mr-2">Ver carteirinha</span>
                                        <ChevronRight size={16} className="text-gray-300" />
                                      </div>
                                    </div>
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Accordion Dependentes */}
                            <div className="p-3 border-t border-gray-200">
                              <button 
                                onClick={() => toggleAccordion(`${plano.contrato}-dependentes`)}
                                className="w-full bg-green-800 hover:bg-green-900 text-white rounded-lg py-2.5 px-4 
                                  font-semibold transition-colors relative flex items-center justify-between"
                              >
                                <span>Carteirinhas dependentes</span>
                                {openAccordions[`${plano.contrato}-dependentes`] ? 
                                  <ChevronUp size={20} /> : 
                                  <ChevronDown size={20} />
                                }
                              </button>
                              
                              {openAccordions[`${plano.contrato}-dependentes`] && (
                                <div className="mt-2 space-y-2">
                                  {beneficiarios[`${plano.contrato}-${plano.filial}`]?.map((beneficiario) => (
                                    <button 
                                      key={beneficiario.Nome}
                                      onClick={() => {
                                        setSelectedPerson({ type: 'dependente', data: beneficiario });
                                        setIsModalOpen(true);
                                      }}
                                      className="w-full flex items-center px-4 py-2.5 bg-midnight-blue hover:bg-blue-900 
                                        rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                                    >
                                      <div className="flex items-center justify-between w-full">
                                        <span className="text-white font-medium">{beneficiario.Nome}</span>
                                        <div className="flex items-center text-white">
                                          <span className="hidden sm:inline mr-2">Ver carteirinha</span>
                                          <ChevronRight size={16} className="text-gray-300" />
                                        </div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Mensagem para planos inativos */}
                        {openAccordions[plano.contrato] && plano.status !== "Ativo" && (
                          <div className="bg-gray-50 rounded-b-xl border border-t-0 border-gray-200 p-6">
                            <p className="text-gray-800 text-center leading-relaxed mb-4">
                              Para utilização dos serviços é necessário contato com
                              área financeira para regularização de planos,
                              favor entrar em contato através do tel. (62) 4006-0033 
                              ou clique no botão abaixo.
                            </p>
                            <div className="flex justify-center">
                              <a 
                                className="flex items-center justify-center gap-2 bg-green-vale hover:bg-green-700 
                                  text-white rounded-xl py-3 px-6 transition-colors" 
                                href="https://api.whatsapp.com/send?phone=556240060041" 
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Atendimento Financeiro
                                <WhatsappIcon/>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal da Carteirinha */}
        {isModalOpen && selectedPerson && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div 
              className="relative w-full max-w-xl mx-auto animate-fadeIn"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="w-full aspect-[1.8/1] bg-gray-200 rounded-lg relative overflow-hidden">
                <div className="absolute left-0 top-0 w-full h-7 bg-green-vale"></div>
                
                <div className="w-full h-full px-4 pt-10 pb-9">
                  <h3 className="text-gray-600 text-lg min-[472px]:text-2xl sm:text-2xl font-bold mb-2">
                    CARTÃO DO ASSOCIADO
                  </h3>
                  
                  <div>
                    <div className="flex flex-row">
                      <div className="w-20 min-[436px]:w-24 min-[505px]:w-26 min-[505px]:w-32 flex flex-row justify-between">
                        <span className="text-[11px] min-[436px]:text-[13px] min-[505px]:text-base font-semibold">Nome</span>
                        <span className="text-[11px] min-[436px]:text-[13px] min-[505px]:text-base font-semibold">:</span>
                      </div>
                      <span className="text-[11px] min-[436px]:text-[13px] min-[505px]:text-base ml-2 z-20 font-semibold">
                        {selectedPerson.type === 'titular' 
                          ? (selectedPerson.data as Plano).nome 
                          : (selectedPerson.data as Beneficiario).Nome
                        }
                      </span>
                    </div>
                    
                    <div className="flex flex-row">
                      <div className="w-20 min-[436px]:w-24 min-[505px]:w-26 min-[505px]:w-32 flex flex-row justify-between">
                        <span className="text-[11px] min-[436px]:text-[13px] min-[505px]:text-base font-semibold">Filial/Contrato</span>
                        <span className="text-[11px] min-[436px]:text-[13px] min-[505px]:text-base font-semibold">:</span>
                      </div>
                      <span className="text-[11px] min-[436px]:text-[13px] min-[505px]:text-base ml-2 font-semibold">
                        {selectedPerson.type === 'titular' 
                          ? `${(selectedPerson.data as Plano).filial}/${(selectedPerson.data as Plano).contrato}`
                          : `${(selectedPerson.data as Beneficiario).Filial}/${(selectedPerson.data as Beneficiario).Contrato}`
                        }
                      </span>
                    </div>
      
                    <div className="flex flex-row">
                      <div className="w-20 min-[436px]:w-24 min-[505px]:w-26 min-[505px]:w-32 flex flex-row justify-between">
                        <span className="text-[11px] min-[436px]:text-[13px] min-[505px]:text-base font-semibold">Validade</span>
                        <span className="text-[11px] min-[436px]:text-[13px] min-[505px]:text-base font-semibold">:</span>
                      </div>
                      <span className="text-[11px] min-[436px]:text-[13px] min-[505px]:text-base ml-2 font-semibold">
                        {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex flex-row">
                      <div className="w-20 min-[436px]:w-24 min-[505px]:w-26 min-[505px]:w-32 flex flex-row justify-between">
                        <span className="text-[11px] min-[436px]:text-[13px] min-[505px]:text-base sm:text-base font-semibold">Status</span>
                        <span className="text-[11px] min-[436px]:text-[13px] min-[505px]:text-base sm:text-base font-semibold">:</span>
                      </div>
                      <span className="text-[11px] min-[436px]:text-[13px] min-[505px]:text-base sm:text-base ml-2 text-green-vale font-semibold">
                        Ativo
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute left-0 bottom-0 w-full h-7 bg-green-vale"></div>
                
                <img
                  loading="eager"
                  className="z-10 absolute w-32 min-[344px]:w-22 min-[344px]:h-16 min-[344px]:top-4/6 min-[436px]:w-35 min-[436px]:h-19 min-[505px]:w-40 min-[505px]:h-18 min-[607px]:w-50 h-14 min-[607px]:h-20 right-4 min-[569px]:right-6 min-[569px]:w-45 min-[569px]:h-18 font-bold top-3/5 transform -translate-y-1/2 object-contain object-center rendering-auto opacity-80"
                  src={logoVale}
                  alt="Logo Vale"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='w-full h-full'> 
          <CarrosselParceiros bgColor='transparent'/>
      </div>
    </div>
  );
}

export default PlanosPage;