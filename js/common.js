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


    function init_menu(dati, current_index) {

        // --- Output -------------------------------------------

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
        `;

        menu.innerHTML = html

         // --- Sound -------------------------------------------
        window.AudioContext = window.AudioContext || window.webkitAudioContext // WebKit 2020 ?


        const audio_ctx = new AudioContext()
        const sound = new Audio('commento.mp3')
        sound.load() // Must be called (Safari, See QUIRK note below)


        // sound.addEventListener("loadedmetadata", e => console.log("1. loadedmetadata"))
        // sound.addEventListener("loadeddata",     e => console.log("2. loadeddata"))
        // sound.addEventListener("canplay",        e => console.log("3. canplay"))
        // sound.addEventListener("canplaythrough", e => console.log("4. canplaythrough"))
        // sound.addEventListener("play",           e => console.log("5. play") )
        sound.addEventListener("ended", e => {
            // console.log("6. ended")
            sound.currentTime = 0
            play_btn.dataset.playing = 0
        })

        let analyser, buffer_data
        const play_btn = menu.querySelector(".btn_play")

        let __run_once__ = false
        play_btn.addEventListener('click', e => {
            // QUIRK: analyser MUST be created after .load() for Safari (Version 13.1)
            //             and MUST be created after "canplay" event (???)
            //             and MUST be created after "canplaythrough" event (???)
            //             if it's sevred from GitHub.io (it works locally...)
            if(!__run_once__) {
                __run_once__ = true
                analyser = audio_ctx.createAnalyser()
                analyser.fftSize = 256
                analyser.connect(audio_ctx.destination)
                buffer_data = new Uint8Array(analyser.frequencyBinCount)
                const audio_src = audio_ctx.createMediaElementSource(sound)
                audio_src.connect(analyser)
                requestAnimationFrame(render)
            }
            if (e.target.dataset.playing == 1) {
                e.target.dataset.playing = 0
                sound.pause()
            } else {
                e.target.dataset.playing = 1
                sound.play()
            }
        })


        // --- Canvas -------------------------------------------
        const canvas = menu.querySelector("canvas")
        const ctx = canvas.getContext('2d')
        const w = 128
        const h = 24
        canvas.width = w
        canvas.height = h

        ctx.strokeStyle = 'white'
        ctx.fillStyle   = 'white'
        ctx.lineWidth   = 1
        ctx.beginPath()
        ctx.moveTo(0, h/2, w, h/2)
        ctx.lineTo(i, y)
        ctx.stroke()

        function render() {

            requestAnimationFrame(render)

            analyser.getByteTimeDomainData(buffer_data)

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
    }
}
