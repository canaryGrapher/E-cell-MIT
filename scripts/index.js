const showEventDetails = (e) => {
    document.getElementById(`${e}-text`).style.display = "flex";
}

const hideEventDetails = (e) => {
    document.getElementById(`${e}-text`).style.display = "none";
}

const changeNavbarStyle = () => {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 100) {
        document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0.9)";
    } else {
        document.getElementById("navbar").style.backgroundColor = "transparent";
    }
}

const getTeamMembers = async() => {
    let innerHTML_container = "";
    const teamMemberData = await fetch('https://raw.githubusercontent.com/canaryGrapher/E-cell-MIT/master/scripts/data/team.json');
    const parsedMemberData = await teamMemberData.json();
    for (let dummy_incremator = 0; dummy_incremator < parsedMemberData.length; dummy_incremator++) {
        // checking the availability of social links
        const phone = parsedMemberData[dummy_incremator].phone ? `<a href="${parsedMemberData[dummy_incremator].phone}" target="_blank"><i class="fas fa-phone mx-2"></i></a>` : "";
        const email = parsedMemberData[dummy_incremator].email ? `<a href="${parsedMemberData[dummy_incremator].phone}" target="_blank"><i class="fas fa-envelope mx-2"></i></a>` : "";
        const instagram = parsedMemberData[dummy_incremator].instagram ? `<a href="${parsedMemberData[dummy_incremator].instagram}" target="_blank"><i class="fab fa-instagram mx-2"></i></a>` : "";
        const facebook = parsedMemberData[dummy_incremator].facebook ? `<a href="${parsedMemberData[dummy_incremator].facebook}" target="_blank"><i class="fab fa-facebook-f mx-2"></i></a>` : "";
        const linkedin = parsedMemberData[dummy_incremator].linkedin ? `<a href="${parsedMemberData[dummy_incremator].lnkedin}" target="_blank"><i class="fab fa-linkedin-in mx-2"></i></a>` : "";

        let memberTemplate = `
        <div class="col-3 member py-4">
            <img class="img rounded-circle mx-auto" src="${parsedMemberData[dummy_incremator].imgURL}" alt="Dhwanit Shah" height="250" />
            <p class="name-tag py-2">${parsedMemberData[dummy_incremator].name}</p>
            <p class="text-white">Position Undefined</p>
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

getTeamMembers()