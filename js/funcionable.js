


let buscador = document.getElementById('buscador');
let tarjetas = document.querySelectorAll('.tarjeta-moto');

const filtrarMotos = () => {
  let filtro = buscador.value.toLowerCase();

  tarjetas.forEach(tarjeta => {
    let titulo = tarjeta.querySelector('h3').textContent.toLowerCase();
    if (titulo.includes(filtro)) {
      tarjeta.style.display = 'block';
    } else {
      tarjeta.style.display = 'none';
    }
  });
};

if (buscador) {
  buscador.oninput = filtrarMotos;
}

let boton = document.getElementById("botonImprimir");
let caja = document.getElementById("imprimir");

const imprimirMensaje = () => {
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let correo = document.getElementById("correo").value;
  let direccion = document.getElementById("direccion").value;
  let mensaje = document.getElementById("mensaje").value;

  caja.innerHTML = `
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Apellido:</strong> ${apellido}</p>
    <p><strong>Correo:</strong> ${correo}</p>
    <p><strong>Dirección:</strong> ${direccion}</p>
    <p><strong>Mensaje:</strong> ${mensaje}</p>
  `;

  console.log("Mensaje enviado:", mensaje);
};

if (boton) {
  boton.onclick = imprimirMensaje;
}

const botonComprar = document.getElementById('botonComprar');
let tarjetaSeleccionada = null;

tarjetas.forEach(tarjeta => {
  tarjeta.addEventListener('click', () => {
    if (tarjetaSeleccionada) {
      tarjetaSeleccionada.classList.remove('border-4', 'border-orange-500');
    }
    
    tarjeta.classList.add('border-4', 'border-orange-500');
    tarjetaSeleccionada = tarjeta;
  });
});

if (botonComprar) {
  botonComprar.addEventListener('click', () => {
    if (!tarjetaSeleccionada) {
      alert('Por favor, selecciona una moto para comprar.');
      return;
    }
    const modelo = tarjetaSeleccionada.querySelector('h3').textContent.trim();
    window.location.href = `registroCompra.html?modelo=${encodeURIComponent(modelo)}`;
  });
}
