import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import assets from '../const/assets';
import colors from '../const/colors';
import {getUserDefault, setUserDefault} from '../const/functions';
import {normFS} from '../const/normalize_font';

const screen = Dimensions.get('window');
const RECorreo = /[A-Z0-9._%+-]+@[A-Z0-9-].+.[A-Z]{2,4}/im;
const RETelCel = /\d{10}/;

function Configuracion_screen({navigation: {navigate}}) {
  const [telefono, setTelefono] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [uD, setUD] = useState({});
  const [telIsVal, setTelValid] = useState(true);
  const [celIsVal, setCelValid] = useState(true);
  const [corIsVal, setCorValid] = useState(true);

  const acPressed = () => {
    var newUserDefault = uD;
    newUserDefault.Configuracion = {
      Telefono: telefono,
      Celular: celular,
      Correo: correo,
    };
    const valTel = RETelCel.exec(telefono) == telefono;
    const valCel = RETelCel.exec(celular) == celular;
    const valCor = RECorreo.exec(correo) == correo;
    if (valTel && valCel && valCor) {
      setUserDefault(newUserDefault).then(() => navigate('login'));
    }
    setTelValid(valTel);
    setCelValid(valCel);
    setCorValid(valCor);
  };
  const validateTel = text => {
    const valTel = RETelCel.exec(text) == text;
    setTelValid(valTel);
    setTelefono(text);
  };
  const validateCel = text => {
    const valCel = RETelCel.exec(text) == text;
    setCelValid(valCel);
    setCelular(text);
  };
  const validateCor = text => {
    const valCor = RECorreo.exec(text) == text;
    setCorValid(valCor);
    setCorreo(text);
  };

  useEffect(() => {
    getUserDefault().then(uD => {
      setUD(uD);
      setCorreo(uD.Configuracion.Correo);
      setTelefono(uD.Configuracion.Telefono);
      setCelular(uD.Configuracion.Celular);
    });
  }, []);

  return (
    <ScrollView style={styles.container_scr}>
      <View style={styles.container_titl}>
        <Image
          style={styles.titl_icon}
          source={assets.images.login_config}></Image>
        <Text style={styles.titl_tx}>Configuracion</Text>
      </View>

      <View style={styles.container_tx}>
        <Text style={styles.tx}>Telefono De Casa</Text>
        <TextInput
          style={telIsVal ? styles.txln : styles.txln_wr}
          keyboardType={'number-pad'}
          placeholderTextColor={colors.light_gray_tr}
          placeholder={'Telefono'}
          value={telefono}
          onChangeText={text => {
            validateTel(text);
          }}></TextInput>

        <Text style={styles.tx}>Celular</Text>
        <TextInput
          style={celIsVal ? styles.txln : styles.txln_wr}
          keyboardType={'number-pad'}
          placeholderTextColor={colors.light_gray_tr}
          placeholder={'Celular'}
          value={celular}
          onChangeText={text => {
            validateCel(text);
          }}></TextInput>

        <Text style={styles.tx}>Correo Electronico</Text>
        <TextInput
          style={corIsVal ? styles.txln : styles.txln_wr}
          keyboardType={'email-address'}
          placeholderTextColor={colors.light_gray_tr}
          placeholder={'Correo'}
          value={correo}
          onChangeText={text => {
            validateCor(text);
          }}></TextInput>
      </View>

      <View style={styles.container_ac}>
        <TouchableHighlight
          style={styles.btn}
          onPress={() => acPressed()}
          underlayColor={colors.login_btn_gray_tx}>
          <Text style={styles.btn_tx}>Aceptar</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'space-evenly',
  },
  container_scr: {},
  container_titl: {
    height: screen.height / 3,
    flexDirection: 'row',
    alignItems: 'center',
    height: screen.height / 5,
  },
  container_tx: {
    height: screen.height / 2,
    justifyContent: 'space-evenly',
  },
  container_ac: {
    height: screen.height / 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titl_icon: {
    width: '30%',
    height: '30%',
    resizeMode: 'contain',
  },
  titl_tx: {
    color: colors.blue_logo,
    fontSize: normFS(35),
    fontFamily: 'RobotoSlab-Bold',
  },
  tx: {
    color: colors.blue_logo,
    paddingLeft: '10%',
    fontSize: normFS(30),
    fontFamily: 'RobotoSlab-SemiBold',
  },
  txln: {
    width: '60%',
    color: colors.gray,
    backgroundColor: colors.main_txln_bg,
    marginBottom: '10%',
    marginLeft: '10%',
    paddingLeft: screen.width / 30,
    fontSize: 'RobotoSlab-Regular',
    fontSize: normFS(18),
    borderRadius: 10,
  },
  txln_wr: {
    width: '60%',
    color: colors.red_error,
    backgroundColor: colors.red_error_bg,
    marginBottom: '10%',
    marginLeft: '10%',
    paddingLeft: screen.width / 30,
    fontSize: 'RobotoSlab-Bold',
    fontSize: normFS(18),
    borderColor: colors.red_error,
    borderWidth: 1,
    borderRadius: 10,
  },
  btn: {
    width: screen.width / 2,
    height: screen.height / 12,
    backgroundColor: colors.light_gray,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.aviso_btn_bdr,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_tx: {
    color: colors.blue_logo,
    fontSize: normFS(30),
    fontFamily: 'RobotoSlab-SemiBold',
  },
});

export default Configuracion_screen;
