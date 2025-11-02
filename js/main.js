async function renderTabla() {
  document.querySelector("h1").textContent += " " + new Date().getFullYear();
  const resData = await fetch("data/equipos.json");
  const equipos = await resData.json();
  const resParcial = await fetch("partials/tabla.hbs");
  const parcialTxt = await resParcial.text();
  Handlebars.registerPartial("tabla", parcialTxt);
  const template = Handlebars.compile("{{> tabla equipos=equipos}}");
  const html = template({ equipos });
  document.getElementById("tabla-container").innerHTML = html;
  const totalGoles = equipos.reduce((acc, e) => acc + e.golesFavor, 0);
const promedio = (totalGoles / equipos.length).toFixed(2);
document.getElementById("tabla-container").insertAdjacentHTML("beforeend",
  `<p style="text-align:center;margin-top:1rem;">Promedio de goles a favor: <b>${promedio}</b></p>`);
}
renderTabla();
