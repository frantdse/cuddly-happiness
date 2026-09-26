// --- 1. BASE DE DATOS DE PROGRAMACIÓN CON SINOPSIS ---
        
const SINOPSIS = {
    trasnoche: "Selección y repetición de los mejores contenidos del canal.",
    mananaInformativa: "La información indispensable para arrancar la jornada con la primera visión de la actualidad.",
    longobardi: "Noticias, análisis y entrevistas con la conducción de Marcelo Longobardi.",
    modoFontevecchia: "Periodismo y análisis de la realidad política, económica y social, conducido por Jorge Fontevecchia.",
    rondaInvestigacion: "Investigaciones periodísticas y análisis profundo con la conducción de Natalia Volosin.",
    rondaCorresponsales: "La visión global y las novedades internacionales de la mano de Jorge Elías y su red de corresponsales.",
    rondaEconomistas: "El panorama financiero, los mercados y las variables económicas analizados por Fernando Meaños.",
    rondaEscritores: "Un espacio para la literatura, los libros y el pensamiento cultural conducido por Osvaldo Quiroga.",
    rondaEditores: "Las primicias, enfoques y debates periodísticos con los principales editores de Editorial Perfil.",
    documentalesDW: "Bloque de documentales internacionales producidos por Deutsche Welle.",
    qr: "Actualidad, política y debate en la noche del canal con la conducción de Pablo Caruso.",
    rebord: "Espacio de entrevistas e impresiones conducido por Tomás Rebord.",
    yAhoraQue: "Cierre de la jornada con debate y análisis de la agenda informativa.",
    finDia: "Programación en pausa o transición."
};

// Programas base
const TRASNOCHE = { nombre: "Programación trasnoche", sinopsis: SINOPSIS.trasnoche };
const MANANA_INFORMATIVA = { nombre: "La mañana informativa", sinopsis: SINOPSIS.mananaInformativa };
const LONGOBARDI = { nombre: "Longobardi", sinopsis: SINOPSIS.longobardi };
const MODO_FONTEVECCHIA = { nombre: "Modo Fontevecchia", sinopsis: SINOPSIS.modoFontevecchia };
const RONDA_INVESTIGACION = { nombre: "Ronda de Investigación", sinopsis: SINOPSIS.rondaInvestigacion };
const RONDA_CORRESPONSALES = { nombre: "Ronda de Corresponsales", sinopsis: SINOPSIS.rondaCorresponsales };
const RONDA_ECONOMISTAS = { nombre: "Ronda de Economistas", sinopsis: SINOPSIS.rondaEconomistas };
const RONDA_ESCRITORES = { nombre: "Ronda de Escritores", sinopsis: SINOPSIS.rondaEscritores };
const RONDA_EDITORES = { nombre: "Ronda de Editores", sinopsis: SINOPSIS.rondaEditores };
const DOCUMENTALES_DW = { nombre: "Documentales DW", sinopsis: SINOPSIS.documentalesDW };
const QR = { nombre: "QR!", sinopsis: SINOPSIS.qr };
const REBORD = { nombre: "Rebord", sinopsis: SINOPSIS.rebord };
const Y_AHORA_QUE = { nombre: "¿Y ahora qué?", sinopsis: SINOPSIS.yAhoraQue };
const CODA_FINAL = { inicio: 2359, fin: 0, nombre: "Cierre de Emisión", sinopsis: SINOPSIS.finDia };

// Bloque común de madrugada y mañana (Lunes a Viernes)
const MADRUGADA_Y_MANANA_BASE = [
    { inicio: 0, fin: 500, ...TRASNOCHE },
    { inicio: 500, fin: 800, ...MANANA_INFORMATIVA },
    { inicio: 800, fin: 1000, ...LONGOBARDI },
    { inicio: 1000, fin: 1300, ...MODO_FONTEVECCHIA },
    { inicio: 1300, fin: 1430, ...RONDA_INVESTIGACION },
    { inicio: 1430, fin: 1630, ...RONDA_CORRESPONSALES },
    { inicio: 1630, fin: 1800, ...RONDA_ECONOMISTAS }
];

// Grillas Diarias
const PROGRAMACION_LUNES_A_MIERCOLES = [
    ...MADRUGADA_Y_MANANA_BASE,
    { inicio: 1800, fin: 1930, ...RONDA_ESCRITORES },
    { inicio: 1930, fin: 2100, ...RONDA_EDITORES },
    { inicio: 2100, fin: 2300, ...QR },
    { inicio: 2300, fin: 2359, ...Y_AHORA_QUE },
    CODA_FINAL
];

const PROGRAMACION_JUEVES = [
    ...MADRUGADA_Y_MANANA_BASE,
    { inicio: 1800, fin: 1930, ...RONDA_ESCRITORES },
    { inicio: 1930, fin: 2100, ...RONDA_EDITORES },
    { inicio: 2100, fin: 2300, ...QR },
    { inicio: 2300, fin: 2359, ...REBORD },
    CODA_FINAL
];

const PROGRAMACION_VIERNES = [
    ...MADRUGADA_Y_MANANA_BASE,
    { inicio: 1800, fin: 1830, ...DOCUMENTALES_DW },
    { inicio: 1830, fin: 2100, ...RONDA_EDITORES },
    { inicio: 2100, fin: 2300, ...QR },
    { inicio: 2300, fin: 2359, ...Y_AHORA_QUE },
    CODA_FINAL
];

const PROGRAMACION_FIN_DE_SEMANA = [
    { inicio: 0, fin: 800, ...TRASNOCHE },
    { inicio: 800, fin: 1300, ...MODO_FONTEVECCHIA },
    { inicio: 1300, fin: 1800, nombre: "Lo Mejor de la Semana", sinopsis: SINOPSIS.trasnoche },
    { inicio: 1800, fin: 2359, nombre: "Especiales +Perfil", sinopsis: SINOPSIS.trasnoche },
    CODA_FINAL
];

const PROGRAMACION_SEMANAL = {
    0: PROGRAMACION_FIN_DE_SEMANA,        /* Domingo */
    1: PROGRAMACION_LUNES_A_MIERCOLES,    /* Lunes */
    2: PROGRAMACION_LUNES_A_MIERCOLES,    /* Martes */
    3: PROGRAMACION_LUNES_A_MIERCOLES,    /* Miércoles */
    4: PROGRAMACION_JUEVES,              /* Jueves */
    5: PROGRAMACION_VIERNES,              /* Viernes */
    6: PROGRAMACION_FIN_DE_SEMANA         /* Sábado */
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

    // 1. Encontrar el programa actual
    for (let i = 0; i < programacionHoy.length; i++) {
        const p = programacionHoy[i];
        if (p.fin === 0 && (currentTimeHHMM === 2359 || currentTimeHHMM >= p.inicio)) {
            programaActual = p;
            break;
        }
        
        if (currentTimeHHMM >= p.inicio && currentTimeHHMM < p.fin) {
            programaActual = p;
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
            const targetTabId = e.target.getAttribute('data-tab');
            document.getElementById(targetTabId).classList.add('active');
        }
    });
}

// --- 4. INICIALIZACIÓN ---

window.onload = function() {
    generateWeeklyTabs(); 
    updateProgramacion();
    setInterval(updateProgramacion, 30000); 
};
