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
    const teamMemberData = await fetch('./data/team.json');
    const parsedMemberData = await teamMemberData;
    for (let dummy_incremator = parsedMemberData.length - 1; dummy_incremator >= 0; dummy_incremator--) {
        console.log(parsedMemberData[dummy_incremator])
        let memberTemplate = `
        < !-- Card for ${parsedMemberData[dummy_incremator]} -- >
        <div class="col-3 member">
            <img class="img rounded-circle mx-auto" src="./images/team/DhwanitShah.jpeg" alt="Dhwanit Shah" height="250" />
            <p class="name-tag py-2">Dhwanit Shah</p>
            <div class="d-flex flex-row justify-content-center member-social-links">
                <i class="fas fa-envelope mx-3"></i>
                <i class="fas fa-phone mx-3"></i>
            </div>
        </div>`
            // innerHTML_container += templateGenerator(parsedMemberData[dummy_incremator].date, parsedShi[dummy_incremator].text)
    }
    // document.getElementById("post-insertion-target").innerHTML = innerHTML_container;
}

getTeamMembers()