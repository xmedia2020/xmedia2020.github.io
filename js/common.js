/*
 *  ABC - Menu
 */

// disable bounce
document.ontouchmove = function(e){
    e.preventDefault()
}
document.ontouchmove = function(e){
    e.preventDefault()
}

window.addEventListener("load", run)

function run() {

    const HASH = location.hash.substr(1)
    const CSS  = {}

    CSS.menu  = ""
    CSS.menu +="width:5em;"
    CSS.menu +="height:5em;"
    CSS.menu +="background-color:red;"
    CSS.menu +="position:absolute;"
    CSS.menu +="right:1em;"
    CSS.menu +="top:1em;"
    CSS.menu +="text-align:center;"
    CSS.menu +="line-height:4.75em;"
    CSS.menu +="border-radius:50%;"

    CSS.a     = ""
    CSS.a    += "text-decoration:none;"
    CSS.a    += "color:white;"

    const menu = document.createElement("div")
    menu.style.cssText = CSS.menu

    const link = document.createElement("a")
    link.innerHTML =  "abc"
    link.href = "../../../index.html"
    link.style.cssText = CSS.a
    link.addEventListener("mouseenter", (e) => {

    })
    link.addEventListener("mouseleave", (e) => {

    })

    // inject
    const parent = document.body
    menu.appendChild(link)
    parent.insertBefore(menu, document.body.firstChild)
}
