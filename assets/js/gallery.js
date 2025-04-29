function showImages(type, category) {
    // Validate inputs
    if (!type || !category) {
        console.error('Missing type or category');
        return;
    }

    // Fetch the JSON data
    fetch('/assets/__data/images.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const containerId = `image${capitalizeFirstLetter(type)}Container`;
            const container = document.getElementById(containerId);
            
            if (!container) {
                throw new Error(`Container element with ID '${containerId}' not found`);
            }
            
            container.innerHTML = "";
            
            if (!data[type]) {
                throw new Error(`Image type '${type}' not found in data`);
            }
            
            if (!data[type][category]) {
                throw new Error(`Category '${category}' not found for type '${type}'`);
            }
            
            createImageGallery(container, data[type][category], `${capitalizeFirstLetter(type)}`);
        })
        .catch(error => {
            console.error('Error:', error.message);
            // Optionally display error to user
            const errorContainer = document.getElementById('errorContainer') || document.body;
            errorContainer.innerHTML = `<div class="error">Error loading images: ${error.message}</div>`;
        });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showTable(type) {
    if (!type) {
        console.error("Missing table type");
        return;
    }

    const containerId = `table${capitalizeFirstLetter(type)}Container`;
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`Container element with ID '${containerId}' not found`);
        return;
    }

    container.innerHTML = "";

    fetch("/assets/__data/tables.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            if (!data[type]) {
                throw new Error(`Data for '${type}' not found in JSON`);
            }

            let tableTitle = "";
            let contentHtml = "";

            if (type === "OHT") {
                tableTitle = "Overhead Tank (OHT) Details";
                contentHtml = `
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-amber-50">
                                <tr>
                                    <th class="px-4 py-3 text-left text-xs text-amber-600 uppercase tracking-wider">OHT Name</th>
                                    <th class="px-4 py-3 text-left text-xs text-amber-600 uppercase tracking-wider">Year</th>
                                    <th class="px-4 py-3 text-left text-xs text-amber-600 uppercase tracking-wider">Capacity</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                `;

                data[type].forEach((entry) => {
                    contentHtml += `
                        <tr class="opacity-0 transform translate-y-4 transition-all duration-700">
                            <td class="px-4 py-3 whitespace-nowrap text-lg sm:text-xl text-gray-950">${entry.name}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-lg sm:text-xl text-gray-950">${entry.year}</td>
                            <td class="px-4 py-3 whitespace-nowrap text-lg sm:text-xl text-gray-950">${entry.capacity}</td>
                        </tr>
                    `;
                });

                contentHtml += `
                            </tbody>
                        </table>
                    </div>
                `;
            } else if (type === "Ponds") {
                tableTitle = "Ponds in Kovalam Panchayat";
                contentHtml = `
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <tbody class="bg-white divide-y divide-gray-200">
                `;

                data[type].forEach((entry) => {
                    contentHtml += `
                        <tr class="opacity-0 transform translate-y-4 transition-all duration-700">
                            <td class="flex items-center px-4 py-3 whitespace-nowrap text-lg sm:text-xl text-gray-950">
                            <span class="bg-amber-100 text-amber-800 p-1 rounded-full mr-3">
                                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                            ${entry.name}</td>
                        </tr>
                    `;
                });

                contentHtml += `
                            </tbody>
                        </table>
                    </div>
                `;
            } else if (type === "Wells") {
                tableTitle = "Wells in Kovalam Panchayat";
                contentHtml = `
                    <ul class="text-lg sm:text-xl grid sm:grid-cols-2 gap-4">
                `;

                data[type].forEach((entry) => {
                    contentHtml += `
                        <li class="flex items-center opacity-0 transform translate-y-4 transition-all duration-700">
                            <span class="bg-amber-100 text-amber-800 p-1 rounded-full mr-3">
                                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                </svg>
                            </span>
                            <span>${entry.name}</span>
                        </li>
                    `;
                });

                contentHtml += `</ul>`;
            } else {
                throw new Error(`Unsupported table type: ${type}`);
            }

            // Main container HTML
            container.innerHTML = `
                <div class="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden opacity-0 transform scale-95 transition-all duration-500">
                    <div class="bg-stone-700 px-6 py-4">
                        <h3 class="text-xl sm:text-2xl text-white flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 512 512" fill="currentColor">
                                <path d="M241.7 3.4c9-4.5 19.6-4.5 28.6 0l160 80c15.8 7.9 22.2 27.1 14.3 42.9C439 137.5 427.7 144 416 144l0 80c0 17.7-14.3 32-32 32l-4.9 0 32 192 68.9 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-95.5 0c-.4 0-.8 0-1.1 0l-254.8 0c-.4 0-.8 0-1.1 0L32 512c-17.7 0-32-14.3-32-32s14.3-32 32-32l68.9 0 32-192-4.9 0c-17.7 0-32-14.3-32-32l0-80c-11.7 0-23-6.5-28.6-17.7c-7.9-15.8-1.5-35 14.3-42.9l160-80zM314.5 448L256 399.2 197.5 448l117 0zM197.8 256l-4.7 28.3L256 336.8l62.9-52.5L314.2 256l-116.5 0zm-13.9 83.2l-11.2 67L218.5 368l-34.6-28.8zM293.5 368l45.8 38.1-11.2-67L293.5 368zM176 128c-8.8 0-16 7.2-16 16s7.2 16 16 16l160 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-160 0z"/></svg>
                            </svg>
                            ${tableTitle}
                        </h3>
                    </div>
                    <div class="p-6">
                        ${contentHtml}
                    </div>
                </div>
            `;

            // Add animation effects
            setTimeout(() => {
                const tableWrapper = container.querySelector("div");
                if (tableWrapper) {
                    tableWrapper.classList.remove("opacity-0", "scale-95");
                    tableWrapper.classList.add("opacity-100", "scale-100");
                }

                const elements = container.querySelectorAll("tbody tr, ul li");
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.remove("opacity-0", "translate-y-4");
                        el.classList.add("opacity-100", "translate-y-0");
                    }, index * 100);
                });
            }, 100);
        })
        .catch((error) => {
            console.error("Error:", error.message);
            const errorContainer = document.getElementById("errorContainer") || document.body;
            errorContainer.innerHTML = `<div class="error">Error loading data: ${error.message}</div>`;
        });
}

function hideTable() {
    const containerIds = ["tableOHTContainer", "tablePondsContainer", "tableWellsContainer"];

    containerIds.forEach((id) => {
        const container = document.getElementById(id);
        if (container) {
            const tableWrapper = container.querySelector("div");

            if (tableWrapper) {
                // Animate hide
                tableWrapper.classList.remove("opacity-100", "scale-100");
                tableWrapper.classList.add("opacity-0", "scale-95");

                // Clear after animation
                setTimeout(() => {
                    container.innerHTML = "";
                }, 500); // Match the transition duration
            } else {
                container.innerHTML = "";
            }
        }
    });
}


function showContent(type) {
    const sectionIds = [
        'OHTWaterProcess',
        'WellWaterProcess',
        'HandPumpWaterProcess',
        'LorryWaterProcess',
        'OHTCleaningWaterProcess',
        'WaterChlorinationWaterProcess'
    ];

    // Hide all sections
    sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            section.classList.add('hidden');
            section.classList.remove('block');
        }
    });

    // Show the selected section
    const selectedSection = document.getElementById(type);
    if (selectedSection) {
        selectedSection.classList.remove('hidden');
        selectedSection.classList.add('block');

        // Scroll to the section smoothly
        setTimeout(() => {
            selectedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Animate all direct child divs inside the section
            const targetSelector = `#${type} div`;

            gsap.from(targetSelector, {
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.5,
                ease: "power3.out",
                onComplete: function () {
                    let elements = document.querySelectorAll(targetSelector);
                    elements.forEach(el => {
                        el.style.removeProperty("opacity");
                        el.style.removeProperty("transform");
                    });
                }
            });
        }, 100);
    }
}
