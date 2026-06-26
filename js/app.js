console.log("GeoAtlas käivitus edukalt!");

async function loadJSON(file) {
  const response = await fetch(file);

  if (!response.ok) {
    throw new Error("Andmefaili laadimine ebaõnnestus: " + file);
  }

  return await response.json();
}

async function showSection(section) {
  const output = document.getElementById("output");

  if (section === "continents") {
    try {
      const continents = await loadJSON("data/continents.json");
      const listItems = continents
        .map(function(continent) {
          return "<li>" + continent.name + "</li>";
        })
        .join("");

      output.innerHTML = "<h2>🌍 Mandrid</h2><ul>" + listItems + "</ul>";
    } catch (error) {
      output.innerHTML = "<h2>🌍 Mandrid</h2><p>Mandrite andmeid ei õnnestunud laadida.</p>";
      console.error(error);
    }
  }

  if (section === "countries") {
    output.innerHTML = "<h2>🏳️ Riigid</h2><p>Siia lisame kõik maailma riigid, pealinnad ja mandrid.</p>";
  }

  if (section === "timezones") {
    output.innerHTML = "<h2>🕒 Ajavööndid</h2><p>Siia lisame kõik maailma ajavööndid ja kohaliku aja.</p>";
  }

  if (section === "map") {
    output.innerHTML = "<h2>🗺️ Maailmakaart</h2><p>Hiljem lisame siia kaardi.</p>";
  }

  if (section === "search") {
    output.innerHTML = "<h2>🔍 Otsing</h2><input type=\"text\" placeholder=\"Otsi riiki või ajavööndit...\">";
  }
}
