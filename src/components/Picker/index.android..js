import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {PickerView} from './styles';

const Picker = ({onChange}) => {
  return (
    <PickerView>
      <RNPickerSelect
        style={{
          inputAndroid: {
            //inputIOS: {
            height: 50,
            padding: 5,
            backgroundColor: '#FFF',
            fontSize: 16,
          },
        }}
        placeholder={{
          label: 'Selecionar tipo',
          color: '#222',
          value: null,
        }}
        onValueChange={tipo => onChange(tipo)}
        items={[
          {label: 'Receita', value: 'receita', color: '#222'},
          {label: 'Despesa', value: 'despesa', color: '#222'},
        ]}
      />
    </PickerView>
  );
};

export default Picker;
