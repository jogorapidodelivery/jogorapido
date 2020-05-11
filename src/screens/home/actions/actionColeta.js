import {actionAutenticar} from '@actions/';
import {dispatchNotifierOnResultGeofenceHttp} from '@libs/geofence';
export const actionColeta = async ({navigate, onComplete}) => {
  try {
    const {response} = await actionAutenticar();
    if (response.coleta.length > 0) {
      const {
        coleta: [{status_coleta_id}],
      } = response;
      if (status_coleta_id !== 1) {
        navigate('coletar');
      } else {
        dispatchNotifierOnResultGeofenceHttp(response);
      }
    }
  } catch (e) {}
  if (onComplete) {
    onComplete();
  }
};
