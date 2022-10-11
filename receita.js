var root = document.querySelector("#root");
var title = document.querySelector("title");
function renderReceita() {
    var receita = JSON.parse(localStorage.getItem("listaFinal"))[Number(sessionStorage.getItem("link"))];
    title.text = receita.Name;
    var ingredients = receita.Ingredients;
    root.innerHTML += "\n    <div id=\"container-superior\"><img id=\"img\" src=\"".concat(receita.urlImage, "\">\n    <div id=\"lista\">\n    <h1>").concat(receita.Name, "</h1>\n    <p>Autor: ").concat(receita.Author, "</p>\n    <div id=\"tituloLista\">Ingredientes</div>\n    <ul id=\"listaIngredientes\"></ul></div></div>\n    <div id=\"modoPreparo\"><h1>M\u00E9todo de preparo</h1>\n    ").concat(receita.Method, "</div>\n    <a href=\"index.html\" id=\"link\">Voltar</a>");
    var listaIngredientes = document.querySelector("#listaIngredientes");
    listaIngredientes.innerHTML = '';
    ingredients.map(function (element, index) { listaIngredientes.innerHTML += "<li id=".concat(index, "> ").concat(element, " </li>"); });
}
