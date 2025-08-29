document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const puzzleScreen = document.getElementById('puzzle-screen');
    const successScreen = document.getElementById('success-screen');

    const digit1Select = document.getElementById('digit1');
    const digit2Select = document.getElementById('digit2');
    const digit3Select = document.getElementById('digit3');
    const checkPasswordBtn = document.getElementById('check-password');
    const feedbackMessage = document.getElementById('feedback-message');
    
    // Elementos de audio
    const backgroundMusic = document.getElementById('background-music');
    const clickSound = document.getElementById('click-sound');
    const openDoorSound = document.getElementById('open-door-sound');
    const errorSound = document.getElementById('error-sound');

    // Elementos del botón de pista
    const hintButton = document.getElementById('hint-button');
    const hintText = document.getElementById('hint-text');

    let isPassword1Correct = false;
    let hintClicks = 0;
    
    // Bandera para asegurar que la música se intente reproducir solo una vez
    let musicStarted = false;

    // Función para iniciar la música
    const startMusic = () => {
        if (!musicStarted) {
            backgroundMusic.play().catch(e => {
                console.error("La reproducción de música fue bloqueada:", e);
            });
            musicStarted = true;
        }
    };

    // Usar una interacción del usuario para activar la reproducción de la música
    // Se activará con el primer movimiento del mouse o toque en la pantalla
    document.body.addEventListener('mousemove', startMusic, { once: true });
    document.body.addEventListener('touchstart', startMusic, { once: true });
    
    // Cargar las opciones en los select
    for (let i = 0; i <= 9; i++) {
        const option1 = document.createElement('option');
        option1.value = i;
        option1.textContent = i;
        digit1Select.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = i;
        option2.textContent = i;
        digit2Select.appendChild(option2);

        const option3 = document.createElement('option');
        option3.value = i;
        option3.textContent = i;
        digit3Select.appendChild(option3);
    }

    // Evento para pasar de la intro al puzzle
    introScreen.addEventListener('click', () => {
        introScreen.classList.remove('active');
        puzzleScreen.classList.add('active');
        clickSound.play();
        document.documentElement.requestFullscreen();
    });


    // Evento para verificar el password
    checkPasswordBtn.addEventListener('click', () => {
        const password = `${digit1Select.value}${digit2Select.value}${digit3Select.value}`;

        if (isPassword1Correct) {
            if (password === '714') {
                feedbackMessage.textContent = 'Password 2 es correcto';
                clickSound.play();
                setTimeout(() => {
                    puzzleScreen.classList.remove('active');
                    successScreen.classList.add('active');
                    backgroundMusic.pause();
                    openDoorSound.play();
                }, 1500);
            } else {
                feedbackMessage.textContent = 'Password incorrecto';
                feedbackMessage.style.color = '#ff0000';
                errorSound.play();
            }
        } else {
            if (password === '911') {
                feedbackMessage.textContent = 'Password 1 correcto';
                isPassword1Correct = true;
                clickSound.play();
            } else if (password === '714') {
                feedbackMessage.textContent = 'Password incorrecto';
                feedbackMessage.style.color = '#ff0000';
                errorSound.play();
            } else {
                feedbackMessage.textContent = 'Password incorrecto';
                feedbackMessage.style.color = '#ff0000';
                errorSound.play();
            }
        }
    });

    // Evento para el botón de pistas
    hintButton.addEventListener('click', () => {
        hintText.style.display = 'block';

        const pista1 = 'La primera clave es una emergencia. También es la fecha de una tragedia que cambio la historia del siglo XXI.';
        const pista2 = 'La segunda clave es el inicio de la revolución que terminó con la monarquía. Sus cabezas rodaron por ofrecer pastel al pueblo hambriento';

        hintText.innerHTML = `${pista1}<br><br>${pista2}`;

        setTimeout(() => {
            hintText.style.display = 'none';
        }, 8000);
    });

    // Asignar las imágenes a los fondos
    document.getElementById('intro-screen').style.backgroundImage = `url(/assets/img/puerta-cerrada.png)`;
    document.getElementById('puzzle-screen').style.backgroundImage = `url(/assets/img/candado.png)`;
    document.getElementById('success-screen').style.backgroundImage = `url(/assets/img/puerta-abierta.png)`;
});