import { useEffect, useState } from 'react'
import './App.css'
import woman_image from './assets/mulher_feliz.webp'
import lupa from './assets/lupa.png'
import { Beneficiario, Plano } from './App'
import CarrosselParceiros from './CarrosselParceiros'
import './FormPage.css'

type PlanosResponse = {
  status: number;
  clientes?: Plano[];
  msg?: string;
}

type BeneficiariosResponse = {
  status: number;
  beneficiarios?: Beneficiario[];
  msg?: string;
}

interface FormPageProps {
  setPlanos: (planos: Plano[]) => void;
  planos: Plano[];
  setBeneficiarios: (beneficiarios: {[key: string]: Beneficiario[]}) => void;
}

function FormPage({ setPlanos, planos, setBeneficiarios }: FormPageProps) {
  const [cpf, setCpf] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [errorPlano, setErrorPlano] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConsultarCarteirinhas = async (e: any) => {
    e.preventDefault()
    setIsLoading(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_CONSULTA_CLIENTE_URL + `?ccpfcli=${cpf.replace(/\D/g, '')}`);
      const data: PlanosResponse = await response.json();
      
      if (data.status != 200) {
        setErrorPlano("Cliente não encontrado");
        setPlanos([]);
        setIsLoading(false);
        return;
      }

      setErrorPlano('');
      setPlanos(data.clientes!);
    } catch (error) {
      console.error(error);
      setErrorPlano("Erro inesperado ao buscar cliente, tente novamente mais tarde");
      setPlanos([]);
      setIsLoading(false);
    }
 }

  useEffect(() => {
   const fetchBeneficiarios = async () => {
     try {
       const allBeneficiarios: { [key: string]: any } = {};

       for (const plano of planos) {
         const response = await fetch(`${import.meta.env.VITE_API_CONSULTA_BENEFICIARIOS_URL}?cContrato=${plano.contrato}&cFilialx=${plano.filial}`);
         const data: BeneficiariosResponse = await response.json();
         
         const beneficiariosUnicos = data.beneficiarios?.filter(
           ben => !planos.some(p => p.nome === ben.Nome)
         );
    
         allBeneficiarios[`${plano.contrato}-${plano.filial}`] = beneficiariosUnicos;
       }
       setBeneficiarios(allBeneficiarios);
     } catch (error) {
       console.error(error);
       setErrorPlano("Erro ao buscar beneficiários");
       setPlanos([]);
     } finally {
       setIsLoading(false);
     }
    };
  
   if (planos.length > 0 && errorPlano === '') {
     fetchBeneficiarios();
   }
  }, [planos]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCpf(applyMask(value));
  };
      
  const handleDataNascimentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDataNascimento(applyDataMask(value));
  };
      
  const applyMask = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  
  const applyDataMask = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\d{2})(\d)/, '$1/$2');
  };

  return (
    <>
      <div className='w-full h-[100dvh] flex flex-col overflow-hidden'>
        {/* Área Principal */}
        <div className='flex flex-col lg:flex-row w-full flex-grow bg-midnight-blue h-[90dvh] min-h-[500px]'>
          {/* Coluna da Esquerda */}
          <div className='flex flex-col justify-center w-full lg:w-1/2 h-full px-4 py-2 lg:pl-16 xl:pl-24 2xl:pl-35'>
            <div className='flex flex-col gap-2 lg:gap-4 w-full max-w-2xl mx-auto lg:mx-0'>
              <h2 className='font-sans text-white font-bold flex flex-col w-full text-center lg:text-left'>
                <span className='text-3xl sm:text-4xl md:text-5xl lg:text-5xl tracking-wider'>
                  DESCUBRA SEUS
                </span>
                <strong className='text-green-vale text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tighter font-black'>
                  BENEFÍCIOS
                </strong>
                <strong className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wider'>
                  EXCLUSIVOS!
                </strong>
              </h2>
              
              <p className='text-white font-normal text-base sm:text-lg md:text-xl lg:text-xl xl-text-2xl max-w-xl mx-auto lg:mx-0 px-4 lg:px-0 text-center lg:text-left'>
                "Informe seu CPF e a data de nascimento para acessar descontos
                e <strong>vantagens especiais</strong> em saúde, bem-estar, academias
                e muito mais."
              </p>
            </div>

            <hr className="border-b-3 border-blue-400 mt-2 w-full max-w-xl mx-auto lg:mx-0" />

            <form 
              className='flex flex-col items-center lg:items-start justify-center w-full max-w-xl mx-auto lg:mx-0 space-y-2 mt-2 px-4 lg:px-0' 
              onSubmit={(e) => handleConsultarCarteirinhas(e)}
            >
              <input 
                className='bg-white w-full sm:w-8/10 p-2 md:p-3 lg:p-2 xl:p-3 rounded-2xl text-center text-green-vale font-normal italic text-base md:text-lg placeholder-green-vale' 
                type="text" 
                placeholder='CPF do Titular' 
                onChange={(e) => handleCpfChange(e)} 
                value={cpf} 
                maxLength={14}
              />
              <input 
                className='bg-white w-full sm:w-8/10 p-2 md:p-3 lg:p-2 xl:p-3 rounded-2xl text-center text-midnight-blue font-normal italic text-base md:text-lg placeholder-midnight-blue' 
                type="text" 
                placeholder='Data de Nascimento' 
                value={dataNascimento}
                maxLength={10}
                onChange={(e) => handleDataNascimentoChange(e)}
              />

              {errorPlano && <p className='text-red-500 text-center lg:text-left text-sm md:text-base'>{errorPlano}</p>}

              <div className='w-full sm:w-4/5 md:w-3/4 flex items-center justify-center lg:justify-start mt-2'>
                <button 
                  className='bg-green-vale text-white text-semibold py-1 px-5 rounded-2xl w-full sm:w-1/2 relative text-lg md:text-xl cursor-pointer hover:bg-green-500 transition-colors'
                  type='submit'
                >
                  CONSULTAR 
                  <img 
                    src={lupa} 
                    className='w-6 h-6 sm:w-8 sm:h-8 absolute -top-1 sm:-top-2 right-3 sm:right-4' 
                    alt="Ícone de lupa" 
                    loading="eager"
                  />
                </button>
              </div>
            </form>
          </div>
          
          {/* Coluna da Direita - Imagem */}
          <div className='hidden lg:flex flex-col justify-center items-center w-1/2 h-full relative'>
            <div className='w-full h-full flex items-center justify-center'>
              <img 
                src={woman_image} 
                className='max-h-[80%] w-auto object-contain woman-image'
                alt="Mulher sorrindo" 
                loading="eager"
                sizes="(max-width: 1024px) 0px, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Carrossel */}
        <div className='h-[10dvh] min-h-[150px] bg-gray-100 shrink-0'>
          <CarrosselParceiros bgColor='gray-100' />
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="animate-spin w-8 h-8 sm:w-12 sm:h-12 border-4 border-green-vale border-t-transparent rounded-full" />
        </div>
      )}
    </>
  );
}

export default FormPage