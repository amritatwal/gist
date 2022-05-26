import * as React from 'react';
import { Button } from 'react-native-paper';

const FormButton: React.FC<{text:string}> = ({text}) => (
  <Button mode="contained">
    {text}
  </Button>
);

export default FormButton;