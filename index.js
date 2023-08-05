window.onload = () => {
    const formulario = document.getElementById("formulario-busqueda");

    formulario.addEventListener("submit", function (event) {

        event.preventDefault();
        const inputDireccion = document.getElementById("input-direccion").value;
        
        
        if (inputDireccion) {
            buscarCalles(inputDireccion)
        } else {
            document.getElementById("input-direccion").style.borderColor = "red";
            document.getElementById("resultados").innerHTML = "Debes ingresar una dirección"
            
        }
        function buscarCalles(direccion) {
            const url = `https://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=${direccion}`;
            console.log(url);

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    mostrarResultados(data.direccionesNormalizadas);
                    function mostrarResultados(calles) {

                        const listaResultados = document.getElementById("resultados");
                        listaResultados.innerHTML = "";

                        if (!calles || calles.length === 0) {
                            const li = document.createElement("li");
                            li.textContent = "No se encontraron calles sugeridas.";
                            listaResultados.appendChild(li);
                            return;
                        }

                        calles.forEach((calle) => {
                            const li = document.createElement("li");
                            li.innerText = `Nombre de la calle: ${calle.nombre_calle}, 
                            Dirección: ${calle.direccion}`;
                            listaResultados.appendChild(li);
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    });


}

