//blok agar idb  membuat/membuka database
const dbPromised = idb.open("football", 2, upgradeDb => {
  const teamsObjectStore = upgradeDb.createObjectStore("teams", {
    keyPath: "id"
  });
  teamsObjectStore.createIndex("name", "name", { unique: false });
});

//blok untuk menyimpan article/teams method add diganti jadi put
const saveForLater = team => {
  dbPromised
    .then(db => {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      // console.log(team);
      store.put(team);
      return tx.complete;
    })
}

//blok kode untuk menghapus team/profilteam dari page saved
const removeForLater = team => {
  dbPromised
    .then(db => {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      store.delete(team.id);
      // console.log(team);
      return tx.complete;
    })
}


//blok untuk menampilkan artikel yang di pilih
const getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(teams => {
        // console.log(teams)
        resolve(teams);
      });
  });
}

// Blok untuk mengambil 1 data dari database berdasarkan id
const getById = id => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.get(parseInt(id));
      })
      .then(team => {
        // console.log(team)
        resolve(team);
      });
  });
}




















