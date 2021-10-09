(function(){
    let DB;

    document.addEventListener('DOMContentLoaded',()=>{
        crearDB();
    });

    //crear indeDB
    function crearDB(){
        //crear indexDB
        const crearDB = window.indexedDB.open('crm',1);
        //si hay un error
        crearDB.onerror = ()=>{
            console.log('hubo un error');
        };
        //si todo sale bien
        crearDB.onsuccess = ()=>{
            DB = crearDB.result;
            console.log('DB creada');
        };
        //configurar la DB
        crearDB.onupgradeneeded = e =>{
            const db = e.target.result;
             const objectStore = db.createObjectStore('crm',{
                keyPath: 'id',
                autoIncrement: true
             });

             objectStore.createIndex('nombre', 'nombre', {unique: false});
             objectStore.createIndex('email', 'email', {unique: true});
             objectStore.createIndex('telefono', 'telefono', {unique: false});
             objectStore.createIndex('empresa', 'empresa', {unique: false});
             objectStore.createIndex('id', 'id', {unique: true});
             console.log('DB lista creada');
        };

    };
})();