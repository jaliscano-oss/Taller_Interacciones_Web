# Evaluador Académico — Taller de Interacciones Web

## Descripción

Aplicación web desarrollada con HTML, Bootstrap 5 y JavaScript puro que permite evaluar el rendimiento académico de estudiantes de forma interactiva. El proyecto fue construido de forma progresiva como parte de un taller universitario sobre fundamentos de JavaScript y manipulación del DOM.

## Funcionalidades implementadas

- Ingreso de nombre, carrera y cuatro notas con soporte para decimales
- Validación de campos vacíos y rango de notas (0 a 20)
- Cálculo de promedio general con dos decimales
- Cálculo de promedio especial excluyendo la nota más baja
- Clasificación del estado académico: Aprobado, Recuperación o Reprobado
- Clasificación del rendimiento: Alto, Medio, Básico o Bajo
- Identificación de nota más alta y nota más baja
- Conteo de notas aprobadas, en recuperación y reprobadas por estudiante
- Recomendación académica según el promedio obtenido
- Cálculo de beca según carrera y promedio (TI, Software, Sistemas)
- Colores de beca diferenciados con Bootstrap
- Historial global de estudiantes evaluados
- Validación de nombres repetidos al registrar
- Tabla de ranking ordenada por promedio descendente
- Estadísticas generales del curso: total, aprobados, recuperación, reprobados y promedio general
- Búsqueda de estudiante por nombre con resaltado en tabla
- Visualización del objeto estudiante completo en formato JSON

## Estructura del proyecto

```
Taller_Interacciones_Web/
│
├── index.html          # Interfaz del evaluador académico
├── app.js              # Lógica JavaScript completa
├── README.md           # Este archivo
└── Taller_Interacciones_Web_Informe.pdf  # Informe en PDF
```

## Cómo ejecutar

1. Descargar o clonar el repositorio
2. Abrir el archivo `index.html` directamente en cualquier navegador moderno (Chrome, Firefox, Edge)
3. No requiere servidor, instalación ni dependencias adicionales

## Tecnologías utilizadas

- HTML5
- Bootstrap 5.3.3 (via CDN)
- JavaScript ES6 (vanilla, sin frameworks)

## Enlace del repositorio

https://github.com/usuario/evaluador-academico
