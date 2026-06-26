console.log("GeoAtlas käivitus edukalt!");
function showSection(section) {
  const output = document.getElementById("output");

  if (section === "continents") {
    output.innerHTML = `
      <h2>🌍 Mandrid</h2>
      <p>Aafrika, Aasia, Euroopa, Põhja-Ameerika, Lõuna-Ameerika, Okeaania ja Antarktika.</p>
    `;
  }

  if (section === "countries") {
    output.innerHTML = `
      <h2>🏳️ Riigid</h2>
      <p>Siia lisame kõik maailma riigid, pealinnad ja mandrid.</p>
    `;
  }

  if (section === "timezones") {
    output.innerHTML = `
      <h2>🕒 Ajavööndid</h2>
      <p>Siia lisame kõik maailma ajavööndid ja kohaliku aja.</p>
    `;
  }

  if (section === "map") {
    output.innerHTML = `
      <h2>🗺️ Maailmakaart</h2>
      <p>Hiljem lisame siia kaardi.</p>
    `;
  }

  if (section === "search") {
    output.innerHTML = `
      <h2>🔍 Otsing</h2>
      <input type="text" placeholder="Otsi riiki või ajavööndit...">
    `;
  }
}
