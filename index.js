var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var root = document.querySelector("#root"); //index
var nome = document.querySelector("#nome");
var ingredientes = document.querySelector("#ingredientes");
var qdtReceitas = document.querySelector('#qtdReceitas');
var pagina = document.querySelector('#pagina');
var foto = document.querySelector('#foto');
// conexão api tradutora
function translatedSearch() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(ingredientes.value !== "")) return [3 /*break*/, 4];
                    return [4 /*yield*/, fetch("https://api.mymemory.translated.net/get?q=".concat(ingredientes.value, "&langpair=pt|en"))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    ingredientes.value = data.responseData.translatedText;
                    render();
                    _a.label = 3;
                case 3: return [3 /*break*/, 5];
                case 4:
                    window.alert("Você precisa digitar algum ingrediente para pesquisar traduzido!");
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
;
// pega json da api e guarda no localstorage
function getJson() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sessionStorage.clear();
                    return [4 /*yield*/, fetch("https://receitas-server.vercel.app/api")];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    sessionStorage.clear;
                    sessionStorage.setItem("json", JSON.stringify(data));
                    render();
                    return [3 /*break*/, 4];
                case 3:
                    console.log("deu ruim nas receitas");
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// renderiza lista de links / filtros
function render() {
    var data = JSON.parse(sessionStorage.getItem("json"));
    var paginaAtual = pagina.value;
    var listaFiltrada = [];
    var ingred = ingredientes.value.toLowerCase().split(',');
    ingred.forEach(function (element, index) { ingred[index] = ingred[index].trim(); });
    data.map(function (obj) {
        var repetido = false;
        {
            ingred.forEach(function (element) {
                if ((element != '') || (ingredientes.value == '')) {
                    if (!repetido) {
                        if ((obj.Name.toLowerCase().includes(nome.value.toLowerCase()) || nome.value === '') &&
                            (obj.Ingredients.toString().toLowerCase().includes(element))) {
                            listaFiltrada.push(JSON.stringify(obj));
                            repetido = true;
                        }
                    }
                }
            });
        }
    });
    //tive que fazer um for pra tirar obj por obj de dentro da lista pois da erro no parse ao fazer em todos juntos...
    if (listaFiltrada.length > 0) {
        var listaFinal_1 = [];
        listaFiltrada.forEach(function (obj) {
            listaFinal_1.push(JSON.parse(obj));
        });
        // qtdPaginas = paginas ao total baseado na lista.length
        var qtdPaginas = listaFinal_1.length / Number(qdtReceitas.value);
        if (!Number.isInteger(qtdPaginas)) {
            qtdPaginas++; //adiciona uma página para exibir o resto dos itens
        }
        pagina.innerHTML = '';
        for (var x = 1; x <= qtdPaginas; x++) {
            pagina.innerHTML += "<option value=\"".concat(x, "\">").concat(x, "</option>");
        }
        pagina.value = paginaAtual;
        var receitaInicial_1 = (Number(paginaAtual) * Number(qdtReceitas.value)) - Number(qdtReceitas.value);
        var receitaFinal_1 = Number(receitaInicial_1) + Number(qdtReceitas.value);
        root.innerHTML = '';
        localStorage.removeItem('listaFinal');
        localStorage.setItem('listaFinal', JSON.stringify(listaFinal_1));
        listaFinal_1.map(function (object, index) {
            if (receitaInicial_1 <= index && index + 1 <= receitaFinal_1) {
                root.innerHTML += "<button class=\"receitaButton\" id=\"".concat(index, "\" onClick=\"handleClickReceita(this)\" onMouseOut=\"handleMouseOutFoto(this)\" onMouseEnter=\"handleMouseEnterFoto(this)\">").concat(index + 1, " - ").concat(object.Name, "</button>");
            }
        });
        if (!pagina.value) {
            pagina.value = '1';
            render();
        }
    }
    else
        root.innerHTML = "<h1>Nenhum resultado encontrado!</h1>";
}
//envia para prox pagina / coloca id do botao clicado no storage
function handleClickReceita(event) {
    console.log("".concat(event.id));
    sessionStorage.setItem("link", "".concat(event.id));
    window.location.replace("receita.html");
}
//renderiza receita escolhida
function handleMouseEnterFoto(event) {
    var data = JSON.parse(localStorage.getItem("listaFinal"));
    var img = data[event.id].urlImage;
    foto.innerHTML = "<h1>".concat(data[event.id].Name, "</h1>\n    <img class=\"img\" src=\"").concat(img, "\" alt=\"Foto de ").concat(data[event.id].Name, "\">\n    <p>Autor:").concat(data[event.id].Author, "</P>\n    <p>").concat(data[event.id].Description);
}
function handleMouseOutFoto(event) {
    foto.innerHTML = "\n    <img class=\"img\" src=\"./logo.png\" alt=\"Logo\">\n    <p>Temos diversas receitas dispon\u00EDveis. Caso queira pesquisar por mais de um ingrediente de uma vez,\n     separe-os por v\u00EDrgula. Como as receitas est\u00E3o em ingles, caso queira pesquisar usando ingredientes em\n      portugu\u00EAs, use o bot\u00E3o de pesquisa traduzida.</p>";
}
