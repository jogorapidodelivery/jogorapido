import React, {Fragment, memo} from 'react';
import {FlatList} from 'react-native';
import styl from './styl';
import Header from '../../partial/header';
import ItemValorRecebido from './partial/itemValorRecebido';
import Footer from './partial/footer';
import HeaderList from './partial/header';
import Input from './partial/input';
import TotalPago from './partial/totalPago';
import CreditoOuDebito from './partial/creditoOuDebito';
import ModalNotificacao from './partial/modalNotificacao';
function Payment({
  pop,
  numeroDeCartoesNaTransacao,
  setReceber,
  setCreditoOuDebito,
  creditoOuDebito,
  onSubmitAmount,
  total_pedido,
  transactionStatus,
  transactionError,
}) {
  return (
    <Fragment>
      <Header titulo="Pagamento" goto={pop} />
      <ModalNotificacao erro={transactionError} info={transactionStatus} />
      <FlatList
        ListFooterComponentStyle={styl.footer}
        ListHeaderComponent={
          numeroDeCartoesNaTransacao.length > 0 && (
            <HeaderList titulo="Valor recebido" />
          )
        }
        ListFooterComponent={
          <Fragment>
            {numeroDeCartoesNaTransacao.length > 0 && <TotalPago />}
            <CreditoOuDebito {...{creditoOuDebito, setCreditoOuDebito}} />
            <Input totalRestante={total_pedido} setReceber={setReceber} />
            <Footer
              titulo="Receber pagamento"
              actived={creditoOuDebito !== null}
              onPress={onSubmitAmount}
            />
          </Fragment>
        }
        data={numeroDeCartoesNaTransacao}
        renderItem={({item, index}) => (
          <ItemValorRecebido index={index} {...item} />
        )}
        keyExtractor={item => item.id}
        style={styl.lista}
      />
    </Fragment>
  );
}
export default memo(Payment);
