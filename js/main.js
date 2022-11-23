let link = document.querySelector("#inputLink");
let btn = document.querySelector("#btnShorten");
let resultado = document.querySelector("#res");

btn.addEventListener("click", encurtarLink);

async function encurtarLink() {
    try{
        let api = await fetch(`https://api.shrtco.de/v2/shorten?url=${link.value}`).then(response => response.json());
        let apiConvertida = api.result
        console.log(apiConvertida)
        imprimirResultado(link.value, apiConvertida.full_short_link);

        
    } catch(erro) {
        alert("Infelizmente esse link não pode ser encurtado!")
    } finally {
        link.value = ``
    }
}


function imprimirResultado(linkGrande, linkCurto){
    
    let div = document.createElement("div");
    div.classList.add("resultado");
    resultado.appendChild(div);

    let resultadoAntigo = document.createElement("p");
    resultadoAntigo.classList.add("resultado__antigo");
    resultadoAntigo.innerHTML = `${linkGrande.substr(0, 40)}...`;
    div.appendChild(resultadoAntigo);

    let resultadoNovo = document.createElement("a");
    resultadoNovo.classList.add("resultado__novo");
    resultadoNovo.setAttribute("href", `${linkCurto}`);
    resultadoNovo.setAttribute("target", `_blank`);
    resultadoNovo.textContent = `${linkCurto}`
    div.appendChild(resultadoNovo);


    let botaoDeCopiar = document.createElement("button");
    botaoDeCopiar.classList.add("resultado__btn");
    botaoDeCopiar.innerHTML = `Copiar`;
    botaoDeCopiar.addEventListener("click", () => {
        navigator.clipboard.writeText(resultadoNovo);
        botaoDeCopiar.innerHTML = `Copiado!`
        botaoDeCopiar.classList.add("copied")
    });
    div.appendChild(botaoDeCopiar);

}
