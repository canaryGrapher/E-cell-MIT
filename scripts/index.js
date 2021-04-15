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
        const phone = parsedMemberData[dummy_incremator].phone ? `<a href="tel:${parsedMemberData[dummy_incremator].phone}"><i class="fas fa-phone mx-2"></i></a>` : "";
        const email = parsedMemberData[dummy_incremator].email ? `<a href="mailto:${parsedMemberData[dummy_incremator].phone}"><i class="fas fa-envelope mx-2"></i></a>` : "";
        const instagram = parsedMemberData[dummy_incremator].instagram ? `<a href="${parsedMemberData[dummy_incremator].instagram}" target="_blank"><i class="fab fa-instagram mx-2"></i></a>` : "";
        const facebook = parsedMemberData[dummy_incremator].facebook ? `<a href="${parsedMemberData[dummy_incremator].facebook}" target="_blank"><i class="fab fa-facebook-f mx-2"></i></a>` : "";
        const linkedin = parsedMemberData[dummy_incremator].linkedin ? `<a href="${parsedMemberData[dummy_incremator].linkedin}" target="_blank"><i class="fab fa-linkedin-in mx-2"></i></a>` : "";

        let memberTemplate = `
        <div class="col-md-3 col-6 member py-4">
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

getTeamMembers()