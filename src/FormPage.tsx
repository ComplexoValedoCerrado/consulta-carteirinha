import { useEffect, useState } from 'react'
import './App.css'
import woman_image from './assets/mulher_feliz.png'
import lupa from './assets/lupa.png'
import { Beneficiario, Plano } from './App'

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

       console.log(planos)
       
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
      <div className='flex flex-row w-screen h-screen bg-midnight-blue'>
          <div className='flex flex-col justify-center items-start w-1/2 h-3/4 pl-35 pt-50'>
            <div className='flex flex-col gap-7 w-full'>
              <h2 className='font-sans text-white font-bold flex flex-col w-full'>
                <span className='text-6xl w-full tracking-wider'>DESCUBRA SEUS</span>
                <strong className='text-green-vale text-8xl tracking-tighter w-full font-black'>BENEFÍCIOS</strong>
                <strong className='text-7xl w-full tracking-wider'>EXCLUSIVOS!</strong>
              </h2>
              
              <p className='text-white font-normal text-2xl max-w-xl indent-4'>
                "Informe seu CPF e a data de nascimento para acessar descontos
                e <strong>vantagens especiais</strong> em saúde, bem-estar, academias
                e muito mais."
              </p>
            </div>
            <hr className="border-b-3 border-blue-400 mt-4 w-full max-w-xl" />
            <form className='flex flex-col items-start justify-center w-full max-w-xl space-y-4 mt-4 gap-2' onSubmit={(e) => handleConsultarCarteirinhas(e)}>
              <input 
                className='bg-white w-8/10 p-3 rounded-2xl text-center text-green-vale font-normal italic text-lg placeholder-green-vale' 
                type="text" 
                placeholder='CPF do Titular' 
                onChange={(e) => handleCpfChange(e)} 
                value={cpf} 
                maxLength={14}
              />
              <input 
                className='bg-white w-8/10 p-3 rounded-2xl text-center text-midnight-blue font-normal italic text-lg placeholder-midnight-blue' 
                type="text" 
                placeholder='Data de Nascimento' 
                value={dataNascimento}
                maxLength={10}
                onChange={(e) => handleDataNascimentoChange(e)}
              />
                {errorPlano && <p className='text-red-500'>{errorPlano}</p>}
              <div className='w-8/10 flex items-center justify-center mt-4'>
                <button 
                  className='bg-green-vale text-white text-semibold py-1 px-5 rounded-2xl w-1/2 relative text-xl cursor-pointer hover:bg-green-500'
                  type='submit'
                >
                  CONSULTAR <img src={lupa} className='w-10 h-10 absolute -top-3 right-5' alt="" />
                </button>
              </div>
            </form>
          </div>
          <div className='flex flex-col justify-center items-center w-1/2 h-full'>
            <img src={woman_image} className='h-8/10 image-rendering-auto' alt="" />
          </div>
        </div>
    {isLoading && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="animate-spin w-12 h-12 border-4 border-green-vale border-t-transparent rounded-full" />
      </div>
    )}
   </>
 )
}

export default FormPage