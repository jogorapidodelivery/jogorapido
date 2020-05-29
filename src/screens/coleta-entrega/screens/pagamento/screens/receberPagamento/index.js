import React, {useContext} from 'react'; // , useContext
import {ActivityIndicator} from 'react-native';
import Button from '@sd/components/button';
import {cor} from '@root/app.json';
import styl from './styl';
import ConexaoStatus from '../partial/conexaoStatus';
import AutenticarContext from '../../api';
import {useTransaction} from '../../api/hooks/useTransaction';
import AjaxLoad from '@screens/partial/ajaxload';
function ReceberPagamento() {
  const data = useContext(AutenticarContext);
  const {
    msg,
    ic,
    icCor,
    loading,
    reconect,
    setConectadoBluetooth,
    receberEmJogoRapido,
    erroHttpJogoRapido,
  } = useTransaction(data);
  const handlerReconect = () => {
    setConectadoBluetooth(false);
    data.pop();
  };
  return (
    <AjaxLoad hasErro={erroHttpJogoRapido} callBack={receberEmJogoRapido}>
      <ConexaoStatus msg={msg} ic={ic} icCor={icCor}>
        {loading && (
          <ActivityIndicator
            size="large"
            style={styl.loading}
            color={cor['08']}
          />
        )}
        {reconect && (
          <Button
            style={styl.btn}
            text={{
              value: 'Parear novamente',
              color: '07',
            }}
            rightIcon={{
              value: '',
              color: '07',
            }}
            bg="14"
            onPress={handlerReconect}
          />
        )}
      </ConexaoStatus>
    </AjaxLoad>
  );
}
export default ReceberPagamento;
