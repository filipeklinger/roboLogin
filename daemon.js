function ajaxLoadGET(url, funcaoParse) {
    //var xhttp = new XMLHttpRequest();//Objeto Ajax
    var xhttp;
    try {
        // Firefox, Opera 8.0+, Safari
        xhttp = new XMLHttpRequest();
    } catch (e) {
        // Internet Explorer
        try {
            xhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("Esse site não funciona no seu navegador, Use o chrome.");
                return false;
            }
        }
    }
    xhttp.onreadystatechange = function () {//toda vez que mudar estado chama a funcao
        if (xhttp.readyState === 4) {//estado 4 é quando recebe a resposta
            funcaoParse(this.responseText,this.status);
        }
    };
    
    if (xhttp.overrideMimeType) {
        xhttp.overrideMimeType('application/json');
    }
    xhttp.open("GET", url);
    xhttp.send();

}

function verificaConectividade() {
    moment.locale('pt-br');
    $('#ultimaVer').empty().append(moment().format('D MMMM  YYYY, HH:mm:ss'))
    $('conexaoStatus').empty().append('<img src="./loader/blue.svg" width="20px"/>');
    url = 'https://api.openweathermap.org/data/2.5/weather?q=Seropedica&appid=31be04b6b19ed74e39655fd773ff1072&units=metric';
    ajaxLoadGET(url, parseResponse)
}
function parseResponse(response,status){
    determinaAcao(status);
    try{
        let json = JSON.parse(response);
        resposta = 
        'Local: '+json.name+
        '<br/>Temperatura: '+json.main.temp+
        '<br/>Minima: '+json.main.temp_min+
        '<br/>Maxima: '+json.main.temp_max
    }catch(e){
        resposta = e;
        console.log(json)
    }
    $('#response').empty().append( resposta );
    
}

function determinaAcao(status) {
    feedBack = $('#conexaoStatus')
    feedBack.empty().append((status == 200)? '200 Conectado': status+' Tentando Reconectar');
    if(status == 200){
        //não precisa de Login
    }else{
        loginProxy();
    }
}

function loginProxy() {
    host = 'http://10.0.0.103/ced';
    url = `${host}/portal/controle/login.php?req=processaLogin`;
    parametros = {login: 'master_adm',senha: '123'}
    $.post(url,parametros)
        .done((response)=>{
            $('#paginaLogin').empty().append(response);
            umSegundo = 1000;
            setTimeout(verificaConectividade,30*umSegundo);
        });
}