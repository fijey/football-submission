
document.addEventListener("DOMContentLoaded", function () {

    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");

    var team = urlParams.get("id")

    let btnSave = document.getElementById("save");
    let btnDelete = document.getElementById("delete");

    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        btnSave.style.display = 'none';
        btnDelete.style.display = 'true';

        // ambil artikel lalu tampilkan
        getSavedTeamsById();
        getUpcoming();

        btnDelete.onclick = function () {
            deleteTeam(team);
            M.toast({ html: 'Has Been Deleted From Favorite' })
            location.replace("http://127.0.0.1:8887/#saved");
        }
    } else {
        var item = getDetailsById();
        getUpcoming();


        btnSave.style.display = 'true';
        btnDelete.style.display = 'none';
        //fd
        var elems = document.querySelectorAll('.sidenav');
        var instances = M.Sidenav.init(elems, {});
        var elemsTap = document.querySelector('.tap-target');
        var instancesTap = M.TapTarget.init(elemsTap, {});
        instancesTap.open()
    }
    //save
    let save = document.getElementById("save");
    save.onclick = function () {
        console.log("Tombol FAB di klik.");
        item.then(function (team) {
            saveForLater(team);
            btnSave.style.display = 'none';

        })
    }


    //paralax
    $(document).ready(function () {
        $('.parallax').parallax();
        $('.collapsible').collapsible();
        AOS.init();
    });



});