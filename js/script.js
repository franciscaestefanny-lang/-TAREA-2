// ============================
// Script principal del sitio
// ============================

const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const exportPdf = document.getElementById('exportPdf');
const backToTop = document.querySelector('.back-to-top');

// Modo tema
const savedTheme = localStorage.getItem('themeMode');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  themeIcon.textContent = '🌙';
} else {
  themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark-theme');
  localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
  themeIcon.textContent = isDark ? '🌙' : '☀️';
});

// Menú móvil
navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  body.classList.toggle('menu-open', isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');
  });
});

// Smooth active nav based on scroll
function setActiveNav() {
  const sections = ['home', 'module-1', 'module-2', 'module-3', 'conclusions'];
  let current = 'home';
  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      const sectionTop = section.offsetTop - 140;
      if (window.scrollY >= sectionTop) current = id;
    }
  });

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === `#${current}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', setActiveNav);

// Barra de progreso
function updateReadingProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  const bar = document.querySelector('.reading-progress-bar');
  if (bar) bar.style.width = `${Math.min(progress, 100)}%`;
}

window.addEventListener('scroll', updateReadingProgress);

// Botón volver arriba
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) backToTop.classList.add('visible');
  else backToTop.classList.remove('visible');
});

// Modal informativo
const modal = document.getElementById('infoModal');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalKicker = document.getElementById('modalKicker');
const modalClose = document.getElementById('modalClose');

const cpuData = {
  ALU: {
    kicker: 'Unidad Aritmético-Lógica',
    title: 'ALU – Unidad Aritmético-Lógica',
    text: 'La ALU es la unidad encargada de ejecutar operaciones aritméticas y lógicas sobre los datos, como suma, resta, comparación, desplazamiento y decisiones binarias. Su función es transformar operandos en resultados para que la Unidad de Control ordene el posterior flujo de instrucciones y la memoria conserve el valor requerido.'
  },
  UC: {
    kicker: 'Unidad de Control',
    title: 'UC – Unidad de Control',
    text: 'La Unidad de Control es el centro de coordinación del computador. Interpreta la instrucción, selecciona la operación y genera señales de control para activar la ALU, la memoria, los registros y los buses. Esta relación mantiene el ciclo de instrucción: Fetch, Decode y Execute en una secuencia ordenada.'
  },
  REG: {
    kicker: 'Registros',
    title: 'Registros',
    text: 'Los registros son pequeños espacios de almacenamiento interno del procesador. Contienen datos temporales, direcciones de memoria y resultados intermedios con acceso extremadamente rápido. Su papel es esencial porque permiten que la CPU procese instrucciones sin depender de una memoria más lenta.'
  }
};

const networkData = {
  'Computadores': {
    kicker: 'Red de comunicaciones',
    title: 'Computadores',
    text: 'Los computadores son equipos finales que originan, procesan, almacenan y consumen información dentro de la red. Su función es participar como nodo de origen, destino o intermediario del flujo de datos.'
  },
  'Servidores': {
    kicker: 'Red de comunicaciones',
    title: 'Servidores',
    text: 'Los servidores son sistemas dedicados a ofrecer recursos, servicios, datos o procesos a otros equipos. Su utilidad es centralizar capacidades de almacenamiento, autenticación, aplicaciones y distribución de información.'
  },
  'Switches': {
    kicker: 'Red de comunicaciones',
    title: 'Switches',
    text: 'Los switches conectan equipos dentro de una red local y gestionan el tráfico entre ellos usando direcciones de nivel de enlace, reduciendo colisiones y favoreciendo el intercambio estructurado de paquetes.'
  },
  'Routers': {
    kicker: 'Red de comunicaciones',
    title: 'Routers',
    text: 'Los routers conectan diferentes redes y determinan la ruta de los paquetes según la dirección IP de origen y destino. Su función esencial es permitir el tránsito entre dominios de red y administrar los segmentos de comunicación.'
  },
  'Medios': {
    kicker: 'Red de comunicaciones',
    title: 'Medios de transmisión',
    text: 'Los medios de transmisión son los canales físicos o inalámbricos que transportan la señal entre dispositivos: cable coaxial, fibra óptica, cables ethernet, radio y ondas electromagnéticas.'
  },
  'Puntos de acceso': {
    kicker: 'Red de comunicaciones',
    title: 'Puntos de acceso',
    text: 'Los puntos de acceso permiten a los dispositivos inalámbricos conectarse a la infraestructura de red local mediante radiofrecuencia. Actúan como puerta de enlace entre estaciones móviles y el entorno de comunicaciones.'
  },
  'Dispositivos finales': {
    kicker: 'Red de comunicaciones',
    title: 'Dispositivos finales',
    text: 'Los dispositivos finales son los equipos que interactúan con la red de manera directa, como computadores, terminales, impresoras, sensores y teléfonos. Son actores de origen o consumo de la comunicación.'
  }
};

function openModal(data) {
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  modalTitle.textContent = data.title;
  modalText.textContent = data.text;
  modalKicker.textContent = data.kicker;
}

document.querySelectorAll('[data-open-modal]').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.getAttribute('data-open-modal');
    openModal(cpuData[key]);
  });
});

document.querySelectorAll('[data-network-card]').forEach((card) => {
  card.addEventListener('click', () => {
    const key = card.getAttribute('data-network-card');
    openModal(networkData[key]);
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }
});

// Ciclo Fetch Decode Execute
const cycleStages = [
  {
    title: 'FETCH',
    description: 'La instrucción se obtiene desde la memoria principal y queda preparada para su interpretación.'
  },
  {
    title: 'DECODE',
    description: 'La Unidad de Control interpreta la instrucción y determina qué operación debe realizarse.'
  },
  {
    title: 'EXECUTE',
    description: 'La operación indicada se ejecuta sobre los datos, mediante la ALU o un recurso del sistema.'
  }
];

const cycleTitle = document.getElementById('cycleTitle');
const cycleDescription = document.getElementById('cycleDescription');
const cycleStage = document.getElementById('cycleStage');
const prevStage = document.getElementById('prevStage');
const nextStage = document.getElementById('nextStage');
const resetStage = document.getElementById('resetStage');
let cycleIndex = 0;

function renderCycle() {
  const stage = cycleStages[cycleIndex];
  cycleTitle.textContent = stage.title;
  cycleDescription.textContent = stage.description;
  cycleStage.textContent = stage.title;

  const pulses = Array.from(document.querySelectorAll('.cycle-pulse'));
  pulses.forEach((pulse, idx) => {
    if (idx === cycleIndex) pulse.classList.add('active');
    else pulse.classList.remove('active');
  });

  const flowStages = Array.from(document.querySelectorAll('.cycle-stage'));
  flowStages.forEach((item, idx) => {
    item.classList.toggle('active', idx === cycleIndex);
  });
}

nextStage.addEventListener('click', () => {
  cycleIndex = (cycleIndex + 1) % cycleStages.length;
  renderCycle();
});

prevStage.addEventListener('click', () => {
  cycleIndex = (cycleIndex - 1 + cycleStages.length) % cycleStages.length;
  renderCycle();
});

resetStage.addEventListener('click', () => {
  cycleIndex = 0;
  renderCycle();
});

// Topologías de red
const topologyData = {
  estrella: {
    title: 'Topología en estrella',
    text: 'Todos los dispositivos se conectan a un concentrador o switch central, simplificando gestión y solución de fallos.',
    list: ['Funcionamiento: dispositivos enlazados a un nodo central.', 'Ventajas: fácil administración y aislamiento de fallos.', 'Desventajas: dependencia del nodo central.']
  },
  anillo: {
    title: 'Topología en anillo',
    text: 'Los dispositivos se conectan formando un circuito, transmitiendo información de un nodo al siguiente.',
    list: ['Funcionamiento: cada equipo repite señales hacia el siguiente.', 'Ventajas: estructura ordenada y menor uso de cableado.', 'Desventajas: fallo de un nodo puede afectar la comunicación.']
  },
  bus: {
    title: 'Topología en bus',
    text: 'Todos los dispositivos comparten un canal común sobre el cual se transmiten los datos.',
    list: ['Funcionamiento: un medio compartido conecta todos los nodos.', 'Ventajas: sencilla y de bajo costo.', 'Desventajas: colisiones y dificultad de mantenimiento.']
  }
};

const topologyButtons = Array.from(document.querySelectorAll('.topology-button'));
const topologyTitle = document.getElementById('topologyTitle');
const topologyText = document.getElementById('topologyText');
const topologyList = document.getElementById('topologyList');
const topologyViews = {
  estrella: document.querySelector('.topology-estrella'),
  anillo: document.querySelector('.topology-anillo'),
  bus: document.querySelector('.topology-bus')
};

topologyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const type = button.getAttribute('data-topology');
    topologyButtons.forEach((b) => b.classList.toggle('active', b === button));

    Object.values(topologyViews).forEach((view) => view.classList.remove('active'));
    topologyViews[type].classList.add('active');

    const data = topologyData[type];
    topologyTitle.textContent = data.title;
    topologyText.textContent = data.text;
    topologyList.innerHTML = data.list.map((item) => `<li>${item}</li>`).join('');
  });
});

// Exportar a PDF
exportPdf.addEventListener('click', () => {
  window.print();
});

// Animaciones al aparecer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {threshold: 0.2});

document.querySelectorAll('.section, .module-summary-card, .cpu-card, .network-card, .network-component-card, .ip-card, .forensic-card').forEach((element) => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(16px)';
  element.style.transition = 'opacity 700ms ease, transform 700ms ease';
  observer.observe(element);
});

// Contadores visuales
const statNumbers = Array.from(document.querySelectorAll('[data-count]'));
function animateCounters() {
  statNumbers.forEach((stat) => {
    const count = Number(stat.getAttribute('data-count'));
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      stat.textContent = String(current).padStart(2, '0');
      if (current >= count) clearInterval(interval);
    }, 250);
  });
}

window.addEventListener('load', () => {
  updateReadingProgress();
  renderCycle();
  animateCounters();
});
