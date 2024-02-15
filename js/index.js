    const EDAD = parseInt(prompt("Ingresá tu edad"));

    if(EDAD >= 18) {

        let nombre = prompt("Ingresá tu nombre y apellido para registrar la reserva. Este nombre se usará solo como referencia para la reserva, deberás ingresarlo nuevamente al registrar cada huésped.")

        let noches = parseInt(prompt("Cantidad de noches de alojamiento"))

        if (isNaN(noches) || noches <=0) {
            alert("Ingresá un número válido para indicar la cantidad de noches de alojamiento.");
        } else {
            let cantidad = parseInt(prompt("Cantidad de personas"))

            if (isNaN(cantidad) || cantidad <= 0) {
                alert("Ingresá un número válido para indicar la cantidad de personas que se alojarán.")
            } else {
                let personas = [];

                let contadorMenoresDe12 = 0;

                let contadorMayoresDe12 = 0;

                const PRECIO_MENORES_12 = 12000;

                const PRECIO_MAYORES_12 = 16000;

                const IVA = 1.21;

                for (let i = 0; i < cantidad; i++) {
                    let nombre = prompt(`Ingresá el nombre y apellido de la persona ${i + 1}:`);
                    let edad = parseInt(prompt(`Ingresá la edad de la persona ${i + 1}:`));

                    while (isNaN(edad) || edad < 0) {
                        alert("Ingresá una edad válida");
                        edad = parseInt(prompt(`Ingresá la edad de la persona ${i + 1}:`));
                    }

                    personas.push({nombre: nombre, edad: edad});

                    if (edad < 12) {
                        contadorMenoresDe12++;
                    }

                    if (edad >=12) {
                        contadorMayoresDe12++;
                    }
                }

                function calcularPrecio () {
                    let precioTotal = contadorMenoresDe12 * noches * PRECIO_MENORES_12 + contadorMayoresDe12 * noches * PRECIO_MAYORES_12;
                    let precioConIVA = precioTotal * IVA
                    console.log("Total con IVA incluido $" + precioConIVA);

                }
                
                let mensaje = "Nombres y edades de las personas ingresadas";
                personas.forEach((persona, index) => {
                    mensaje += `${index + 1}. Nombre: ${persona.nombre}, Edad: ${persona.edad}\n`;
                });

                mensaje += `Cantidad de menores de 12: ${contadorMenoresDe12}. Cantidad de mayores de 12: ${contadorMayoresDe12} personas.`;

                console.log(mensaje);
                }

            }
    }else{
        alert("Debés ser mayor de 18 años para realizar una reserva.")
    }

    calcularPrecio();