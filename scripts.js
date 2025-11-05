// Array of emoji pairs for the memory game
const emojis = ["😀", "😀", "😍", "😍", "😎", "😎", "😮", "😮", "😪", "😪", "😁", "😁", "😂", "😂", "😫", "😫"];

// Shuffle the emojis randomly
var shuf_emojis = emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);

// Loop through all emojis and create a box for each
for (var i = 0; i < emojis.length; i++) {
    let box = document.createElement('div'); // Create a new div for each box
    box.className = 'item'; // Add class 'item' to style it
    box.innerHTML = shuf_emojis[i]; // Add emoji inside the box

    // When user clicks a box
    box.onclick = function () {
        this.classList.add('boxOpen'); // Flip the box to show the emoji

        // Delay to check for match after opening two boxes
        setTimeout(function () {
            // Check if two boxes are open
            if (document.querySelectorAll('.boxOpen').length > 1) {

                // If two opened boxes have the same emoji
                if (document.querySelectorAll('.boxOpen')[0].innerHTML ==
                    document.querySelectorAll('.boxOpen')[1].innerHTML) {

                    // Add 'boxMatch' class to mark them as matched
                    document.querySelectorAll('.boxOpen')[0].classList.add('boxMatch');
                    document.querySelectorAll('.boxOpen')[1].classList.add('boxMatch');

                    // Remove 'boxOpen' class so they stay open but not clickable
                    document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
                    document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen');

                    // If all boxes are matched -> show confetti and success alert
                    if (document.querySelectorAll('.boxMatch').length == emojis.length) {
                        Confetti();
                        alert('You Won The game 🥳🥳');
                    }

                } 
                // If emojis don't match, close them again
                else {
                    document.querySelectorAll('.boxOpen')[1].classList.remove('boxOpen');
                    document.querySelectorAll('.boxOpen')[0].classList.remove('boxOpen');
                }
            }
        }, 500); // Delay 0.5s so user can see before flipping back
    }

    // Add the box to the game board
    document.querySelector('.game').appendChild(box);
}

// ------------ Confetti animation when player wins ------------
const Confetti = () => {
    const count = 200; // Number of confetti pieces
    const defaults = {
        origin: { y: 0.7 }, // Where confetti starts on screen (lower 70%)
    };

    // Helper function to launch confetti
    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio), // how many pieces to shoot
            })
        );
    }

    // Fire bursts with different spreads and effects
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
};
