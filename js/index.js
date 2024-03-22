document.addEventListener('DOMContentLoaded', function() {
    const edadInput = document.getElementById('edad');
    const otrosCampos = document.getElementById('otrosCampos');
    const aviso = document.getElementById('aviso');
    
    // Restaurar valores guardados
    const edadGuardada = localStorage.getItem('edad');
    if (edadGuardada) {
        edadInput.value = edadGuardada;
        edadInput.dispatchEvent(new Event('input'));
    }

    // Validar edad y mostrar/ocultar campos
    edadInput.addEventListener('input', function() {
        const edad = parseInt(edadInput.value, 10);
        if (edad >= 18) {
            otrosCampos.style.display = 'block';
            aviso.style.display = 'none';
        } else {
            otrosCampos.style.display = 'none';
            aviso.style.display = 'block';
        }
        localStorage.setItem('edad', edad);    
    });

    // Calcular precio y validar fecha de ingreso
    document.getElementById('calcularPrecio').addEventListener('click', function() {
        const fechaIngreso = new Date(document.getElementById('ingreso').value);
        fechaIngreso.setHours(0, 0, 0, 0);
        const fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);

        if (fechaIngreso < fechaActual) {
            alert('La fecha de ingreso no puede ser anterior a la fecha actual.');
            return;
        }

        const noches = parseInt(document.getElementById('noches').value, 10) || 0;
        const huespedesMayores = parseInt(document.getElementById('huespedesMayores').value, 10) || 0;
        const huespedesMenores = parseInt(document.getElementById('huespedesMenores').value, 10) || 0;
        const desayuno = document.getElementById('desayuno').checked;

        localStorage.setItem('noches', noches);
        localStorage.setItem('huespedesMayores', huespedesMayores);
        localStorage.setItem('huespedesMenores', huespedesMenores);
        localStorage.setItem('desayuno', desayuno);

        const precioMayores = 12000;
        const precioMenores = 10000;
        const precioDesayuno = 2500;

        let total = (huespedesMayores * precioMayores + huespedesMenores * precioMenores) * noches;
        if (desayuno) {
            total += (huespedesMayores + huespedesMenores) * precioDesayuno * noches;
        }

        document.getElementById('precioTotal').innerHTML = `El precio de la reserva es $${total}`;
        document.getElementById('confirmarReserva').disabled = false;
    });

    // Función que simula verificar disponibilidad (usando promesas) No se me ocurre cómo puedo sumar una API al proyecto
    function verificarDisponibilidad(fechaIngreso, fechaSalida) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const hayDisponibilidad = true; // Esto debería venir de una API real
                if (hayDisponibilidad) {
                    resolve("Reserva confirmada");
                } else {
                    reject("No hay habitaciones disponibles");
                }
            },);
        });
    }

    // Confirmar reserva utilizando promesas
    document.getElementById('confirmarReserva').addEventListener('click', function() {
        const fechaIngreso = new Date(document.getElementById('ingreso').value);
        verificarDisponibilidad(fechaIngreso)
            .then(mensaje => {
                Swal.fire(mensaje);
               
            })
            .catch(error => {
                alert(error);
            });
    });

    // Restaurar valores guardados para checkbox
    const desayunoGuardado = localStorage.getItem('desayuno');
    if (desayunoGuardado !== null) {
        document.getElementById('desayuno').checked = desayunoGuardado === 'true';
    }
});