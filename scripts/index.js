const scrollSpyIDs = ["aboutus", "events", "team", "contact"];

let offsetDistanceRecord = [];

const getOffsetValues = () => {
    for (let dummy_incremator = 0; dummy_incremator < scrollSpyIDs.length; dummy_incremator++) {
        let itemOffset = document.getElementById(`${scrollSpyIDs[dummy_incremator]}`).offsetTop;
        offsetDistanceRecord.push(itemOffset)
    }
}

const changeNavbarStyle = () => {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 100) {
        document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0.9)";
    } else {
        document.getElementById("navbar").style.backgroundColor = "transparent";
    }
    checkElementProximity(currentScrollPos)
}

//check which element is closer to the user for scroll spy
const checkElementProximity = (distance) => {
    for (let dummy_incremator = 0; dummy_incremator < offsetDistanceRecord.length; dummy_incremator++) {
        if (distance < offsetDistanceRecord[0]) {
            highlightElement()
        }
        if (offsetDistanceRecord[dummy_incremator] <= distance && offsetDistanceRecord[dummy_incremator + 1] > distance) {
            highlightElement(scrollSpyIDs[dummy_incremator])
        }
        if (distance >= offsetDistanceRecord[offsetDistanceRecord.length - 1]) {
            highlightElement(scrollSpyIDs[scrollSpyIDs.length - 1])
        }

    }
}

const highlightElement = (id) => {
    if (id == "") {
        null
    }
    for (let dummy_incremator = 0; dummy_incremator < scrollSpyIDs.length; dummy_incremator++) {
        if (scrollSpyIDs[dummy_incremator] === id) {
            document.getElementById(`${id}-link`).style.color = "#B62B3D";
        } else {
            document.getElementById(`${scrollSpyIDs[dummy_incremator]}-link`).style.color = "rgb(140, 134, 125)";
        }
    }
}

//Listening to scroll events on the document
document.addEventListener("scroll", changeNavbarStyle)

// function to show event details when mouse is hovered over the card
const showEventDetails = (e) => {
    document.getElementById(`${e}-text`).style.display = "flex";
}

// function to hide event details when mouse is moved away from the card
const hideEventDetails = (e) => {
    document.getElementById(`${e}-text`).style.display = "none";
}

// Function to fetch details about the team members from the JSON file hosted on Github
const getTeamMembers = async() => {
    let innerHTML_container = "";
    const teamMemberData = await fetch('https://raw.githubusercontent.com/canaryGrapher/E-cell-MIT/master/scripts/data/team.json');
    const parsedMemberData = await teamMemberData.json();
    for (let dummy_incremator = 0; dummy_incremator < parsedMemberData.length; dummy_incremator++) {
        // checking the availability of social links
        const phone = parsedMemberData[dummy_incremator].phone ? `<a href="tel:${parsedMemberData[dummy_incremator].phone}" aria-label="phone contact link"><i class="fas fa-phone mx-2"></i></a>` : "";
        const email = parsedMemberData[dummy_incremator].email ? `<a href="mailto:${parsedMemberData[dummy_incremator].email}" aria-label="Email ID link"><i class="fas fa-envelope mx-2"></i></a>` : "";
        const instagram = parsedMemberData[dummy_incremator].instagram ? `<a href="${parsedMemberData[dummy_incremator].instagram}" aria-label="Instagram page link" target="_blank"><i class="fab fa-instagram mx-2"></i></a>` : "";
        const facebook = parsedMemberData[dummy_incremator].facebook ? `<a href="${parsedMemberData[dummy_incremator].facebook}" aria-label="Facebook page link" target="_blank"><i class="fab fa-facebook-f mx-2"></i></a>` : "";
        const linkedin = parsedMemberData[dummy_incremator].linkedin ? `<a href="${parsedMemberData[dummy_incremator].linkedin}" aria-label="Linkedin page link" target="_blank"><i class="fab fa-linkedin-in mx-2"></i></a>` : "";

        let memberTemplate = `
        <div class="col-6 col-sm-6 col-md-3 member py-4">
            <img class="img rounded-circle mx-auto d-none d-md-inline" src="${parsedMemberData[dummy_incremator].imgURL}" alt="${parsedMemberData[dummy_incremator].name}" height="250" />
            <img class="img rounded-circle mx-auto d-inline d-md-none" src="${parsedMemberData[dummy_incremator].imgURL}" alt="${parsedMemberData[dummy_incremator].name}" height="155" />
            <p class="name-tag pt-2">${parsedMemberData[dummy_incremator].name}</p>
            <p class="text-white pt-1 pb-3">${parsedMemberData[dummy_incremator].position}</p>
            <div class="d-flex flex-row justify-content-center member-social-links">
                ${phone}
                ${email}
                ${instagram}
                ${facebook}
                ${linkedin}
            </div>
        </div>`
        innerHTML_container += memberTemplate;
    }
    document.getElementById("team-row").innerHTML = innerHTML_container;
}

// First fetch the team members then set the offset value record
getTeamMembers().then(e => {
    getOffsetValues()
})