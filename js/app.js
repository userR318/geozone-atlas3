console.log("GeoAtlas käivitus edukalt!");

async function loadJSON(file) {
  const response = await fetch(file);

  if (!response.ok) {
    throw new Error("Andmefaili laadimine ebaõnnestus: " + file);
  }

  return await response.json();
}

function renderList(items) {
  return "<ul>" + items.join("") + "</ul>";
}

async function showSection(section) {
  const output = document.getElementById("output");

  if (section === "continents") {
    try {
      const continents = await loadJSON("data/continents.json");
      const listItems = continents.map(function(continent) {
        return "<li><strong>" + continent.name + "</strong></li>";
      });

      output.innerHTML = "<h2>🌍 Mandrid</h2>" + renderList(listItems);
    } catch (error) {
      output.innerHTML = "<h2>🌍 Mandrid</h2><p>Mandrite andmeid ei õnnestunud laadida.</p>";
      console.error(error);
    }
  }

  if (section === "countries") {
    try {
      const countries = await loadJSON("data/countries.json");
      const listItems = countries.map(function(country) {
        return "<li><strong>" + country.name + "</strong><br>Pealinn: " + country.capital + "<br>Manner: " + country.continent + "<br>Ajavöönd: " + country.timezone + "</li>";
      });

      output.innerHTML = "<h2>🏳️ Riigid</h2>" + renderList(listItems);
    } catch (error) {
      output.innerHTML = "<h2>🏳️ Riigid</h2><p>Riikide andmeid ei õnnestunud laadida.</p>";
      console.error(error);
    }
  }

  if (section === "timezones") {
    try {
      const timezones = await loadJSON("data/timezones.json");
      const listItems = timezones.map(function(zone) {
        const localTime = new Intl.DateTimeFormat("et-EE", {
          timeZone: zone.name,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }).format(new Date());

        return "<li><strong>" + zone.name + "</strong><br>UTC: " + zone.utc + "<br>Kohalik aeg: " + localTime + "</li>";
      });

      output.innerHTML = "<h2>🕒 Ajavööndid</h2>" + renderList(listItems);
    } catch (error) {
      output.innerHTML = "<h2>🕒 Ajavööndid</h2><p>Ajavööndite andmeid ei õnnestunud laadida.</p>";
      console.error(error);
    }
  }

  if (section === "map") {
    output.innerHTML = "<h2>🗺️ Maailmakaart</h2><p>Kaardi moodul lisatakse järgmises versioonis.</p>";
  }

  if (section === "search") {
    output.innerHTML = "<h2>🔍 Otsing</h2><input id=\"searchBox\" type=\"text\" placeholder=\"Otsi riiki või ajavööndit...\"><div id=\"searchResults\"></div>";
    setupSearch();
  }
}

async function setupSearch() {
  const countries = await loadJSON("data/countries.json");
  const timezones = await loadJSON("data/timezones.json");
  const searchBox = document.getElementById("searchBox");
  const results = document.getElementById("searchResults");

  searchBox.addEventListener("input", function() {
    const query = searchBox.value.toLowerCase().trim();

    if (query.length === 0) {
      results.innerHTML = "";
      return;
    }

    const countryMatches = countries.filter(function(country) {
      return country.name.toLowerCase().includes(query) || country.capital.toLowerCase().includes(query) || country.timezone.toLowerCase().includes(query);
    });

    const timezoneMatches = timezones.filter(function(zone) {
      return zone.name.toLowerCase().includes(query) || zone.utc.toLowerCase().includes(query);
    });

    const countryItems = countryMatches.map(function(country) {
      return "<li><strong>" + country.name + "</strong><br>Pealinn: " + country.capital + "<br>Ajavöönd: " + country.timezone + "</li>";
    });

    const timezoneItems = timezoneMatches.map(function(zone) {
      return "<li><strong>" + zone.name + "</strong><br>UTC: " + zone.utc + "</li>";
    });

    results.innerHTML = "<h3>Tulemused</h3>" + renderList(countryItems.concat(timezoneItems));
  });
}
