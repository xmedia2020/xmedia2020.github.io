// const divLetter = document.querySelector("#letter")
// const divInfo1 = document.querySelector("#info1")
// const divInfo2 = document.querySelector("#info2")
// const divPlay = document.querySelector("#play")
const divInfo = document.querySelector("#info")
updateData(null)
// updateData({
//  lettera:         " ", 
//     nome:           " ",
//     nomeCompleto:       " ", 
//     cartella:           " ",
//     data:           " ",
//     input:          " ", 
//     tecnica:      " ",
//     descrizione:    " " 
// })


function updateData(data = null) {
    divInfo.innerHTML = ""
    if (data) {
        console.log(data)
        const isVisited = localStorage.getItem(data.nome + "/" + data.cartella) == 1

        //--divLetter----------------------------------------------------
        const letterDiv = document.createElement("div")
        letterDiv.id = "letter"
        letterDiv.innerHTML = `<p>${data.lettera}</p>`
        divInfo.appendChild(letterDiv)


        //--divInfo1----------------------------------------------------
        const info1Div = document.createElement("div")
        info1Div.id = "info1"
        info1Div.innerHTML += `
        <table>
            <col width="30%" /> 
            <col width="70%" />  
            <tr>
                <td>Autore</td>
                <td>${data.nomeCompleto}</td>
            </tr> 
            <tr>
                <td>Data</td>
                <td>${data.data}</td>
            </tr>
            <tr>
                <td>Tecnica</td>
                <td>${data.tecnica}</td>
            </tr>
            <tr>
                <td>input</td>
                <td>${data.input}</td>
            </tr>
        </table>
        `
        divInfo.appendChild(info1Div)


        //--div2----------------------------------------------------
        const info2Div = document.createElement("div")
        info2Div.id = "info2"
        info2Div.innerHTML += `
        <table>
            <col width="25%" /> 
            <col width="75%" /> 
            <tr>
                <td class="fix">Descrizione</td>
                <td>${data.descrizione}</td>
            </tr> 
        </table>
        `
        divInfo.appendChild(info2Div)

        //--divPlay----------------------------------------------------
        const playDiv = document.createElement("div")
        playDiv.id = "play"
        const button = document.createElement("a")
        button.setAttribute("href", `/abc/${data.nome}/${data.cartella}/index.html`)
        if (!isVisited) {
            button.innerHTML = `<p>PLAY</p>`
        } else {
            button.innerHTML = `<p>PLAY AGAIN</p>`
        }

        playDiv.appendChild(button)
        divInfo.appendChild(playDiv)
    } else {

        //--divSelectLetter----------------------------------------------------
        const selectLetterDiv = document.createElement("div")
        selectLetterDiv.id = "selectLetter"
        selectLetterDiv.innerHTML += `<p>Seleziona una lettera</p>`
        divInfo.appendChild(selectLetterDiv)
    }

}