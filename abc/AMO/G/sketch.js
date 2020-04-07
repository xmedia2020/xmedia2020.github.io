// vado a selezionare il tracciato
var path = document.querySelector('#star-path');

//prendo la lunghezza del tracciato...
var pathLength = path.getTotalLength();

//Crea trattini molto lunghi (la lunghezza del percorso stesso)
path.style.strokeDasharray = pathLength + ' ' + pathLength;

// Metto trasparenza della traccia in modo che sia nascosto
path.style.strokeDashoffset = pathLength;

// Referenze sul tracciato animato
// https://jakearchibald.com/2013/animated-line-drawing-svg/
path.getBoundingClientRect();

// funzione x quando scrollo ndr. disabilito dall'index l altro?
window.addEventListener("scroll", function(e) {
 
  // trovo percentuale di completmento in base a quanto si scrolla
  //Referenza
  // https://stackoverflow.com/questions/2387136/cross-browser-method-to-determine-vertical-scroll-percentage-in-javascript/2387222#2387222
 
  var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    
  // Mostra il tracciato
  var drawLength = pathLength * scrollPercentage;
  
  // disegna rispetto alla trasparenza
 path.style.strokeDashoffset = pathLength - drawLength;
    
  //Al termine, rimuovere l'array dash, altrimenti la forma non è abbastanza nitida
  if (scrollPercentage >= 0.99) { //99% di completamento chiude la forma
    path.style.strokeDasharray = "none";
    
  } else {
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
  }
//posso aggiungere che si riempie di un altro colore quando il path è completo?
  //else{
  //path.style.fillDasharray = 255;
  //}
  
  
});

