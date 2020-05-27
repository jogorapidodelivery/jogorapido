import React, {memo, Fragment} from 'react';
import styl from './styl';
import {Text} from 'react-native';
import Button from '@sd/components/button';
import {stylDefault} from '@src/stylDefault';
import {
  View as AnimatableView,
  Text as AnimatableText,
} from 'react-native-animatable';
import Shimmer from 'react-native-shimmer-placeholder';
import {cor as corApp} from '@root/app.json';
import {submit} from '../../actions/actionDisponibilidade';
function Footer({data}) {
  const loaded = data.semana[0].sigla !== '';
  const _submit = () => {
    submit(data);
  };
  return (
    <Fragment>
      <AnimatableText
        animation="fadeIn"
        useNativeDriver={true}
        delay={150}
        style={[stylDefault.p, styl.info]}>
        Após marcar sua disponibilidade,{'\n'}as alterações só ocorrerão após
        <Text style={stylDefault.bold}>{'\n'}24 horas.</Text>
      </AnimatableText>
      <AnimatableView animation="flipInX" useNativeDriver={true} delay={250}>
        <Shimmer
          colorShimmer={corApp['27']}
          width={400}
          style={styl.warpBtn}
          autoRun={true}
          visible={loaded}>
          <Button
            text={{
              value: 'Salvar',
              color: '07',
            }}
            rightIcon={{
              value: '',
              color: '07',
            }}
            onPress={_submit}
            bg="14"
          />
        </Shimmer>
      </AnimatableView>
    </Fragment>
  );
}
export default memo(Footer);
