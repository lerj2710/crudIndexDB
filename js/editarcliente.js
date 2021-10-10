(function(){
    let DB;
    const nombreCliente = document.querySelector('#nombre');
    document.addEventListener('DOMContentLoaded',()=>{
        conectarDB();
        //verificar el id de la url
        const parametrosURL = new URLSearchParams(window.location.search);

        const idCliente = parametrosURL.get('id');

        if(idCliente){
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 100);
        }
    });
    function obtenerCliente(id){
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = e => {
            const cursor = e.target.result;
            if (cursor) {
                if(cursor.value.id === Number(id)){
                    llenarFormulario(cursor.value);
                }
                
                cursor.continue();
            }
        }
    };

    function llenarFormulario(datosCliente) {
        const { nombreInput } = datosCliente;
        nombreCliente.value = nombreInput;
    }
    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);
    
        abrirConexion.onerror = ()=>{
            console.log('hubo un error');
        };
      
         abrirConexion.onsuccess = ()=>{
            DB = abrirConexion.result;
        };
    };
})();