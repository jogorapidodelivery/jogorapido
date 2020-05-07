import styled from 'styled-components/native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, cor} from '@root/app.json';
export const Container = styled.View`
  background-color: ${cor['07']};
  flex: 1;
  padding: ${normalize(spaces['02'])}px;
  justify-content: center;
  /* align-items: center; */
`;
export const ImageErro = styled.Image`
  align-self: center;
`;
