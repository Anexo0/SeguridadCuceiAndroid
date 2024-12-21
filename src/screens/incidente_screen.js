import React, {useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import colors from '../const/colors';
import {normFS} from '../const/normalize_font';
import {Dropdown} from 'react-native-element-dropdown';
import Checkbox from 'react-native-modest-checkbox';
import assets from '../const/assets';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {getUserDefault, setUserDefault} from '../const/functions';

const screen = Dimensions.get('window');

function Incidente_Sccreen({navigation: {navigate, goBack}}) {
  const [oiChecked, setOiChecked] = useState(true);
  const [omChecked, setOmChecked] = useState(true);
  const [municipio, setMunicipio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [numag, setNumag] = useState(0);
  const [location, setLocation] = useState({
    latitude: 20.657021160754116,
    longitude: -103.32533002182691,
    latitudeDelta: 0.008,
    longitudeDelta: 0.0001,
  });
  const [marker, setMarker] = useState({
    latitude: 20.657021100754116,
    longitude: -103.32533002182691,
  });
  const [posicion, setPosicion] = useState({
    latitude: 20.657021100754116,
    longitude: -103.32533002182691,
  });
  const [sig, enableSig] = useState(true);

  const ref_marker = useRef();
  const ref_posicion = useRef();
  const ref_descripcion = useRef();

  const dataNumag = [];
  const Numag = Array.from({length: 99}, (_, i) => i + 1).forEach(element => {
    dataNumag.push({label: element.toString(), value: element});
  });

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  const getLocation = async () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.0001,
            });
            setPosicion({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
          },
          error => {
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const sigPressed = async () => {
    var userDefault = await getUserDefault();
    userDefault.DatosIncidente.Interno = Number(oiChecked);
    userDefault.DatosIncidente.Latitud = marker.latitude;
    userDefault.DatosIncidente.Longitud = marker.longitude;
    userDefault.DatosIncidente.EnZonaMetropolitana = Number(omChecked);
    userDefault.DatosIncidente.Municipio = municipio;
    userDefault.DatosIncidente.Lugar = descripcion;
    userDefault.DatosIncidente.NumeroAgraviados = numag;
    setUserDefault(userDefault).then(navigate('suceso'));
  };

  useEffect(() => {
    getUserDefault().then(uD => {
      setOiChecked(Boolean(uD.DatosIncidente.Interno));
      setOmChecked(Boolean(uD.DatosIncidente.EnZonaMetropolitana));
      if (uD.DatosIncidente.Latitud && uD.DatosIncidente.Longitud) {
        setMarker({
          latitude: uD.DatosIncidente.Latitud,
          longitude: uD.DatosIncidente.Longitud,
        });
      }
      enableSig(false);
      setDescripcion(uD.DatosIncidente.Lugar);
      setMunicipio(uD.DatosIncidente.Municipio);
      setNumag(uD.DatosIncidente.NumeroAgraviados);
      getLocation()
      enableSig(false)
    });
  }, []);

  return (
    <View style={styles.container_}>
      <ScrollView style={styles.container_scr}>
        <View style={styles.container_di}>
          <Text style={styles.tx_title}>Datos Del Incidente</Text>

          <View style={styles.container_row}>
            <Text style={styles.di_tx_Oi}>
              ¿Ocurrio Dentro De La Institucion?
            </Text>

            <Checkbox
              checkboxStyle={styles.chbx}
              labelStyle={styles.chbx_tx}
              label={'Si'}
              checked={oiChecked}
              checkedImage={assets.images.check}
              uncheckedImage={assets.images.uncheck}
              onChange={checked => {
                setOiChecked(true);
              }}></Checkbox>

            <Checkbox
              checkboxStyle={styles.chbx}
              labelStyle={styles.chbx_tx}
              label={'No'}
              checked={!oiChecked}
              checkedImage={assets.images.check}
              uncheckedImage={assets.images.uncheck}
              onChange={checked => {
                setOiChecked(false);
              }}></Checkbox>
          </View>

          <Text style={styles.di_map_tx}>Selecciona La Ubicacion</Text>

          <View style={styles.di_map_vw}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.di_map}
              onLongPress={(e) => {
                setMarker(e.nativeEvent.coordinate)
                ref_marker.current.showCallout()
              }}
              region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: location.latitudeDelta,
                longitudeDelta: location.longitudeDelta,
              }}
              onMapLoaded={async () => {
                ref_posicion.current.showCallout();
              }}>
              <Marker
                draggable
                ref={ref_marker}
                pinColor={colors.blue_logo}
                coordinate={marker}
                title={'Luagar Del Incidente'}
                onDragEnd={e => {
                  setMarker(e.nativeEvent.coordinate);
                  ref_marker.current.showCallout();
                }}></Marker>
                <Marker
                ref={ref_posicion}
                pinColor={colors.colorPrimary}
                coordinate={posicion}
                title={'Posicion Actual'}></Marker>
            </MapView>
          </View>

          <View style={styles.container_row}>
            <Text style={styles.di_tx_Oi}>
              ¿Ocurrio En La Zona Metropolitana?
            </Text>

            <Checkbox
              checkboxStyle={styles.chbx}
              labelStyle={styles.chbx_tx}
              label={'Si'}
              checked={omChecked}
              checkedImage={assets.images.check}
              uncheckedImage={assets.images.uncheck}
              onChange={checked => {
                setOmChecked(true);
              }}></Checkbox>

            <Checkbox
              checkboxStyle={styles.chbx}
              labelStyle={styles.chbx_tx}
              label={'No'}
              checked={!omChecked}
              checkedImage={assets.images.check}
              uncheckedImage={assets.images.uncheck}
              onChange={checked => {
                setOmChecked(false);
              }}></Checkbox>
          </View>

          <Text style={styles.tx_b}>Municipio</Text>

          <TextInput
            style={styles.txin_b}
            value={municipio}
            onChangeText={text => setMunicipio(text)}
            onSubmitEditing={() => {
              ref_descripcion.current.focus();
            }}
            blurOnSubmit={false}></TextInput>

          <Text style={styles.tx_b}>Descripcion Del Lugar</Text>

          <TextInput
            style={styles.txin_b}
            ref={ref_descripcion}
            value={descripcion}
            onChangeText={text => setDescripcion(text)}></TextInput>

          <View style={styles.container_row}>
            <Text style={styles.di_tx_numag}>Numero De Agraviados</Text>
            <Dropdown
              style={styles.drdw_sh}
              selectedTextStyle={styles.drdw_tx}
              itemTextStyle={styles.drdw_tx}
              data={dataNumag}
              labelField="label"
              valueField="value"
              placeholder={null}
              value={numag}
              onChange={item => {
                setNumag(item.value);
              }}></Dropdown>
          </View>
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

export default Incidente_Sccreen;

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
  },
  container_row_near: {
    flexDirection: 'row',
  },
  container_di: {},
  //#endregion

  //#region Datos Del Incidente Styles
  di_tx_Oi: {
    width: screen.width / 2,
    color: colors.black,
    marginTop: 20,
    paddingLeft: screen.width / 20,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(15),
  },
  di_map_tx: {
    color: colors.black,
    marginVertical: screen.height / 50,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(20),
    textAlign: 'center',
  },
  di_map: {
    width: '100%',
    height: '100%',
  },
  di_map_vw: {
    height: screen.height / 3,
    borderColor: colors.colorPrimary,
    borderWidth: 10,
    borderRadius: 10,
  },
  di_tx_numag: {
    height: screen.height / 20,
    width: screen.width / 1.9,
    color: colors.black,
    marginLeft: screen.width / 10,
    marginRight: screen.width / 12,
    textAlignVertical: 'center',
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(18),
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
  chbx: {
    width: screen.width / 10,
    height: screen.width / 10,
    marginTop: 10,
  },
  chbx_tx: {
    width: screen.width / 15,
    height: screen.width / 15,
    color: colors.black,
    marginTop: 10,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
  },
  tx_b: {
    height: screen.height / 20,
    color: colors.black,
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
  //#endregion
});
