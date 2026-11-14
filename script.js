
/* MOBILE MENU */

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("show");

    const expanded = navbar.classList.contains("show");
    menuToggle.setAttribute("aria-expanded", expanded);
});

/* PAGE NAVIGATION */

const navLinks = document.querySelectorAll("nav a");
const pages = document.querySelectorAll(".page");

function showPage() {
    let pageName = location.hash.replace("#", "") || "home";

    if (!document.getElementById(pageName)?.classList.contains("page")) {
        pageName = "home";
    }

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageName).classList.add("active");

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + pageName
        );
    });

    navbar.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");

    if (pageName === "tracking") {
        setTimeout(() => {
            if (map) map.invalidateSize();
        }, 100);
    }
}

window.addEventListener("hashchange", showPage);
showPage();

/* BUS DATA - DEMO LOCATIONS */

const buses = {
    BUS101: {
        route: "Mangalore to Ullal",
        location: "Thokkottu",
        speed: "35 km/h",
        lat: 12.8550,
        lng: 74.8500
    },

    BUS102: {
        route: "Mangalore to Deralakatte",
        location: "Kankanady",
        speed: "30 km/h",
        lat: 12.8680,
        lng: 74.8650
    },

    BUS103: {
        route: "Ullal to Mangalore",
        location: "Ullal",
        speed: "40 km/h",
        lat: 12.8050,
        lng: 74.8560
    }
};

/* INITIALIZE MAP */

let map = null;
let busMarker = null;

if (document.getElementById("map")) {
    map = L.map("map").setView([12.85, 74.85], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([12.8550, 74.8500])
        .addTo(map)
        .bindPopup("Demo Bus Location")
        .openPopup();
}

/* TRACK BUS FUNCTION */

function trackBus() {
    const busNumber = document
        .getElementById("busSearch")
        .value.trim().toUpperCase();

    const info = document.getElementById("trackingInfo");

    if (!buses[busNumber]) {
        info.innerHTML = `
            <h3>Bus Not Found!</h3>
            <p>Please enter BUS101, BUS102 or BUS103.</p>
        `;
        return;
    }

    const bus = buses[busNumber];

    info.innerHTML = `
        <h3>🚌 ${busNumber}</h3>
        <p><b>Route:</b> ${bus.route}</p>
        <p><b>Current Demo Location:</b> ${bus.location}</p>
        <p><b>Speed:</b> ${bus.speed}</p>
        <p><b>Status:</b> On Route</p>
    `;

    if (map) {
        map.setView([bus.lat, bus.lng], 15);

        if (busMarker) {
            map.removeLayer(busMarker);
        }

        busMarker = L.marker([bus.lat, bus.lng])
            .addTo(map)
            .bindPopup(`${busNumber} - ${bus.location}`)
            .openPopup();
    }
}

/* CONTACT FORM */

document.getElementById("contactForm")
    .addEventListener("submit", function(event) {

    event.preventDefault();

    document.getElementById("formMessage").innerText =
        "Thank you! Your demo message has been submitted.";

    this.reset();
});
