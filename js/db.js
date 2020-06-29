var dbPromised = idb.open("football", 5, function (upgradeDb) {
    var footballsObjectStore = upgradeDb.createObjectStore("teams", {
        keyPath: "id"
    });
    footballsObjectStore.createIndex("id", "id", { unique: false });
});

function saveForLater(team) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            console.log(team);
            store.put(team);
            return tx.complete;
        })
        .then(function () {
            var toastHTML = '<span>Team Has Been Saved </span>  <a  class="btn-flat toast-action"  id="check">Check</a>';
            M.toast({ html: toastHTML });

            check = document.getElementById("check");
            check.onclick = () => window.location.href = "http://127.0.0.1:8887/#saved";
        });
}

function getAll() {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.getAll();
            })
            .then(function (teams) {
                resolve(teams);
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("teams", "readonly");
                var store = tx.objectStore("teams");
                return store.get(id);
            })
            .then(function (teams) {
                resolve(teams);
            });
    });
}

function deleteTeam(team) {
    dbPromised
        .then(function (db) {
            var tx = db.transaction("teams", "readwrite");
            var store = tx.objectStore("teams");
            store.delete(parseInt(team));
            return tx.complete;
        })
        .then(function () {
            console.log("Team berhasil dihapus.");
        })
}