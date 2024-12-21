import React, {useEffect, useRef, useState} from 'react';
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
import DatePicker from 'react-native-date-picker';
import colors from '../const/colors';
import {normFS} from '../const/normalize_font';
import {Dropdown} from 'react-native-element-dropdown';
import {getUserDefault, setUserDefault} from '../const/functions';

const screen = Dimensions.get('window');
const RECorreo = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
const RETelCel = /\d{10}/;

function Afectado_Screen({navigation: {navigate}}) {
  const [nombre, setNombre] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [genero, setGenero] = useState('');
  const [institucion, setInstitucion] = useState(null);
  const [escuela, setEscuela] = useState(null);
  const [edad, setEdad] = useState(0);
  const [turno, setTurno] = useState('');
  const [grado, setGrado] = useState('');
  const [grupo, setGrupo] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [celular, setCelular] = useState('');
  const [dataEscuelas, setDataEscuelas] = useState();
  const [telIsVal, setTelValid] = useState(true);
  const [celIsVal, setCelValid] = useState(true);
  const [corIsVal, setCorValid] = useState(true);
  const [sig, enableSig] = useState(true);

  const ref_txin_corr = useRef();
  const ref_txin_tl = useRef();
  const ref_txin_cl = useRef();

  const dataInstitucion = [
    {label: '-', value: null},
    {label: 'Preparatoria', value: 0},
    {label: 'Universidad', value: 1},
    {label: 'Dependencia', value: 2},
  ];

  const dataDep = [
    {label: '-', value: null},
    {label: 'CUAAD - Arte, Arquitectura y Diseño', value: 0},
    {label: 'CUCBA - Ciencias Biológicas y Agropecuarias', value: 1},
    {label: 'CUCEA - Ciencias Económico-Administrativas', value: 2},
    {label: 'CUCEI - Ciencias Exactas e Ingenierías', value: 3},
    {label: 'CUCS - Ciencias de la Salud', value: 4},
    {label: 'CUCSH - Ciencias Sociales y Humanidades', value: 5},
    {label: 'CUALTOS - Tepatitlán de Morelos', value: 6},
    {label: 'CUCIÉNEGA - Ocotlán', value: 7},
    {label: 'CUCOSTA - Puerto Vallarta', value: 8},
    {label: 'CUCSUR - Autlán de Navarro', value: 9},
    {label: 'CULAGOS - Lagos de Moreno', value: 10},
    {label: 'CUNORTE - Colotlán', value: 11},
    {label: 'CUSUR - Ciudad Guzmán', value: 12},
    {label: 'CUTONALÁ - Tonalá', value: 13},
    {label: 'CUVALLES - Ameca', value: 14},
    {label: 'Preparatoria de Jalisco', value: 15},
    {label: 'Preparatoria No. 2', value: 16},
    {label: 'Preparatoria No. 3', value: 17},
    {label: 'Preparatoria No. 4', value: 18},
    {label: 'Preparatoria No. 5', value: 19},
    {label: 'Preparatoria No. 6', value: 20},
    {label: 'Preparatoria No. 7', value: 21},
    {label: 'Preparatoria No. 8', value: 22},
    {label: 'Preparatoria No. 9', value: 23},
    {label: 'Preparatoria No. 10', value: 24},
    {label: 'Preparatoria No. 11', value: 25},
    {label: 'Preparatoria No. 12', value: 26},
    {label: 'Preparatoria No. 13', value: 27},
    {label: 'Preparatoria No. 14', value: 28},
    {label: 'Preparatoria No. 15', value: 29},
    {label: 'Preparatoria No. 16', value: 30},
    {label: 'Preparatoria No. 17', value: 31},
    {label: 'Preparatoria No. 18', value: 32},
    {label: 'Preparatoria No. 19', value: 33},
    {label: 'Preparatoria No. 20', value: 34},
    {label: 'Preparatoria de Tonalá', value: 35},
    {label: 'Preparatoria de Tonalá Norte', value: 36},
    {label: 'Escuela Vocacional', value: 37},
    {label: 'Politécnica de Guadalajara', value: 38},
    {label: 'Regional de Ahualulco de Mercado', value: 39},
    {label: 'Regional de Ameca', value: 40},
    {label: 'Regional de Amatitlán', value: 41},
    {label: 'Regional de Arandas', value: 42},
    {label: 'Regional de Atotonilco', value: 43},
    {label: 'Regional de Autlán de Navarro', value: 44},
    {label: 'Regional de Casimiro Castillo', value: 45},
    {label: 'Regional de Chapala', value: 46},
    {label: 'Regional de Cihuatlán', value: 47},
    {label: 'Escuela Regional de Cocula', value: 48},
    {label: 'Regional de Colotlán', value: 49},
    {label: 'Regional de Degollado', value: 50},
    {label: 'Regional de El Grullo', value: 51},
    {label: 'Regional de El Salto', value: 52},
    {label: 'Regional de Etzatlán', value: 53},
    {label: 'Regional de Jamay', value: 54},
    {label: 'Regional de Huejuquilla el Alto', value: 55},
    {label: 'Regional de Jalostitlán', value: 56},
    {label: 'Regional de Jocotepec', value: 57},
    {label: 'Regional de La Barca', value: 58},
    {label: 'Regional de Lagos de Moreno', value: 59},
    {label: 'Regional de Puerto Vallarta', value: 60},
    {label: 'Regional de San Juan de los Lagos', value: 61},
    {label: 'Regional de San Martín de Hidalgo', value: 62},
    {label: 'Regional de San Miguel el Alto', value: 63},
    {label: 'Regional de Santa Anita', value: 64},
    {label: 'Regional de Sayula', value: 65},
    {label: 'Regional de Tala', value: 66},
    {label: 'Regional de Tamazula de Gordiano', value: 67},
    {label: 'Regional de Tecolotlán', value: 68},
    {label: 'Regional de Tepatitlán', value: 69},
    {label: 'Regional de Tequila', value: 70},
    {label: 'Regional de Tlajomulco de Zúñiga', value: 71},
    {label: 'Regional de Tuxpan', value: 72},
    {label: 'Regional de Toluquilla', value: 73},
    {label: 'Regional de Villa Corona', value: 74},
    {label: 'Regional de Unión de Tula', value: 76},
    {label: 'Regional de Zacoalco de Torres', value: 76},
    {label: 'Regional de Zapotiltic', value: 77},
    {label: 'Regional de Zapotlanejo', value: 78},
    {label: 'Regional de Ocotlán', value: 79},
  ];
  const dataUni = [
    {label: '-', value: null},
    {label: 'CUAAD - Arte, Arquitectura y Diseño', value: 0},
    {label: 'CUCBA - Ciencias Biológicas y Agropecuarias', value: 1},
    {label: 'CUCEA - Ciencias Económico-Administrativas', value: 2},
    {label: 'CUCEI - Ciencias Exactas e Ingenierías', value: 3},
    {label: 'CUCS - Ciencias de la Salud', value: 4},
    {label: 'CUCSH - Ciencias Sociales y Humanidades', value: 5},
    {label: 'CUALTOS - Tepatitlán de Morelos', value: 6},
    {label: 'CUCIÉNEGA - Ocotlán', value: 7},
    {label: 'CUCOSTA - Puerto Vallarta', value: 8},
    {label: 'CUCSUR - Autlán de Navarro', value: 9},
    {label: 'CULAGOS - Lagos de Moreno', value: 10},
    {label: 'CUNORTE - Colotlán', value: 11},
    {label: 'CUSUR - Ciudad Guzmán', value: 12},
    {label: 'CUTONALÁ - Tonalá', value: 13},
    {label: 'CUVALLES - Ameca', value: 14},
  ];
  const dataPrepa = [
    {label: '-', value: null},
    {label: 'Preparatoria de Jalisco', value: 0},
    {label: 'Preparatoria No. 2', value: 1},
    {label: 'Preparatoria No. 3', value: 2},
    {label: 'Preparatoria No. 4', value: 3},
    {label: 'Preparatoria No. 5', value: 4},
    {label: 'Preparatoria No. 6', value: 5},
    {label: 'Preparatoria No. 7', value: 6},
    {label: 'Preparatoria No. 8', value: 7},
    {label: 'Preparatoria No. 9', value: 8},
    {label: 'Preparatoria No. 10', value: 9},
    {label: 'Preparatoria No. 11', value: 10},
    {label: 'Preparatoria No. 12', value: 11},
    {label: 'Preparatoria No. 13', value: 12},
    {label: 'Preparatoria No. 14', value: 13},
    {label: 'Preparatoria No. 15', value: 14},
    {label: 'Preparatoria No. 16', value: 15},
    {label: 'Preparatoria No. 17', value: 16},
    {label: 'Preparatoria No. 18', value: 17},
    {label: 'Preparatoria No. 19', value: 18},
    {label: 'Preparatoria No. 20', value: 19},
    {label: 'Preparatoria de Tonalá', value: 20},
    {label: 'Preparatoria de Tonalá Norte', value: 21},
    {label: 'Escuela Vocacional', value: 22},
    {label: 'Politécnica de Guadalajara', value: 23},
    {label: 'Regional de Ahualulco de Mercado', value: 24},
    {label: 'Regional de Ameca', value: 25},
    {label: 'Regional de Amatitlán', value: 26},
    {label: 'Regional de Arandas', value: 27},
    {label: 'Regional de Atotonilco', value: 28},
    {label: 'Regional de Autlán de Navarro', value: 29},
    {label: 'Regional de Casimiro Castillo', value: 30},
    {label: 'Regional de Chapala', value: 31},
    {label: 'Regional de Cihuatlán', value: 32},
    {label: 'Escuela Regional de Cocula', value: 33},
    {label: 'Regional de Colotlán', value: 34},
    {label: 'Regional de Degollado', value: 35},
    {label: 'Regional de El Grullo', value: 36},
    {label: 'Regional de El Salto', value: 37},
    {label: 'Regional de Etzatlán', value: 38},
    {label: 'Regional de Jamay', value: 39},
    {label: 'Regional de Huejuquilla el Alto', value: 40},
    {label: 'Regional de Jalostitlán', value: 41},
    {label: 'Regional de Jocotepec', value: 42},
    {label: 'Regional de La Barca', value: 43},
    {label: 'Regional de Lagos de Moreno', value: 44},
    {label: 'Regional de Puerto Vallarta', value: 45},
    {label: 'Regional de San Juan de los Lagos', value: 46},
    {label: 'Regional de San Martín de Hidalgo', value: 47},
    {label: 'Regional de San Miguel el Alto', value: 48},
    {label: 'Regional de Santa Anita', value: 49},
    {label: 'Regional de Sayula', value: 50},
    {label: 'Regional de Tala', value: 51},
    {label: 'Regional de Tamazula de Gordiano', value: 52},
    {label: 'Regional de Tecolotlán', value: 53},
    {label: 'Regional de Tepatitlán', value: 54},
    {label: 'Regional de Tequila', value: 55},
    {label: 'Regional de Tlajomulco de Zúñiga', value: 56},
    {label: 'Regional de Tuxpan', value: 57},
    {label: 'Regional de Toluquilla', value: 58},
    {label: 'Regional de Villa Corona', value: 59},
    {label: 'Regional de Unión de Tula', value: 60},
    {label: 'Regional de Zacoalco de Torres', value: 61},
    {label: 'Regional de Zapotiltic', value: 62},
    {label: 'Regional de Zapotlanejo', value: 63},
    {label: 'Regional de Ocotlán', value: 64},
  ];

  const dataAges = [{label: '-', value: null}];
  const Ages = Array.from({length: 99}, (_, i) => i + 1).forEach(element => {
    dataAges.push({label: element.toString(), value: element});
  });

  const dataGrados = [{label: '-', value: null}];
  const Grado = Array.from({length: 10}, (_, i) => i + 1).forEach(element => {
    dataGrados.push({label: element.toString(), value: element});
  });

  const dataGrupos = [
    {label: '-', value: null},
    {label: 'A', value: 'A'},
    {label: 'B', value: 'B'},
    {label: 'C', value: 'C'},
    {label: 'D', value: 'D'},
    {label: 'E', value: 'E'},
    {label: 'F', value: 'F'},
    {label: 'G', value: 'G'},
    {label: 'H', value: 'H'},
  ];
  const sigPressed = async () => {
    if (
      genero &&
      edad &&
      institucion !== null &&
      escuela !== null &&
      turno &&
      grado &&
      grupo &&
      corIsVal &&
      telIsVal &&
      celIsVal
    ) {
      var userDefault = await getUserDefault();
      var fecha = date.toISOString().split('T');
      fecha =
        fecha[0] +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes() +
        ':' +
        date.getSeconds();
      userDefault.DatosAfectado.Nombre = nombre.replace('\n', '');
      userDefault.DatosAfectado.NombreA = nombre.replace('\n', '');
      userDefault.DatosAfectado.Fecha = fecha;
      userDefault.DatosAfectado.Sexo = genero;
      userDefault.DatosAfectado.Edad = edad;
      userDefault.DatosAfectado.Sede = dataEscuelas[escuela].label;
      userDefault.DatosAfectado.IdEscuela = escuela;
      userDefault.DatosAfectado.Turno = turno;
      userDefault.DatosAfectado.Grado = grado;
      userDefault.DatosAfectado.Grupo = grupo;
      userDefault.DatosAfectado.Correo = correo;
      userDefault.DatosAfectado.Telefono = telefono;
      userDefault.DatosAfectado.Celular = celular;
      setUserDefault(userDefault).then(navigate('incidente'));
    } else {
      var alertString = String();
      if (!corIsVal) alertString = alertString.concat('Correo Invalido\n');
      if (!telIsVal) alertString = alertString.concat('Telefono Invalido\n');
      if (!celIsVal) alertString = alertString.concat('Celular Invalido\n');
      Alert.alert('Llena Todos Los Campos', alertString, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK'},
      ]);
    }
  };
  const institucionChanged = async item => {
    setInstitucion(item.value);
    setEscuela(null);
    var userDefault = await getUserDefault();
    userDefault.DatosAfectado.Dependencia = 0;
    userDefault.DatosAfectado.Universidad = 0;
    userDefault.DatosAfectado.Prepa = 0;
    if (item.value == 0) {
      userDefault.DatosAfectado.Prepa = 1;
      setDataEscuelas(dataPrepa);
    } else if (item.value == 1) {
      userDefault.DatosAfectado.Universidad = 1;
      setDataEscuelas(dataUni);
    } else if (item.value == 2) {
      userDefault.DatosAfectado.Dependencia = 1;
      setDataEscuelas(dataDep);
    } else setDataEscuelas(dataDep);
    await setUserDefault(userDefault);
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
      setNombre(uD.FullName);
      setGenero(uD.DatosAfectado.Sexo);
      setEdad(uD.DatosAfectado.Edad);
      if (uD.DatosAfectado.Prepa) {
        setInstitucion(0);
        setDataEscuelas(dataPrepa);
      } else if (uD.DatosAfectado.Universidad) {
        setInstitucion(1);
        setDataEscuelas(dataUni);
      } else if (uD.DatosAfectado.Dependencia) {
        setInstitucion(2);
        setDataEscuelas(dataDep);
      }
      setEscuela(uD.DatosAfectado.IdEscuela);
      setTurno(uD.DatosAfectado.Turno);
      setGrado(uD.DatosAfectado.Grado);
      setGrupo(uD.DatosAfectado.Grupo);
      setCorreo(uD.DatosAfectado.Correo);
      setTelefono(uD.DatosAfectado.Telefono);
      setCelular(uD.DatosAfectado.Celular);
      validateCor(uD.DatosAfectado.Correo);
      validateTel(uD.DatosAfectado.Telefono);
      validateCel(uD.DatosAfectado.Celular);
      enableSig(false)
    });
  }, []);

  return (
    <View style={styles.container_}>
      <ScrollView style={styles.container_scr}>
        <View style={styles.container_diaf}>
          <Text style={styles.tx_title}>
            Datos De Identificacion Del Afectado
          </Text>

          <Text style={styles.diaf_tx_nmb}>{nombre}</Text>

          <View style={styles.container_row}>
            <Text style={styles.diaf_tx_fg}>Fecha:</Text>

            <TouchableHighlight
              style={styles.diaf_dtpik}
              onPress={() => setOpen(true)}
              underlayColor={colors.light_gray}>
              <Text style={styles.diaf_dtpik_tx}>{date.toDateString()}</Text>
            </TouchableHighlight>

            <DatePicker
              modal
              mode={'date'}
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}></DatePicker>
          </View>

          <View style={styles.container_row}>
            <Text style={styles.diaf_tx_fg}>Genero:</Text>

            <Dropdown
              style={styles.drdw_sh}
              selectedTextStyle={styles.drdw_tx}
              itemTextStyle={styles.drdw_tx}
              data={[
                {label: 'M', value: 'M'},
                {label: 'F', value: 'F'},
                {label: '-', value: null},
              ]}
              labelField="label"
              valueField="value"
              placeholder={null}
              value={genero}
              onChange={item => {
                setGenero(item.value);
              }}></Dropdown>

            <Text style={styles.diaf_tx_ed}>Edad:</Text>

            <Dropdown
              style={styles.drdw_sh}
              selectedTextStyle={styles.drdw_tx}
              itemTextStyle={styles.drdw_tx}
              data={dataAges}
              labelField="label"
              valueField="value"
              placeholder={null}
              value={edad}
              onChange={item => {
                setEdad(item.value);
              }}></Dropdown>
          </View>

          <Text style={styles.diaf_tx_inst}>
            Institucion A La Que Pertences
          </Text>

          <Dropdown
            style={styles.diaf_drdw_inst}
            placeholderStyle={styles.drdw_ph}
            placeholder={'Toca Para Seleccionar'}
            selectedTextStyle={styles.drdw_tx}
            itemTextStyle={styles.drdw_tx}
            data={dataInstitucion}
            labelField="label"
            valueField="value"
            value={institucion}
            onChange={item => institucionChanged(item)}></Dropdown>

          <Text style={styles.diaf_tx_esin}>Escuela/Institucion</Text>

          <Dropdown
            style={styles.diaf_drdw_inst}
            placeholder={'Toca Para Seleccionar'}
            placeholderStyle={styles.drdw_ph}
            selectedTextStyle={styles.drdw_tx}
            selectedTextProps={{numberOfLines: 1}}
            itemTextStyle={styles.drdw_tx}
            data={dataEscuelas}
            labelField="label"
            valueField="value"
            value={escuela}
            onChange={item => {
              setEscuela(item.value);
            }}></Dropdown>

          <View style={styles.container_row_near}>
            <Text style={styles.diaf_tx_trhr}>Turno/Horario</Text>

            <Text style={styles.diaf_tx_grgp}>Grado</Text>

            <Text style={styles.diaf_tx_grgp}>Grupo</Text>
          </View>

          <View style={styles.container_row}>
            <Dropdown
              style={styles.diaf_txin_trhr}
              selectedTextStyle={styles.drdw_tx}
              itemTextStyle={styles.drdw_tx}
              data={[
                {label: '-', value: null},
                {label: 'Matutino', value: 'Matutino'},
                {label: 'Vespertino', value: 'Vespertino'},
              ]}
              labelField="label"
              valueField="value"
              placeholder={null}
              value={turno}
              onChange={item => {
                setTurno(item.value);
              }}></Dropdown>

            <Dropdown
              style={styles.diaf_txin_grgp}
              selectedTextStyle={styles.drdw_tx}
              itemTextStyle={styles.drdw_tx}
              data={dataGrados}
              labelField="label"
              valueField="value"
              placeholder={null}
              value={grado}
              onChange={item => {
                setGrado(item.value);
              }}></Dropdown>

            <Dropdown
              style={styles.diaf_txin_grgp}
              selectedTextStyle={styles.drdw_tx}
              itemTextStyle={styles.drdw_tx}
              data={dataGrupos}
              labelField="label"
              valueField="value"
              placeholder={null}
              value={grupo}
              onChange={item => {
                setGrupo(item.value);
              }}></Dropdown>
          </View>

          <Text style={styles.diaf_tx_corr}>Correo Electronico</Text>

          <TextInput
            style={corIsVal ? styles.diaf_txin_corr : styles.diaf_txin_corr_wr}
            placeholder={'ejemplo@empresa.com'}
            placeholderTextColor={corIsVal ? colors.light_gray : colors.gray}
            keyboardType={'email-address'}
            value={correo}
            onChangeText={text => validateCor(text)}
            ref={ref_txin_corr}
            onSubmitEditing={() => {
              ref_txin_tl.current.focus();
            }}
            blurOnSubmit={false}></TextInput>

          <View style={styles.container_row_near}>
            <Text style={styles.diaf_tx_tl}>Telefono</Text>

            <Text style={styles.diaf_tx_cl}>Celular</Text>
          </View>

          <View style={styles.container_row}>
            <TextInput
              style={telIsVal ? styles.diaf_txin_tl : styles.diaf_txin_tl_wr}
              value={telefono}
              keyboardType={'phone-pad'}
              onChangeText={text => validateTel(text)}
              ref={ref_txin_tl}
              onSubmitEditing={() => {
                ref_txin_cl.current.focus();
              }}
              blurOnSubmit={false}></TextInput>

            <TextInput
              style={celIsVal ? styles.diaf_txin_cl : styles.diaf_txin_cl_wr}
              value={celular}
              keyboardType={'phone-pad'}
              onChangeText={text => validateCel(text)}
              ref={ref_txin_cl}></TextInput>
          </View>
        </View>
      </ScrollView>

      <View style={styles.container_ftr}>
        <TouchableHighlight
          style={styles.ftr_btn}
          underlayColor={colors.login_btn_gray_und}
          onPress={() => navigate('login')}>
          <Text style={styles.ftr_btn_tx}>Cancelar</Text>
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
  container_diaf: {
    flex: 1,
  },
  container_row: {
    flexDirection: 'row',
    marginBottom: screen.height / 50,
  },
  container_row_near: {
    flexDirection: 'row',
  },
  //#endregion

  //#region Datos De Identificacion Del Afectado Styles
  diaf_tx_nmb: {
    marginTop: screen.height / 30,
    marginHorizontal: screen.width / 20,
    color: colors.black,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'center',
  },
  diaf_tx_fg: {
    width: screen.width / 5,
    height: screen.height / 20,
    color: colors.black,
    marginLeft: screen.width / 10,
    marginRight: screen.width / 50,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  diaf_dtpik: {
    backgroundColor: colors.white,
    height: screen.height / 20,
    width: (screen.width / 100) * 58,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  diaf_dtpik_tx: {
    color: colors.black,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
  },
  diaf_tx_ed: {
    height: screen.height / 20,
    width: screen.width / 5,
    color: colors.black,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  diaf_tx_inst: {
    height: screen.height / 20,
    color: colors.light_blue_logo,
    marginHorizontal: screen.width / 10,
    marginTop: 10,
    paddingLeft: 10,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  diaf_tx_esin: {
    height: screen.height / 20,
    color: colors.black,
    marginHorizontal: screen.width / 10,
    paddingLeft: 10,
    marginTop: 10,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  diaf_drdw_inst: {
    height: screen.height / 20,
    backgroundColor: colors.white,
    color: colors.blue_logo,
    marginHorizontal: (screen.width / 100) * 10,
    borderRadius: 10,
  },
  diaf_tx_trhr: {
    color: colors.black,
    width: (screen.width / 100) * 40,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: screen.width / 10,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'center',
  },
  diaf_tx_grgp: {
    width: (screen.width / 100) * 17,
    color: colors.black,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'center',
  },
  diaf_txin_trhr: {
    height: screen.height / 20,
    width: (screen.width / 100) * 40,
    color: colors.black,
    backgroundColor: colors.white,
    marginLeft: screen.width / 10,
    paddingLeft: 10,
    borderRadius: 10,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(15),
  },
  diaf_txin_grgp: {
    height: screen.height / 20,
    width: (screen.width / 100) * 17.5,
    color: colors.black,
    backgroundColor: colors.white,
    marginLeft: 10,
    paddingLeft: 10,
    borderRadius: 10,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(15),
  },
  diaf_tx_corr: {
    height: screen.height / 20,
    color: colors.black,
    marginTop: -10,
    marginHorizontal: screen.width / 10,
    paddingLeft: 10,
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  diaf_txin_corr: {
    height: screen.height / 20,
    color: colors.black,
    backgroundColor: colors.white,
    marginHorizontal: screen.width / 10,
    paddingLeft: 10,
    borderRadius: 10,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(15),
  },
  diaf_txin_corr_wr: {
    height: screen.height / 20,
    color: colors.red_error,
    backgroundColor: colors.red_error_bg,
    marginHorizontal: screen.width / 10,
    paddingLeft: 10,
    borderRadius: 10,
    borderColor: colors.red_error,
    borderWidth: 1,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(15),
  },
  diaf_tx_tl: {
    color: colors.black,
    width: (screen.width / 100) * 40,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: screen.width / 10,
    textAlign: 'center',
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
  },
  diaf_tx_cl: {
    color: colors.black,
    width: (screen.width / 100) * 40,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'RobotoSlab-SemiBold',
    fontSize: normFS(20),
  },
  diaf_txin_tl: {
    height: screen.height / 20,
    width: (screen.width / 100) * 39,
    color: colors.black,
    backgroundColor: colors.white,
    marginLeft: screen.width / 10,
    paddingLeft: 10,
    borderRadius: 10,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(15),
  },
  diaf_txin_tl_wr: {
    height: screen.height / 20,
    width: (screen.width / 100) * 39,
    color: colors.red_error,
    backgroundColor: colors.red_error_bg,
    marginLeft: screen.width / 10,
    paddingLeft: 10,
    borderColor: colors.red_error,
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(15),
  },
  diaf_txin_cl: {
    height: screen.height / 20,
    width: (screen.width / 100) * 39,
    color: colors.black,
    backgroundColor: colors.white,
    marginRight: screen.width / 10,
    marginLeft: (screen.width / 100) * 2,
    paddingLeft: 10,
    borderRadius: 10,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(15),
  },
  diaf_txin_cl_wr: {
    height: screen.height / 20,
    width: (screen.width / 100) * 39,
    color: colors.red_error,
    backgroundColor: colors.red_error_bg,
    marginRight: screen.width / 10,
    marginLeft: (screen.width / 100) * 2,
    paddingLeft: 10,
    borderColor: colors.red_error,
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: 'RobotoSlab-Regular',
    fontSize: normFS(15),
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
    fontFamily: 'RobotoSlab-Regular',
    paddingLeft: 5,
    fontSize: normFS(15),
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
  //#endregion
});

export default Afectado_Screen;
