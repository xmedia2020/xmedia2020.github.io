// const divLetter = document.querySelector("#letter")
// const divInfo1 = document.querySelector("#info1")
// const divInfo2 = document.querySelector("#info2")
// const divPlay = document.querySelector("#play")
const divInfo = document.querySelector("#info")
updateData(null)
// updateData({
// 	lettera:         " ", 
//     nome:           " ",
//     nomeCompleto:       " ", 
//     cartella:           " ",
//     data:           " ",
//     input:          " ", 
//     tecnica:      " ",
//     descrizione:    " " 
// })


function updateData(data = null) {
    if (data) {
        console.log(data)
        divLetter.innerHTML = ""
        divInfo1.innerHTML = ""
        divInfo2.innerHTML = ""
        divPlay.innerHTML = ""

        //--divLetter----------------------------------------------------
        const letterDiv = document.createElement("div")
        letterDiv.id = "letter"
        letterContent.innerHTML = `<p>${data.lettera}</p>`
        divInfo.appendChild(letterDiv)


        //--divInfo1----------------------------------------------------

        const table1 = document.createElement("table")
        table1.innerHTML += `
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
  	`
        divInfo1.appendChild(table1)


        //--div2----------------------------------------------------
        const table2 = document.createElement("table")
        table2.innerHTML += ` 
    <col width="30%" /> 
    <col width="70%" /> 
    <tr>
    	<td class="fix">Descrizione</td>
    	<td>${data.descrizione}</td>
  	</tr> 
  	`
        divInfo2.appendChild(table2)
        //--divPlay----------------------------------------------------
        const button = document.createElement("a")
        button.setAttribute("href", `/abc/${data.nome}/${data.cartella}/index.html`)
        button.innerHTML = `<p>PLAY</p>`
        divPlay.appendChild(button)
    } else {
        console.log("seleziona una lettera")
    }

}