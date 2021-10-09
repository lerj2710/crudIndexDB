(function(){
    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded',()=>{
    
        conectarDB();

    formulario.addEventListener('submit', validarCliente);
    });

    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm', 1);
    
        abrirConexion.onerror = ()=>{
            console.log('hubo un error');
        };
      
         abrirConexion.onsuccess = ()=>{
            DB = abrirConexion.result;
        };
    };


    function validarCliente(e) {
        e.preventDefault();
        const nombreInput = document.querySelector('#nombre').value;
        const emailInput = document.querySelector('#email').value;
        const telefonoInput = document.querySelector('#telefono').value;
        const empresaInput = document.querySelector('#empresa').value;
        // validar todos lo campos
        if (nombreInput === '' || emailInput === '' || telefonoInput === '' || empresaInput === '') {
            imprimirAlert('todos los campos son obligatorios', 'error');
            return;
        }

        //crear el objecto principal donde se va llenar los formulaio
        const cliente = {
            nombreInput,
            emailInput,
            telefonoInput,
            empresaInput,
        }

        cliente.id = Date.now();

        crearNuevoCliente(cliente);
       
    }
    function crearNuevoCliente(cliente) {

        const transaction = DB.transaction(['crm'], 'readwrite');
            const objectStore = transaction.objectStore('crm');
            objectStore.add(cliente);

            // si hay un error
            transaction.onerror = ()=>{
                imprimirAlert('hubo un error');
            };
         
            transaction.oncomplete = ()=>{
                imprimirAlert('Cliente creado correctamente');
                setTimeout(() => {
                    window.location.href = 'index.html'
                }, 3000);
            }
    }
    function imprimirAlert(mensaje, tipo) {
        //crear el mensaje
        const alerta = document.querySelector('.alerta');
        if (!alerta) {
            const divMensaje = document.createElement('div');
            
            divMensaje.classList.add('px-4','rounded', 'max-w-lg', 'mt-6', 'text-center', 'border','alerta');
    
            if (tipo === 'error') {
                divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
              }else{
                divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
              }
                divMensaje.textContent= mensaje;
                formulario.appendChild(divMensaje);
    
                setTimeout(() => {
                    divMensaje.remove();
                }, 3000);
        }
    }
})();