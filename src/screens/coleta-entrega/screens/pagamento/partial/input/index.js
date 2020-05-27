import React, {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import styl from './styl';
import {moeda} from '@sd/uteis/form/MaskString';
function ItensPagos({setReceber, totalRestante}) {
  const [value, setValue] = useState(moeda(totalRestante));
  function checkValue() {
    const valor = Number(
      `${value}`.replace(/[R|$|\s|\.]/gi, '').replace(',', '.'),
    );
    if (valor === '' || valor === 0 || isNaN(valor)) {
      setValue('');
    } else if (valor > Number(totalRestante)) {
      setValue(moeda(totalRestante));
    }
  }
  useEffect(() => {
    if (value && value.length > 0) {
      const parsedAmountInput =
        parseFloat(value.replace(/[R|$|\s]/gi, '').replace(/,+/g, '.')) * 100;
      if (!isNaN(parsedAmountInput)) {
        setReceber(parsedAmountInput);
      }
    } else {
      setReceber(0);
    }
  }, [setReceber, value]);
  function formatMoney(text) {
    const valor = moeda(text);
    setValue(valor);
  }
  return (
    <View style={styl.container}>
      <Text style={styl.titulo}>quero pagar</Text>
      <View style={styl.warpInput}>
        <TextInput
          placeHouder="Valor"
          value={value}
          keyboardType="numeric"
          onChangeText={formatMoney}
          onBlur={checkValue}
          style={styl.inputText}
        />
      </View>
      <Text style={styl.detalhe}>
        Este valor pode ser pago com até{'\n'}5 cartões de crédito ou débito
        diferentes
      </Text>
    </View>
  );
}
export default ItensPagos;
