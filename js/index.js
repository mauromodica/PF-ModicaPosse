document.addEventListener('DOMContentLoaded', function() {
    const edadInput = document.getElementById('edad');
    const otrosCampos = document.getElementById('otrosCampos');
    const aviso = document.getElementById('aviso');
    
    const edadGuardada = localStorage.getItem('edad');
    if (edadGuardada) {
        edadInput.value = edadGuardada;
        edadInput.dispatchEvent(new Event('input'));
    }

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
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calcularPrecio').addEventListener('click', function(){
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

    })

    const nochesGuardadas = localStorage.getItem('noches');
    const huespedesMayoresGuardados = localStorage.getItem('huespedesMayores');
    const huespedesMenoresGuardados = localStorage.getItem('huespedesMenores');
    const desayunoGuardado = localStorage.getItem('desayuno');

    if (nochesGuardadas !== null) document.getElementById('noches').value = nochesGuardadas;
    if (huespedesMayoresGuardados !== null) document.getElementById('huespedesMayores').value = huespedesMayoresGuardados;
    if (huespedesMenoresGuardados !== null) document.getElementById('huespedesMenores').value = huespedesMenoresGuardados;
    if (desayunoGuardado !== null) document.getElementById('desayuno').checked = desayunoGuardado === 'true';
    
})