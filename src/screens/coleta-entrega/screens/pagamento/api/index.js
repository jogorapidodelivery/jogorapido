import React, {createContext, useState} from 'react';
import {useBluetoothPair} from './hooks/useBluetoothPair';

const AutenticarContext = createContext({});
export const AutenticarProvider = ({children, ...props}) => {
  // {children, ...props}
  // {"coleta_id": 568, "tipoPagamentoLabel": "Crédito", "tipoPagamentoValue": "CreditCard", popToTop:}
  const [listaDeMaquininhas, setListaDeMaquininhas] = useState([]);
  const [maquininhaSelecionada, setMaquininhaSelecionada] = useState(null);
  const [msg, setMsg] = useState('Procurando bluetooth');
  const [ic, setIc] = useState('');
  const [icCor, setIcColor] = useState('10');
  const [loading, setLoading] = useState(true);
  const dataPair = useBluetoothPair({
    listaDeMaquininhas,
    maquininhaSelecionada,
    setListaDeMaquininhas,
    setMaquininhaSelecionada,
    setLoading,
    setMsg,
    setIc,
    setIcColor,
  });
  return (
    <AutenticarContext.Provider
      value={{
        listaDeMaquininhas,
        maquininhaSelecionada,
        msg,
        ic,
        icCor,
        loading,
        ...dataPair,
        ...props,
        setMaquininhaSelecionada,
        setLoading,
        setMsg,
        setIc,
        setIcColor,
      }}>
      {children}
    </AutenticarContext.Provider>
  );
};

export default AutenticarContext;
