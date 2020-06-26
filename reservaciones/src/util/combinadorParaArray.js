//Funcion para calacular factorial de un número
const factorial = (numero) => {
    let resultado = 1;
    for(let i = 1; i <= numero; i++){
        resultado *= i;
    }
    return(resultado);
}

//Función combinatoria, sin importar orden y sin repetir valores
const combinatoria = (n, m) => {
    return (factorial(n)/(factorial(n-m)*factorial(m)))
}


const combinador = (array) => {
    let combinaciones = [];
    let arrayDeIndices = [];
    let indiceMaximo = array.length - 1;
    for(let i = 2; i <= array.length; i++){
        //Primera combinación
        for(let k = 0; k < i; k++){
            arrayDeIndices[k] = k;
        }
        for(let j = 1; j <= combinatoria(array.length, i); j++){
            let combinacion = [];
            //Se extraen valores de array y se genera la combinación
            for(let k = 0; k < i; k++){
                combinacion[k] = array[arrayDeIndices[k]];
            }
            combinaciones.push(combinacion);
            //Logica de sucecion
            for(let k = 0; k < i; k++){
                if(k === i - 1 && arrayDeIndices[i - 1] < indiceMaximo){
                    arrayDeIndices[k]++;
                } else {
                    if(arrayDeIndices[k + 1] === indiceMaximo - i + 2 + k){
                        arrayDeIndices[k]++;
                        arrayDeIndices[k + 1] = arrayDeIndices[k];
                    }
                }
            }
        }
    }
    return combinaciones;
}

export default combinador;