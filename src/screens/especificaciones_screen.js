import React, {useEffect, useState} from 'react';
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
import {normFS} from '../const/normalize_font';
import Checkbox from 'react-native-modest-checkbox';
import assets from '../const/assets';
import { getUserDefault, setUserDefault } from '../const/functions';

const screen = Dimensions.get('window');
function Especificaciones_screen({navigation: {navigate, goBack}}) {
  const [trChecked, setTrChecked] = useState(false);
  const [tgChecked, setTgChecked] = useState(false);
  const [ciChecked, setCiChecked] = useState(false);
  const [taChecked, setTaChecked] = useState(false);
  const [prChecked, setPrChecked] = useState(false);

  const [tipoRopa, setTipoRopa] = useState('');
  const [tipoGorra, setTipoGorra] = useState('');
  const [cicatrices, setCicatrices] = useState('');
  const [tatuajes, setTatuajes] = useState('');
  const [piercings, setPiercings] = useState('');

  const [sig, enableSig] = useState(true);

  const sigPressed = async () => {
    var userDefault = await getUserDefault()
    userDefault.DatosEspecificaciones.TipoRopa = trChecked ? tipoRopa : ''
    userDefault.DatosEspecificaciones.Gorra = tgChecked ? tipoGorra : ''
    userDefault.DatosEspecificaciones.Cicatriz = ciChecked ? cicatrices : ''
    userDefault.DatosEspecificaciones.Tatuajes = taChecked ? tatuajes : ''
    userDefault.DatosEspecificaciones.Piercing = prChecked ? piercings : ''
    setUserDefault(userDefault).then(navigate('datosfinales1'))
  }

  useEffect(() => {
    getUserDefault().then(uD => {
      setTipoRopa(uD.DatosEspecificaciones.TipoRopa)
      setTrChecked(Boolean(uD.DatosEspecificaciones.TipoRopa))
      setTipoGorra(uD.DatosEspecificaciones.Gorra)
      setTgChecked(Boolean(uD.DatosEspecificaciones.Gorra))
      setCicatrices(uD.DatosEspecificaciones.Cicatriz)
      setCiChecked(Boolean(uD.DatosEspecificaciones.Cicatriz))
      setTatuajes(uD.DatosEspecificaciones.Tatuajes)
      setTaChecked(Boolean(uD.DatosEspecificaciones.Tatuajes))
      setPiercings(uD.DatosEspecificaciones.Piercing)
      setPrChecked(Boolean(uD.DatosEspecificaciones.Piercing))
      enableSig(false)
    })
  }, [])


  return (
    <View style={styles.container_}>
      <ScrollView style={styles.container_scr}>
        <Text style={styles.esp_title}>
          Contesta Solo Si Detectaste Alguna De Las Siguientes Especificaciones
        </Text>

        <Text style={styles.tx_b}>Tipo De Ropa</Text>

        <View style={styles.container_row_chbx}>
          <Checkbox
            checkboxStyle={styles.chbx}
            labelStyle={styles.chbx_tx}
            label={'Si'}
            checked={trChecked}
            checkedImage={assets.images.check}
            uncheckedImage={assets.images.uncheck}
            onChange={checked => {
              setTrChecked(true)
            }}></Checkbox>

          <Checkbox
            checkboxStyle={styles.chbx}
            labelStyle={styles.chbx_tx}
            label={'No'}
            checked={!trChecked}
            checkedImage={assets.images.check}
            uncheckedImage={assets.images.uncheck}
            onChange={checked => {
              setTrChecked(false);
            }}></Checkbox>

          <TextInput
            style={trChecked ? styles.txin_b : [styles.txin_b, {opacity: 0.2}]}
            editable={trChecked}
            value={tipoRopa}
            placeholderTextColor={colors.light_gray}
            placeholder={'Deportiva, Casual'}
            onChangeText={text => setTipoRopa(text)}></TextInput>
        </View>

        <Text style={styles.tx_b}>Tipo De Gorra</Text>

        <View style={styles.container_row_chbx}>
          <Checkbox
            checkboxStyle={styles.chbx}
            labelStyle={styles.chbx_tx}
            label={'Si'}
            checked={tgChecked}
            checkedImage={assets.images.check}
            uncheckedImage={assets.images.uncheck}
            onChange={checked => {
              setTgChecked(true);
            }}></Checkbox>

          <Checkbox
            checkboxStyle={styles.chbx}
            labelStyle={styles.chbx_tx}
            label={'No'}
            checked={!tgChecked}
            checkedImage={assets.images.check}
            uncheckedImage={assets.images.uncheck}
            onChange={checked => {
              setTgChecked(false);
            }}></Checkbox>

          <TextInput
            style={tgChecked ? styles.txin_b : [styles.txin_b, {opacity: 0.2}]}
            editable={tgChecked}
            value={tipoGorra}
            placeholderTextColor={colors.light_gray}
            placeholder={'Visera Plana'}
            onChangeText={text => setTipoGorra(text)}></TextInput>
        </View>

        <Text style={styles.tx_b}>Cicatrices</Text>

        <View style={styles.container_row_chbx}>
          <Checkbox
            checkboxStyle={styles.chbx}
            labelStyle={styles.chbx_tx}
            label={'Si'}
            checked={ciChecked}
            checkedImage={assets.images.check}
            uncheckedImage={assets.images.uncheck}
            onChange={checked => {
              setCiChecked(true);
            }}></Checkbox>

          <Checkbox
            checkboxStyle={styles.chbx}
            labelStyle={styles.chbx_tx}
            label={'No'}
            checked={!ciChecked}
            checkedImage={assets.images.check}
            uncheckedImage={assets.images.uncheck}
            onChange={checked => {
              setCiChecked(false);
            }}></Checkbox>

          <TextInput
            style={ciChecked ? styles.txin_b : [styles.txin_b, {opacity: 0.2}]}
            editable={ciChecked}
            value={cicatrices}
            placeholderTextColor={colors.light_gray}
            placeholder={'Cara, Brazo, Cuello'}
            onChangeText={text => setCicatrices(text)}></TextInput>
        </View>

        <Text style={styles.tx_b}>Tatuajes</Text>

        <View style={styles.container_row_chbx}>
          <Checkbox
            checkboxStyle={styles.chbx}
            labelStyle={styles.chbx_tx}
            label={'Si'}
            checked={taChecked}
            checkedImage={assets.images.check}
            uncheckedImage={assets.images.uncheck}
            onChange={checked => {
              setTaChecked(true);
            }}></Checkbox>

          <Checkbox
            checkboxStyle={styles.chbx}
            labelStyle={styles.chbx_tx}
            label={'No'}
            checked={!taChecked}
            checkedImage={assets.images.check}
            uncheckedImage={assets.images.uncheck}
            onChange={checked => {
              setTaChecked(false);
            }}></Checkbox>

          <TextInput
            style={taChecked ? styles.txin_b : [styles.txin_b, {opacity: 0.2}]}
            editable={taChecked}
            value={tatuajes}
            placeholderTextColor={colors.light_gray}
            placeholder={'Cara, Brazo, Cuello'}
            onChangeText={text => setTatuajes(text)}></TextInput>
        </View>

        <Text style={styles.tx_b}>Piercing</Text>

        <View style={styles.container_row_chbx}>
          <Checkbox
            checkboxStyle={styles.chbx}
            labelStyle={styles.chbx_tx}
            label={'Si'}
            checked={prChecked}
            checkedImage={assets.images.check}
            uncheckedImage={assets.images.uncheck}
            onChange={checked => {
              setPrChecked(true);
            }}></Checkbox>

          <Checkbox
            checkboxStyle={styles.chbx}
            labelStyle={styles.chbx_tx}
            label={'No'}
            checked={!prChecked}
            checkedImage={assets.images.check}
            uncheckedImage={assets.images.uncheck}
            onChange={checked => {
              setPrChecked(false);
            }}></Checkbox>

          <TextInput
            style={prChecked ? styles.txin_b : [styles.txin_b, {opacity: 0.2}]}
            editable={prChecked}
            value={piercings}
            placeholderTextColor={colors.light_gray}
            placeholder={'Cara, Brazo, Cuello'}
            onChangeText={text => setPiercings(text)}></TextInput>
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
  container_row_chbx: {
    flexDirection: 'row',
    marginLeft: screen.width / 10,
    marginBottom: screen.height / 30,
    justifyContent: 'flex-start',
  },
  //#endregion

  //#region Especificaciones Styles
  esp_title: {
    height: screen.height / 8,
    marginHorizontal: screen.width / 10,
    marginTop: screen.height / 20,
    color: colors.black,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(18),
    textAlign: 'center',
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
    marginHorizontal: screen.width / 10,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  txin_b: {
    height: screen.height / 20,
    width: screen.width / 2.5,
    color: colors.black,
    backgroundColor: colors.white,
    marginHorizontal: screen.width / 30,
    paddingLeft: 10,
    borderRadius: 10,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(15),
  },
  chbx: {
    width: screen.width / 15,
    height: screen.width / 15,
  },
  chbx_tx: {
    width: screen.width / 15,
    height: screen.width / 15,
    color: colors.black,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(18),
  },
  //#endregion
});

export default Especificaciones_screen;
