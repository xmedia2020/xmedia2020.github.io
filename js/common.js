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
    CSS.menu +="height:2em;"
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

    const menu = document.createElement("div")
    menu.style.cssText = CSS.menu

    const link = document.createElement("a")
    link.innerHTML =  "← index"
    link.href = "../../../index.html"
    link.style.cssText = CSS.a
    link.addEventListener("mouseenter", (e) => {

    })
    link.addEventListener("mouseleave", (e) => {

    })

    // 2. Micro navigazione ------------------------------------------------
    const parent = document.body
    menu.appendChild(link)
    parent.insertBefore(menu, document.body.firstChild)

    // 3. Commento audio ---------------------------------------------------

    const AUDIO_FILE = 'commento.mp3'

    const sound = new Audio(AUDIO_FILE)

    sound.addEventListener('canplaythrough', function(e){
        const play_btn = document.createElement('button')
        play_btn.id = "play_btn"
        play_btn.innerHTML = "♫"
        menu.appendChild(play_btn)

        play_btn.addEventListener('click', function() {
            if (this.dataset.playing == 'true') {
                this.dataset.playing = 'false'
                sound.pause()
                sound.currentTime = 0
            } else {
                this.dataset.playing = 'true'
                sound.play()
            }
        })
    })

    sound.load()

}
