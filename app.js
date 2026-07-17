const btnEvaluar = document.getElementById("btnEvaluar");
const btnLimpiar = document.getElementById("btnLimpiar");

btnEvaluar.addEventListener("click", evaluarEstudiante);
btnLimpiar.addEventListener("click", limpiarFormulario);

// Arreglo global donde se almacenarán todos los estudiantes evaluados
const estudiantes = [];

// Recoge los datos del formulario, valida, calcula y muestra el resultado
function evaluarEstudiante() {
    const nombre = document.getElementById("nombre").value.trim();
    const carrera = document.getElementById("carrera").value;
    const nota1Texto = document.getElementById("nota1").value;
    const nota2Texto = document.getElementById("nota2").value;
    const nota3Texto = document.getElementById("nota3").value;
    const nota4Texto = document.getElementById("nota4").value;

    if (nombre === "" || carrera === "" || nota1Texto === "" || nota2Texto === "" || nota3Texto === "" || nota4Texto === "") {
        mostrarResultado("Debe completar todos los campos.", "danger");
        return;
    }

    const notas = [Number(nota1Texto), Number(nota2Texto), Number(nota3Texto), Number(nota4Texto)];

    if (existeNotaInvalida(notas)) {
        mostrarResultado("Cada nota debe estar entre 0 y 20.", "danger");
        return;
    }

    // Ejercicio 12 — Validar nombres repetidos
    if (existeNombreRepetido(nombre)) {
        mostrarResultado(`El estudiante "${nombre}" ya fue evaluado anteriormente.`, "warning");
        return;
    }

    // Cálculos principales
    const promedio = calcularPromedio(notas);
    const promedioSinMinima = calcularPromedioSinMinima(notas);   // Ejercicio 6
    const estado = clasificarEstado(promedio);
    const rendimiento = clasificarRendimiento(promedio);           // Ejercicio 10
    const recomendacion = obtenerRecomendacion(promedio);          // Ejercicio 9
    const { max, min } = obtenerExtremos(notas);                   // Ejercicio 7
    const { aprobadas, recuperacion, reprobadas } = clasificarNotas(notas); // Ejercicio 8
    const beca = calcularBeca(carrera, promedio);                  // Ejercicio 4

    // Ejercicio 20 — Objeto estudiante completo
    const estudiante = {
        nombre: nombre,
        carrera: carrera,
        notas: notas,
        promedio: promedio,
        promedioSinMinima: promedioSinMinima,
        notaMaxima: max,
        notaMinima: min,
        estado: estado,
        rendimiento: rendimiento,
        recomendacion: recomendacion,
        notasAprobadas: aprobadas,
        notasRecuperacion: recuperacion,
        notasReprobadas: reprobadas,
        beca: beca
    };

    // Ejercicio 11 — Guardar en historial
    estudiantes.push(estudiante);
    actualizarContadorHistorial();

    mostrarResultado(construirMensaje(estudiante), obtenerColorEstado(estado));
    mostrarBeca(beca);                // Ejercicios 4 y 5
    mostrarJSON();
    console.table(estudiante);
}

// Retorna true si alguna nota está fuera del rango 0-20
function existeNotaInvalida(notas) {
    for (const nota of notas) {
        if (Number.isNaN(nota) || nota < 0 || nota > 20) {
            return true;
        }
    }
    return false;
}

// Suma todas las notas y devuelve el promedio
function calcularPromedio(notas) {
    let suma = 0;
    for (const nota of notas) {
        suma = suma + nota;
    }
    return suma / notas.length;
}

// Ejercicio 6 — Calcula el promedio excluyendo la nota más baja
function calcularPromedioSinMinima(notas) {
    const { min } = obtenerExtremos(notas);
    let suma = 0;
    let excluido = false;
    for (const nota of notas) {
        if (nota === min && !excluido) {
            excluido = true;
            continue;
        }
        suma += nota;
    }
    return suma / (notas.length - 1);
}

// Devuelve "Aprobado", "Recuperación" o "Reprobado" según el promedio
function clasificarEstado(promedio) {
    if (promedio >= 14) {
        return "Aprobado";
    } else if (promedio >= 10) {
        return "Recuperación";
    } else {
        return "Reprobado";
    }
}

// Ejercicio 10 — Clasifica el rendimiento como Alto, Medio, Básico o Bajo
function clasificarRendimiento(promedio) {
    if (promedio >= 18) {
        return "Alto";
    } else if (promedio >= 14) {
        return "Medio";
    } else if (promedio >= 10) {
        return "Básico";
    } else {
        return "Bajo";
    }
}

// Ejercicio 9 — Devuelve una recomendación académica según el promedio
function obtenerRecomendacion(promedio) {
    if (promedio >= 18) {
        return "Mantener el desempeño y apoyar a compañeros.";
    } else if (promedio >= 14) {
        return "Reforzar temas específicos.";
    } else if (promedio >= 10) {
        return "Asistir a tutorías y practicar ejercicios.";
    } else {
        return "Repetir contenidos base y solicitar acompañamiento.";
    }
}

// Devuelve el color Bootstrap correspondiente al estado del estudiante
function obtenerColorEstado(estado) {
    switch (estado) {
        case "Aprobado":
            return "success";
        case "Recuperación":
            return "warning";
        case "Reprobado":
            return "danger";
        default:
            return "secondary";
    }
}

// Ejercicio 8 — Cuenta cuántas notas son aprobadas, de recuperación o reprobadas
function clasificarNotas(notas) {
    let aprobadas = 0;
    let recuperacion = 0;
    let reprobadas = 0;

    for (const nota of notas) {
        if (nota >= 14) {
            aprobadas++;
        } else if (nota >= 10) {
            recuperacion++;
        } else {
            reprobadas++;
        }
    }

    return { aprobadas, recuperacion, reprobadas };
}

// Ejercicio 7 — Recorre el array una sola vez y devuelve la nota más alta y más baja
function obtenerExtremos(notas) {
    let max = notas[0];
    let min = notas[0];
    for (const nota of notas) {
        if (nota > max) {
            max = nota;
        }
        if (nota < min) {
            min = nota;
        }
    }
    return { max, min };
}

// Ejercicio 4 — Devuelve el porcentaje de beca según carrera y promedio, o null si no aplica
function calcularBeca(carrera, promedio) {
    if (carrera === "TI" && promedio >= 18) {
        return 100;
    } else if (carrera === "Software" && promedio >= 17) {
        return 80;
    } else if (carrera === "Sistemas" && promedio >= 16) {
        return 60;
    } else {
        return null;
    }
}

// Arma el texto del mensaje con todos los datos del estudiante
function construirMensaje(estudiante) {
    return `El estudiante ${estudiante.nombre}, de la carrera ${estudiante.carrera}, ` +
           `tiene un promedio de ${estudiante.promedio.toFixed(2)} y su estado es: ${estudiante.estado}. ` +
           `Rendimiento: ${estudiante.rendimiento}. ` +
           `Nota más alta: ${estudiante.notaMaxima} | Nota más baja: ${estudiante.notaMinima}. ` +
           `Promedio sin mínima: ${estudiante.promedioSinMinima.toFixed(2)}. ` +
           `Aprobadas: ${estudiante.notasAprobadas} | Recuperación: ${estudiante.notasRecuperacion} | Reprobadas: ${estudiante.notasReprobadas}. ` +
           `Recomendación: ${estudiante.recomendacion}`;
}

// Ejercicio 5 — Muestra la beca con color Bootstrap según el porcentaje
function mostrarBeca(beca) {
    const divBeca = document.getElementById("divBeca");
    if (beca === 100) {
        divBeca.className = "alert alert-success mt-4";
        divBeca.textContent = "¡Felicitaciones! Este estudiante obtiene una beca del 100%.";
    } else if (beca === 80) {
        divBeca.className = "alert alert-primary mt-4";
        divBeca.textContent = "¡Felicitaciones! Este estudiante obtiene una beca del 80%.";
    } else if (beca === 60) {
        divBeca.className = "alert alert-warning mt-4";
        divBeca.textContent = "¡Felicitaciones! Este estudiante obtiene una beca del 60%.";
    } else {
        divBeca.className = "alert alert-secondary mt-4";
        divBeca.textContent = "Este estudiante no califica para beca en este período.";
    }
    divBeca.classList.remove("d-none");
}

// Muestra el mensaje de resultado con el color del estado en el div de alerta
function mostrarResultado(mensaje, tipo) {
    const resultado = document.getElementById("resultado");
    resultado.textContent = mensaje;
    resultado.className = `alert alert-${tipo} mt-4`;
}

// Serializa todos los estudiantes y los muestra en el bloque JSON
function mostrarJSON() {
    const salidaJSON = document.getElementById("salidaJSON");
    salidaJSON.classList.remove("d-none");
    salidaJSON.textContent = JSON.stringify(estudiantes, null, 2);
}

// Ejercicio 12 — Verifica si ya existe un estudiante con el mismo nombre
function existeNombreRepetido(nombre) {
    for (const est of estudiantes) {
        if (est.nombre.toLowerCase() === nombre.toLowerCase()) {
            return true;
        }
    }
    return false;
}

// Ejercicio 14 — Actualiza el contador de estudiantes evaluados
function actualizarContadorHistorial() {
    const contador = document.getElementById("contadorHistorial");
    contador.textContent = `Estudiantes evaluados: ${estudiantes.length}`;
}

// Ejercicios 13, 15, 16, 18, 19 — Muestra la tabla con ranking y estadísticas generales
function mostrarTablaHistorial() {
    const seccion = document.getElementById("seccionHistorial");
    const tbody = document.getElementById("tablaHistorialBody");

    if (estudiantes.length === 0) {
        seccion.classList.add("d-none");
        return;
    }

    // Ejercicio 18 — Ordenar por promedio descendente (ranking)
    const ranking = [...estudiantes].sort(function(a, b) {
        return b.promedio - a.promedio;
    });

    tbody.innerHTML = "";
    for (let i = 0; i < ranking.length; i++) {
        const est = ranking[i];
        const fila = document.createElement("tr");
        fila.innerHTML =
            "<td>" + (i + 1) + "</td>" +
            "<td>" + est.nombre + "</td>" +
            "<td>" + est.carrera + "</td>" +
            "<td>" + est.notas.join(", ") + "</td>" +
            "<td>" + est.promedio.toFixed(2) + "</td>" +
            "<td>" + est.promedioSinMinima.toFixed(2) + "</td>" +
            "<td>" + est.estado + "</td>" +
            "<td>" + est.rendimiento + "</td>" +
            "<td>" + est.recomendacion + "</td>" +
            "<td>" + (est.beca !== null ? est.beca + "%" : "—") + "</td>";
        tbody.appendChild(fila);
    }

    mostrarEstadisticasGenerales(ranking);
    seccion.classList.remove("d-none");
}

// Ejercicios 15, 16, 19 — Calcula y muestra estadísticas generales del curso
function mostrarEstadisticasGenerales(ranking) {
    let totalAprobados = 0;
    let totalRecuperacion = 0;
    let totalReprobados = 0;
    let sumaPromedios = 0;

    for (const est of estudiantes) {
        if (est.estado === "Aprobado") {
            totalAprobados++;
        } else if (est.estado === "Recuperación") {
            totalRecuperacion++;
        } else {
            totalReprobados++;
        }
        sumaPromedios += est.promedio;
    }

    const promedioGeneral = sumaPromedios / estudiantes.length;

    // Ejercicio 19 — Mejor y peor promedio (ranking ya está ordenado)
    const mejorEstudiante = ranking[0];
    const peorEstudiante = ranking[ranking.length - 1];

    document.getElementById("statTotal").textContent = estudiantes.length;
    document.getElementById("statAprobados").textContent = totalAprobados;
    document.getElementById("statRecuperacion").textContent = totalRecuperacion;
    document.getElementById("statReprobados").textContent = totalReprobados;
    document.getElementById("statPromedioGeneral").textContent = promedioGeneral.toFixed(2);
    document.getElementById("statMejor").textContent = mejorEstudiante.nombre + " (" + mejorEstudiante.promedio.toFixed(2) + ")";
    document.getElementById("statPeor").textContent = peorEstudiante.nombre + " (" + peorEstudiante.promedio.toFixed(2) + ")";

    document.getElementById("seccionEstadisticas").classList.remove("d-none");
}

// Ejercicio 17 — Busca un estudiante por nombre y resalta su fila en la tabla
function buscarEstudiante() {
    const termino = document.getElementById("inputBuscar").value.trim().toLowerCase();
    const msgBuscar = document.getElementById("msgBuscar");

    if (termino === "") {
        msgBuscar.classList.add("d-none");
        return;
    }

    mostrarTablaHistorial();

    const filas = document.querySelectorAll("#tablaHistorialBody tr");
    let encontrado = false;

    for (const fila of filas) {
        const nombreCelda = fila.cells[1].textContent.toLowerCase();
        if (nombreCelda.includes(termino)) {
            fila.classList.add("table-warning");
            encontrado = true;
        } else {
            fila.classList.remove("table-warning");
        }
    }

    if (!encontrado) {
        msgBuscar.textContent = `No se encontró ningún estudiante con "${termino}".`;
        msgBuscar.classList.remove("d-none");
    } else {
        msgBuscar.classList.add("d-none");
    }
}

// Limpia todos los campos del formulario
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("carrera").value = "";
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    document.getElementById("nota3").value = "";
    document.getElementById("nota4").value = "";
}

// Oculta y vacía el div de resultado y el bloque JSON
function limpiarResultado() {
    const resultado = document.getElementById("resultado");
    resultado.textContent = "";
    resultado.className = "alert mt-4 d-none";
    const salidaJSON = document.getElementById("salidaJSON");
    salidaJSON.className = "bg-dark text-white p-3 rounded d-none";
    salidaJSON.textContent = "";
}

// Limpia tanto el formulario como el área de resultados
function limpiarFormularioYResultado() {
    limpiarFormulario();
    limpiarResultado();
}
