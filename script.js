const map = L.map('map').setView([52.52, 13.405], 11); // Startposition: Berlin

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap',
}).addTo(map);

// Beispiel-Snackautomaten-Daten
const snackMachines = [
  { name: "Snackomat A", lat: 52.520, lon: 13.405, plz: "10115" },
  { name: "Snackomat B", lat: 52.530, lon: 13.390, plz: "10117" },
  { name: "Snackomat C", lat: 52.515, lon: 13.420, plz: "10115" },
];

// PLZ → Koordinaten (einfaches Mock-Beispiel)
const plzCoordinates = {
  "10115": { lat: 52.532, lon: 13.384 },
  "10117": { lat: 52.520, lon: 13.407 }
};

function search() {
  const plz = document.getElementById("zipcode").value;
  const radius = parseInt(document.getElementById("radius").value);

  if (!plzCoordinates[plz]) {
    alert("Diese PLZ ist nicht verfügbar.");
    return;
  }

  const center = plzCoordinates[plz];
  map.setView([center.lat, center.lon], 14);

  // Radiuskreis
  const circle = L.circle([center.lat, center.lon], {
    radius: radius * 1000,
    color: 'blue',
    fillOpacity: 0.1
  }).addTo(map);

  // Entferne alte Marker
  map.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Filtere Automaten im Umkreis
  snackMachines.forEach(machine => {
    const distance = map.distance([center.lat, center.lon], [machine.lat, machine.lon]) / 1000;
    if (distance <= radius) {
      L.marker([machine.lat, machine.lon])
        .addTo(map)
        .bindPopup(`<b>${machine.name}</b><br>PLZ: ${machine.plz}`);
    }
  });
}
