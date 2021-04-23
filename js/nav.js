document.addEventListener("DOMContentLoaded", () => {
  // Activate sidebar nav
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);

  let page = window.location.hash.substr(1);
  const loadNav = () => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
          elm.innerHTML = xhttp.responseText;
        });
        // Daftarkan event listener untuk setiap tautan menu
        document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
          elm.addEventListener("click", event => {
            // Tutup sidenav
            const sidenav = document.querySelector(".sidenav");
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
  loadNav();
  // Load page content

  const loadPage = page => {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const content = document.querySelector("#body-content");

        if (page === "teams") {
          getTeams();

        } else if (page === "saved") {
          getSavedTeams();

        } else if (page === "standings") {
          getStandingsEpl();

        }

        if (this.status === 200) {

          content.innerHTML = xhttp.responseText;

        } else if (this.status === 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };
    xhttp.open("GET", `pages/${page}.html`, true);
    xhttp.send();
  }
  if (page === "") page = "teams";
  loadPage(page);

});

const load = document.getElementById('load-self');
self.addEventListener('load', () => {
  load.style.display = "none";
})
