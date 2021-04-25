const scrollSpyIDs = ["aboutus", "events", "team", "contact"];

let offsetDistanceRecord = [];
let hiddenContext = true;

// get the distance of eac section from the top of the page
const getOffsetValues = () => {
    for (let dummy_incremator = 0; dummy_incremator < scrollSpyIDs.length; dummy_incremator++) {
        let itemOffset = document.getElementById(`${scrollSpyIDs[dummy_incremator]}`).offsetTop;
        offsetDistanceRecord.push(itemOffset)
    }
}

// function to add a black tint to the navbar upon scroll
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
    if (distance < offsetDistanceRecord[0]) {
        highlightElement()
    } else if (distance >= offsetDistanceRecord[3]) {
        highlightElement(scrollSpyIDs[scrollSpyIDs.length - 1])
    } else {
        if (offsetDistanceRecord[0] <= distance && offsetDistanceRecord[1] > distance) {
            highlightElement(scrollSpyIDs[0])
        } else if (offsetDistanceRecord[1] <= distance && offsetDistanceRecord[2] > distance) {
            highlightElement(scrollSpyIDs[1])
        } else if (offsetDistanceRecord[2] <= distance && offsetDistanceRecord[3] > distance) {
            highlightElement(scrollSpyIDs[2])
        }
    }
}

//function to change the highlighted navbar link
const highlightElement = (id) => {
    if (id == "") {
        null
    }
    for (let dummy_incremator = 0; dummy_incremator < scrollSpyIDs.length; dummy_incremator++) {
        if (scrollSpyIDs[dummy_incremator] === id) {
            document.getElementById(`${id}-link`).style.color = "#5CE1E6";
        } else {
            document.getElementById(`${scrollSpyIDs[dummy_incremator]}-link`).style.color = "rgb(140, 134, 125)";
        }
    }
}

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
    const teamMemberData = await fetch('https://raw.githubusercontent.com/canaryGrapher/E-cell-MIT/parthiv/scripts/data/team.json');
    const parsedMemberData = await teamMemberData.json();
    
    // check and swap the order of first two team members on smaller screens
    if(screen.width < 800) {
        let x = parsedMemberData[1];
        parsedMemberData[1] = parsedMemberData[0];
        parsedMemberData[0] = x;
    }

    for (let dummy_incremator = 0; dummy_incremator < parsedMemberData.length; dummy_incremator++) {
        // checking the availability of social links
        const phone = parsedMemberData[dummy_incremator].phone ? `<a href="tel:${parsedMemberData[dummy_incremator].phone}" aria-label="phone contact link"><i class="fas fa-phone mx-2" style="transform:scaleX(-1)"></i></a>` : "";
        const email = parsedMemberData[dummy_incremator].email ? `<a href="mailto:${parsedMemberData[dummy_incremator].email}" aria-label="Email ID link"><i class="fas fa-envelope mx-2"></i></a>` : "";
        const instagram = parsedMemberData[dummy_incremator].instagram ? `<a href="${parsedMemberData[dummy_incremator].instagram}" aria-label="Instagram page link" target="_blank"><i class="fab fa-instagram mx-2"></i></a>` : "";
        const facebook = parsedMemberData[dummy_incremator].facebook ? `<a href="${parsedMemberData[dummy_incremator].facebook}" aria-label="Facebook page link" target="_blank"><i class="fab fa-facebook-f mx-2"></i></a>` : "";
        const linkedin = parsedMemberData[dummy_incremator].linkedin ? `<a href="${parsedMemberData[dummy_incremator].linkedin}" aria-label="Linkedin page link" target="_blank"><i class="fab fa-linkedin-in mx-2"></i></a>` : "";

        let memberTemplate = `
        <div class="col-12 col-sm-4 col-md-4 member py-4">
            <img loading="lazy" class="img rounded-circle mx-auto d-none d-md-inline" src="${parsedMemberData[dummy_incremator].imgURL}" alt="${parsedMemberData[dummy_incremator].name}" height="150" />
            <img loading="lazy" class="img rounded-circle mx-auto d-inline d-md-none" src="${parsedMemberData[dummy_incremator].imgURL}" alt="${parsedMemberData[dummy_incremator].name}" height="155" />
            <p class="name-tag pt-2" style="font-weight:bold; text-transform: uppercase">${parsedMemberData[dummy_incremator].name}</p>
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
    getOffsetValues();
})

//function to show context menu on phones
const toggleContextMenu = () => {
    if (hiddenContext) {
        document.getElementById("context-menu").style.display = "flex";
        hiddenContext ^= true;
    } else {
        document.getElementById("context-menu").style.display = "none";
        hiddenContext ^= true;
    }
}

const showContext = () => {
    let navbarHeight = document.getElementById("navbar").offsetHeight;
    document.getElementById("context-menu").style.top = `${navbarHeight}px`
}

// function to send contact form response as email 
const sendEmail = () => {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const templateParams = {
            from_name: document.getElementById('name').value,
            to_name: "E-Cell",
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            reply_to: document.getElementById('email').value
        }

        // sends email
        emailjs.send('service_bggy5ik', 'template_wlj35b8', templateParams)
        .then(function(response) {
           document.getElementById('name').value = '';
           document.getElementById('email').value = '';
           document.getElementById('message').value = '';
           document.getElementById('message-status').style.display = "block";
           document.getElementById('message-status').innerHTML = 'Thank you, we have received your message!';
           document.getElementById('message-status').style.color = "#5CE1E6";
        }, function(error) {
            document.getElementById('message-status').style.display = "block";
            document.getElementById('message-status').innerHTML = 'Oops, there was an error. Try again!';
            document.getElementById('message-status').style.color = "red";
        });
    });
}



//Listening to scroll events on the document
document.addEventListener("scroll", changeNavbarStyle)
window.addEventListener("load", showContext, false)

// activates send email function on load
window.onload = sendEmail;

