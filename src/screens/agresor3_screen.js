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
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import assets from '../const/assets';
import colors from '../const/colors';
import { getUserDefault, setUserDefault } from '../const/functions';
import {normFS} from '../const/normalize_font';

const screen = Dimensions.get('window');

function Agresor3_screen({navigation: {navigate, goBack}}) {
  const [alargada, alargadaPressed] = useState(false);
  const [rectangulo, rectanguloPressed] = useState(false);
  const [redonda, redondaPressed] = useState(false);
  const [cuadrada, cuadradaPressed] = useState(false);
  const [trianguloInvertido, trianguloInvertidoPressed] = useState(false);
  const [corazon, corazonPressed] = useState(false);
  const [diamante, diamantePressed] = useState(false);
  const [triangulo, trianguloPressed] = useState(false);
  const [ovalada, ovaladaPressed] = useState(false);
  const [sig, enableSig] = useState(true);

  const [cara , setCara] = useState('');

  const btns = {
    Alargada: alargadaPressed,
    Rectangulo: rectanguloPressed,
    Redonda: redondaPressed,

    Cuadrada: cuadradaPressed,
    Triangulo_Invertido: trianguloInvertidoPressed,
    Corazon: corazonPressed,

    Diamante: diamantePressed,
    Triangulo: trianguloPressed,
    Ovalada: ovaladaPressed,
  };

  const checkBtns = (exept, value) => {
    var selected = false
    for (let a in btns) {
      if (btns[a] !== exept) {
        btns[a](false);
      }
      else {
        setCara(a.toString().replace('_',' '))
        selected = !value
      }
    }
    if (!selected) setCara('')

  };

  const sigPressed = async() => {
    var userDefault = await getUserDefault()
    userDefault.Cara = cara 
    setUserDefault(userDefault).then(navigate('especificaciones'))
  }

  useEffect(() => {
    getUserDefault().then(uD => {
      setCara(uD.Cara)
      if (uD.Cara) btns[String(uD.Cara).replace(' ', '_')](true)
      enableSig(false)
    })
  }, [])

  return (
    <View style={styles.container_}>
      <ScrollView style={styles.container_scr}>
        <Text style={styles.tx_title}>Media Filiacion Del Agresor</Text>

        <View style={[styles.container_row, {marginTop: screen.height / 50}]}>
          <Text style={styles.tx_b}>Cara</Text>
          <TextInput style={styles.txin_b}
          placeholderTextColor={colors.main_txln_ph}
          placeholder={"No Seleccionada"}
          value={cara}></TextInput>
        </View>

        <View style={styles.container_row}>
          <TouchableOpacity
            style={alargada ? styles.tchop_pressed : styles.tchop}
            activeOpacity={1}
            onPress={e => {
              alargadaPressed(!alargada);
              checkBtns(alargadaPressed, alargada);
            }}>
            <Image
              style={styles.tchop_im}
              source={assets.images.alargada}></Image>
            <Text style={styles.tchop_tx}>Alargada</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={rectangulo ? styles.tchop_pressed : styles.tchop}
            activeOpacity={1}
            onPress={e => {
              rectanguloPressed(!rectangulo);
              checkBtns(rectanguloPressed, rectangulo);
            }}>
            <Image
              style={styles.tchop_im}
              source={assets.images.rectangulo}></Image>
            <Text style={styles.tchop_tx}>Rectangulo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={redonda ? styles.tchop_pressed : styles.tchop}
            activeOpacity={1}
            onPress={e => {
              redondaPressed(!redonda);
              checkBtns(redondaPressed, redonda);
            }}>
            <Image
              style={styles.tchop_im}
              source={assets.images.redonda}></Image>
            <Text style={styles.tchop_tx}>Redonda</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container_row}>
          <TouchableOpacity
            style={cuadrada ? styles.tchop_pressed : styles.tchop}
            activeOpacity={1}
            onPress={e => {
              cuadradaPressed(!cuadrada);
              checkBtns(cuadradaPressed, cuadrada);
            }}>
            <Image
              style={styles.tchop_im}
              source={assets.images.cuadrada}></Image>
            <Text style={styles.tchop_tx}>Cuadrada</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={trianguloInvertido ? styles.tchop_pressed : styles.tchop}
            activeOpacity={1}
            onPress={e => {
              trianguloInvertidoPressed(!trianguloInvertido);
              checkBtns(trianguloInvertidoPressed, triangulo);
            }}>
            <Image
              style={styles.tchop_im}
              source={assets.images.triangulo_invertido}></Image>
            <Text style={styles.tchop_tx}>Triangulo Invertido</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={corazon ? styles.tchop_pressed : styles.tchop}
            activeOpacity={1}
            onPress={e => {
              corazonPressed(!corazon);
              checkBtns(corazonPressed, corazon);
            }}>
            <Image
              style={styles.tchop_im}
              source={assets.images.corazon}></Image>
            <Text style={styles.tchop_tx}>Corazon</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container_row}>
          <TouchableOpacity
            style={diamante ? styles.tchop_pressed : styles.tchop}
            activeOpacity={1}
            onPress={e => {
              diamantePressed(!diamante);
              checkBtns(diamantePressed, diamante);
            }}>
            <Image
              style={styles.tchop_im}
              source={assets.images.diamante}></Image>
            <Text style={styles.tchop_tx}>Diamante</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={triangulo ? styles.tchop_pressed : styles.tchop}
            activeOpacity={1}
            onPress={e => {
              trianguloPressed(!triangulo);
              checkBtns(trianguloPressed, triangulo);
            }}>
            <Image
              style={styles.tchop_im}
              source={assets.images.triangulo}></Image>
            <Text style={styles.tchop_tx}>Triangulo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ovalada ? styles.tchop_pressed : styles.tchop}
            activeOpacity={1}
            onPress={e => {
              ovaladaPressed(!ovalada);
              checkBtns(ovaladaPressed, ovalada);
            }}>
            <Image
              style={styles.tchop_im}
              source={assets.images.ovalada}></Image>
            <Text style={styles.tchop_tx}>Ovalada</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.container_ftr}>
        <TouchableHighlight
          style={styles.ftr_btn}
          underlayColor={colors.login_btn_gray_und}
          onPress={() => goBack()}>
          <Text style={styles.ftr_btn_tx}>Anterior</Text>
        </TouchableHighlight>

        <TouchableOpacity
          style={styles.ftr_btn_sig}
          disabled={sig}
          onPress={sigPressed}>
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
    width: screen.width / 4,
    height: screen.height / 20,
    color: colors.black,
    paddingLeft: screen.height / 30,
    marginLeft: screen.width / 10,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  txin_b: {
    width: screen.width / 2,
    height: screen.height / 20,
    color: colors.black,
    backgroundColor: colors.white,
    marginBottom: screen.height / 50,
    marginRight: screen.width / 10,
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

export default Agresor3_screen;
