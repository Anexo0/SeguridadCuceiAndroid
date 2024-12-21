import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import assets from '../const/assets';
import colors from '../const/colors';
import {normFS} from '../const/normalize_font';

const screen = Dimensions.get('window')

function Aviso_Sc_screen({navigation: {navigate}}) {
  const btnPressed = () => {
    navigate('login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_pdf}>
        <Pdf
          style={styles.pdf}
          source={assets.files.pdf_aviso}
          trustAllCerts={false}></Pdf>
      </View>

      <View style={styles.container_btn}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.2}
          onPress={() => btnPressed()}>
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
  container_btn: {
    width: '100%',
    height: '20%',
    justifyContent: 'flex-end',
  },
  pdf: {
    width: '100%',
    height: '100%',
  },
  btn: {
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.aviso_btn_bg,
    borderWidth: 5,
    borderColor: colors.aviso_btn_bdr,
  },
  btn_text: {
    color: colors.black,
    fontSize: normFS(30),
    fontFamily: 'RobotoSlab-SemiBold',
  },
});
export default Aviso_Sc_screen;
