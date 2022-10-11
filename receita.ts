const root = document.querySelector("#root");
const title = document.querySelector("title")

function renderReceita() {
    const receita = JSON.parse((localStorage.getItem("listaFinal") as string))[Number(sessionStorage.getItem("link"))];
    (title as HTMLTitleElement).text = receita.Name;
    const ingredients = receita.Ingredients;    
    (root as HTMLElement).innerHTML += `
    <div id="container-superior"><img id="img" src="${receita.urlImage}">
    <div id="lista">
    <h1>${receita.Name}</h1>
    <p>Autor: ${receita.Author}</p>
    <div id="tituloLista">Ingredientes</div>
    <ul id="listaIngredientes"></ul></div></div>
    <div id="modoPreparo"><h1>Método de preparo</h1>
    ${receita.Method}</div>
    <a href="index.html" id="link">Voltar</a>`;
    const listaIngredientes = document.querySelector("#listaIngredientes");
    (listaIngredientes as HTMLElement).innerHTML= '';
    ingredients.map((element,index)=>{(listaIngredientes as HTMLElement).innerHTML += `<li id=${index}> ${element} </li>`});
    
}