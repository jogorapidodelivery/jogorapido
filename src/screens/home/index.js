import React, {useEffect, useState} from 'react';
import {AppState} from 'react-native';
import HeaderLogo from '@screens/partial/header-logo';
import BaseScreen from '@screens/partial/base';
import {useSelector} from 'react-redux';
import {selectProps} from './commands/mapColeta';
import {actionColeta} from './actions/actionColeta';
import ColetaPendente from './partial/coleta-pendente';
import MinhaEscala from './partial/minha-escala';
import MeusRendimentos from './partial/meus-rendimentos';
import {triggerDestroyTimerProgress} from '@libs/dispatchNotify';
import {dispatchNotifierOnResultGeofenceHttp} from '@libs/geofence';
import RingerMode from 'react-native-ringer-mode';
import {withNavigationFocus} from 'react-navigation';
import NaoPerturbe from './partial/nao-perturbe';
const Home = ({isFocused, navigation}) => {
  const {navigate} = navigation;
  let {
    total,
    usuario_id,
    entregador_id,
    total_frete_semana,
    corridas_semana,
    disponibilidade,
    coleta_ids,
    tituloColetas,
    coletaPendente,
    coleta,
  } = useSelector(selectProps);
  const [hasRingerMode, setHasRingerMode] = useState(false);
  // useState
  const updateLogin = async (onComplete = null) => {
    const mode = await RingerMode.getRingerMode();
    await actionColeta({navigate});
    setHasRingerMode(mode !== 'NORMAL');
    if (onComplete) {
      onComplete();
    }
  };
  useEffect(() => {
    const _effRinger = async () => {
      const mode = await RingerMode.getRingerMode();
      setHasRingerMode(mode !== 'NORMAL');
    };
    _effRinger();
  }, [hasRingerMode, coleta_ids, isFocused]);
  useEffect(() => {
    if (total > 0) {
      dispatchNotifierOnResultGeofenceHttp({coleta});
    }
    let ativarBg = false;
    const handlerMinimized = async status => {
      triggerDestroyTimerProgress();
      const mode = await RingerMode.getRingerMode();
      setHasRingerMode(mode !== 'NORMAL');
      if (ativarBg && status === 'active') {
        updateLogin();
      }
      ativarBg = true;
    };
    AppState.addEventListener('change', handlerMinimized);
    return () => {
      AppState.removeEventListener('change', handlerMinimized);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <BaseScreen
      onRefresh={updateLogin}
      header={<HeaderLogo navigation={navigation} />}
      headerHeight={HeaderLogo.heightContainer}>
      {hasRingerMode && <NaoPerturbe />}
      {total >= 1 && (
        <ColetaPendente
          coleta={coletaPendente}
          entregador_id={entregador_id}
          tituloColetas={tituloColetas}
          coleta_ids={coleta_ids}
          navigation={navigation}
        />
      )}
      {total === 0 && (
        <MinhaEscala
          navigation={navigation}
          usuario_id={usuario_id}
          disponibilidade={disponibilidade}
        />
      )}
      {total === 0 && (
        <MeusRendimentos
          usuario_id={usuario_id}
          corridas_semana={corridas_semana}
          total_frete_semana={total_frete_semana}
          navigation={navigation}
          disponibilidade={disponibilidade}
        />
      )}
    </BaseScreen>
  );
};
export default withNavigationFocus(Home);
