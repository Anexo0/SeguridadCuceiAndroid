import AsyncStorage from '@react-native-async-storage/async-storage';

export async function fetchWithTimeout(url, options, timeout = 10000) {
  return Promise.race([
      fetch(url, options),
      new Promise((_, reject) => setTimeout(() => reject("Timeout"), timeout))
  ]);
}

export async function setUserDefault(value) {
  try {
    value = JSON.stringify(value);
    await AsyncStorage.setItem('userDefault', value);
  } catch (error) {
    console.error(error);
  }
}

export async function getUserDefault() {
  try {
    var value = await AsyncStorage.getItem('userDefault');
    value = await JSON.parse(value);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function setSavedUser(value) {
  try {
    value = JSON.stringify(value);
    await AsyncStorage.setItem('savedUser', value);
  } catch (error) {
    console.error(error);
  }
}

export async function getSavedUser() {
  try {
    var value = await AsyncStorage.getItem('savedUser');
    value = await JSON.parse(value);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error(error);
  }
}

export function uDtoJson(uD) {
  return JSON.stringify({
    Incidente: String(uD.Incidente),
    Sede: uD.DatosAfectado.Sede, 
    EsPreparatoria: uD.DatosAfectado.Prepa, 
    EsCentroUniversitario: uD.DatosAfectado.Universidad, 
    EsDependencia: uD.DatosAfectado.Dependencia, 
    EnZonaMetropolitana: uD.DatosIncidente.EnZonaMetropolitana, 
    EscuelaId: uD.DatosAfectado.IdEscuela,
    Fecha: uD.DatosAfectado.Fecha, 
    Edad: uD.DatosAfectado.Edad,
    Sexo: uD.DatosAfectado.Sexo,
    Grado: uD.DatosAfectado.Grado, 
    Grupo: uD.DatosAfectado.Grupo,
    Nombre: uD.DatosAfectado.Nombre,
    Turno: uD.DatosAfectado.Turno,
    Email: uD.DatosAfectado.Correo, 
    Telefono: uD.DatosAfectado.Telefono, 
    DatosIncidente: uD.DatosIncidente.Lugar,
    EsInterno: uD.DatosIncidente.Interno,
    Latitude: uD.DatosIncidente.Latitud,
    Longitude: uD.DatosIncidente.Longitud,
    Descripcion: uD.DatosSuceso.suceso,
    Robo: uD.DatosSuceso.RoboArma, 
    QueRoban: uD.DatosSuceso.RoboArmaB, 
    DelitosSexuales: uD.DatosSuceso.Violacion, 
    Lesiones: uD.DatosSuceso.Agresion,
    Extorsion: uD.DatosSuceso.Extorsion,
    AlcoholDrogas: uD.DatosSuceso.BajoDrogas,
    TentativaPrivacionLibertad: uD.DatosSuceso.Secuestro,
    NumeroAgraviados: uD.DatosIncidente.NumeroAgraviados,
    Otro: uD.DatosSuceso.Otro,
    EstaturaAgresor: uD.DatosAgresor1.Estatura,
    AparienciaAgresor: uD.DatosAgresor2.Apariencia,
    TezAgresor: uD.DatosAgresor2.Tez,
    CabelloAgresor: uD.DatosAgresor2.CabelloT + " " + uD.DatosAgresor2.CabelloC,
    OjosAgresor: uD.DatosAgresor2.OjosT + " " + uD.DatosAgresor2.OjosC,
    CaraAgresor: uD.Cara,
    BocaAgresor: uD.DatosAgresor2.Boca,
    TipoRopaAgresor: uD.DatosEspecificaciones.TipoRopa,
    UsoGorraAgresor: uD.DatosEspecificaciones.Gorra,
    EdadAproxAgresor: uD.DatosAgresor1.EdadAprox,
    CicatricesAgresor: uD.DatosEspecificaciones.Cicatriz,
    TatuajesAgresor: uD.DatosEspecificaciones.Tatuajes,
    PercingAgresor: uD.DatosEspecificaciones.Piercing,
    OtraSenaAgresor: uD.DatosAgresor2.Particulares,
    NumeroAgresores: uD.DatosAgresor1.CantAgresores,
    NumeroDetenidos: uD.NumeroDetenidos,
    MedioHuida: uD.Medio,
    Observaciones: uD.Observaciones1 + " " + uD.Observaciones2,
    Municipio: uD.DatosIncidente.Municipio,
    Celular: uD.DatosAfectado.Celular,
    Nombrea: uD.DatosAfectado.NombreA,
    Acosador: uD.DatosSuceso.Acosador
  })
}

export function range(start, stop, step) {
const range = Array.from({length: (stop - start) / step + 1}, (_, i) => start + i * step)
return range
}

