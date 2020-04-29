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

    const HASH = location.hash.substr(1)
    const CSS  = {}

    CSS.menu  = ""
    CSS.menu +="width:10em;"
    // CSS.menu +="height:2em;"
    CSS.menu +="padding:0.5em;"
    CSS.menu +="background-color:red;"
    CSS.menu +="position:fixed;"
    CSS.menu +="right:1em;"
    CSS.menu +="top:1em;"
    // CSS.menu +="text-align:center;"
    // CSS.menu +="line-height:4.75em;"
    // CSS.menu +="border-radius:50%;"

    CSS.a     = ""
    CSS.a    += "text-decoration:none;"
    CSS.a    += "color:white;"
    CSS.a    += "display:block;"

    const menu = document.createElement("div")
    menu.style.cssText = CSS.menu

    const link = document.createElement("a")
    link.innerHTML =  "← ABC"
    link.href = "../../../index.html"
    link.style.cssText = CSS.a

    // 2. Micro navigazione ------------------------------------------------
    const parent = document.body
    menu.appendChild(link)
    parent.insertBefore(menu, document.body.firstChild)

    // 3. Commento audio ---------------------------------------------------

    const AUDIO_FILE = 'commento.mp3'

    //const sound = new Audio(AUDIO_FILE)
    const sound = document.createElement('audio');
    sound.src = AUDIO_FILE
    // sound.crossorigin = "anonymous"

    // Bottone
    const play_btn = document.createElement('button')
    play_btn.innerHTML = "♫"
    menu.appendChild(play_btn)

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
        sound.currentTime = 0.0 // FF is ok with just this...
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
    const canvas = document.createElement("canvas")
    menu.appendChild(canvas)
    const ctx = canvas.getContext('2d')
    const w = buffer_data.length
    const h = 24
    canvas.width = w
    canvas.height = h


    function render() {
        analyser.getByteTimeDomainData(buffer_data)

        requestAnimationFrame(render)

        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'yellow'
        ctx.lineWidth = 1

        ctx.fillRect(0, 0, w, h)
        ctx.beginPath()
        for (let i=0; i<=buffer_data.length; i++){
            const y = (buffer_data[i] / 128.0) * h/2
            ctx.lineTo(i, y)
        }
        ctx.stroke()

    }
    requestAnimationFrame(render)

}
