// Récupération des éléments
const currentTimeDisplay = document.getElementById('current-time');
const startTimeInput = document.getElementById('start-time');
const endTimeInput = document.getElementById('end-time');
const countdownDisplay = document.getElementById('countdown');
const progressBar = document.getElementById('progress-bar');
const progressLabel = document.getElementById('progress-label');
const themeSelector = document.getElementById('theme-selector');
const tasks = document.getElementById('tasks');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');

// Définir l'heure de début par défaut à 8h
startTimeInput.value = "08:00";

// Affichage de l'heure actuelle
function updateCurrentTime() {
    const now = new Date();
    currentTimeDisplay.textContent = now.toLocaleTimeString();
}

// Fonction pour changer le thème
function changeTheme(theme) {
    document.body.classList.remove('default', 'dark', 'neon');
    progressBar.classList.remove('default', 'dark', 'neon');
    document.body.classList.add(theme);
    progressBar.classList.add(theme);
}

// Calcul et affichage du décompte + mise à jour de la barre de progression
function updateCountdown() {
    const now = new Date();
    const startTimeValue = startTimeInput.value;
    const endTimeValue = endTimeInput.value;

    if (startTimeValue && endTimeValue) {
        const [startHours, startMinutes] = startTimeValue.split(':');
        const startTime = new Date();
        startTime.setHours(startHours, startMinutes, 0, 0);

        const [endHours, endMinutes] = endTimeValue.split(':');
        const endTime = new Date();
        endTime.setHours(endHours, endMinutes, 0, 0);

        const totalDuration = endTime - startTime;
        const elapsedTime = now - startTime;

        if (totalDuration > 0 && elapsedTime >= 0 && elapsedTime <= totalDuration) {
            const remainingTime = totalDuration - elapsedTime;
            const hoursLeft = Math.floor(remainingTime / (1000 * 60 * 60));
            const minutesLeft = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const secondsLeft = Math.floor((remainingTime % (1000 * 60)) / 1000);

            countdownDisplay.textContent = 
                `${hoursLeft.toString().padStart(2, '0')}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;

            const progressPercentage = (elapsedTime / totalDuration) * 100;
            progressBar.value = Math.min(progressPercentage, 100);
            progressLabel.textContent = `${Math.floor(progressPercentage)}%`;
        } else if (elapsedTime > totalDuration) {
            countdownDisplay.textContent = "C'est l'heure ! T'es barrée ! 😁";
            progressBar.value = 100;
            progressLabel.textContent = "100%";
        } else {
            countdownDisplay.textContent = "00:00:00";
            progressBar.value = 0;
            progressLabel.textContent = "0%";
        }
    } else {
        countdownDisplay.textContent = "00:00:00";
        progressBar.value = 0;
        progressLabel.textContent = "0%";
    }
}

// Fonction pour ajouter une nouvelle tâche
function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });
        tasks.appendChild(taskItem);
        newTaskInput.value = '';
    }
}

// Gestion du sélecteur de thème
themeSelector.addEventListener('change', (event) => {
    changeTheme(event.target.value);
});

// Gestion de l'ajout de tâche
addTaskButton.addEventListener('click', addTask);

// Initialisation
setInterval(updateCurrentTime, 1000);
setInterval(updateCountdown, 1000);
changeTheme('default');
