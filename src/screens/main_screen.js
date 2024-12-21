import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import UserDefault from '../class/userdefault';
import assets from '../const/assets';
import colors from '../const/colors';
import {normFS} from '../const/normalize_font';
import {
  fetchWithTimeout,
  getSavedUser,
  getUserDefault,
  setSavedUser,
  setUserDefault,
} from '../const/functions';

const screen = Dimensions.get('window');

function Main_screen({navigation: {navigate}}) {
  const [codigo, setCodigo] = useState('');
  const [nip, setNip] = useState('');
  const [spinner, enableSpinner] = useState(false);

  const sigPressed = async () => {
    enableSpinner(true);
    try {
      const params = new FormData();
      params.append('username', codigo);
      params.append('password', nip);
      const response = await fetchWithTimeout(assets.datos.url_Login, {
        method: 'POST',
        body: params,
      });
      const responseString = await response.text();
      enableSpinner(false);
      if (responseString != 0) {
        var userDefault = await getUserDefault();
        if (userDefault) {
          if (userDefault.FullName !== responseString) {
            userDefault = new UserDefault();
            userDefault.FullName = responseString;
            await setUserDefault(userDefault);
          }
        } else {
          userDefault = new UserDefault();
          userDefault.FullName = responseString;
          await setUserDefault(userDefault);
        }
        var savedUser = await getSavedUser();
        if (savedUser.Name != userDefault.FullName) {
          Alert.alert(
            'Aviso',
            '¿Desea Que La Aplicación Recuerde Su Código y NIP?',
            [
              {
                text: 'Cancel',
                onPress: () => {
                  savedUser.Skip[userDefault.FullName] = true
                  setSavedUser(savedUser).then(() => {
                    if (userDefault.Aviso) {
                      navigate('login');
                    } else {
                      navigate('aviso');
                    }
                  });
                },
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => {
                  savedUser.Name = userDefault.FullName
                  savedUser.Codigo = codigo
                  savedUser.Nip = nip
                  savedUser.Skip[userDefault.FullName] = true
                  setSavedUser(savedUser).then(() => {
                    if (userDefault.Aviso) {
                      navigate('login');
                    } else {
                      navigate('aviso');
                    }
                  });
                },
              },
            ],
          );
        } else {
          if (userDefault.Aviso) {
            navigate('login');
          } else {
            navigate('aviso');
          }
        }
      } else {
        Alert.alert('Denegado', 'Codigo o NIP Erroneo', [
          {text: 'OK'},
        ]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      enableSpinner(false);
    }
  };

  useEffect(() => {
    getSavedUser().then(sU => {
      if (!sU) {
        setSavedUser({
          Name: '',
          Codigo: '',
          Nip: '',
          Skip: {},
        });
      } else {
        setCodigo(sU.Codigo);
        setNip(sU.Nip);
      }
    });
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spn_tx}></Spinner>

      <View style={styles.container_logo}>
        <Image style={styles.logo} source={assets.images.main_logo}></Image>
      </View>

      <View style={styles.container_txin}>
        <TextInput
          style={styles.txin}
          keyboardType={'numeric'}
          placeholder="Codigo"
          placeholderTextColor={colors.main_txln_ph}
          value={codigo}
          selectTextOnFocus={true}
          onChangeText={text => {
            setCodigo(text);
            if (!text) setNip('');
          }}></TextInput>

        <TextInput
          style={styles.txin}
          secureTextEntry={true}
          placeholder="Contraseña"
          placeholderTextColor={colors.main_txln_ph}
          value={nip}
          selectTextOnFocus={true}
          onChangeText={text => setNip(text)}></TextInput>
      </View>

      <View style={styles.container_btn}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.2}
          onPress={() => {
            sigPressed();
          }}>
          <Text style={styles.btn_text}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.black,
  },
  container_logo: {
    minHeight: (screen.height / 100) * 37,
    height: '45%',
    backgroundColor: colors.white,
    justifyContent: 'flex-end',
  },
  container_txin: {
    minHeight: (screen.height / 100) * 15,
    height: '20%',
    paddingTop: '5%',
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  container_btn: {
    height: '50%',
    paddingTop: '5%',
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  logo: {
    minHeight: (screen.height / 100) * 35,
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  txin: {
    minHeight: (screen.height / 100) * 5,
    width: '70%',
    height: '20%',
    color: colors.black,
    backgroundColor: colors.main_txln_bg,
    borderRadius: 5,
    fontSize: normFS(15),
    paddingHorizontal: screen.width / 30,
    borderWidth: 1,
    borderColor: colors.light_gray,
    fontFamily: 'RobotoSlab-SemiBold',
  },
  btn: {
    minHeight: (screen.height / 100) * 6,
    width: '40%',
    height: '10%',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.main_btn_border,
    justifyContent: 'center',
  },
  btn_text: {
    color: colors.black,
    textAlign: 'center',
    fontSize: normFS(25),
    fontFamily: 'RobotoSlab-SemiBold',
  },
  spn_tx: {
    color: colors.white,
    fontFamily: 'RobotoSlab-Bold',
    fontSize: normFS(20),
  },
});

export default Main_screen;
