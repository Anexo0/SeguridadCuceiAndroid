import React, {useEffect, useReducer, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import colors from '../const/colors';
import {getUserDefault, setUserDefault} from '../const/functions';
import {normFS} from '../const/normalize_font';

const screen = Dimensions.get('window');

function Agresor2_screen({navigation: {navigate, goBack}}) {
  const [sparticular, setSParticular] = useState('');
  const [apariencia, setApariencia] = useState('');
  const [boca, setBoca] = useState('');
  const [tez, setTez] = useState('');
  const [cabellot, setCabelloT] = useState('');
  const [cabelloc, setCabelloC] = useState('');
  const [ojost, setOjosT] = useState('');
  const [ojosc, setOjosC] = useState('');
  const [sig, enableSig] = useState(true);

  const ref_apariencia = useRef();
  const ref_boca = useRef();
  const ref_tez = useRef();
  const ref_cabellot = useRef();
  const ref_cabelloc = useRef();
  const ref_ojost = useRef();
  const ref_ojosc = useRef();

  const sigPressed = async () => {
    var userDefault = await getUserDefault();
    userDefault.DatosAgresor2.Particulares = sparticular;
    userDefault.DatosAgresor2.Apariencia = apariencia;
    userDefault.DatosAgresor2.Boca = boca;
    userDefault.DatosAgresor2.Tez = tez;
    userDefault.DatosAgresor2.CabelloT = cabellot;
    userDefault.DatosAgresor2.CabelloC = cabelloc;
    userDefault.DatosAgresor2.OjosT = ojost;
    userDefault.DatosAgresor2.OjosC = ojosc;
    setUserDefault(userDefault).then(navigate('agresor3'));
  };

  useEffect(() => {
    getUserDefault().then(uD => {
      setSParticular(uD.DatosAgresor2.Particulares);
      setApariencia(uD.DatosAgresor2.Apariencia);
      setBoca(uD.DatosAgresor2.Boca);
      setTez(uD.DatosAgresor2.Tez);
      setCabelloT(uD.DatosAgresor2.CabelloT);
      setCabelloC(uD.DatosAgresor2.CabelloC);
      setOjosT(uD.DatosAgresor2.OjosT);
      setOjosC(uD.DatosAgresor2.OjosC);
      enableSig(false);
    });
  }, []);

  return (
    <View style={styles.container_}>
      <ScrollView style={styles.container_scr}>
        <Text style={styles.tx_title}>Media Filiacion Del Agresor</Text>

        <Text style={[styles.tx_b, {marginTop: screen.height / 50}]}>
          Señas Particulares
        </Text>

        <TextInput
          style={styles.mfa_txin_des}
          multiline
          placeholder={'Lunar en el rostro...'}
          placeholderTextColor={colors.main_txln_ph}
          numberOfLines={4}
          value={sparticular}
          onChangeText={text => {
            setSParticular(text.replace('\n', ''));
          }}
          onSubmitEditing={() => ref_apariencia.current.focus()}
          blurOnSubmit={false}></TextInput>

        <Text style={styles.tx_b}>Apariencia</Text>

        <TextInput
          style={styles.mfa_txin_des}
          ref={ref_apariencia}
          multiline
          placeholder={'Robusto, alto...'}
          placeholderTextColor={colors.main_txln_ph}
          numberOfLines={4}
          value={apariencia}
          onChangeText={text => setApariencia(text.replace('\n', ''))}
          onSubmitEditing={() => ref_boca.current.focus()}
          blurOnSubmit={false}
          returnKeyType="next"></TextInput>

        <View style={styles.container_row}>
          <Text style={styles.tx}>Boca</Text>

          <TextInput
            style={styles.txin}
            ref={ref_boca}
            value={boca}
            placeholder={'Alargada, Pequeña...'}
            placeholderTextColor={colors.main_txln_ph}
            onChangeText={text => setBoca(text)}
            onSubmitEditing={() => ref_tez.current.focus()}
            blurOnSubmit={false}></TextInput>
        </View>

        <View style={styles.container_row}>
          <Text style={styles.tx}>Tez</Text>

          <TextInput
            style={styles.txin}
            ref={ref_tez}
            value={tez}
            placeholder={'Moreno, Blanco...'}
            placeholderTextColor={colors.main_txln_ph}
            onChangeText={text => setTez(text)}
            onSubmitEditing={() => ref_cabellot.current.focus()}
            blurOnSubmit={false}></TextInput>
        </View>

        <View style={styles.container_row}>
          <Text style={styles.tx_3}></Text>
          <Text style={styles.tx_3}>Tipo</Text>
          <Text style={styles.tx_3}>Color</Text>
        </View>

        <View style={styles.container_row}>
          <Text style={styles.tx}>Cabello</Text>

          <TextInput
            style={styles.txin_2}
            ref={ref_cabellot}
            value={cabellot}
            placeholder={'Lacio...'}
            placeholderTextColor={colors.main_txln_ph}
            onChangeText={text => setCabelloT(text)}
            onSubmitEditing={() => ref_cabelloc.current.focus()}
            blurOnSubmit={false}></TextInput>

          <TextInput
            style={styles.txin_2}
            ref={ref_cabelloc}
            value={cabelloc}
            placeholder={'Negro...'}
            placeholderTextColor={colors.main_txln_ph}
            onChangeText={text => setCabelloC(text)}
            onSubmitEditing={() => ref_ojost.current.focus()}
            blurOnSubmit={false}></TextInput>
        </View>

        <View style={styles.container_row}>
          <Text style={styles.tx}>Ojos</Text>

          <TextInput
            style={styles.txin_2}
            ref={ref_ojost}
            value={ojost}
            placeholder={'Grandes...'}
            placeholderTextColor={colors.main_txln_ph}
            onChangeText={text => setOjosT(text)}
            onSubmitEditing={() => ref_ojosc.current.focus()}
            blurOnSubmit={false}></TextInput>

          <TextInput
            style={styles.txin_2}
            ref={ref_ojosc}
            value={ojosc}
            placeholder={'Verdes...'}
            placeholderTextColor={colors.main_txln_ph}
            onChangeText={text => setOjosC(text)}></TextInput>
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
    marginHorizontal: screen.width / 10,
    justifyContent: 'space-evenly',
  },
  container_row_near: {
    flexDirection: 'row',
    marginHorizontal: screen.width / 10,
  },
  //#endregion

  //#region Media Filiacion Del Agresor Styles
  mfa_txin_des: {
    height: screen.height / 6.5,
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
  tx: {
    width: screen.width / 4.2,
    height: screen.height / 20,
    color: colors.black,
    paddingLeft: screen.width / 30,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  tx_3: {
    width: screen.width / 3,
    height: screen.height / 20,
    color: colors.black,
    marginBottom: -screen.height / 50,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(18),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  tx_b: {
    height: screen.height / 20,
    color: colors.black,
    paddingLeft: screen.width / 30,
    marginTop: -10,
    marginHorizontal: screen.width / 10,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  txin: {
    width: screen.width / 1.8,
    height: screen.height / 20,
    color: colors.black,
    backgroundColor: colors.white,
    paddingLeft: 10,
    borderRadius: 10,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(15),
  },
  txin_2: {
    width: screen.width / 4,
    height: screen.height / 20,
    color: colors.black,
    backgroundColor: colors.white,
    marginLeft: screen.width / 30,
    paddingLeft: 10,
    borderRadius: 10,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(15),
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
  //#endregion
});

export default Agresor2_screen;
