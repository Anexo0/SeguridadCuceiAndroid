import React, { useEffect, useState } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import assets from '../const/assets';
import colors from '../const/colors';
import { getUserDefault } from '../const/functions';
import {normFS} from '../const/normalize_font';

const screen = Dimensions.get('window');

function Login_screen({navigation: {navigate}}) {
  const [nombre, setNombre] = useState(null)

  useEffect(() => {
    getUserDefault().then(uD => setNombre(uD.FullName))
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.container_logo}>
        <Image style={styles.logo} source={assets.images.login_logo}></Image>

        <Text style={styles.logo_tx}>BIENVENIDO</Text>
      </View>

      <View style={styles.container_tx}>
        <Text style={styles.tx_nombre}>{nombre}</Text>
      </View>

      <View style={styles.container_btn}>
        <TouchableHighlight
          style={styles.btn}
          underlayColor={colors.light_gray_tr}
          onPress={() => navigate('afectado')}>
          <Text style={styles.btn_tx}>Nuevo Reporte</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.btn}
          underlayColor={colors.light_gray_tr}
          onPress={() => navigate('afectado terceros')}>
          <Text style={styles.btn_tx}>Reporte De Terceros</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.btn_gray}
          underlayColor={colors.login_btn_gray_und}
          onPress={() => navigate('main')}>
          <Text style={styles.btn_gray_tx}>Cerrar Sesion</Text>
        </TouchableHighlight>

        <TouchableOpacity
          style={styles.btn_image}
          activeOpacity={0.3}
          onPress={() => navigate('configuracion')}>
          <Image
            style={styles.btn_image_image}
            source={assets.images.login_config}></Image>
        </TouchableOpacity>

        <TouchableHighlight
          style={styles.btn_gray}
          underlayColor={colors.login_btn_gray_und}
          onPress={() => navigate('aviso_sc')}>
          <Text style={styles.btn_gray_tx}>Aviso De Confidencialidad</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_logo: {
    height: '40%',
    alignItems: 'center',
    paddingTop: screen.height / 60,
    justifyContent: 'flex-end',
  },
  container_tx: {
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  logo: {
    width: '100%',
    height: '70%',
    resizeMode: 'contain',
  },
  logo_tx: {
    color: colors.blue_logo,
    fontSize: normFS(50),
    fontFamily: 'RobotoSlab-Bold',
  },
  tx_nombre: {
    color: colors.login_tx_nombre,
    marginHorizontal: screen.width / 20,
    fontSize: normFS(20),
    textAlign: 'center',
    fontFamily: 'RobotoSlab-Regular',
  },
  btn: {
    width: '60%',
    height: '15%',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.light_gray,
  },
  btn_tx: {
    color: colors.blue_logo,
    textAlign: 'center',
    fontSize: normFS(20),
    fontFamily: 'RobotoSlab-SemiBold',
  },
  btn_gray: {
    width: '50%',
    height: '10%',
    borderRadius: 20,
    justifyContent: 'center',
  },
  btn_gray_tx: {
    color: colors.login_btn_gray_tx,
    textAlign: 'center',
    fontSize: normFS(15),
    fontFamily: 'RobotoSlab-SemiBold',
  },
  btn_image: {
    width: '15%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_image_image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
});

export default Login_screen;
