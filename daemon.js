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