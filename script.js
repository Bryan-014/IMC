let btnCalculo = document.querySelector("#calcular");
let txtResultado = document.querySelector("#resultado");
let lbResultado = document.querySelector("#possivelErro");

let genero;
let peso;
let altura;
let alturaConvertida;

let imc;

txtResultado.disabled = true;

var xhr = new XMLHttpRequest();
var resultado;
xhr.open("GET", "listagem.json");
xhr.addEventListener("load", () => resultado = JSON.parse(xhr.responseText));
xhr.send();

btnCalculo.addEventListener("click", (event) => {
    event.preventDefault();
    genero = document.getElementById("genero");
    peso = document.getElementById("peso");
    altura = document.getElementById("altura");

    if (!validaInformaçoes(genero.value, peso.value, altura.value))
        return;
    
    imc = calcularImc(parseFloat(peso.value), parseFloat(alturaConvertida)).toFixed(2);

    lbResultado.innerHTML = "Valor do IMC =";
    
    resultado.forEach((item) => {
        if (imc > item.min && imc < item.max)
            txtResultado.value = `${imc} - ${item.cat}`;
    });
});

function validaInformaçoes(_genero, _peso, _altura) {
    if (_genero == "null" || !_genero) {
        declararErro("Gênero não foi preenchido!!!", genero);
        return false;
    }
    
    if (!_peso) {
        declararErro("Peso não foi preenchido!!!", peso);
        return false;
    } else if (parseFloat(_peso) < 2) {
        declararErro("Peso muito baixo para ser real!!!", peso);
        return false;
    } else if (parseFloat(_peso) > 600) {
        declararErro("Peso muito alto para ser real!!!", peso);
        return false;
    } else {
        for (let i = 0; i < _peso.length; i++) {
            if (_peso[i] == ",") 
                peso.value[i] = ".";
        }
    }

    if (!_altura) {
        declararErro("Altura não foi preenchida!!!", altura);
        return false;
    } 
    for (let i = 0; i < _altura.length; i++) {
        if (_altura[i] == "." || _altura[i] == ",") {
            declararErro("Altura apenas inteiros!!!", altura);
            return false;
        }
    }
    if (parseFloat(_altura) < 54) {
        declararErro("Altura muito baixa para ser real!!!", altura);
        return false;
    } else if (parseFloat(_altura) > 246) {
        declararErro("Altura muito alta para ser real!!!", altura);
        return false;
    } else
        alturaConvertida = converterAltura(_altura);
    return true;
}

function calcularImc(_peso, _altura) {
    return _peso / (_altura*_altura);
}

function declararErro(msg, elemento) {
    lbResultado.innerHTML = "Erro"
    txtResultado.value = msg;
    elemento.focus();
}

function converterAltura(_altura) {
    let convercao = "";
    if (_altura.length > 2) {
        for (let i = 0; i < 3; i++) {
            if (i != 1)
                convercao += _altura[i];
            else {
                convercao += ".";
                convercao += _altura[i];
            }            
        }
    } else
        return _altura;
    return convercao;
}