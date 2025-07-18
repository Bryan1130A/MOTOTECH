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

document.getElementById("botonImprimir").addEventListener("click", async () => {
  const form = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    correo: document.getElementById("correo").value,
    direccion: document.getElementById("direccion").value,
    cantidad: parseInt(document.getElementById("cantidad").value),
    estadoCivil: document.getElementById("sc").value,
    razonSocial: document.getElementById("razonSocial").value,
    calle: document.getElementById("calle").value,
    codigoPostal: document.getElementById("codigoPostal").value,
    comentarios: document.getElementById("comentarios").value,
    fecha: new Date().toISOString()
  };

  try {
    await db.collection("compras").add(form);
    document.getElementById("mensajeConfirmacion").innerHTML = `<p style="color:green;">¡Compra registrada exitosamente!</p>`;
    document.getElementById("registroCompraMotoForm").reset();
  } catch (error) {
    document.getElementById("mensajeConfirmacion").innerHTML = `<p style="color:red;">Error al registrar la compra: ${error}</p>`;
  }
});
