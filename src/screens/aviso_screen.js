import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, Switch, TouchableOpacity, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import assets from '../const/assets';
import colors from '../const/colors';
import { getUserDefault, setUserDefault } from '../const/functions';
import {normFS} from '../const/normalize_font';

const screen = Dimensions.get('window');

function Aviso_screen({navigation: {navigate}}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const ref_sw = useRef();

  const btnPressed = async (value) => {
    if (value) 
    {
      var userDefault = await getUserDefault()
      userDefault.Aviso = true
      await setUserDefault(userDefault)
      navigate('login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_pdf}>
        <Pdf
          style={styles.pdf}
          source={assets.files.pdf_aviso}
          trustAllCerts={false}></Pdf>
      </View>

      <View style={styles.container_switch}>
        <Switch
          style={styles.switch}
          ref={ref_sw}
          trackColor={{false: colors.blue_logo, true: colors.colorPrimary}}
          thumbColor={isEnabled ? colors.colorAccent : colors.light_blue_logo}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}></Switch>
        <Text style={styles.switch_tx}>Aceptar Aviso De Confidencialidad</Text>
      </View>

      <View style={styles.container_btn}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.2}
          onPress={() => btnPressed(isEnabled)}>
          <Text style={styles.btn_text}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_pdf: {
    width: '100%',
    height: '80%',
  },
  container_switch: {
    flexDirection: 'row',
    width: '100%',
    height: '12%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_btn: {
    width: '100%',
    height: '8%',
  },
  pdf: {
    width: '100%',
    height: '100%',
  },
  switch: {
    transform: [{scaleX: 1.5}, {scaleY: 1.5}],
  },
  switch_tx: {
    paddingLeft: '3%',
    color: colors.black,
    fontSize: normFS(15),
    fontFamily: 'RobotoSlab-Regular',
  },
  btn: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.aviso_btn_bg,
    borderWidth: 5,
    borderColor: colors.aviso_btn_bdr,
  },
  btn_text: {
    color: colors.black,
    fontSize: normFS(25),
    fontFamily: 'RobotoSlab-SemiBold',
  },
});
export default Aviso_screen;
