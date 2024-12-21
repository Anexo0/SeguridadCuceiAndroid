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
  Alert,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Spinner from 'react-native-loading-spinner-overlay';
import UserDefault from '../class/userdefault';
import assets from '../const/assets';
import colors from '../const/colors';
import {
  fetchWithTimeout,
  getUserDefault,
  setUserDefault,
  uDtoJson,
} from '../const/functions';
import {normFS} from '../const/normalize_font';

const screen = Dimensions.get('window');

function DatosFinales2_screen({navigation: {navigate, goBack}}) {
  const [numagdet, setNumagdet] = useState(0);
  const [observaciones, setObservaciones] = useState('');
  const [spinner, enableSpinner] = useState(false);
  const [sig, enableSig] = useState(true);

  const dataNumag = [];
  const Numag = Array.from({length: 100}, (_, i) => i).forEach(element => {
    dataNumag.push({label: element.toString(), value: element});
  });

  const enviarPressed = async () => {
    var userDefault = await getUserDefault();
    userDefault.NumeroDetenidos = numagdet;
    userDefault.Observaciones2 = observaciones;
    enableSpinner(true);
    try {
      const param = uDtoJson(userDefault);
      const response = await fetchWithTimeout(assets.datos.url_Insert, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: param,
      });
      const responseString = await response.text();
      if (responseString)
      {
        Alert.alert('Enviado', 'Reporte Enviado', [
          {text: 'OK', onPress: () => {
            var newUserDefault = new UserDefault()
            newUserDefault.Configuracion = userDefault.Configuracion
            newUserDefault.Aviso = userDefault.Aviso
            newUserDefault.FullName = userDefault.FullName
            setUserDefault(newUserDefault).then(navigate('login'))}},
        ]);
      }
      else {
        Alert.alert('Error', 'Reporte No Fue Enviado, Error En Conexion', [
          {text: 'OK'},
        ]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => enableSpinner(false), 1000);
      setUserDefault(userDefault);
    }
  };

  useEffect(() => {
    getUserDefault().then(uD => {
      setNumagdet(uD.NumeroDetenidos);
      setObservaciones(uD.Observaciones2);
      enableSig(false)
    });
  }, []);

  return (
    <View style={styles.container_}>
      <Spinner
        visible={spinner}
        textContent={'Procesando...'}
        textStyle={styles.spn_tx}></Spinner>

      <ScrollView style={styles.container_scr}>
        <Text style={styles.tx_title}>Datos Del Incidente</Text>

        <Text style={styles.tx_b}>{'Numeros De Agresores\nDetenidos'}</Text>

        <Dropdown
          style={styles.drdw}
          selectedTextStyle={styles.drdw_tx}
          itemTextStyle={styles.drdw_tx}
          data={dataNumag}
          labelField="label"
          valueField="value"
          placeholder={null}
          value={numagdet}
          onChange={item => {
            setNumagdet(item.value);
          }}></Dropdown>
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

        <TouchableOpacity style={styles.ftr_btn_sig}
        disabled={sig} onPress={enviarPressed}>
          <Text style={styles.ftr_btn_sig_tx}>Enviar</Text>
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

  //#region Datos Del Incidente Styles
  di_txin_ob: {
    height: screen.height / 3,
    color: colors.black,
    textAlignVertical: 'top',
    backgroundColor: colors.white,
    marginHorizontal: screen.width / 10,
    marginBottom: screen.height / 50,
    paddingHorizontal: screen.width / 20,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(18),
    borderRadius: 20,
  },
  //#endregion

  //#region General Styles
  drdw: {
    width: screen.width / 2,
    height: screen.height / 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignSelf: 'center',
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
    height: screen.height / 5,
    color: colors.black,
    paddingBottom: screen.height / 20,
    marginHorizontal: screen.width / 10,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'center',
    textAlignVertical: 'bottom',
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
  spn_tx: {
    color: colors.white,
    fontFamily: 'RobotoSlab-Bold',
    fontSize: normFS(20),
  },
  //#endregion
});

export default DatosFinales2_screen;
