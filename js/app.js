(function(){
    let DB;

    document.addEventListener('DOMContentLoaded',()=>{
        crearDB();

        if (window.indexedDB.open('crm', 1)) {
            obtenerCliente();
        }
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

    function obtenerCliente() {
        
        const abrirConexion = window.indexedDB.open('crm',1);
                 
                abrirConexion.onerror= ()=>{
                    console.log('hubo un error');
                };

            abrirConexion.onsuccess= ()=>{
               DB = abrirConexion.result;

               const objectStore = DB.transaction('crm').objectStore('crm');
               objectStore.openCursor().onsuccess = function(e) {
                   const cursor = e.target.result;

                   if (cursor) {
                     const {emailInput, id, empresaInput, nombreInput, telefonoInput}= cursor.value;
                     const listadoCliente = document.querySelector('#listado-clientes');
                        listadoCliente.innerHTML += `
                        <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombreInput} </p>
                                <p class="text-sm leading-10 text-gray-700"> ${emailInput} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700">${telefonoInput}</p>
                                </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                <p class="text-gray-600">${empresaInput}</p>
                            </td>
                                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
                            </td>
                        </tr>
                        `;
                       cursor.continue();
                   }else{
                       console.log('no hay mas registro...');
                   }
               }
            };
            
    }
})();