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
    for (let dummy_incremator = parsedMemberData.length - 1; dummy_incremator >= 0; dummy_incremator--) {
        // checking the availability of social links
        const insta = parsedMemberData[dummy_incremator].instagram ? `<a href="${parsedMemberData[dummy_incremator].instagram}" target="_blank"><i class="fab fa-instagram"></i></a>` : null;
        let memberTemplate = `
        <div class="col-3 member py-4">
            <img class="img rounded-circle mx-auto" src="${parsedMemberData[dummy_incremator].imgURL}" alt="Dhwanit Shah" height="250" />
            <p class="name-tag py-2">${parsedMemberData[dummy_incremator].name}</p>
            <div class="d-flex flex-row justify-content-center member-social-links">
                <i class="fas fa-envelope mx-3"></i>
                <i class="fas fa-phone mx-3"></i>
            </div>
        </div>`
        innerHTML_container += memberTemplate;
    }
    document.getElementById("team-row").innerHTML = innerHTML_container;
}

getTeamMembers()