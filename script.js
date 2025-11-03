// --- 1. BASE DE DATOS DE PROGRAMACIÓN CON SINOPSIS ---
        
const SINOPSIS = {
    mediodia: "Un espacio que aborda toda la información económica y financiera del país.",
    laTarde: "El análisis de las noticias más importantes de la jornada para acompañar las tardes con información, entretenimiento y mantenerse al día con la conducción de Pepe Gil Vidal y Mario Gorodich, junto a un equipo de periodistas profesionales.",
    ruedaCierre: "Una hora y cuarto con la mejor forma de cerrar la siesta con la mejor información económica que sucede a nivel nacional e internacional.",
    elRegreso: "Se enfoca en la actualidad económica del país con las variables políticas y financieras nacionales e internacionales.",
    primeraManana: "Un espacio informativo sobre actualidad nacional e internacional enfocado en la economía. El público podrá conocer todos los detalles de las noticias más exclusivas sobre el ámbito financiero de distintos rubros.",
    destacados: "El resumen imperdible. Presentamos los contenidos más relevantes y las noticias clave emitidas por Canal E en los últimos días. Lo más destacado en un solo lugar.",
    somosNosotros: "Un espacio de contenido informativo en el que la pluralidad de voces se hace oír fuerte y se da el lugar para intercambio de diversas opiniones. La conducción está a cargo del periodista Guillermo Kohan junto a su compañero Beto Valdez.",
    conversacionesConvergentes: "En estos tiempos de incertidumbre y complejidad, los temas se entrecruzan, las especialidades confluyen y la agenda cambia. Cada semana, un tema, un especialista y una conversación distendida: aquí nos escuchamos.",
    segmentoRT: "Retransmisión del canal Russia Today.",
    periodismoPuro: "Programa de entrevistas y análisis político y social profundo, conducido por Jorge Fontevecchia.", 
    loMejorCanalE: "Una selección de los mejores momentos y segmentos de la semana de Canal E.", // Nuevo
    finDeSemana: "Contenido especial y selección de los mejores programas de la semana.",
    finDia: "Programación en pausa o transición."
};

// Programas base (sin sufijos)
const MEDIODIA_ECONOMICO = { nombre: "Mediodía Económico", sinopsis: SINOPSIS.mediodia };
const LA_TARDE = { nombre: "La Tarde", sinopsis: SINOPSIS.laTarde };
const RUEDA_CIERRE = { nombre: "Rueda de Cierre", sinopsis: SINOPSIS.ruedaCierre };
const EL_REGRESO = { nombre: "El Regreso", sinopsis: SINOPSIS.elRegreso };
const PRIMERA_MANANA = { nombre: "Primera Mañana", sinopsis: SINOPSIS.primeraManana }; 
const CODA_FINAL = { inicio: 2359, fin: 0, nombre: "Cierre de Emisión", sinopsis: SINOPSIS.finDia }; 
const DESTACADOS = { nombre: "Destacados", sinopsis: SINOPSIS.destacados };
const SOMOS_NOSOTROS = { nombre: "Somos nosotros", sinopsis: SINOPSIS.somosNosotros };
const CONVERSACIONES_CONVERGENTES = { nombre: "Conversaciones convergentes", sinopsis: SINOPSIS.conversacionesConvergentes };
const FIN_DE_SEMANA_BASE = { nombre: "Programación Fin de Semana / Repeticiones Clave", sinopsis: SINOPSIS.finDeSemana };
const LO_MEJOR_CANAL_E = { nombre: "Lo mejor de Canal E", sinopsis: SINOPSIS.loMejorCanalE };

const MADRUGADA_BASE_CLEAN = [
    { inicio: 0, fin: 200, ...MEDIODIA_ECONOMICO },
    { inicio: 200, fin: 500, ...LA_TARDE },
    { inicio: 500, fin: 615, ...RUEDA_CIERRE },
];
        
const VIVO_BASE_1_CLEAN = [
    { inicio: 900, fin: 1215, ...PRIMERA_MANANA },
    { inicio: 1215, fin: 1400, ...MEDIODIA_ECONOMICO },
    { inicio: 1400, fin: 1415, ...DESTACADOS }, 
    { inicio: 1415, fin: 1700, ...LA_TARDE },
    { inicio: 1700, fin: 1815, ...RUEDA_CIERRE }
];


// Segmentos Finales Comunes y Transiciones
const PRIMERA_MANANA_FIN_NORMAL = { inicio: 2100, fin: 2359, ...PRIMERA_MANANA };
const PRIMERA_MANANA_FIN_2300 = { inicio: 2300, fin: 2359, ...PRIMERA_MANANA }; 


// 1. DOMINGO (Sun) - Programación Diaria repetida + Periodismo Puro (22:00-23:00)
const PROGRAMACION_DOMINGO = [ 
    ...MADRUGADA_BASE_CLEAN,
    { inicio: 615, fin: 900, ...EL_REGRESO },
    ...VIVO_BASE_1_CLEAN.map(p => ({...p})), // Replicamos el bloque principal
    { inicio: 1815, fin: 2200, ...EL_REGRESO }, 
    { inicio: 2200, fin: 2300, nombre: "Periodismo Puro", sinopsis: SINOPSIS.periodismoPuro }, 
    PRIMERA_MANANA_FIN_2300, 
    CODA_FINAL
];
        
// 2. LUNES (Mon) - Segmento RT
const PROGRAMACION_LUNES = [
    ...MADRUGADA_BASE_CLEAN,
    { inicio: 615, fin: 900, ...EL_REGRESO },
    ...VIVO_BASE_1_CLEAN,
    { inicio: 1815, fin: 2100, ...EL_REGRESO },
    { inicio: 2100, fin: 2300, ...PRIMERA_MANANA }, 
    { inicio: 2300, fin: 2359, nombre: "Segmento RT", sinopsis: SINOPSIS.segmentoRT }, 
    CODA_FINAL
];
        
// 3. MARTES (Tue) - Horario normal
const PROGRAMACION_MARTES = [
    ...MADRUGADA_BASE_CLEAN,
    { inicio: 615, fin: 900, ...EL_REGRESO },
    ...VIVO_BASE_1_CLEAN,
    { inicio: 1815, fin: 2100, ...EL_REGRESO },
    PRIMERA_MANANA_FIN_NORMAL, 
    CODA_FINAL
];


// 4. MIÉRCOLES Y JUEVES (Wed/Thu) - 'Somos nosotros' (20:00-21:00)
const PROGRAMACION_MIERCOLES_JUEVES = [
    ...MADRUGADA_BASE_CLEAN,
    { inicio: 615, fin: 900, ...EL_REGRESO },
    ...VIVO_BASE_1_CLEAN,
    { inicio: 1815, fin: 2000, ...EL_REGRESO }, 
    { inicio: 2000, fin: 2100, ...SOMOS_NOSOTROS }, 
    PRIMERA_MANANA_FIN_NORMAL,
    CODA_FINAL
];

// 5. VIERNES (Fri) - 'Somos nosotros' repetición matinal y 'Conversaciones convergentes'
const PROGRAMACION_VIERNES = [
    ...MADRUGADA_BASE_CLEAN,
    { inicio: 615, fin: 800, ...EL_REGRESO }, 
    { inicio: 800, fin: 900, ...SOMOS_NOSOTROS }, 
    ...VIVO_BASE_1_CLEAN,
    { inicio: 1815, fin: 2030, ...EL_REGRESO }, 
    { inicio: 2030, fin: 2100, ...CONVERSACIONES_CONVERGENTES },
    PRIMERA_MANANA_FIN_NORMAL,
    CODA_FINAL
];

// 6. SÁBADO (Sat) - CORREGIDO: Nuevos bloques y cierre a las 22:00
const PROGRAMACION_SABADO = [
    { inicio: 0, fin: 830, ...FIN_DE_SEMANA_BASE },
    { inicio: 830, fin: 900, ...CONVERSACIONES_CONVERGENTES },
    { inicio: 900, fin: 1145, ...FIN_DE_SEMANA_BASE }, 
    { inicio: 1145, fin: 1200, ...DESTACADOS }, // Nuevo: 11:45 a 12:00
    { inicio: 1200, fin: 1430, ...LO_MEJOR_CANAL_E }, // Nuevo: 12:00 a 14:30
    { inicio: 1430, fin: 2200, ...FIN_DE_SEMANA_BASE }, // Relleno hasta el cierre
    { inicio: 2200, fin: 2359, nombre: "Cierre de Emisión", sinopsis: SINOPSIS.finDia }, // Cierre de emisión a las 22:00
    CODA_FINAL // Transición de 23:59 a 00:00
];


const PROGRAMACION_SEMANAL = {
    0: PROGRAMACION_DOMINGO, /* Domingo */
    1: PROGRAMACION_LUNES, /* Lunes */
    2: PROGRAMACION_MARTES, /* Martes */
    3: PROGRAMACION_MIERCOLES_JUEVES, /* Miércoles */
    4: PROGRAMACION_MIERCOLES_JUEVES, /* Jueves */
    5: PROGRAMACION_VIERNES, /* Viernes */
    6: PROGRAMACION_SABADO /* Sábado */
};

const NOMBRES_DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

// --- FUNCIONES AUXILIARES ---

function formatTime(time) {
    if (time === 0) return '00:00';
    if (time === 2359) return '23:59'; 

    const h = Math.floor(time / 100);
    const m = time % 100;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function formatDuration(inicio, fin) {
    let inicioMins = Math.floor(inicio / 100) * 60 + (inicio % 100);
    let finMins = Math.floor(fin / 100) * 60 + (fin % 100);

    if (fin === 0) finMins = 24 * 60; 
    else if (fin === 2359) finMins = 23 * 60 + 59; 
    
    let totalMins = finMins - inicioMins;
    if (totalMins < 0) totalMins += 24 * 60; 

    const hours = Math.floor(totalMins / 60);
    const minutes = totalMins % 60;
    
    let durationStr = '';
    if (hours > 0) durationStr += `${hours}h`;
    if (minutes > 0) durationStr += ` ${minutes}m`;
    
    return durationStr.trim();
}

// --- 2. LÓGICA PRINCIPAL (AHORA AL AIRE y FUTUROS) ---

function updateProgramacion() {
    const now = new Date();
    const currentTimeHHMM = now.getHours() * 100 + now.getMinutes();
    const currentDayIndex = now.getDay(); 

    const programacionHoy = PROGRAMACION_SEMANAL[currentDayIndex] || [];
    let programaActual = { nombre: "Fuera de Horario / Mantenimiento", inicio: 0, fin: 0, sinopsis: "Consulte la programación del día." }; 
    let programasFuturos = [];
    let foundCurrent = false;

    // 1. Encontrar el programa actual
    for (let i = 0; i < programacionHoy.length; i++) {
        const p = programacionHoy[i];
        if (p.fin === 0 && (currentTimeHHMM === 2359 || currentTimeHHMM >= p.inicio)) {
            programaActual = p;
            foundCurrent = true;
            break;
        }
        
        if (currentTimeHHMM >= p.inicio && currentTimeHHMM < p.fin) {
            programaActual = p;
            foundCurrent = true;
            break; 
        }
    }
    
    // 2. Determinar programas futuros 
    let startIndex = programacionHoy.findIndex(p => p === programaActual);
    if (startIndex !== -1) {
        programasFuturos = programacionHoy.slice(startIndex + 1);
    } else {
        programasFuturos = programacionHoy.filter(p => p.inicio > currentTimeHHMM);
    }

    const duration = formatDuration(programaActual.inicio, programaActual.fin);

    // 3. Mostrar AHORA AL AIRE
    document.getElementById('programa-actual').textContent = programaActual.nombre;
    document.getElementById('duracion-actual').textContent = `Duración: ${duration}`;
    const horarioFin = (programaActual.fin === 0) ? '00:00' : formatTime(programaActual.fin);
    document.getElementById('horario-actual').textContent = `${formatTime(programaActual.inicio)} - ${horarioFin}`;
    document.getElementById('sinopsis-actual').textContent = programaActual.sinopsis; 

    // 4. Mostrar Próximos Programas del Día
    const listaProximos = document.getElementById('lista-proximos');
    listaProximos.innerHTML = ''; 

    if (programasFuturos.length > 0) {
        programasFuturos.forEach(p => {
            const nextDuration = formatDuration(p.inicio, p.fin);
            const div = document.createElement('div');
            div.className = 'programa-item';
            const proxHorarioFin = (p.fin === 0) ? '00:00' : formatTime(p.fin);

            div.innerHTML = `
                <div class="programa-main">
                    <div class="horario-futuro">${formatTime(p.inicio)} - ${proxHorarioFin}</div>
                    <div class="nombre-programa">
                        <span>${p.nombre}</span>
                        <span class="duracion-lista">${nextDuration}</span>
                    </div>
                </div>
                <div class="sinopsis-lista">${p.sinopsis}</div> 
            `;
            listaProximos.appendChild(div);
        });
    } else {
         listaProximos.innerHTML = '<p>No hay más programas programados para el resto del día.</p>';
    }
}

// --- 3. LÓGICA DE PESTAÑAS SEMANALES ---

function generateWeeklyTabs() {
    const tabsContainer = document.getElementById('dias-tabs');
    const contentContainer = document.getElementById('programacion-semanal');
    const now = new Date();
    let currentDay = now.getDay();
    
    for (let i = 0; i < 7; i++) {
        let dayIndex = (currentDay + i) % 7; 
        let dayName = NOMBRES_DIAS[dayIndex];
        
        // Botón de Pestaña
        const button = document.createElement('button');
        button.className = 'tab-button';
        if (i === 0) {
            button.classList.add('active');
            dayName = 'HOY'; 
        } else if (i === 1) {
            dayName = 'MAÑANA'; 
        }
        button.textContent = dayName;
        button.setAttribute('data-day-index', dayIndex);
        button.setAttribute('data-tab', `tab-${i}`);
        tabsContainer.appendChild(button);
        
        // Contenido de la Pestaña
        const content = document.createElement('div');
        content.className = 'tab-content';
        content.id = `tab-${i}`;
        if (i === 0) {
            content.classList.add('active');
        }
        
        const programacionDia = PROGRAMACION_SEMANAL[dayIndex] || [];
        
        if (programacionDia.length > 0) {
            programacionDia.forEach(p => {
                const nextDuration = formatDuration(p.inicio, p.fin);
                const proxHorarioFin = (p.fin === 0) ? '00:00' : formatTime(p.fin);
                const div = document.createElement('div');
                div.className = 'programa-item';
                div.innerHTML = `
                    <div class="programa-main">
                        <div class="horario-futuro">${formatTime(p.inicio)} - ${proxHorarioFin}</div>
                        <div class="nombre-programa">
                            <span>${p.nombre}</span>
                            <span class="duracion-lista">${nextDuration}</span>
                        </div>
                    </div>
                    <div class="sinopsis-lista">${p.sinopsis}</div> 
                `;
                content.appendChild(div);
            });
        } else {
            content.innerHTML = '<p>Programación no disponible para este día.</p>';
        }
        contentContainer.appendChild(content);
    }
    
    // Lógica para cambiar de pestaña al hacer clic
    tabsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-button')) {
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(cont => cont.classList.remove('active'));
            
            e.target.classList.add('active');
            document.getElementById(e.target.getAttribute('data-tab')).classList.add('active');
        }
    });
}

// --- 4. INICIALIZACIÓN ---

window.onload = function() {
    generateWeeklyTabs(); 
    updateProgramacion();
    // Actualizar cada 30 segundos (30000ms) para mantener la precisión
    setInterval(updateProgramacion, 30000); 
};

