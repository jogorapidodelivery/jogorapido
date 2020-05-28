import React, {createContext, useState} from 'react';

const AutenticarContext = createContext({});

export const AutenticarProvider = ({children, ...props}) => {
  // {children, ...props}
  // {"coleta_id": 568, "tipoPagamentoLabel": "Crédito", "tipoPagamentoValue": "CreditCard", popToTop:}
  const [listaDeMaquininhas] = useState([]);
  const [carregandoMaquininhas] = useState(false);
  return (
    <AutenticarContext.Provider
      value={{listaDeMaquininhas, carregandoMaquininhas, ...props}}>
      {children}
    </AutenticarContext.Provider>
  );
};

export default AutenticarContext;
