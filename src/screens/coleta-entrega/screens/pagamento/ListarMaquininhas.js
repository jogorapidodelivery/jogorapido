import React, {memo} from 'react'; // , useContext
import {} from 'react-native';
// import styl from './styl';
// import AutenticarContext from './api';
import BotaoParearMaquininha from './partial/botaoparearmaquininha';
import ConexaoStatus from './partial/conexaoStatus';
function ListarMaquininhas({navigation: {navigate}}) {
  // const props = useContext(AutenticarContext);
  const handlerParear = () => {
    console.log('ola');
  };
  const msg = 'Estes são os equipamentos\nque estão disponíveis para conectar';
  return (
    <ConexaoStatus msg={msg} ic="" icCor="22">
      <BotaoParearMaquininha
        chave="23:9I:Y6:9G"
        nome="PAX-9I76HG"
        onPress={handlerParear}
      />
    </ConexaoStatus>
  );
}
export default memo(ListarMaquininhas);
