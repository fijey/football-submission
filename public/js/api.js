const base_url = "https://api.football-data.org/v2/";
const api_key = "96edc389d4094ac6933b9a069fae7fe2";

let fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_key
    }
  });
}


// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getScheduled(id, filter) {

  if ("caches" in window) {
    $('.progress').show();
    caches.match(`${base_url}competitions/${id}/matches?status=${filter}`).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          scheduleHTML(data);
          nothingResultHTML(data);
          $('.progress').hide();

        });
      }
    });
  }
  $('.progress').show();
  fetchApi(`${base_url}competitions/${id}/matches?status=${filter}`)
    .then(status)
    .then(json)
    .then(function (data) {
      $('.progress').show();
      scheduleHTML(data);
      nothingResultHTML(data);
      $('.progress').hide();
    })
    .catch(error);
}

//GET NOTHING RESULT
function nothingResultHTML(data) {
  let html = "";
  let noResult = document.getElementById("nothing-result");
  if (data.count == 0) {
    html += `
    <img src="../images/no_result.gif" class="responsive-img">
    `;
    $('.progress').hide();
  }
  noResult.innerHTML = html;
}

// get schedule HTML
function scheduleHTML(data) {
  let schedulesHTML = '';
  let schedule = data.matches;
  let matchLoop = schedule.length;

  if (schedule.length > 12) {
    matchLoop = 11;
  }

  for (let i = 0; i < matchLoop; i++) {

    let scoreHome = `${schedule[i].score.fullTime.homeTeam}`;
    let scoreAway = `${schedule[i].score.fullTime.awayTeam}`;

    if (scoreHome == "null") {
      scoreHome = 0;
    }
    if (scoreAway == "null") {
      scoreAway = 0;
    }

    let status = `${schedule[i].status}`;

    if (status == "FINISHED") {
      status = `<p class="valign-wrapper green darken-2 center-align white-text" style="padding:20px;">Match Has Been Finished at ${dmyt(new Date(schedule[i].utcDate))} </p>`;
    }
    else if (status == "SCHEDULED") {
      status = `<p class="valign-wrapper blue darken-2 center-align white-text" style="padding:20px;">Match Will Be Start at ${dmyt(new Date(schedule[i].utcDate))}</p>`;
    }
    else if (status == "IN_PLAY") {
      status = `<p class="valign-wrapper red darken-2 center-align white-text" style="padding:20px;">LIVE NOW!</p>`;
    }

    schedulesHTML += `
        <div class="line-content"> 
          <div class="col s12 l6">
            <div class="card hoverable">
              <div class="card-content">
                <span class="status blue darken-2 white-text">${schedule[i].status}</span>
                <p class="matchday"><b>Matchday ${schedule[i].matchday} of 38</b></p>
                <table class="responsive-table highligt striped">
                  <thead>
                    <th class="blue darken-2 white-text center-align">Home</th>
                    <th class="red darken-2 white-text center-align">Away</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="center-align home-score-blue">${schedule[i].homeTeam.name}</td>
                      <td class="center-align away-score-red">${schedule[i].awayTeam.name}</td>
                    </tr>
                    <tr>
                      <div>
                        <td class="center-align home-score-blue">${scoreHome}</td>
                        <td class="center-align away-score-red">${scoreAway}</td>
                      </div>
                    </tr>
                  </tbody>
                </table>
                ${status}
              </div>
            </div>
          </div>
    </div > `;
  }
  document.getElementById("schedules").innerHTML = schedulesHTML;

}

//tanggal
function dmyt(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let dte = date.getDate();
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();
  let hours = date.getHours() < 10 ? '0' : '' + date.getHours();
  let minutes = date.getMinutes() < 10 ? '0' : '' + date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  strTime = hours + ':' + minutes + ' ' + ampm;

  return `${dte} ${month} ${year} ${strTime} `;
}
function dmy(date) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let dte = date.getDate();
  let month = monthNames[date.getMonth()];
  let year = date.getFullYear();
  let hours = date.getHours() < 10 ? '0' : '' + date.getHours();
  let minutes = date.getMinutes() < 10 ? '0' : '' + date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  strTime = hours + ':' + minutes + ' ' + ampm;

  return `${dte} ${month} ${year} `;
}


//getStandings
function getStandings(id, filter) {
  $('.progress').show();
  if ("caches" in window) {
    caches.match(`${base_url}competitions/${id}/standings?standingType=${filter}`).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          standingsHTML(data);
          $('.progress').hide();

        });
      }
    });
  }
  $('.progress').show();
  fetchApi(`${base_url}competitions/${id}/standings?standingType=${filter}`)
    .then(status)
    .then(json)
    .then(function (data) {
      standingsHTML(data);
      $('.progress').hide();
    })
    .catch(error);
}

function standingsHTML(data) {
  let html = '';
  data.standings[0].table.forEach(function (standing) {
    html += `
  <tr> 
    <td>${standing.position}</td>
    <td><img class="logo-team" src="${standing.team.crestUrl}"></td>
    <td>${standing.team.name}</td>
    <td>${standing.playedGames}</td>
    <td>${standing.won}</td>
    <td>${standing.draw}</td>
    <td>${standing.lost}</td>
    <td>${standing.points}</td>
    <td>${standing.goalsFor}</td>
    <td>${standing.goalsAgainst}</td>
    <td>${standing.goalDifference}</td>
  </tr> `;
  })
  document.getElementById("standings").innerHTML = html;
}
//getTeams

function getTeams(id) {
  $('.progress').show();
  if ("caches" in window) {
    caches.match(`${base_url}competitions/${id}/teams`).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          teamsHTML(data);
          $('.progress').hide();
        });
      }
    });
  }
  $('.progress').show();
  fetchApi(`${base_url}competitions/${id}/teams`)
    .then(status)
    .then(json)
    .then(function (data) {
      teamsHTML(data)
      $('.progress').hide();
    })
    .catch(error);
}

function teamsHTML(data) {
  let html = '';

  data.teams.forEach(function (team) {
    html += `
  <div class= "col s12 l6">
  <div class="card hoverable">
    <center>
      <div class="card-image waves-effect waves-block waves-blue">
        <img class="activator" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 256px; height: 256px; padding: 15px;">
        </div>
      </center>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${team.name}<i class="material-icons right">more_vert</i></span>
        <p><a class="btn blue darken-3" href="./detail.html?id=${team.id}">See Details</a></p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${team.name}<i class="material-icons right">close</i></span>
        <table class="striped blue darken-4 white-text">
          <tr>
            <td>Name</td>
            <td>:</td>
            <td>${team.name}</td>
          </tr>
          <tr>
            <td>TLA</td>
            <td>:</td>
            <td>${team.tla}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>:</td>
            <td>${team.address}</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>:</td>
            <td>${team.phone}</td>
          </tr>
          <tr>
            <td>Websites</td>
            <td>:</td>
            <td>${team.website}</td>
          </tr>
        </table>
        <p> See Details if you want to see more information about this club </p>
      </div>
          </div>
  </div>
    `;
  })
  document.getElementById("teams").innerHTML = html;
}


function getDetailsById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");


    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            detailsHTML(data);
            $('.progress').hide();
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    fetchApi(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        detailsHTML(data);
        $('.progress').hide();
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}
//GET DETAILS HTML
function detailsHTML(data) {
  let html = "";
  let squads = "";
  let clubNames = "";
  let upcomingName = "";
  upcomingName += `
  ${data.name}
  `
  document.getElementById("upcomingName").innerHTML = upcomingName;


  // nullhandler

  let email = data.email;
  if (email == null) {
    email = "Tidak Ada";
  }

  let phoneNumber = data.phoneNumber;
  if (phoneNumber == null) {
    phoneNumber = "Tidak Ada";
  }

  let phone = data.phoneNumber;
  if (phone == null) {
    phone = "Tidak Ada";
  }

  let website = data.website;
  if (website == null) {
    website = "Tidak Ada";
  }



  html += `
    <div class = "row">
    <div class="col s12 m4">
      <img class="logodetail responsive-img" src="${data.crestUrl}" />
    </div>
    <div class="col s12 m8">
      <h4>${data.name}</h4>
      <table class="responsive-table striped">
        <tr>
          <td>Short Name</td>
          <td class=".hide-on-small-only">:</td>
          <td>${data.shortName}</td>
        </tr>
        <tr>
          <td>TLA </td>
          <td>:</td>
          <td>${data.tla}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>:</td>
          <td>${data.address}</td>
        </tr>
        <tr>
          <td>Phone Number</td>
          <td>:</td>
          <td>${phone}</td>
        </tr>
        <tr>
          <td> Websites </td>
          <td>:</td>
          <td><a href="${website}">${website}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>${email}</td>
          </tr>
          <tr>
            <td> Founded </td>
            <td>:</td>
            <td>${data.founded}</td>
          </tr>
          <tr>
            <td> Club Colors </td>
            <td>:</td>
            <td>${data.clubColors}</td>
            <tr />
            <tr>
              <td>Venue</td>
              <td>:</td>
              <td>${data.venue}</td>
            </tr>
        </table>
    </div>
    </div>
    </div>
  `;

  data.squad.forEach(function (squad) {
    //Handle Kondisi null
    let shirtNumber = squad.shirtNumber;
    if (shirtNumber == null) {
      shirtNumber = "Tidak Ada";
    }
    let name = squad.name;
    if (name == null) {
      name = "tidak Ada";
    }
    let position = squad.position;
    if (position == null) {
      position = "Coach";
    }
    let dateOfBirth = squad.dateOfBirth;
    if (dateOfBirth == null) {
      dateOfBirth = "tidak Ada";
    }
    let countryOfBirth = squad.countryOfBirth;
    if (countryOfBirth == null) {
      countryOfBirth = "tidak Ada";
    }
    let nationality = squad.nationality;
    if (nationality == null) {
      nationality = "tidak Ada";
    }
    let role = squad.role;
    if (role == null) {
      role = "tidak Ada";
    }

    squads += `
    <div class = "col s12 m6">
    <div class="card hoverable z-depth-1">
      <center>
        <div class="card-image waves-effect waves-block waves-blue">
          <span class="badge blue white-text"> ${shirtNumber} </span>
          <img class="activator" src="../images/avatar.png" style="width: 250px; height: 256px; padding: 15px;">
            <span class="badge red white-text"> ${position} </span>
      </div>
    </center>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">${name}<i class="material-icons right">more_vert</i></span>
          <span> Click To See Details About This Player </span>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${name}<i class="material-icons right">close</i></span>
          <table class="striped blue darken-4 white-text">
            <tr>
              <td>Position</td>
              <td>:</td>
              <td>${position}</td>
            </tr>
            <tr>
              <td>Date Of Birth</td>
              <td>:</td>
              <td>${dmy(new Date(dateOfBirth))}</td>
            </tr>
            <tr>
              <td>Country Of Birth</td>
              <td>:</td>
              <td>${countryOfBirth}</td>
            </tr>
            <tr>
              <td>Nationality</td>
              <td>:</td>
              <td>${nationality}</td>
            </tr>
            <tr>
              <td>Tshirt Number</td>
              <td>:</td>
              <td>${shirtNumber}</td>
            </tr>
            <tr>
              <td>Role</td>
              <td>:</td>
              <td>${role}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
      `;
  })

  document.getElementById("details").innerHTML = html;
  document.getElementById("squads").innerHTML = squads;
  document.getElementById("club-names").innerHTML = clubNames;


}

function getSavedTeams() {
  getAll().then(function (teams) {
    console.log(teams);
    $('.progress').hide();
    var savedHTML = "";
    var savedNullHTML = "";

    if (teams.length == 0) {
      savedNullHTML += `
        <div class="row">
            <div class="col s12 center">
                <img class="responsive-img" src="../images/empty_favorites.gif">
            </div>
        </div>`;
      // caption.style.display = 'none';

    }
    else {
      teams.forEach(function (teams) {
        savedHTML += `
    <div class= "col s12 l6">
    <div class="card">
      <center>
        <div class="card-image waves-effect waves-block waves-blue">
          <img class="activator" src="${teams.crestUrl.replace(/^http:\/\//i, 'https://')}" style="width: 256px; height: 256px; padding: 15px;">
        </div>
      </center>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">${teams.name}<i class="material-icons right">more_vert</i></span>
          <p><a class="btn blue darken-3" href="./detail.html?id=${teams.id}&saved=true">See Details</a></p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${teams.name}<i class="material-icons right">close</i></span>
          <table>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td>${teams.name}</td>
            </tr>
            <tr>
              <td>TLA</td>
              <td>:</td>
              <td>${teams.tla}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>:</td>
              <td>${teams.address}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>:</td>
              <td>${teams.phone}</td>
            </tr>
            <tr>
              <td>Websites</td>
              <td>:</td>
              <td>${teams.website}</td>
            </tr>
          </table>
          <p> See Details if you want to see more information about this club </p>
        </div>
          </div>
    </div>
                `;

      });
    }
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("saved").innerHTML = savedHTML;
    document.getElementById("saved-null").innerHTML = savedNullHTML;

  });
}

function getSavedTeamsById() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = parseInt(urlParams.get("id"));

  getById(idParam).then(function (data) {
    detailsHTML(data);
    $('.progress').hide();

    // Sisipkan komponen card ke dalam elemen dengan id #content
  });
}

function getUpcoming() {

  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  console.log(idParam);

  if ("caches" in window) {
    caches.match(`${base_url}teams/` + idParam + `/matches?status=SCHEDULED`).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          upcomingHTML(data);

        });
      }
    });
  }
  fetchApi(`${base_url}teams/` + idParam + `/matches?status=SCHEDULED`)
    .then(status)
    .then(json)
    .then(function (data) {
      upcomingHTML(data);
    })
    .catch(error);
}

function upcomingHTML(data) {
  let upcoming = '';
  let schedule = data.matches;
  let matchLoop = schedule.length;
  let home = '';
  let away = '';


  if (schedule.length > 6) {
    matchLoop = 6;
  }

  for (let i = 0; i < matchLoop; i++) {


    upcoming += `
    <div class= "col s12 l6">
    <div class="card">
      <div class="card-content">
        <span class="status blue darken-2 white-text">${schedule[i].status}</span>
        <p class="matchday"><b>Matchday ${schedule[i].matchday} of 38</b></p>
        <table class="responsive-table highligt striped">
          <thead>
            <th class="blue darken-2 white-text center-align">Home</th>
            <th class="red darken-2 white-text center-align">Away</th>
          </thead>
          <tbody>
            <tr>
              <td class="center-align home-score-blue">${schedule[i].homeTeam.name}</td>
              <td class="center-align away-score-red">${schedule[i].awayTeam.name}</td>
            </tr>
            <tr>
              <div>
                <td class="center-align home-score-blue">${home}</td>
                <td class="center-align away-score-red">${away}</td>
              </div>
            </tr>
          </tbody>
        </table>
        <p id="status">Match Will Be Start at ${dmyt(new Date(schedule[i].utcDate))}</p>
      </div>
    </div>
    </div>
    
      `;
  }
  document.getElementById("upcomingdiv").innerHTML = upcoming;
}

