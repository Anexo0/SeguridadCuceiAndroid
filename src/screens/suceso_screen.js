import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import colors from '../const/colors';
import {normFS} from '../const/normalize_font';
import assets from '../const/assets';
import {getUserDefault, setUserDefault} from '../const/functions';

const screen = Dimensions.get('window');

function Suceso_screen({navigation: {navigate, goBack}}) {
  const [descripcion, setDescripcion] = useState('');
  const [agresion, agresionPressed] = useState(false);
  const [secuestro, secuestroPressed] = useState(false);
  const [armafuego, armafuegoPressed] = useState(false);
  const [armablanca, armablancaPressed] = useState(false);
  const [extorsion, extrosionPressed] = useState(false);
  const [violacion, violacionPressed] = useState(false);
  const [acoso, acosoPressed] = useState(false);
  const [droga, drogaPressed] = useState(false);
  const [otro, otroPressed] = useState(false);
  const [otrosuceso, setOtroSuceso] = useState('');
  const [sig, enableSig] = useState(true);

  const sigPressed = async () => {
    if (!otro || (otro && otrosuceso)) {
      var userDefault = await getUserDefault();
      userDefault.DatosSuceso.suceso = descripcion;
      userDefault.DatosSuceso.Agresion = agresion ? '1' : '';
      userDefault.DatosSuceso.Secuestro = secuestro ? '1' : '';
      userDefault.DatosSuceso.RoboArma = armafuego ? '1' : '';
      userDefault.DatosSuceso.RoboArmaB = armablanca ? '1' : '';
      userDefault.DatosSuceso.Extorsion = extorsion ? '1' : '';
      userDefault.DatosSuceso.Violacion = violacion ? '1' : '';
      userDefault.DatosSuceso.Acosador = acoso ? '1' : '';
      userDefault.DatosSuceso.BajoDrogas = droga ? '1' : '';
      userDefault.DatosSuceso.Otro = otro ? otrosuceso : '';
      if (
        agresion ||
        secuestro ||
        armafuego ||
        armablanca ||
        extorsion ||
        violacion ||
        acoso ||
        droga ||
        otro
      )
        userDefault.Incidente = 1;
      else userDefault.Incidente = 0;
      await setUserDefault(userDefault);
      navigate('agresor1');
    } else {
      var alertString = String();
      if (!otrosuceso) alertString = alertString.concat("Ingresa Otro Suceso")
      Alert.alert('Llena Todos Los Campos', alertString, [
        {text: 'OK'},
      ]);
    }
  };

  useEffect(() => {
    getUserDefault().then(uD => {
      setDescripcion(uD.DatosSuceso.suceso);
      agresionPressed(uD.DatosSuceso.Agresion);
      secuestroPressed(uD.DatosSuceso.Secuestro);
      armafuegoPressed(uD.DatosSuceso.RoboArma);
      armablancaPressed(uD.DatosSuceso.RoboArmaB);
      extrosionPressed(uD.DatosSuceso.Extorsion);
      violacionPressed(uD.DatosSuceso.Violacion);
      acosoPressed(uD.DatosSuceso.Acosador);
      drogaPressed(uD.DatosSuceso.BajoDrogas);
      if (uD.DatosSuceso.Otro) otroPressed(true);
      else otroPressed(false);
      setOtroSuceso(uD.DatosSuceso.Otro);
      enableSig(false)
    });
  }, []);

  return (
    <View style={styles.container_}>
      <ScrollView style={styles.container_scr}>
        <View style={styles.container_ds}>
          <Text style={styles.ds_tx}>Descripcion Del Suceso</Text>
          <TextInput
            style={styles.ds_txin}
            value={descripcion}
            onChangeText={text => setDescripcion(text)}
            multiline={true}
            numberOfLines={6}></TextInput>

          <View style={styles.container_row}>
            <TouchableOpacity
              style={agresion ? styles.tchop_pressed : styles.tchop}
              activeOpacity={1}
              onPress={e => {
                agresionPressed(!agresion);
              }}>
              <Image
                style={styles.tchop_im}
                source={assets.images.agresion_fisica}></Image>
              <Text style={styles.tchop_tx}>Agresion</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={secuestro ? styles.tchop_pressed : styles.tchop}
              activeOpacity={1}
              onPress={e => {
                secuestroPressed(!secuestro);
              }}>
              <Image
                style={styles.tchop_im}
                source={assets.images.intento_de_secuestro}></Image>
              <Text style={styles.tchop_tx}>Intento De Secuestro</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={armafuego ? styles.tchop_pressed : styles.tchop}
              activeOpacity={1}
              onPress={e => {
                armafuegoPressed(!armafuego);
              }}>
              <Image
                style={styles.tchop_im}
                source={assets.images.arma_de_fuego}></Image>
              <Text style={styles.tchop_tx}>Robo Con Arma De Fuego</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container_row}>
            <TouchableOpacity
              style={armablanca ? styles.tchop_pressed : styles.tchop}
              activeOpacity={1}
              onPress={e => {
                armablancaPressed(!armablanca);
              }}>
              <Image
                style={styles.tchop_im}
                source={assets.images.arma_blanca}></Image>
              <Text style={styles.tchop_tx}>Robo Con Arma Blanca</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={extorsion ? styles.tchop_pressed : styles.tchop}
              activeOpacity={1}
              onPress={e => {
                extrosionPressed(!extorsion);
              }}>
              <Image
                style={styles.tchop_im}
                source={assets.images.extorsion}></Image>
              <Text style={styles.tchop_tx}>Extorsion</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={violacion ? styles.tchop_pressed : styles.tchop}
              activeOpacity={1}
              onPress={e => {
                violacionPressed(!violacion);
              }}>
              <Image
                style={styles.tchop_im}
                source={assets.images.intento_de_violacion}></Image>
              <Text style={styles.tchop_tx}>Intento De Violacion</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container_row}>
            <TouchableOpacity
              style={acoso ? styles.tchop_pressed : styles.tchop}
              activeOpacity={1}
              onPress={e => {
                acosoPressed(!acoso);
              }}>
              <Image
                style={styles.tchop_im}
                source={assets.images.acoso}></Image>
              <Text style={styles.tchop_tx}>Acosador</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={droga ? styles.tchop_pressed : styles.tchop}
              activeOpacity={1}
              onPress={e => {
                drogaPressed(!droga);
              }}>
              <Image
                style={styles.tchop_im}
                source={assets.images.cov_de_drogas}></Image>
              <Text style={styles.tchop_tx}>Bajo Efecto De Drogas</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={otro ? styles.tchop_pressed : styles.tchop}
              activeOpacity={1}
              onPress={e => {
                otroPressed(!otro);
              }}>
              <Image
                style={styles.tchop_im}
                source={assets.images.otros}></Image>
              <Text style={styles.tchop_tx}>Otra Incidencia</Text>
            </TouchableOpacity>
          </View>

          <Text style={otro ? styles.tx_b : [styles.tx_b , {opacity: 0.2}]}>Otro</Text>

          <TextInput
            style={otro ? styles.txin_b : [styles.txin_b, {opacity: 0.2}]}
            editable={otro}
            value={otrosuceso}
            onChangeText={text => setOtroSuceso(text)}
            placeholderTextColor={colors.light_gray}
            placeholder={'Otro Suceso Diferente A Las Anteriores'}></TextInput>
        </View>
      </ScrollView>

      <View style={styles.container_ftr}>
        <TouchableHighlight
          style={styles.ftr_btn}
          underlayColor={colors.login_btn_gray_und}
          onPress={() => goBack()}>
          <Text style={styles.ftr_btn_tx}>Anterior</Text>
        </TouchableHighlight>

        <TouchableOpacity style={styles.ftr_btn_sig}
        disabled={sig} onPress={sigPressed}>
          <Text style={styles.ftr_btn_sig_tx}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //#region General Containers
  container_: {
    flex: 2,
    justifyContent: 'space-evenly',
  },
  container_scr: {},
  container_row: {
    flexDirection: 'row',
    marginBottom: screen.height / 50,
    justifyContent: 'space-evenly',
  },
  container_row_near: {
    flexDirection: 'row',
  },
  //#endregion

  //#region Descripcion Del Suceso Style
  ds_tx: {
    height: screen.height / 20,
    color: colors.black,
    paddingLeft: 10,
    marginTop: screen.height / 20,
    marginHorizontal: screen.width / 10,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'left',
  },
  ds_txin: {
    height: screen.height / 4.7,
    color: colors.black,
    backgroundColor: colors.white,
    marginHorizontal: screen.width / 10,
    marginBottom: screen.height / 50,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(15),
    textAlignVertical: 'top',
  },
  //#endregion

  //#region Footer Styles
  container_ftr: {
    backgroundColor: colors.white,
    minHeight: screen.height / 13,
    height: screen.height / 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ftr_btn: {
    width: '30%',
    height: '60%',
    marginRight: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  ftr_btn_tx: {
    color: colors.blue_logo,
    fontSize: normFS(25),
    fontFamily: 'RobotoSlab-SemiBold',
  },
  ftr_btn_sig: {
    width: '30%',
    height: '60%',
    backgroundColor: colors.colorPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  ftr_btn_sig_tx: {
    color: colors.white,
    fontSize: normFS(25),
    fontFamily: 'RobotoSlab-Regular',
  },
  //#endregion

  //#region General Styles
  drdw_sh: {
    height: screen.height / 20,
    width: '19%',
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  drdw_tx: {
    color: colors.black,
    fontFamily: 'RobotoSlab-Bold',
    fontSize: normFS(20),
    textAlign: 'center',
  },
  drdw_ph: {
    color: colors.light_gray,
    fontFamily: 'RobotoSlab-Regular',
    paddingLeft: 10,
    fontSize: normFS(20),
  },
  tx_title: {
    height: screen.height / 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.colorPrimary,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    backgroundColor: colors.white,
  },
  tx_b: {
    height: screen.height / 20,
    color: colors.black,
    paddingLeft: 10,
    marginTop: -10,
    marginHorizontal: screen.width / 10,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  txin_b: {
    height: screen.height / 20,
    color: colors.black,
    backgroundColor: colors.white,
    marginHorizontal: screen.width / 10,
    marginBottom: screen.height / 50,
    paddingLeft: 10,
    borderRadius: 10,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(15),
  },
  tchop: {
    width: screen.width / 3.5,
    height: screen.height / 4.5,
    opacity: 0.25,
  },
  tchop_pressed: {
    width: screen.width / 3.5,
    height: screen.height / 4.5,
    opacity: 1,
  },
  tchop_im: {
    width: '100%',
    height: '65%',
    resizeMode: 'contain',
  },
  tchop_tx: {
    height: '50%',
    color: colors.black,
    textAlign: 'center',
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(15),
  },
  //#endregion
});

export default Suceso_screen;
