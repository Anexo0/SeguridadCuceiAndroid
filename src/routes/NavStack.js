import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import Main_screen from '../screens/main_screen';
import Aviso_screen from '../screens/aviso_screen';
import Aviso_Sc_screen from '../screens/aviso_sc_screen';
import Configuracion_screen from '../screens/configuracion_screen';
import Login_screen from '../screens/login_screen';
import colors from '../const/colors';
import Afectado_Screen from '../screens/afectado_screen';
import Afectado_Terceros_screen from '../screens/afectado_terceros_screen';
import Incidente_Sccreen from '../screens/incidente_screen';
import Suceso_screen from '../screens/suceso_screen';
import Agresor1_screen from '../screens/agresor1_screen';
import Agresor2_screen from '../screens/agresor2_screen';
import Agresor3_screen from '../screens/agresor3_screen';
import Especificaciones_screen from '../screens/especificaciones_screen';
import DatosFinales1_screen from '../screens/datosfinales1_screen';
import DatosFinales2_screen from '../screens/datosfinales2_screen';

const Stack = createNativeStackNavigator();

function NavStack(props) {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={colors.colorAccent} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="main" component={Main_screen}  />
        <Stack.Screen name="aviso" component={Aviso_screen} />
        <Stack.Screen name="aviso_sc" component={Aviso_Sc_screen} />
        <Stack.Screen name="login" component={Login_screen} />
        <Stack.Screen name="configuracion" component={Configuracion_screen} />
        <Stack.Screen name="afectado" component={Afectado_Screen} />
        <Stack.Screen name="afectado terceros" component={Afectado_Terceros_screen}/>
        <Stack.Screen name="incidente" component={Incidente_Sccreen}/>
        <Stack.Screen name="suceso" component={Suceso_screen}/>
        <Stack.Screen name="agresor1" component={Agresor1_screen}/>
        <Stack.Screen name="agresor2" component={Agresor2_screen}/>
        <Stack.Screen name="agresor3" component={Agresor3_screen}/>
        <Stack.Screen name="especificaciones" component={Especificaciones_screen}/>
        <Stack.Screen name="datosfinales1" component={DatosFinales1_screen}/>
        <Stack.Screen name="datosfinales2" component={DatosFinales2_screen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavStack;
