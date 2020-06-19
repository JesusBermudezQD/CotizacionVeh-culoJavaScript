//constructor para seguro

function Seguro(marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
}

Seguro.prototype.cotizar = function () {
  /* 
        1=americano 1.15
        2=asiatico 1.05
        3=europeo 1.35
    */

  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
  }

  //leer año
  const diferencia = new Date().getFullYear() - this.anio;
  //diferencia hay que reducir el 3% cada año

  cantidad -= (diferencia * 3 * cantidad) / 100;

  /* 
        si el seguro es basico se multiplica por 30
        si es completo es por 50
    */

  if (this.tipo == "1") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }
  console.log(cantidad);
  return cantidad;
};

//todo lo que se muestra
function Interfaz() {}

//prototipos de interfaz
//mensaje que se imprime en el html

Interfaz.prototype.mostrarMensaje = function (mensaje, tipo) {
  const div = document.createElement("div");
  if (tipo === "error") {
    div.classList.add("mensaje", "alert", "alert-danger");
  } else {
    div.classList.add("mensaje", "alert", "alert-success");
  }
  div.innerHTML = `${mensaje}`;
  formulario.insertBefore(div, document.querySelector(".form-group"));
  setTimeout(function () {
    document.querySelector(".mensaje").remove();
  }, 3000);
};

Interfaz.prototype.mostrarResultados = function (seguro, cantidad) {
  const resultado = document.getElementById("resultado");
  let marca;
  let tipo;
  switch (seguro.marca) {
    case "1":
      marca = "Americano";
      break;
    case "2":
      marca = "Asiatico";
      break;
    case "3":
      marca = "Europeo";
      break;
  }
  switch (seguro.tipo) {
    case "1":
      tipo = "Basico";
      break;
    case "2":
      tipo = "Completo";
      break;
  }
  const div = document.createElement("div");
  div.classList.add("alert", "alert-light", "text-center");
  div.setAttribute("id", "resultado");
  div.innerHTML = `
        <header class="p-2 mb-4 bg-info text-white text-center">
          RESUMEN
        </header>
        
        <p>Marca: ${marca}</p>
        <p>Año: ${seguro.anio}</p>
        <p>Tipo: ${tipo}</p>
        <p>Precio del seguro: ${cantidad}</p>
  `;

  const cargando = document.querySelector("#cargando");
  cargando.style.display = "block";
  setTimeout(function () {
    cargando.style.display = "none";
    formulario.insertBefore(div, document.getElementById("boton"));
  }, 3000);
};

//EventListener

const formulario = document.getElementById("form");

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  //leer marca seleccionada
  const marca = document.getElementById("marca");
  const marcaSeleccionada = marca.options[marca.selectedIndex].value;

  //lerr año

  const anio = document.getElementById("anio");
  const anioSeleccionado = anio.options[anio.selectedIndex].value;

  //leer tipo
  const tipo = document.getElementById("tipo-seguro");
  const tipoSeleccionado = tipo.options[tipo.selectedIndex].value;

  //instancia de interfaz
  const interfaz = new Interfaz();

  //revisar campos

  if (
    marcaSeleccionada === "" ||
    anioSeleccionado === "" ||
    tipoSeleccionado === ""
  ) {
    //interfaz de error
    interfaz.mostrarMensaje(
      "Faltan datos, revisa el formulario e intenta de nuevo",
      "error"
    );
  } else {
    //interfaz todo bien

    //remover resultado anterior

    const resultado = document.getElementById("resultado");
    console.log(resultado);

    if (resultado != null) {
      resultado.remove();
    }

    const seguro = new Seguro(
      marcaSeleccionada,
      anioSeleccionado,
      tipoSeleccionado
    );

    // Cotizar el seguro
    const cantidad = seguro.cotizar(seguro);
    interfaz.mostrarMensaje(
      "Datos Correctos, pronto se visualizan los resultados",
      "bien"
    );

    //mostrar cotizacion

    interfaz.mostrarResultados(seguro, cantidad);
  }
});

//mostrar años
const max = new Date().getFullYear(),
  min = max - 20;

const selectAnios = document.getElementById("anio");

for (let i = max; i >= min; i--) {
  let option = document.createElement("option");

  option.value = i;
  option.innerHTML = i;
  selectAnios.appendChild(option);
}
