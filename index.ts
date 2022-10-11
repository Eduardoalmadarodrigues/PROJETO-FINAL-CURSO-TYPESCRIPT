const root = document.querySelector("#root"); //index
const nome = document.querySelector("#nome");
const ingredientes = document.querySelector("#ingredientes");
const qdtReceitas = document.querySelector('#qtdReceitas');
const pagina = document.querySelector('#pagina');
const foto = document.querySelector('#foto');


type Receita = {
    Name: String;
    Url: String;
    Description: String;
    Author: String;
    Ingredients: String[];
    Method: String[];
    urlImage: String;    
}

// conexão api tradutora
async function translatedSearch():Promise<void> {
    if ((ingredientes as HTMLInputElement).value !== "") {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${(ingredientes as HTMLInputElement).value}&langpair=pt|en`);
        if (response.ok) {
            const data = await response.json();
            (ingredientes as HTMLInputElement).value = data.responseData.translatedText;
            render();
        }

    } else window.alert("Você precisa digitar algum ingrediente para pesquisar traduzido!")
};

// pega json da api e guarda no localstorage
async function getJson():Promise<void> {
    sessionStorage.clear();
    const response = await fetch("https://receitas-server.vercel.app/api");
    if (response.ok) {
        const data = await response.json();
        sessionStorage.clear;
        sessionStorage.setItem("json", JSON.stringify(data));
        render();
    } else console.log("deu ruim nas receitas");
}

// renderiza lista de links / filtros
function render():void {
    const data = JSON.parse((sessionStorage.getItem("json") as string));
    const paginaAtual = (pagina as HTMLInputElement).value;
    const listaFiltrada: Array<Object> = [];
    const ingred = (ingredientes as HTMLInputElement).value.toLowerCase().split(',');
    ingred.forEach((element , index)=> {ingred[index] = ingred[index].trim()} );
    data.map((obj:Receita) => {
        let repetido = false;
       {
            ingred.forEach(element => {
                if ((element != '')||((ingredientes as HTMLInputElement).value=='')){                
                    if(!repetido){
                    if (
                    (obj.Name.toLowerCase().includes((nome as HTMLInputElement).value.toLowerCase()) || (nome as HTMLInputElement).value === '') &&
                    (obj.Ingredients.toString().toLowerCase().includes(element))) {
                    listaFiltrada.push(JSON.stringify(obj));
                    repetido = true;
                }}}
        })}})
    //tive que fazer um for pra tirar obj por obj de dentro da lista pois da erro no parse ao fazer em todos juntos...
    if(listaFiltrada.length > 0){
        const listaFinal: Array<Object> = []
        listaFiltrada.forEach(obj => {
            listaFinal.push(JSON.parse((obj as string)))
        })
        // qtdPaginas = paginas ao total baseado na lista.length
        let qtdPaginas = listaFinal.length / Number((qdtReceitas as HTMLInputElement).value);
        if(!Number.isInteger(qtdPaginas)){
            qtdPaginas++;//adiciona uma página para exibir o resto dos itens
        }
        (pagina as HTMLInputElement).innerHTML = '';
        for (let x = 1; x <= qtdPaginas; x++) {
            (pagina as HTMLInputElement).innerHTML += `<option value="${x}">${x}</option>`
        }
        (pagina as HTMLInputElement).value = paginaAtual;
        const receitaInicial = (Number(paginaAtual) * Number((qdtReceitas as HTMLInputElement).value)) - Number((qdtReceitas as HTMLInputElement).value);
        const receitaFinal = Number(receitaInicial) + Number((qdtReceitas as HTMLInputElement).value);
        (root as HTMLElement).innerHTML = '';
        localStorage.removeItem('listaFinal')
        localStorage.setItem('listaFinal', JSON.stringify(listaFinal));
        listaFinal.map((object, index) => {
            if (receitaInicial <= index && index + 1 <= receitaFinal) {
                (root as HTMLElement).innerHTML += `<button class="receitaButton" id="${index}" onClick="handleClickReceita(this)" onMouseOut="handleMouseOutFoto(this)" onMouseEnter="handleMouseEnterFoto(this)">${index + 1} - ${(object as Receita).Name}</button>`;
            }
        });
        if (!(pagina as HTMLInputElement).value) {
            (pagina as HTMLInputElement).value = '1'
            render();
        }
    }else (root as HTMLElement).innerHTML = "<h1>Nenhum resultado encontrado!</h1>"
}

//envia para prox pagina / coloca id do botao clicado no storage
function handleClickReceita(event) {
    console.log(`${event.id}`);
    sessionStorage.setItem("link", `${event.id}`);
    window.location.replace("receita.html");
}

//renderiza receita escolhida


function handleMouseEnterFoto(event){
    const data = JSON.parse((localStorage.getItem("listaFinal") as string));
    let img = data[event.id].urlImage;
    (foto as HTMLElement).innerHTML = `<h1>${data[event.id].Name}</h1>
    <img class="img" src="${img}" alt="Foto de ${data[event.id].Name}">
    <p>Autor: ${data[event.id].Author}</P>
    <p>${data[event.id].Description}`
}

function handleMouseOutFoto(event){
    (foto as HTMLElement).innerHTML = `
    <img class="img" src="./logo.png" alt="Logo">
    <p>Temos diversas receitas disponíveis. Caso queira pesquisar por mais de um ingrediente de uma vez,
     separe-os por vírgula. Como as receitas estão em ingles, caso queira pesquisar usando ingredientes em
      português, use o botão de pesquisa traduzida.</p>`;
}