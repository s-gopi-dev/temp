// Table section in about.html
const data = [
    { ward: 1, habitation: "KUNNUKADU", streets: ["NEW MAJITH STREET", "MUTHUMARIYAMMAN KOVIL STREET", "CARMEL NAGAR"] },
    { ward: 2, habitation: "KOVALAM KUPPAM", streets: ["BAJANAI KOVIL STREET"] },
    { ward: 3, habitation: "KOTTAI COLONY", streets: ["MADHA KOVIL STREET", "NADU COLONY", "MUTHUMARIYAMMAN KOVIL STREET", "DESAI STREET"] },
    { ward: 4, habitation: "KOVALAM", streets: ["KAILASANATHAR KOVIL STREET", "KOVALAM MAIN ROAD", "PILLAIYAR KOVIL STREET", "EGAVALLIAMMAN KOVIL STREET", "DARGHA STREET"] },
    { ward: 5, habitation: "KOVALAM KUPPAM", streets: ["KANNIYAMMAN KOVIL STREET"] },
    { ward: 6, habitation: "NACHIYAR KULAM COLONY", streets: ["VANIGAR STREET", "NACHIYAR KULAM", "SENGENIYAMMAN KOVIL STREET"] },
    { ward: 7, habitation: "ANSARI NAGAR", streets: ["ANSARI NAGAR"] },
    { ward: 8, habitation: "SEMMENCHERRY", streets: ["PADAVETTAMMAN KOVIL STREET"] },
    { ward: 9, habitation: "SEMMENCHERRY KUPPAM", streets: ["NAGALAMMAN KOVIL STREET"] }
];

const tableBody = document.getElementById("table-body");
data.forEach(({ ward, habitation, streets }, index) => {
    streets.forEach((street, i) => {
        const row = document.createElement("tr");
        if (i === 0) {
            row.innerHTML = `
<td rowspan="${streets.length}" class="border border-gray-300 px-4 py-2 text-lg sm:text-xl text-gray-950 text-center">
  <div class="relative inline-block w-16 h-10 text-amber-600">
    <!-- SVG Flag Outline -->
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" class="w-full h-full" fill="currentColor">
      <path d="m80-160 240-320L80-800h520q19 0 36 8.5t28 23.5l216 288-216 288q-11 15-28 23.5t-36 8.5H80Zm160-80h360l180-240-180-240H240l180 240-180 240Zm270-240Z"/>
    </svg>

    <!-- Number inside the flag -->
    <span class="absolute inset-0 flex items-center justify-center text-black font-semibold text-base">
      ${ward}
    </span>
  </div>
</td>

<td rowspan="${streets.length}" class="border border-gray-300 px-4 py-2 text-lg sm:text-xl text-gray-950">${habitation}</td>
                <td class="border border-gray-300 px-4 py-2 text-lg sm:text-xl text-gray-950">${street}</td>
            `;
        } else {
            row.innerHTML = `<td class="border border-gray-300 px-4 py-2 text-lg sm:text-xl text-gray-950">${street}</td>`;
        }
        if (index % 2 === 1) row.classList.add("bg-gray-100");
        tableBody.appendChild(row);
    });
});

function ElectedMembers(containerId, members) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ""; // Clear existing content

    members.forEach((member, index) => {
        // Create the main wrapper
        const wrapper = document.createElement('div');
        wrapper.className = "max-w-lg w-full bg-slate-50 rounded-xl overflow-hidden transition-all p-2 duration-300 hover:shadow-[0px_20px_30px_rgba(255,165,0,0.5)] transition-shadow";

        // Profile image wrapper
        const profileWrapper = document.createElement('div');
        profileWrapper.className = "flex items-center mb-0 pb-0 space-x-6";

        const imageContainer = document.createElement('div');
        imageContainer.className = "w-32 h-32 rounded-full overflow-hidden border-2 border-white shadow-lg";

        const image = document.createElement('img');
        image.src = member.image;
        image.alt = `${member.name}`;
        image.className = "w-full h-full object-fill transition-transform duration-300";

        imageContainer.appendChild(image);
        profileWrapper.appendChild(imageContainer);

        // Member details
        const textContainer = document.createElement('div');
        textContainer.className = "text-left";

        const name = document.createElement('h2');
        name.className = "text-lg sm:text-xl text-gray-950";
        name.innerText = member.name;

        const position = document.createElement('h3');
        position.className = "text-amber-600 text-sm";
        position.innerText = member.position;

        textContainer.appendChild(name);
        textContainer.appendChild(position);
        profileWrapper.appendChild(textContainer);

        // Description container
        const descriptionContainer = document.createElement('div');
        descriptionContainer.className = "mt-1 p-2 justify-center bg-white rounded-lg flex-1";

        const bio = document.createElement('p');
        bio.className = "text-base sm:text-base text-gray-950";
        bio.innerText = member.bio;

        // Social Icons
        // const socialContainer = document.createElement('div');
        // socialContainer.className = "flex space-x-4 justify-end";

        // Object.entries(member.social).forEach(([platform, link]) => {
        //     const socialLink = document.createElement('a');
        //     socialLink.href = link;
        //     socialLink.className = "text-amber-600 hover:text-amber-600 transition-colors";

        //     fetch(`/assets/icons/${platform}.svg`)
        //         .then(response => response.text())
        //         .then(svg => {
        //             socialLink.innerHTML = svg;
        //         });
        //     socialContainer.appendChild(socialLink);
        // });

        descriptionContainer.appendChild(bio);
        // descriptionContainer.appendChild(socialContainer);

        wrapper.appendChild(profileWrapper);
        wrapper.appendChild(descriptionContainer);
        container.appendChild(wrapper);

        // Adjust height dynamically
        const adjustHeight = () => {
            wrapper.style.height = 'auto';
        };
        adjustHeight();

        // GSAP Animation for sequential loading
        gsap.set(wrapper, { opacity: 0, scale: 0 });
        gsap.to(wrapper, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            delay: index * 0.3,
        });

        // GSAP Hover Effects
        wrapper.addEventListener("mouseenter", () => {
            gsap.to(image, { scale: 1.1, duration: 0.3, ease: "power2.out" });
        });

        wrapper.addEventListener("mouseleave", () => {
            gsap.to(image, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
    });
}

function createImageGallery(container, images, sectionTitle) {
    images.forEach((img, index) => {
        // Create a wrapper for each image with its own group class
        const wrapper = document.createElement('div');
        wrapper.className = "relative group overflow-hidden rounded-xl shadow-md border border-amber-100 opacity-0 scale-0";

        const imageElement = document.createElement('img');
        imageElement.src = img;
        imageElement.alt = `${sectionTitle} Image`;
        imageElement.className = "w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105";

        const overlay = document.createElement('div');
        overlay.className = "absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300";

        const text = document.createElement('span');
        text.className = "text-white";
        text.innerText = sectionTitle; // Dynamic title based on the section

        overlay.appendChild(text);
        wrapper.appendChild(imageElement);
        wrapper.appendChild(overlay);
        container.appendChild(wrapper);
        // container.scrollIntoView({ behavior: "smooth", block: "start" });
        // GSAP Animation for Sequential Image Loading
        gsap.to(wrapper, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            delay: index * 0.3 // Ensures images load one by one
        });

        // GSAP Hover Effects
        wrapper.addEventListener("mouseenter", () => {
            gsap.to(imageElement, { scale: 1.1, duration: 0.3, ease: "power2.out" });
            gsap.to(overlay, { opacity: 1, duration: 0.3 });
        });

        wrapper.addEventListener("mouseleave", () => {
            gsap.to(imageElement, { scale: 1, duration: 0.3, ease: "power2.out" });
            gsap.to(overlay, { opacity: 0, duration: 0.3 });
        });
    });
}

function MobileShowList(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content').forEach(section => {
        section.classList.add('hidden');
    });
    const mobileMenu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("overlay");
    mobileMenu.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.remove('hidden');
        activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (sectionId === "E_Sevai"){
            animateCertificates();
        }
        if (sectionId === "Tax_Management"){
            animateTaxManagement();
        }
        if (sectionId === "Water_Management"){
            const Water_Management = document.getElementById("Water_Management");
            animateManagement(Water_Management);
        }
        if (sectionId === "Electricity"){
            gsap.from("#Electricity div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Electricity div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Drainage"){
            gsap.from("#Drainage div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Drainage div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Others"){
            const Others = document.getElementById("Others");
            animateManagement(Others);
        }
        if (sectionId === "AadharCamp") {
            gsap.from("#AadharCamp div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#AadharCamp div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "MedicalCamp") {
            gsap.from("#MedicalCamp div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#MedicalCamp div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "GramaSabhaCamp") {
            gsap.from("#GramaSabhaCamp div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#GramaSabhaCamp div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });
            gsap.from("#GramaSabhaCamp .grid-item", {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.4,
                delay: 0.3, // Add a slight delay so grid items animate after main divs
                ease: "power2.out",
                onComplete: function () {
                    let gridItems = document.querySelectorAll("#GramaSabhaCamp .grid-item");
                    gridItems.forEach(item => {
                        item.style.removeProperty("opacity");
                        item.style.removeProperty("transform");
                    });
                }
            });
        }
        if (sectionId === "PanCardCamp") {
            gsap.from("#PanCardCamp div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#PanCardCamp div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "VoterIDCamp") {
            gsap.from("#VoterIDCamp div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#VoterIDCamp div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "BeachCleaning") {
            gsap.from("#BeachCleaning div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#BeachCleaning div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Anganvadi") {
            gsap.from("#Anganvadi div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Anganvadi div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Schools") {
            gsap.from("#Schools div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Schools div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Library") {
            gsap.from("#Library div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Library div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "PublicHotels") {
            gsap.from("#PublicHotels > div > div > div", { // Selects only hotel cards inside grids
                opacity: 0,
                y: 50,
                stagger: 0.25, // Adjust the stagger timing
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#PublicHotels > div > div > div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  
                        el.style.removeProperty("transform"); 
                    });
                }
            });
        }
        if (sectionId === "HealthCare") {
            gsap.from("#HealthCare div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#HealthCare div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "PublicPostOffice") {
            gsap.from("#PublicPostOffice div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#PublicPostOffice div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "PublicToilet") {
            gsap.from("#PublicToilet div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#PublicToilet div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Meeting_Halls") {
            gsap.from("#Meeting_Halls div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Meeting_Halls div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Ponds") {
            gsap.from("#Ponds div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Ponds div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Roads") {
            gsap.from("#Roads div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Roads div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "BusStand") {
            gsap.from("#BusStand div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#BusStand div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Garbage_ManagRoadsement") {
           // Animate Services inside Garbage Management
           gsap.from("#garbageImageGallery div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#garbageImageGallery div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        } 

        AOS.refresh();
        gsap.fromTo(activeSection.querySelectorAll('.section'), 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.3 }
        );
    }
};

function animateTaxManagement() {
    gsap.from("#Tax_Management h1", { opacity: 0, y: -30, duration: 0.4, ease: "power2.out" });

    gsap.from("#Tax_Management .grid > div", { 
        opacity: 0, 
        y: 50, 
        duration: 0.5, 
        ease: "power2.out",
        stagger: 0.3
    });

    gsap.from("#Tax_Management img", { 
        opacity: 0, 
        scale: 0.8, 
        duration: 0.5, 
        ease: "power2.out",
        stagger: 0.2 
    });
}

function animateManagement(Management) {
    Management.classList.remove("hidden"); 
    gsap.from(Management, {
        duration: 0.5,
        opacity: 0,
        scale: 0.9,
        ease: "power2.out"
    });
}

function showList(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content').forEach(section => {
        section.classList.add('hidden');
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.remove('hidden');
        activeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (sectionId === "E_Sevai"){
            animateCertificates();
        }
        if (sectionId === "Tax_Management"){
            animateTaxManagement();
        }
        if (sectionId === "Water_Management"){
            const Water_Management = document.getElementById("Water_Management");
            animateManagement(Water_Management);
        }
        if (sectionId === "Electricity"){
            gsap.from("#Electricity div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Electricity div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Drainage"){
            gsap.from("#Drainage div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Drainage div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Others"){
            const Others = document.getElementById("Others");
            animateManagement(Others);
        }
        if (sectionId === "AadharCamp") {
            gsap.from("#AadharCamp div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#AadharCamp div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "MedicalCamp") {
            gsap.from("#MedicalCamp div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#MedicalCamp div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "GramaSabhaCamp") {
            gsap.from("#GramaSabhaCamp > div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#GramaSabhaCamp div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
            gsap.from("#GramaSabhaCamp .grid-item", {
                opacity: 0,
                y: 30,
                stagger: 0.1,
                duration: 0.4,
                delay: 0.3, // Add a slight delay so grid items animate after main divs
                ease: "power2.out",
                onComplete: function () {
                    let gridItems = document.querySelectorAll("#GramaSabhaCamp .grid-item");
                    gridItems.forEach(item => {
                        item.style.removeProperty("opacity");
                        item.style.removeProperty("transform");
                    });
                }
            });
        }

        if (sectionId === "PanCardCamp") {
            gsap.from("#PanCardCamp div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#PanCardCamp div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "VoterIDCamp") {
            gsap.from("#VoterIDCamp div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#VoterIDCamp div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "BeachCleaning") {
            gsap.from("#BeachCleaning div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#BeachCleaning div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Anganvadi") {
            gsap.from("#Anganvadi div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Anganvadi div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Schools") {
            gsap.from("#Schools div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Schools div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Library") {
            gsap.from("#Library div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Library div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "PublicHotels") {
            gsap.from("#PublicHotels > div > div > div", { // Selects only hotel cards inside grids
                opacity: 0,
                y: 50,
                stagger: 0.25, // Adjust the stagger timing
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#PublicHotels > div > div > div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  
                        el.style.removeProperty("transform"); 
                    });
                }
            });
        }
        
        if (sectionId === "HealthCare") {
            gsap.from("#HealthCare div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#HealthCare div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "PublicPostOffice") {
            gsap.from("#PublicPostOffice div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#PublicPostOffice div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "PublicToilet") {
            gsap.from("#PublicToilet div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#PublicToilet div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Meeting_Halls") {
            gsap.from("#Meeting_Halls div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Meeting_Halls div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Ponds") {
            gsap.from("#Ponds div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Ponds div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Roads") {
            gsap.from("#Roads div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#Roads div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "BusStand") {
            gsap.from("#BusStand div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#BusStand div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        if (sectionId === "Garbage_Management") {
            // Animate Services inside Garbage Management
            gsap.from("#garbageImageGallery div", {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll("#garbageImageGallery div");
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                        el.style.removeProperty("transform"); // Removes GSAP inline transform
                    });
                }
            });;
        }
        AOS.refresh();
        gsap.fromTo(activeSection.querySelectorAll('.section'), 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.3 }
        );
    }
};

function showSection(sectionId, clickedItem = null) {
    // Hide all sections
    document.querySelectorAll('.content').forEach(section => {
        section.classList.add('hidden');
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.remove('hidden');

    // Reinitialize GSAP Animations for Services Section

    if (sectionId === "Aboutus") {
        let sections = activeSection.querySelectorAll('section');
        gsap.set(sections, { opacity: 0, y: 50 }); // Set initial state

        sections.forEach((section, index) => {
            gsap.to(section, { opacity: 1, y: 0, duration: 0.5, delay: index * 0.3, ease: "power2.out" });
        });
    }

    if (sectionId === "Contactus") {
        gsap.from("#Contactus", { opacity: 0, y: 100, duration: 0.5 });
    }
    if (sectionId === "Achievements") {
        gsap.from("#Achievements div", {
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.5,
            ease: "power3.out",
            onComplete: function () {
                let elements = document.querySelectorAll("#Achievements div");
                elements.forEach(el => {
                    el.style.removeProperty("opacity");  // Removes GSAP inline opacity
                    el.style.removeProperty("transform"); // Removes GSAP inline transform
                });
            }
        });;
    }
    if (sectionId === "Home") {
        gsap.from("#panchayat-overview", { opacity: 0, y: 50, duration: 0.5});
        fetch('/assets/__data/electedMembers.json') // Ensure the correct path to your JSON file
    .then(response => response.json())
    .then(data => {
        ElectedMembers("ElectedMembers", data.members);
    })
    .catch(error => console.error("Error loading JSON:", error));

    }

    AOS.refresh();
    gsap.fromTo(activeSection.querySelectorAll('.section'), 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.3 }
    );
}

function animateCertificates() {
    gsap.from(".certificate-item", { opacity: 0, y: 50, stagger: 0.3, duration: 0.5});
    document.querySelectorAll('.certificate-item').forEach((item) => {
        item.classList.add('animate-bounce');
    });
    
    setTimeout(() => {
        document.querySelectorAll('.certificate-item').forEach((item) => {
            item.classList.remove('animate-bounce');
        });
    }, 9000);
}
