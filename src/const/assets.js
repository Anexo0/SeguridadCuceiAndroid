const assets = {
    images: {
        main_logo: {uri :'asset:/images/identificador.png'},
        login_logo: {uri :'asset:/images/isotipo.png'},
        login_config: {uri :'asset:/images/icon_config.png'},
        check: {uri : 'asset:/images/checked.png'},
        uncheck: {uri : 'asset:/images/unchecked.png'},

        agresion_fisica: {uri : 'asset:/images/suceso_agresion_fisica.png'},
        arma_de_fuego: {uri : 'asset:/images/suceso_arma_de_fuego.png'},
        intento_de_secuestro: {uri : 'asset:/images/suceso_intento_de_secuestro.png'},
        arma_blanca: {uri : 'asset:/images/suceso_arma_blanca.png'},
        extorsion: {uri : 'asset:/images/suceso_extorsion.png'},
        intento_de_violacion: {uri : 'asset:/images/suceso_intento_de_violacion.png'},
        acoso: {uri : 'asset:/images/suceso_acoso.png'},
        cov_de_drogas: {uri : 'asset:/images/suceso_cov_de_drogas.png'},
        otros: {uri : 'asset:/images/suceso_otros.png'},

        alargada: {uri : 'asset:/images/cara_alargada.png'},
        rectangulo: {uri : 'asset:/images/cara_rectangulo.png'},
        redonda: {uri : 'asset:/images/cara_redonda.png'},
        cuadrada: {uri : 'asset:/images/cara_cuadrada.png'},
        triangulo_invertido: {uri : 'asset:/images/cara_triangulo_invertido.png'},
        corazon: {uri : 'asset:/images/cara_corazon.png'},
        diamante: {uri : 'asset:/images/cara_diamante.png'},
        triangulo: {uri : 'asset:/images/cara_triangulo.png'},
        ovalada: {uri : 'asset:/images/cara_ovalada.png'},

        carro: {uri : 'asset:/images/carro.png'},
        moto: {uri : 'asset:/images/moto.png'},
        a_pie: {uri : 'asset:/images/a_pie.png'},
        bicicleta: {uri : 'asset:/images/bicicleta.png'},
    },
    files: {
        pdf_aviso: {uri :'bundle-assets://files/aviso.pdf'},
        userDefault: 'files/userDefault.json',
    },
    datos: {
        url_Login: "http://148.202.152.33/incidencias/login.php?mobile=true",
        url_Insert: "http://148.202.152.33/incidencias/incidencias_insert.php",
        url_push_message: "http://148.202.152.33/incidencias/push_mensaje.php",
    }
}

export default assets;