// Check if it's morning and show surprise
function checkMorning() {
    const hour = new Date().getHours();
    const morningMessageEl = document.getElementById('morning-message');
    
    if (hour >= 5 && hour < 12) {
        morningMessageEl.innerHTML = `
            <p>🌅 Good Morning, Ananya! 🌅</p>
            <p>This is your special morning surprise! 💝</p>
        `;
        celebrateSurprise();
    } else {
        morningMessageEl.innerHTML = `<p>Looking forward to seeing you soon! 💕</p>`;
    }
}

// Reveal love letters
function revealLetter(button) {
    const letterCard = button.closest('.letter-card');
    const content = letterCard.querySelector('.letter-content');
    
    content.classList.toggle('hidden');
    button.textContent = content.classList.contains('hidden') ? '💭 Click to Read' : '💭 Hide Letter';
    
    if (!content.classList.contains('hidden')) {
        createHearts();
    }
}

// Celebrate surprise
function celebrateSurprise() {
    createConfetti();
    playSound();
}

// Confetti Animation
function createConfetti() {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -10;
            this.size = Math.random() * 5 + 2;
            this.speedX = Math.random() * 6 - 3;
            this.speedY = Math.random() * 8 + 5;
            this.opacity = 1;
            this.color = ['#ff1493', '#ff69b4', '#ffb3d9', '#ffe4e1', '#ffd1dc'][Math.floor(Math.random() * 5)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.01;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fillRect(this.x, this.y, this.size, this.size);
            ctx.globalAlpha = 1;
        }
    }
    
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let particle of particles) {
            particle.update();
            particle.draw();
        }
        
        if (particles.some(p => p.opacity > 0)) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

// Create floating hearts
function createHearts() {
    const heartsEmojis = ['💕', '💗', '💖', '💝', '💌'];
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = heartsEmojis[Math.floor(Math.random() * heartsEmojis.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '0';
        heart.style.fontSize = '2rem';
        heart.style.zIndex = '999';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'floatUp 3s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 3000);
    }
}

// Add CSS animation for floating hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Play sound effect
function playSound() {
    // Using Web Audio API for a simple sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 523.25; // C5 note
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Countdown Timer
function updateCountdown() {
    // Set your next meeting date here (change to your actual date)
    const nextMeeting = new Date('2026-06-09').getTime(); // Example: June 9, 2026
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = nextMeeting - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
        
        if (distance < 0) {
            clearInterval(timer);
            document.querySelector('.countdown').innerHTML = '<h3>Time to celebrate! You\'re together now! 💕</h3>';
        }
    }, 1000);
}

// Love Compliments
const compliments = [
    "तुम मेरी दुनिया हो - You are my world 💕",
    "तुम्हारी मुस्कान दिन को रोशन करती है - Your smile lights up my day ✨",
    "मेरा दिल तुम्हारा है - My heart is yours 💗",
    "तुम सबसे खूबसूरत हो - You are the most beautiful 🌹",
    "तुम मेरी जान हो - You are my life 💕",
    "हर पल तुम्हारे साथ खास है - Every moment with you is special 💫",
    "तुम्हारी खुशबू मुझे पागल कर देती है - Your fragrance drives me crazy 🌸",
    "तुम मेरे सपनों की परी हो - You are the girl of my dreams 👰",
    "तुम्हारे बिना जीवन अधूरा है - Life is incomplete without you 💔→💕",
    "तुम मेरी सबसे बड़ी खुशी हो - You are my greatest happiness 😊💕"
];

function getCompliment() {
    const randomIndex = Math.floor(Math.random() * compliments.length);
    const complimentBox = document.getElementById('compliment-box');
    complimentBox.textContent = compliments[randomIndex];
    complimentBox.classList.remove('hidden');
    
    createHearts();
}

// Randomize sticker positions
function randomizeStickers() {
    const stickers = document.querySelectorAll('.sticker');
    stickers.forEach((sticker, index) => {
        const randomX = Math.random() * 95;
        const randomY = Math.random() * 95;
        const randomDelay = Math.random() * 2;
        const randomDuration = Math.random() * 4 + 6;
        
        sticker.style.left = randomX + '%';
        sticker.style.top = randomY + '%';
        sticker.style.animationDelay = randomDelay + 's';
        sticker.style.animationDuration = randomDuration + 's';
    });
}

// Start Quiz
function startQuiz() {
    alert(`Welcome to our Love Quiz, Ananya! 💕\n\nQ1: What is our favorite memory together?\nA) Meeting for the first time\nB) Late night calls\nC) All the above\n\nAnswer: C - All moments are special! 💫`);
}

// Start Memory Game
function startMemoryGame() {
    alert(`Memory Match Game! 🎮\n\nMatch the romantic emojis:\n\n💕💕 💗💗 💖💖 💝💝\n\nThis is a simplified version. Full game coming soon! 🎊`);
}

// Set mood
function setMood(mood) {
    const moods = {
        romantic: 'Playing romantic mood... 💕',
        peaceful: 'Playing peaceful mood... 🌸',
        energetic: 'Playing energetic mood... ⚡'
    };
    
    alert(moods[mood]);
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkMorning();
    randomizeStickers();
    updateCountdown();
});

// Responsive canvas on resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});