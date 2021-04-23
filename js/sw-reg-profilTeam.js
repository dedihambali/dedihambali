if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../sw.js")
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isFromSaved = urlParams.get("saved");
  const btnSave = document.getElementById("save");
  const btnRemove = document.getElementById("remove");
  btnRemove.style.display = "none";
  const item = getTeamById();
  if (isFromSaved) {
    btnSave.style.display = 'none';
    btnRemove.style.display = 'block';
    getSavedTeamById();
    document.querySelector("#nav-back").setAttribute("href", "../index.html#saved");

  } else {
    item
  }
  // btn save
  btnSave.onclick = () => {
    M.toast({ html: 'Team profile saved successfully' })
    item.then(team => {
      saveForLater(team);
    });
    btnSave.classList.add('disabled')
  };
  // btn delete
  btnRemove.onclick = () => {
    M.toast({ html: 'delete Team profile from saved successfully' })
    item.then(team => {
      removeForLater(team)
    });
    btnRemove.classList.add('disabled')
  };
});


