var app = new Vue({
  el: '#app',
  data: {
    datos:[],
    mensaje: ''
  },
  methods:{
    // Se declara funcion para obtener deatos de la ruta del apiDatosController usando Axios
    getDatos(){
      let url = '/api/datosp';
      axios.get(url).then(response=>{
        console.log(response.data)
        this.datos=response.data;
      });
    },
    // Se declara la nueva funcion para agregar datos usando SweetAlert2
    NuevoDato(){
      console.log('NuevoDato');
      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        {
          title: 'Nombre Completo',
          text: 'Nombre y Apellido',
          input: 'text',
          inputValidator: (value) => {
            if (!value) {
              toastr.error('Debes escribir el nombre','Error');
              return ' '
            }
          }
        },
        {
          title: 'Selecciona la posición',
          text: 'Puesto del empleado',
          input: 'select',
          inputOptions: {
            Auditor: 'Auditor',
            Soporte: 'Soporte',
            Seguridad: 'Seguridad',
                      
            },
          inputPlaceholder: 'Selecciona un puesto',
          inputValidator: (value) => {
          if (!value) {
            toastr.error('Debes seleccionar un puesto');
            return ' '
            }
          }                
        },
        {
          title: 'Escribe el salario de este empleado',
          text: 'Salario ($0.00)',
          input: 'number',
          inputAttributes: {
            min: 4,
            step: 0.01
          },
          inputValidator: (value) => {
            if (!value) {
              toastr.error('Debes indicar un salario');
              return ' '
            }
          }
        },
        // Se agrega la palabra async para indicar que va a ser un dato de tipo asincrono
      ]).then(async(result) => {
        if (result.value) {

          // Declarando estas variables seteo los valores en las variables
          datos={
              nombre    :result.value[0],
              posicion  :result.value[1],
              salario   :result.value[2]

          }
          // console.log(datos)// Con esto confirmo que los dato pasen a tipo objeto
          
          let url = '/api/datosp';
          await axios.post(url,datos).then(response=>{
          console.log(response.data)
          this.mensaje=response.data;
          });
        
          // Se comenta la línea de abajo porque no se quiere usar para notificar con SweetAlert2
          //const answers = JSON.stringify(result.value)
          // Swal.fire({
          //   title: 'All done!',
          //   html: `
          //     Your answers:
          //     <pre><code>${datos}</code></pre> 
          //   `,
          //   confirmButtonText: 'Lovely!'
          // })

          // Se vuelve a poner esta funcion para que ejecute nuevamente la consulta
          this.getDatos();
          // Se agrega el siguiente codigo para usar Toastr en las notificacion de RegistoCompleto
          toastr.success(this.mensaje);


        }
      })
    },

    EliminarDato(dato){
      console.log(dato);

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Estás seguro ?',
        html: "Esta acción no se puede deshacer !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Borrar',
        cancelButtonText: 'No, Cancelar',
        reverseButtons: true
      }).then(async(result) => {
        if (result.value) {

          let url = '/api/datosp/'+dato.id;
          await axios.delete(url).then(response=>{
          console.log(response.data)
          this.mensaje=response.data;
          });
          this.getDatos();
          toastr.success(this.mensaje);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          toastr.error('Acción Cancelada');
          
        }
      })
    },

    EditarDato(dato){
      console.log(dato);

      formulario=
      '<div id="swal2-content" class="swal2-html-container" style="display: block;">Nombre y Apellido</div>'+
        '<input id="nombre" name="nombre" class="swal2-input" placeholder="" type="text" style="display: flex;">'+

      '<div id="swal2-content" class="swal2-html-container" style="display: block;">Puesto del empleado</div>'+
        '<select id="posicion" name="posicion" class="swal2-select" style="display: flex;"><option value="" disabled="">Selecciona un puesto</option><option value="Auditor">Auditor</option><option value="Soporte">Soporte</option><option value="Seguridad">Seguridad</option></select>'+

      '<div id="swal2-content" class="swal2-html-container" style="display: block;">Salario ($0.00)</div>'+
        '<input id="salario" name="salario" min="4" step="0.01" class="swal2-input" placeholder="" type="number" style="display: flex;">'



       Swal.fire({
        title: 'Actualizar Datos',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Guardar',
        html: formulario,
        focusConfirm: false,
        preConfirm: async () => {

          datosactualizados = {

            nombre: document.getElementById('nombre').value,
            posicion: document.getElementById('posicion').value,
            salario: document.getElementById('salario').value

          }

          let url = '/api/datosp/'+dato.id;
          await axios.put(url, datosactualizados).then(response=>{
          console.log(response.data)
          this.mensaje=response.data;
          });

          this.getDatos();


          return toastr.success(this.mensaje);
        }
      })

            document.getElementById('nombre').value = dato.nombre,
            document.getElementById('posicion').value = dato.posicion,
            document.getElementById('salario').value = dato.salario
      
     

    }

  },
  mounted(){
    this.getDatos();
  }



})