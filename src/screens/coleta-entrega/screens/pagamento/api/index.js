import React, {createContext, useState} from 'react';
const AutenticarContext = createContext({});
export const AutenticarProvider = ({children, ...props}) => {
  const [listaDeMaquininhas, setListaDeMaquininhas] = useState([]);
  const [maquininhaSelecionada, setMaquininhaSelecionada] = useState(null);
  const [msg, setMsg] = useState('Procurando bluetooth');
  const [ic, setIc] = useState('');
  const [icCor, setIcColor] = useState('10');
  const [loading, setLoading] = useState(true);
  return (
    <AutenticarContext.Provider
      value={{
        ...props,
        listaDeMaquininhas,
        setListaDeMaquininhas,
        maquininhaSelecionada,
        setMaquininhaSelecionada,
        msg,
        setMsg,
        ic,
        setIc,
        icCor,
        setIcColor,
        loading,
        setLoading,
      }}>
      {children}
    </AutenticarContext.Provider>
  );
};

export default AutenticarContext;
