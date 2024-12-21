import React, {useEffect, useRef, useState} from 'react';
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
} from 'react-native';
import colors from '../const/colors';
import {normFS} from '../const/normalize_font';
import {Dropdown} from 'react-native-element-dropdown';
import { getUserDefault, range, setUserDefault } from '../const/functions';

const screen = Dimensions.get('window');

function Agresor1_screen({navigation: {navigate, goBack}}) {
  const [cantidadag, setCantidadAg] = useState(0);
  const [estaturaapx, setEstaturaAprx] = useState(0);
  const [edadaprx, setEdadAprx] = useState(0);
  const [descripcion, setDescripcion] = useState('');
  const [sig, enableSig] = useState(true);

  const dataRange = [{label: '-', value: null}];
  const Range = Array.from(range(1, 99, 1), (_, i) => _).forEach(element => {
    dataRange.push({label: element.toString(), value: element});
  });

  const dataEst = [{label: '-', value: null}];
  const Est = Array.from(range(150, 250, 1), (_, i) =>
    _,
  ).forEach(element => {
    dataEst.push({label: element.toString(), value: element});
  });

  const sigPressed = async () => {
    var userDefault = await getUserDefault()
    userDefault.DatosAgresor1.CantAgresores = cantidadag
    userDefault.DatosAgresor1.Estatura = estaturaapx
    userDefault.DatosAgresor1.EdadAprox = String(edadaprx)
    userDefault.DatosAgresor1.Suceso2 = descripcion
    await setUserDefault(userDefault)
    navigate('agresor2');
  };

  useEffect(() => {
    getUserDefault().then(uD => {
      setCantidadAg(uD.DatosAgresor1.CantAgresores)
      setEstaturaAprx(uD.DatosAgresor1.Estatura)
      setEdadAprx(Number(uD.DatosAgresor1.EdadAprox))
      setDescripcion(uD.DatosAgresor1.Suceso2)
      enableSig(false)
    })
  }, [])

  return (
    <View style={styles.container_}>
      <ScrollView style={styles.container_scr}>
        <Text style={styles.tx_title}>Media Filiacion Del Agresor</Text>

        <View
          style={[styles.container_row, {marginHorizontal: screen.width / 10}]}>
          <Text style={styles.tx_3}>Cantidad De Agresores</Text>

          <Text style={styles.tx_3}>{'Estatura\nAprox.'}</Text>

          <Text style={styles.tx_3}>{'Edad\nAprox.'}</Text>
        </View>

        <View
          style={[
            styles.container_row,
            {
              marginBottom: screen.height / 10,
              marginHorizontal: screen.width / 10,
            },
          ]}>
          <Dropdown
            style={styles.drdw_3}
            selectedTextStyle={styles.drdw_tx}
            itemTextStyle={styles.drdw_tx}
            labelField="label"
            valueField="value"
            data={dataRange}
            value={cantidadag}
            onChange={item => setCantidadAg(item.value)}></Dropdown>

          <Dropdown
            style={styles.drdw_3}
            selectedTextStyle={styles.drdw_tx}
            itemTextStyle={styles.drdw_tx}
            labelField="label"
            valueField="value"
            data={dataEst}
            value={estaturaapx}
            onChange={item => setEstaturaAprx(item.value)}></Dropdown>

          <Dropdown
            style={styles.drdw_3}
            selectedTextStyle={styles.drdw_tx}
            itemTextStyle={styles.drdw_tx}
            labelField="label"
            valueField="value"
            data={dataRange}
            value={edadaprx}
            onChange={item => setEdadAprx(item.value)}></Dropdown>
        </View>

        <Text style={styles.tx_b}>Descripcion Del Suceso</Text>

        <TextInput
          style={styles.mfa_txin_des}
          multiline
          numberOfLines={10}
          value={descripcion}
          onChangeText={text => setDescripcion(text)}></TextInput>
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

  //#region Media Filiacion Del Agresor Styles
  mfa_txin_des: {
    height: screen.height / 3,
    color: colors.black,
    textAlignVertical: 'top',
    backgroundColor: colors.white,
    marginHorizontal: screen.width / 10,
    marginTop: screen.height / 50,
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
    paddingLeft: screen.width / 30,
    marginTop: -50,
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
  tx_3: {
    width: screen.width / 4,
    height: screen.height / 15,
    color: colors.black,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(17),
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  drdw_3: {
    width: screen.width / 5,
    height: screen.height / 20,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  //#endregion
});

export default Agresor1_screen;
