//API - FETCH 

const URI = "https://rickandmortyapi.com/api/character"
const divCards= document.querySelector('#cards-container')  //donde se van a volcar los datos
const btnPrev =document.querySelector('#prev')
const btnNext = document.querySelector('#next')

btnPrev.addEventListener("click", () =>{
  traerDatos(urlPrev)
})

btnNext.addEventListener("click", () =>{
  traerDatos(urlNext)
})

//variables que voy a utilizar para hacer el fetch
let urlPrev = null
let urlNext = null

//console.log([fetch (URI)]) //la pongo entre corchetes para ver el tipo de datos, fetch me devuelve una promesa
//Para resolver esas promesas uso funciones de orden superio --> .then, para ver que hacemos con el resultado, .catch para poder agarrar algun error y .finally, para cuando la promesa termina.

//.then(variable donde guardo el resultado del fetch) console.log(response)  //hago una peticion a la web y esto demora, por eso fetch me devulve una promesa


function traerDatos(urlApi){
  fetch(urlApi).then(response => 
    response.json().then(data =>{ 
      //al response lo convierto en json, pero este tambien me devulve promesa, entonces resulvo otra vez con .then y guardo el resultado de esa promesa en data
        let characters = data.results
        pintarPersonajes(characters,divCards)
        if(data.info.prev != null){
          urlPrev = data.info.prev
          btnPrev.disabled = false
        }else{
          btnPrev.disabled = true //btn en su propiedad disable me lo vuelva true
        }
        if (data.info.next != null){
          urlNext = data.info.next  
          btnNext.disabled = false
        }else{
          btnNext.disabled = true
        }
    // console.log("Resolvi tu promesa")
    // console.log("Ya tenes tus datos")
    })
)
}


function pintarPersonajes(array,contenedor){
  contenedor.innerHTML = ""   // si tenemos otro array, cada vez que se llama a pintar personajes, borra todo lo que hay en contenedor y a ese array lo va pintando devuelta 
  array.forEach(character => {
    contenedor.innerHTML += `<div class="card p-0 bg-dark text-light" style="width: 18rem;">
    <img src=${character.image} class="card-img-top" alt="Imagen de personaje">
    <div class="card-body">
      <p class="card-text"><strong> ${character.id}</strong> Nombre: ${character.name}</p>
    </div>
    </div> `
})
}

traerDatos(URI)
