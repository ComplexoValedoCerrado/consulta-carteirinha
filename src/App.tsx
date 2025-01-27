import { useState } from 'react'
import './App.css'
import FormPage from './FormPage'
import PlanosPage from './PlanosPage'

export type Plano = {
  contrato: string;
  cpf: string;
  filial: string;
  nome: string;
  plano: string;
  status: string;
}

export type Beneficiario = {
  Contrato: string;
  Filial: string;
  Nome: string;
  Parentesco: string;
  Tipo: string;
}

function App() {
 const [planos, setPlanos] = useState<Plano[]>([]);
 const [beneficiarios, setBeneficiarios] = useState<{[key: string]: Beneficiario[]}>({});

 return (
   <div>
    {planos.length > 0 && Object.keys(beneficiarios).length > 0
      ?
      <PlanosPage planos={planos} beneficiarios={beneficiarios} setPlanos={setPlanos} setBeneficiarios={setBeneficiarios}/>
      :
      <FormPage planos={planos} setBeneficiarios={setBeneficiarios} setPlanos={setPlanos} />
    }
   </div>
 )
}

export default App