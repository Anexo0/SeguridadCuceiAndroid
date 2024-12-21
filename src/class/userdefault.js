class UserDefault {
  constructor() {

    // Datos Formulario Vista Afectado
    this.DatosAfectado = {
      IdEscuela: -1,
      Edad: 0,
      Fecha: '',
      Sede: '',
      Nombre: '',
      Turno: '',
      Sexo: '',
      Grado: '',
      Grupo: '',
      Correo: '',
      Telefono: '',
      Prepa: 0,
      Universidad: 1,
      Dependencia: 0,
      Celular: '',
      NombreA: '',
    }
    

    // Datos Formulario Vista Incidente
    this.DatosIncidente = {
      Interno: 1,
      EnZonaMetropolitana: 0,
      Lugar: '',
      Latitud: 0.0,
      Longitud: 0.0,
      Municipio: '',
      NumeroAgraviados: 0,
    }

    // Datos Formulario Vista Suceso
    this.DatosSuceso = {
      suceso: '',
      Agresion: '',
      Secuestro: '',
      RoboArma: '',
      RoboArmaB: '',
      Extorsion: '',
      Violacion: '',
      Acosador: '',
      BajoDrogas: '',
      Otro: '',
    }

    // Datos Formulario Vista Agresor_1
    this.DatosAgresor1 = {
      CantAgresores: 0,
      Estatura: '0',
      EdadAprox: 0,
      Suceso2: '',
    }

    // Datos Formulario Vista Agresor_2
    this.DatosAgresor2 = {
      Tez: '',
      OjosT: '',
      OjosC: '',
      Boca: '',
      CabelloT: '',
      CabelloC: '',
      Particulares: '',
      Apariencia: '',
    };

    // Datos Formulario Vista Especificaciones
    this.DatosEspecificaciones = {
      Cicatriz: '',
      TipoRopa: '',
      Gorra: '',
      Tatuajes: '',
      Piercing: '',
    }

    // Datos Formulario Vista Configuración
    this.Configuracion = {
      Correo: '',
      Telefono: '',
      Celular: '',
    }

    // Datos Formulario Vista Agresor_3
    this.Cara = null;
    // Datos Formulario Vista DatosFinales_1
    this.Medio = null;
    this.Observaciones1 = null;
    // Datos Formulario Vista DatosFinales_2
    this.Observaciones2 = null;
    this.NumeroDetenidos = 0;
    
    this.FullName = null;
    this.Aviso = null;
    this.Incidente = 0;
  }
}

export default UserDefault