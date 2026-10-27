// AWS SERVICES DATA

const services = [
    {
        id: "s3",
        name: "Amazon S3",
        category: "Storage",
        icon: "🗄",
        summary: "Scalable cloud object storage for websites and files.",
        description: "Amazon Simple Storage Service provides secure and scalable object storage.",
        how: "Files are stored as objects inside S3 buckets.",
        role: "Stores CloudSphere website files including HTML, CSS and JavaScript."
    },
    {
        id: "cloudfront",
        name: "Amazon CloudFront",
        category: "Networking",
        icon: "🌍",
        summary: "Global Content Delivery Network with HTTPS.",
        description: "Amazon CloudFront delivers content through globally distributed edge locations.",
        how: "CloudFront caches website content closer to users.",
        role: "Delivers the CloudSphere website securely using HTTPS."
    },
    {
        id: "ec2",
        name: "Amazon EC2",
        category: "Compute",
        icon: "💻",
        summary: "Scalable virtual servers in the AWS Cloud.",
        description: "Amazon EC2 provides virtual computing resources.",
        how: "Users can launch virtual servers called EC2 instances.",
        role: "Included as a cloud computing documentation topic. EC2 is not required for this static website."
    },
    {
        id: "vpc",
        name: "Amazon VPC",
        category: "Networking",
        icon: "🌐",
        summary: "Isolated virtual networks in AWS.",
        description: "Amazon VPC allows users to create isolated cloud networks.",
        how: "Users configure subnets, route tables and security groups.",
        role: "Explains AWS networking concepts."
    },
    {
        id: "iam",
        name: "AWS IAM",
        category: "Security",
        icon: "🔐",
        summary: "Manage AWS identities and permissions.",
        description: "AWS IAM controls access to AWS resources.",
        how: "IAM policies define permissions for users and roles.",
        role: "Controls administrative access to AWS resources."
    },
    {
        id: "https",
        name: "HTTPS & TLS",
        category: "Security",
        icon: "🔒",
        summary: "Encrypted website communication.",
        description: "HTTPS protects web communication using TLS encryption.",
        how: "TLS encrypts data transmitted between browsers and servers.",
        role: "Protects communication between users and CloudFront."
    }
];


// DISPLAY AWS SERVICES

const serviceGrid = document.getElementById("serviceGrid");
const searchInput = document.getElementById("serviceSearch");

let currentFilter = "all";

function displayServices() {

    const searchText = searchInput.value.toLowerCase();

    const filteredServices = services.filter(service => {

        const matchesCategory =
            currentFilter === "all" ||
            service.category === currentFilter;

        const matchesSearch =
            service.name.toLowerCase().includes(searchText) ||
            service.summary.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;
    });

    serviceGrid.innerHTML = filteredServices.map(service => `
        <div class="service-card">

            <div class="service-symbol">
                ${service.icon}
            </div>

            <span class="card-category">
                ${service.category}
            </span>

            <h3>${service.name}</h3>

            <p>${service.summary}</p>

            <button
                class="learn-more"
                data-service="${service.id}">
                Read Documentation →
            </button>

        </div>
    `).join("");

    document.getElementById("noResults").hidden =
        filteredServices.length !== 0;
}

displayServices();


// SEARCH FUNCTION

searchInput.addEventListener("input", displayServices);


// CATEGORY FILTERS

document.querySelectorAll(".filter").forEach(button => {

    button.addEventListener("click", function () {

        currentFilter = this.dataset.filter;

        document.querySelectorAll(".filter").forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        displayServices();
    });

});


// DOCUMENTATION POPUP

const dialog = document.getElementById("serviceDialog");

serviceGrid.addEventListener("click", function (event) {

    const button = event.target.closest("[data-service]");

    if (!button) return;

    const service = services.find(
        item => item.id === button.dataset.service
    );

    if (!service) return;

    document.getElementById("modalCategory").textContent =
        service.category;

    document.getElementById("modalTitle").textContent =
        service.name;

    document.getElementById("modalDescription").textContent =
        service.description;

    document.getElementById("modalHow").textContent =
        service.how;

    document.getElementById("modalRole").textContent =
        service.role;

    dialog.showModal();
});

document.getElementById("closeDialog").addEventListener("click", () => {
    dialog.close();
});

document.getElementById("modalDone").addEventListener("click", () => {
    dialog.close();
});

dialog.addEventListener("click", event => {
    if (event.target === dialog) {
        dialog.close();
    }
});


// INTERACTIVE ARCHITECTURE

const architectureData = {

    browser: {
        icon: "👤",
        title: "End User",
        description:
            "A visitor opens the website using a browser. " +
            "The browser sends an HTTPS request to Amazon CloudFront."
    },

    cloudfront: {
        icon: "🌍",
        title: "Amazon CloudFront",
        description:
            "CloudFront receives HTTPS requests and serves cached content. " +
            "If the content is not cached, it retrieves the file from Amazon S3."
    },

    s3: {
        icon: "🗄",
        title: "Amazon S3",
        description:
            "Amazon S3 stores the website files in a private bucket. " +
            "CloudFront accesses the files using Origin Access Control."
    }

};

document.querySelectorAll(".architecture-node").forEach(node => {

    node.addEventListener("click", function () {

        document.querySelectorAll(".architecture-node").forEach(item => {
            item.classList.remove("selected");
        });

        this.classList.add("selected");

        const selected = architectureData[this.dataset.node];

        document.getElementById("detailIcon").textContent =
            selected.icon;

        document.getElementById("detailTitle").textContent =
            selected.title;

        document.getElementById("detailText").textContent =
            selected.description;
    });

});


// DARK / LIGHT MODE

const themeToggle = document.getElementById("themeToggle");

function setTheme(lightMode) {

    document.body.classList.toggle("light", lightMode);

    themeToggle.textContent = lightMode ? "🌙" : "☀";

    localStorage.setItem(
        "cloudsphere-theme",
        lightMode ? "light" : "dark"
    );
}

const savedTheme = localStorage.getItem("cloudsphere-theme");

setTheme(savedTheme === "light");

themeToggle.addEventListener("click", function () {

    const isLight = document.body.classList.contains("light");

    setTheme(!isLight);
});


// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", function () {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
    });

});


// FOOTER YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();

console.log("CloudSphere Website Loaded Successfully!");