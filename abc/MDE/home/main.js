/**
 * 
 */

let dati

// Carichiamo il file esterno "dati.json"
// tramite la funzione "fetch(URL)"
fetch("dati.json").then(function(res) {
    return res.json() // Una volta caricato viene "parsato" (trasformato in JSON)
}).then(function(json) {
    render(json) // Chiamiamo la funzione "render(dati)"
    // con parametro i nostri dati ordinati..
})

// Questa funzione viene chiamata (vedi sopra)
// una volta che i nostri dati sono stati caricati.
// Il parametro sono i dati stessi (possono essere ordinati prima...s)
function render(dati, letter) {
    if (letter == undefined){
        letter = "A"
    }
    debugger
    const divInfo = document.querySelector("#info")
    const divLetter = document.querySelector("#letter")
    divInfo.innerHTML = ""
    divLetter.innerHTML = ""

    const BASE_FOLDER = "abc"

    //metto in un array tutti gli elementi con quella lettera
    let selection = [];
    for (let i = 0; i < dati.length; i++) {
        if(dati[i].lettera === letter){
            selection.push(dati[i])
        }
    }


    if(selection.length > 0){
        const cLetter = selection[0]
        const el = document.createElement("div")
        el.classList.add("infoDescr")
        const url = BASE_FOLDER + "/" + cLetter.nome + "/" + cLetter.cartella + "/index.html"

        el.innerHTML = ` 
                        <li> lettera: ${cLetter.lettera} </li>
                        <li> nome: ${cLetter.nome}, ${cLetter.nomeCompleto} </li>
                        <li> descrizione: ${cLetter.descrizione} </li>


        `
        divInfo.appendChild(el)
    }
    

    // const BASE_FOLDER = "abc"
    // for (let i = 0; i < dati.length; i++) {



    //     const el = document.createElement("li")
    //     const url = BASE_FOLDER + "/" + dati[i].nome + "/" + dati[i].cartella + "/index.html"
    //     el.innerHTML += "<a href=" + url + "><span class='link'></span></a>"
    //     el.innerHTML += "<span class='nome'>" + dati[i].nome + "</span>"
    //     el.innerHTML += "<span class='data'>" + dati[i].data + "</span>"
    //     el.innerHTML += "<span class='cartella'>" + dati[i].cartella + "</span>"
    //     el.innerHTML += "<span class='descrizione'>" + dati[i].descrizione + "</span>"
    //     el.innerHTML += "<span class='lettera'>" + (dati[i].lettera || "&nbsp;") + "</span>"
    //     parent.appendChild(el)
    // }
}

// --- FUNZIONI di SORT -------------------------------------------

function ordina_per_nome(dati) {
    // Usiamo questa funzione per ordinare i dati in funzione dell'autore
    const dati_ordinati = dati.sort(function(a, b) {
        return a.nome >= b.nome // maggiore e minore funziona anche con lettere dell'alfabeto
        // p.es
        // 'a' < 'b' (true)
        // 'd' < 'c' (false)
        // 'A' < 'a' (true, viene prima la maiuscola)
    })
    return dati_ordinati
}

// --- EVENTI -----------------------------------------------------

window.addEventListener("keypress", function(e) {
    if (e.key == '1') {
        dati = ordina_per_nome(dati)
        render(dati)
    } else if (e.key == '2') {
        dati = ordina_per_lettera(dati)
        render(dati)
    } else if (e.key == '3') {
        dati = ordina_per_data(dati)
        render(dati)
    }
    document.body.removeChild(document.querySelector(".info"))
})

function parseInput(key) {
    //devo convertire il dato grezzo che entra al clic della tastiera, 
    // in una lettera che posso usare come parametro della funzione 
}