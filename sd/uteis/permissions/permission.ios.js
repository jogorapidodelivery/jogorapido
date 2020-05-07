import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
async function checkPermission({permissionName, erroDescription}) {
  console.warn('solicitado aqui');
  try {
    const resultCheck = await check(permissionName);
    if (resultCheck !== RESULTS.GRANTED) {
      const resultRequest = await request(permissionName);
      if (resultRequest !== RESULTS.GRANTED) {
        return [erroDescription];
      }
    }
  } catch (_err1) {
    try {
      const catchResultRequest = await request(permissionName);
      if (catchResultRequest !== RESULTS.GRANTED) {
        return [erroDescription];
      }
    } catch (_err2) {
      console.warn(permissionName, _err2);
      return [erroDescription];
    }
  }
  return [];
}
export default async (_resolve, _reject, _currentLocation) => {
  let falhaEmPermissoes = [];
  falhaEmPermissoes = falhaEmPermissoes.concat(
    await checkPermission({
      permissionName: PERMISSIONS.IOS.LOCATION_ALWAYS,
      erroDescription: 'localização em background',
    }),
  );
  falhaEmPermissoes = falhaEmPermissoes.concat(
    await checkPermission({
      permissionName: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      erroDescription: 'localização durante o uso',
    }),
  );
  falhaEmPermissoes = falhaEmPermissoes.concat(
    await checkPermission({
      permissionName: PERMISSIONS.IOS.CAMERA,
      erroDescription: 'câmera',
    }),
  );
  falhaEmPermissoes = falhaEmPermissoes.concat(
    await checkPermission({
      permissionName: PERMISSIONS.IOS.PHOTO_LIBRARY,
      erroDescription: 'galeria de fotos',
    }),
  );
  if (false) {
    _reject(falhaEmPermissoes);
  }
  //   if (falhaEmPermissoes.length > 0) {
  //     _reject(falhaEmPermissoes);
  //   } else {
  //     _currentLocation();
  //     _resolve();
  // }
  _currentLocation();
  _resolve();
};
