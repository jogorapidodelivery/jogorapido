import React, {memo, Fragment} from 'react';
import styl from './styl';
import Button from '@sd/components/button';
import {View as AnimatableView} from 'react-native-animatable';
import Shimmer from 'react-native-shimmer-placeholder';
import {cor as corApp} from '@root/app.json';
import {submit} from '../../actions/actionDisponibilidade';
import FooterLegenda from './legenda';
function Footer({data}) {
  const loaded = data.semana[1].sigla !== '';
  const _submit = () => {
    submit(data);
  };
  return (
    <Fragment>
      <FooterLegenda />
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
