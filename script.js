// script.js

// Función para el temporizador
function updateCountdown() {
    // Usando una fecha futura (30 de Mayo del año actual)
    const currentYear = new Date().getFullYear();
    const weddingDate = new Date(currentYear, 4, 30, 16, 0, 0); // 30 de Mayo del año actual
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;
    
    // Cálculos para días, horas, minutos y segundos
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    // Actualizar los elementos del temporizador
    document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
    document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
    
    // Si la fecha ya pasó
    if (timeLeft < 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown').innerHTML = "<div class='greeting'>¡Hoy es nuestro gran día!</div>";
    }
}

// Inicializar el temporizador
let countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Llamar inmediatamente para evitar retraso inicial

// Agregar un pequeño efecto de aparición al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const card = document.querySelector('.invitation-card');
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
    
    // Añadir interacción a los elementos
    const interactiveElements = document.querySelectorAll('.parent-box, .location-box, .godparent-name, .rsvp');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('rsvp') ? 'translateY(-3px)' : 'translateY(-5px)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Efecto de confeti al hacer clic en la sección de cierre
function createConfetti() {
    const colors = ['#b87c4a', '#d4a574', '#e8c39a', '#f2d7b3'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 8 + 4 + 'px';
        confetti.style.height = Math.random() * 8 + 4 + 'px';
        confetti.style.animationDuration = Math.random() * 2 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Agregar estilos para el confeti
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    .confetti {
        position: fixed;
        top: -10px;
        z-index: 9999;
        pointer-events: none;
        animation: confettiFall linear forwards;
        border-radius: 2px;
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Agregar evento al hacer clic en el cierre
document.addEventListener('DOMContentLoaded', function() {
    const closingSection = document.querySelector('.closing');
    if (closingSection) {
        closingSection.style.cursor = 'pointer';
        closingSection.addEventListener('click', function() {
            createConfetti();
            // También puedes agregar un sonido sutil si lo deseas
        });
    }
});