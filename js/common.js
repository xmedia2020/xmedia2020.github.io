/*
 *  ABC - Menu
 *  Questo frammento di codice è inserito in tutte le pagine del progetto.
 *  Assume diverse funzioni:
 *  1. sovrascrive alcuni eventi di default (touchmove)
 *  2. inietta la micro navigazione per tornare all'indice
 *  3. inserisce bottone al commento audio
 */

// 1. Disabilita "bounce" -----------------------------------------------.--
document.ontouchmove = function(e){
    e.preventDefault()
}


window.addEventListener("load", run)

function run() {

    fetch("/dati.json").then(function(res){
        return res.json()
    }).then(function(json){

        let dati
        dati = ordina_per_lettera(json) // ordiniamo per data...
        dati = ordina_per_nome(dati)    // ... e poi per autore!

        const url_chunks = location.pathname.split("/")
        const nome       = url_chunks[url_chunks.length - 3]
        const cartella   = url_chunks[url_chunks.length - 2]
        const current_index = dati.findIndex(e => (e.nome == nome && e.cartella == cartella))

        window.localStorage.setItem(nome + "/" + cartella, 1) // la pagina è stata visitata, marchiamolo nel local storage

        init_menu(dati, current_index)
    })

    // --- Funzioni di sort -------------------------------------------
    function ordina_per_nome(dati) {
        // Usiamo questa funzione per ordinare i dati in funzione dell'autore
        const dati_ordinati = dati.sort(function(a, b){
            return a.nome >= b.nome         // maggiore e minore funziona anche con lettere dell'alfabeto
                                            // p.es
                                            // 'a' < 'b' (true)
                                            // 'd' < 'c' (false)
                                            // 'A' < 'a' (true, viene prima la maiuscola)
        })
        return dati_ordinati
    }

    function ordina_per_lettera(dati) {
        const dati_ordinati = dati.sort(function(a, b){
            return a.lettera >= b.lettera
        })
        return dati_ordinati
    }

    function ordina_per_data(dati) {
        const dati_ordinati = dati.sort(function(a, b){
            return a.data >= b.data
        })
        return dati_ordinati
    }




    // --- Output -------------------------------------------
    function init_menu(dati, current_index) {
        const menu = document.createElement("div")
        menu.classList.add("minimenu")
        const parent = document.body
        parent.insertBefore(menu, document.body.firstChild)

        const prev = dati[(current_index + dati.length - 1) % dati.length]
        const next = dati[(current_index + 1) % dati.length]


        let html = `
            <ul>
            <li><a class="btn btn_prev" href="/abc/${prev.nome + "/" + prev.cartella}"></a></li>
            <li><a class="btn btn_next" href="/abc/${next.nome + "/" + next.cartella}"></a></li>
            <li><a class="btn btn_home" href="/index.html"></a></li>
            <li><span class="nome">${dati[current_index].nomeCompleto + " (" + dati[current_index].nome + ")"}<span></li>
            <li><span class="btn btn_play"></span></li>
            <li><canvas></canvas></li>
            </ul>
            <audio src="commento.mp3" type=""></audio>
        `;

        menu.innerHTML = html

        //const sound = new Audio(AUDIO_FILE)
        const sound = menu.querySelector("audio");
        // const AUDIO_FILE = 'commento.mp3'
        // sound.src = AUDIO_FILE
        // menu.appendChild(sound)
        // sound.crossorigin = "anonymous"
        // sound.preload = "auto"

        const play_btn = menu.querySelector(".btn_play");
        play_btn.addEventListener('click', function() {
            if (this.dataset.playing == 'true') {
                this.dataset.playing = 'false'
                sound.pause()
            } else {
                this.dataset.playing = 'true'
                sound.play()
            }
        })

        sound.addEventListener('ended', (e)=>{
            play_btn.dataset.playing = 'false'
            sound.load()            // Safari FIX
            sound.currentTime = 0.0 // Non funziona su safari...?
        })

        // Visualizer
        const audio_ctx = new (window.AudioContext || window.webkitAudioContext)()
        const audio_src = audio_ctx.createMediaElementSource(sound)

        // const dest = audio_ctx.createGain()
        // dest.gain.value = 1.0
        // dest.connect(audio_ctx.destination)

        //audio_src.connect(dest)

        const analyser = audio_ctx.createAnalyser()
        analyser.fftSize = 256

        audio_src.connect(analyser)
        analyser.connect(audio_ctx.destination)

        const buffer_data = new Uint8Array(analyser.frequencyBinCount)

        // Canvas
        const canvas = menu.querySelector("canvas")
        const ctx = canvas.getContext('2d')
        const w = buffer_data.length
        const h = 24
        canvas.width = w
        canvas.height = h

        function render() {
            analyser.getByteTimeDomainData(buffer_data)

            requestAnimationFrame(render)

            ctx.strokeStyle = 'white'
            ctx.fillStyle = 'white'
            ctx.lineWidth = 1

            ctx.clearRect(0, 0, w, h)
            ctx.beginPath()
            for (let i=0; i<=buffer_data.length; i++){
                const y = (buffer_data[i]-128) / 128.0 * h*2 + h/2 + 0.5 // per avere la linea nitida spostiamo di 0.5px
                ctx.lineTo(i, y)
            }
            ctx.stroke()

            const rad = 2.5
            const idx = Math.floor(sound.currentTime / sound.duration * (w-1)) || 0
            const y = (buffer_data[idx]-128) / 128.0 * h*2 + h/2
            ctx.beginPath()
            ctx.ellipse(idx+rad, y, rad, rad, 0, 0, Math.PI * 2, false)
            ctx.fill()
        }
        requestAnimationFrame(render)
    }
}
