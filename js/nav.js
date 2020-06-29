document.addEventListener("DOMContentLoaded", function () {

    // Activate sidebar nav
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = xhttp.responseText;
                });
                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".sidenav a, .topnav a").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        // Tutup sidenav
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
    // Load page content
    var page = window.location.hash.substr(1);
    if (page == "") page = "scheduled_pl";
    loadPage(page);

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                var content = document.querySelector("#body-content");
                //paralax
                $(document).ready(function () {
                    $('.parallax').parallax();
                });
                //select
                $(document).ready(function () {
                    $('select').formSelect();
                    AOS.init();
                });


                // tambahkan blok if berikut
                if (page === "scheduled_pl") {

                    $(document).ready(function () {
                        $("schedules").show("slow");
                        selectLeague();

                    });

                    getScheduled(2021, string = "FINISHED");

                } else if (page === "standings_pl") {
                    $(document).ready(function () {

                        selectStandings();

                    });
                    getStandings(2021, string = "TOTAL");

                } else if (page === "team_pl") {
                    $(document).ready(function () {

                        selectTeams();

                    });
                    getTeams(2021);

                } else if (page === "saved") {
                    getSavedTeams();
                }
                // ---
                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});

function selectLeague() {

    let idMatched = document.getElementById("selectLeague");
    let slcLeague = idMatched.options[idMatched.selectedIndex].value;

    let idFilter = document.getElementById("selectFilter");
    let slcFilter = idFilter.options[idFilter.selectedIndex].value;
    getScheduled(slcLeague, slcFilter);
}
function selectStandings() {

    let idStandings = document.getElementById("selectStandings");
    let slcStandings = idStandings.options[idStandings.selectedIndex].value;

    let idFilter = document.getElementById("selectFilterStandings");
    let slcFilter = idFilter.options[idFilter.selectedIndex].value;
    getStandings(slcStandings, slcFilter);
}
function selectTeams() {

    let idTeams = document.getElementById("selectTeams");
    let slcTeams = idTeams.options[idTeams.selectedIndex].value;

    getTeams(slcTeams);
}
