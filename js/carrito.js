
const firebaseConfig = {
  apiKey: "AIzaSyBYUyU-aychsNXfsB_WEqtQuLoOeLNCp38",
  authDomain: "mototech-122d8.firebaseapp.com",
  projectId: "mototech-122d8",
  storageBucket: "mototech-122d8.firebasestorage.app",
  messagingSenderId: "31689991405",
  appId: "1:31689991405:web:b0cdf505974ac4bf2818e4"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function agregarProducto(nombre, precio) {
  try {
    await db.collection("carrito").add({ nombre, precio });
    cargarCarrito();
  } catch (e) {
    console.error("Error al agregar producto:", e);
  }
}

async function cargarCarrito() {
  const lista = document.getElementById("listaCarrito");
  lista.innerHTML = "";
  let total = 0;

  const snapshot = await db.collection("carrito").get();
  snapshot.forEach(doc => {
    const { nombre, precio } = doc.data();
    total += precio;

    const li = document.createElement("li");
    li.className = "flex justify-between items-center border-b pb-1";

    const span = document.createElement("span");
    span.textContent = `${nombre} - $${precio.toFixed(2)}`;

    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.className = "text-red-400 hover:text-red-600 ml-2 text-sm";
    btn.onclick = async () => {
      await db.collection("carrito").doc(doc.id).delete();
      cargarCarrito();
    };

    li.append(span, btn);
    lista.appendChild(li);
  });

  document.getElementById("totalCompra").textContent = `Total a pagar: $${total.toFixed(2)}`;
}

document.querySelectorAll(".btn-agregar").forEach(btn => {
  btn.addEventListener("click", () => {
    const productoDiv = btn.closest(".producto");
    const nombre = productoDiv.getAttribute("data-nombre");
    const precio = parseFloat(productoDiv.getAttribute("data-precio"));

    agregarProducto(nombre, precio);

    btn.textContent = "Agregado";
    
    
  });
});


document.getElementById("verCarritoBtn").onclick = () => {
  document.getElementById("modalCarrito").classList.remove("hidden");
  cargarCarrito();
};

document.getElementById("cerrarModal").onclick = () => {
  document.getElementById("modalCarrito").classList.add("hidden");
};

document.getElementById("vaciarCarritoBtn").onclick = async () => {
  const snapshot = await db.collection("carrito").get();
  const batch = db.batch();
  snapshot.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
  cargarCarrito();
};

document.getElementById("completarCompraBtn").onclick = () => {
  const form = document.getElementById("formularioCompra");
  form.classList.toggle("hidden");
};

document.getElementById("formularioCompra").onsubmit = async (e) => {
  e.preventDefault();

  const form = e.target;

  try {
    const snapshot = await db.collection("carrito").get();
    const productos = [];
    let total = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      productos.push({ nombre: data.nombre, precio: data.precio });
      total += data.precio;
    });

    if (productos.length === 0) {
      alert("El carrito está vacío. Agrega productos antes de completar la compra.");
      return;
    }

    const datos = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      direccion: form.direccion.value.trim(),
      productos: productos,
      total: total,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };

    await db.collection("ordenes").add(datos);

    const batch = db.batch();
    snapshot.forEach(doc => batch.delete(doc.ref));
    await batch.commit();

    alert("¡Pedido enviado con éxito! Nos pondremos en contacto.");
    form.reset();
    form.classList.add("hidden");
    cargarCarrito();
    document.getElementById("modalCarrito").classList.add("hidden");

  } catch (err) {
    console.error("Error al enviar orden:", err);
    alert("Hubo un error al enviar tu pedido.");
  }
};

window.onload = () => {
  cargarCarrito();
};
