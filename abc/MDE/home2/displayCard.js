console.log("hellou")

const divInfo1 = document.querySelector("#info1")
const divInfo2 = document.querySelector("#info2")
const divInfo3 = document.querySelector("#info3")
updateData({
	letter:         " ", 
    name:           " ",
    fullName:       " ", 
    path:           " ",
    date:           " ",
    input:          " ", 
    technique:      " ",
    description:    " " 
})

function updateData(letter){
	console.log(letter)
	divInfo1.innerHTML = ""
	divInfo2.innerHTML = ""
	divInfo3.innerHTML = ""

	//--div1----------------------------------------------------
	const el1 = document.createElement("ul")
	el1.innerHTML += `<li>nome: ${letter.name}</li>`
	el1.innerHTML += `<li>nome completo: ${letter.fullName}</li>`
	el1.innerHTML += `<li>realizzato il: ${letter.date}</li>`
	divInfo1.appendChild(el1)	

	//--div2----------------------------------------------------
	const el2 = document.createElement("ul")
	el2.innerHTML += `<li>percorso: /abc/${letter.name}/${letter.path}</li>`
	el2.innerHTML += `<li>lettera: ${letter.letter}</li>`
	el2.innerHTML += `<li>tecnica: ${letter.technique}</li>`
	el2.innerHTML += `<li>input: ${letter.input}</li>`
	divInfo2.appendChild(el2)

	//--div3----------------------------------------------------
	const el3 = document.createElement("ul")
	el3.innerHTML += `<li>descrizione: ${letter.description}`
	divInfo3.appendChild(el3)
}