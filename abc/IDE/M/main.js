for (let i=0; i<4000; i++) {

	const el = document.createElement("span")
	el.innerHTML = (i % 10 == 0) ? 'M' : '°'

	document.body.appendChild(el)

}

