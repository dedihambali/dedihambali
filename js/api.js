// end-poin url api 
const base_url = "https://api.football-data.org/v2/";

// fetch req 
const fetchApi = function (url) {
  return fetch(url, {
    headers: {
      'X-Auth-Token': "e79bfda918134e579530c94984416611"
    }
  })
};

// Blok kode yang akan di panggil jika fetch berhasil
const status = response => {
  if (response.status !== 200) {
    console.log(`Error : ${response.status}`);
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
const json = response => {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
const error = error => {
  // Parameter error berasal dari Promise.reject()
  console.log(`Error : ${error}`);
}

// Blok kode untuk melakukan request data json
const getTeams = () => {
  fetchApi(`${base_url}teams`)
    .then(status)
    .then(json)
    .then(data => {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      let teamsHTML = "";
      data.teams.forEach(team => teamsHTML += showTeams(team));
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("teams").innerHTML = teamsHTML;
    })
    .catch(error);
}

// Blok kode req json id/info profil team
const getTeamById = () => {
  //Ambil nilai query parameter (?id=)
  return new Promise(resolve => {
    const urlParams = new URLSearchParams(self.location.search);
    const idParam = urlParams.get("id");
    fetchApi(`${base_url}teams/${idParam}`)
      .then(status)
      .then(json)
      .then(team => {
        let teamHTML = showTeamProfil(team);
        document.getElementById("body-content").innerHTML = teamHTML;
        resolve(team);
      });
  });
}

//Blok kode untuk megambil data dari IndexDB dan menampikannya/ke saved page
const getSavedTeams = () => {
  getAll().then(teams => {
    // Menyusun komponen card artikel secara dinamis
    let teamsHTML = "";
    teams.forEach(team => {
      teamsHTML += /*html*/`
        <div class="col s12 m6">
          <div class="card hoverable">       
            <a href="./profilTeam.html?id=${team.id}&saved=true">
              <div class="card-image waves-effect waves-block waves-light">
                <div class="container">
                  <div class="container">
                    <img src="${team.crestUrl}" class="fan-art-club" alt="logo-team" onError="this.onerror=null;this.src='../img/192-icon.png';"/> 
                  </div>   
                </div>
              </div>
            </a>
            <div class="card-content center" id="name-club">
              <span class="card-title truncate">${team.shortName}</span>  
              <p class="truncate">*click the logo to view the team profile</p>                  
            </div>    
          </div>
        </div>
      `;
    })
    if (teams.length === 0) teamsHTML = getZeroSavedTeams();
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

// Blok untuk mengambil data/team profil dari database
const getSavedTeamById = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  getById(idParam).then(team => {
    // console.log(team);
    let teamHTML = showTeamProfil(team);
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;
  });
}


//Blok kode req json standings/klasmen epl(english primer league)
const getStandingsEpl = () => {
  fetchApi(`${base_url}competitions/2021/standings`)
    .then(status)
    .then(json)
    .then(data => {
      // console.log(data.standings[0].table);
      let standingsHTML = "";
      data.standings[0].table.forEach(list => standingsHTML += showStandings(list));
      document.getElementById("standings-epl").innerHTML = standingsHTML;
    })
    .catch(error)
}

// Blok kode untuk menampilkan teams/clubs, hasil response fetch
const showTeams = team => {
  let clubImage = team.crestUrl;
  if (clubImage !== null) {
    clubImage = team.crestUrl.replace(/^http:\/\//i, 'https://');
  }
  return /*html*/`                 
    <div class="col s12 m6">
      <div class="card hoverable">
        <a href="./profilTeam.html?id=${team.id}">
          <div class="card-image waves-effect waves-block waves-light">
            <div class="container">
              <div class="container">
              <img src="${clubImage}" class="fan-art-club" alt="logo-team"  onError="this.onerror=null;this.src='../img/192-icon.png';"/>
              </div>   
            </div>
          </div>
        </a>
        <div class="card-content center" id="name-club">
          <span class="card-title truncate">${team.shortName}</span>  
          <p class="truncate">*click the logo to view the team profile</p>                  
        </div>   
      </div>
    </div>
  `;
}

// Blok kode untuk menampilkan profil/detail teams/clubs, hasil response fetch
const showTeamProfil = team => {
  let clubImage = team.crestUrl;
  if (clubImage !== null) {
    clubImage = team.crestUrl.replace(/^http:\/\//i, 'https://');
  }
  return  /*html*/`
    <div class="row">
      <div class="col s12 offset-m3 m6">
        <div class="card">
          <div class="card-image">
            <div class="container">
              <div class="container">
                <img src="${clubImage}" class="fan-art-club" alt="logo-team"  onError="this.onerror=null;this.src='../img/192-icon.png';"/> 
              </div>   
            </div>
          </div>
          <div class="card-content">
            <table class="striped centered">
              <thead>
                <h5  class="center">${team.name} :</h5>
              </thead>

              <tbody>
                <div class="container">
                  <tr>
                    <td>Name</td>
                    <td>${team.name}</td>
                  </tr>
                  <tr>
                    <td>Short - Name</td>
                    <td>${team.shortName}</td>
                  </tr>
                  <tr>
                    <td>Nation</td>
                    <td>${team.area.name}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>${team.address}</td>
                  </tr>
                  <tr>
                    <td>Club color</td>
                    <td>${team.clubColors}</td>
                  </tr>
                  <tr>
                    <td>Venue</td>
                    <td>${team.venue}</td>
                  </tr>
                  <tr>
                    <td>Foundend</td>
                    <td>${team.founded}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>${team.phone}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>${team.email}</td>
                  </tr>
                  <tr>
                    <td>Website</td>
                    <td>${team.website}</td>
                  </tr>
                </div>  
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Blok kode untuk menampilkan klasemen/standings, hasil response fetch
const showStandings = list => {
  return /*html*/`
    <tr>
      <td>${list.position}</td>
      <td>${list.team.name}</td>
      <td>${list.playedGames}</td>
      <td>${list.won}</td>
      <td>${list.draw}</td>
      <td>${list.lost}</td>
      <td>${list.points}</td>
    </tr>
  `;
}

// Blok untuk mengisi apabila page saved kosong
const getZeroSavedTeams = () => {
  return /*html*/`
    <div class="col s12 m8 offset-m2 l6 offset-l3">
      <div class="card-panel">
        <div class="row valign-wrapper">
          <div class="col s2">
            <i class="material-icons">cloud_off</i>
          </div>
          <div class="col s10">
            <span class="black-text">
            *For now there are no teams saved on this page
            </span>
          </div>
        </div>
      </div>
    </div>  
  `;
}