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
import {TextInput} from 'react-native-gesture-handler';
import assets from '../const/assets';
import colors from '../const/colors';
import { getUserDefault, setUserDefault } from '../const/functions';
import {normFS} from '../const/normalize_font';

const screen = Dimensions.get('window');

function DatosFinales1_screen({navigation: {navigate, goBack}}) {
  const [carro, carroPressed] = useState(false);
  const [moto, motoPressed] = useState(false);
  const [apie, apiePressed] = useState(false);
  const [bicicleta, bicicletaPressed] = useState(false);
  const [medio, setMedio] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [sig, enableSig] = useState(true);

  const btns = {
    Automovil: carroPressed,
    Motocicleta: motoPressed,
    A_Pie: apiePressed,
    Bicicleta: bicicletaPressed,
  };

  const checkBtns = (exept, value) => {
    var selected = false;
    for (let a in btns) {
      if (btns[a] !== exept) {
        btns[a](false);
      } else {
        setMedio(a.toString().replace('_', ' '));
        selected = !value;
      }
    }
    if (!selected) setMedio('');
  };

  const sigPressed = async () => {
    var userDefault = await getUserDefault()
    userDefault.Medio = medio
    userDefault.Observaciones1 = observaciones
    setUserDefault(userDefault).then(navigate('datosfinales2'))
  }

  useEffect(() => {
    getUserDefault().then(uD => {
      setMedio(uD.Medio)
      if (uD.Medio) btns[String(uD.Medio).replace(' ', '_')](true)
      setObservaciones(uD.Observaciones1)
      enableSig(false)
    })
  }, [])

  return (
    <View style={styles.container_}>
      <ScrollView style={styles.container_scr}>
        <Text style={styles.tx_title}>Datos Del Incidente</Text>

        <Text style={styles.tx_b}>Metodo Utilizado Para Huir</Text>
        <TextInput
          style={styles.txin_b}
          placeholderTextColor={colors.main_txln_ph}
          placeholder={'No Seleccionado'}
          value={medio}></TextInput>

        <View style={styles.container_row}>
          <TouchableOpacity
            style={carro ? styles.tchop_pressed : styles.tchop}
            activeOpacity={1}
            onPress={e => {
              carroPressed(!carro);
              checkBtns(carroPressed, carro);
            }}>
            <Image style={styles.tchop_im} source={assets.images.carro}></Image>
            <Text style={styles.tchop_tx}>Automovil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={moto ? styles.tchop_pressed : styles.tchop}
            activeOpacity={1}
            onPress={e => {
              motoPressed(!moto);
              checkBtns(motoPressed, moto);
            }}>
            <Image style={styles.tchop_im} source={assets.images.moto}></Image>
            <Text style={styles.tchop_tx}>Motocicleta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container_row}>
          <TouchableOpacity
            style={apie ? styles.tchop_pressed : styles.tchop}
            activeOpacity={1}
            onPress={e => {
              apiePressed(!apie);
              checkBtns(apiePressed, apie);
            }}>
            <Image style={styles.tchop_im} source={assets.images.a_pie}></Image>
            <Text style={styles.tchop_tx}>A Pie</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={bicicleta ? styles.tchop_pressed : styles.tchop}
            activeOpacity={1}
            onPress={e => {
              bicicletaPressed(!bicicleta);
              checkBtns(bicicletaPressed, bicicleta);
            }}>
            <Image
              style={styles.tchop_im}
              source={assets.images.bicicleta}></Image>
            <Text style={styles.tchop_tx}>Bicicleta</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.tx_b}>Observaciones</Text>

        <TextInput
          style={styles.di_txin_ob}
          multiline
          numberOfLines={10}
          value={observaciones}
          onChangeText={text => setObservaciones(text)}></TextInput>
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

  //#region Datos Del Incidente Styles
  di_txin_ob: {
    height: screen.height / 3,
    color: colors.black,
    textAlignVertical: 'top',
    backgroundColor: colors.white,
    marginHorizontal: screen.width / 10,
    marginTop: screen.height / 50,
    marginBottom: screen.height / 50,
    paddingHorizontal: screen.width / 20,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(18),
    borderRadius: 20,
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
    fontSize: normFS(screen.width / 17),
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
    fontSize: normFS(screen.width / 17),
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
    marginTop: 10,
    marginHorizontal: screen.width / 10,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  txin_b: {
    width: screen.width / 2,
    height: screen.height / 20,
    color: colors.black,
    backgroundColor: colors.white,
    marginHorizontal: screen.width / 10,
    marginBottom: screen.height / 50,
    paddingLeft: 10,
    alignSelf: 'center',
    textAlign: 'center',
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
    fontSize: normFS(20),
  },
  //#endregion
});

export default DatosFinales1_screen;
