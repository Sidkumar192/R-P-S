// Check if localStorage is available
function isLocalStorageAvailable() {
    try {
        const testKey = 'test';
        localStorage.setItem(testKey, 'testValue');
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}

// Variable declarations
let con = document.querySelectorAll(".con");
let computer = document.querySelectorAll(".computer");
let triangle = document.querySelector("#triangle");
let human = document.querySelector("#human");
let PC = document.querySelector("#PC");
let winCon = document.querySelector(".win-con");
let winner = document.querySelector("#winner");
let looser = document.querySelector("#looser");
let play = document.querySelector(".play");
let computer_score = document.getElementById("score1");
let human_score = document.getElementById("score2");
let ruleBtn = document.getElementById("rule-btn-id");
let ruleCon = document.querySelector(".rule-con");
let ruleImg = document.querySelector(".ruleImg");
let nextBtn = document.querySelector(".next-btn");
let winningPage = document.getElementById("winningPage");
let options = document.querySelector(".options");
let scoreBox = document.querySelector(".scoreBox");
let info = document.querySelector(".info");
let remove = document.querySelectorAll(".remove");

// Initialize the scores from localStorage or default to 0
let count_human = JSON.parse(localStorage.getItem("sc2")) || 0;
let count_computer = JSON.parse(localStorage.getItem("sc1")) || 0;

// Update the score display with the retrieved values
human_score.innerText = count_human;
computer_score.innerText = count_computer;

let random = Math.floor(Math.random() * 3);  // Random computer choice

// Main game logic when a player makes a choice
con.forEach((element, index) => {
    element.addEventListener("click", () => {
        random = Math.floor(Math.random() * 3);  // Generate new random choice for computer
        human.style.opacity = "1";
        triangle.style.display = "none";

        // Hide all options initially for both human and computer
        con.forEach(item => item.style.display = "none");
        computer.forEach(item => item.style.display = "none");

        // Show human's selected choice
        element.style.display = "block";
        element.classList.add("show");

        setTimeout(() => {
            PC.style.opacity = "1";  // Show "PC picked" text

            setTimeout(() => {
                // Show computer's choice
                computer[random].style.display = "block";
                computer[random].classList.add("right");

                setTimeout(() => {
                    if (
                        (index === 0 && random === 1) ||  // Rock vs Scissors
                        (index === 1 && random === 2) ||  // Scissors vs Paper
                        (index === 2 && random === 0)     // Paper vs Rock
                    ) {
                        play.innerText = "PLAY AGAIN";
                        ruleBtn.classList.add("rule-btn1");
                        nextBtn.style.opacity = "1";
                        element.classList.add("design");
                        winCon.style.display = "grid";
                        winner.innerText = "YOU WIN";
                        looser.innerText = "AGAINST PC";
                        
                        // Update human's score and save to localStorage
                        count_human++;
                        human_score.innerText = count_human;
                        if (isLocalStorageAvailable()) {
                            localStorage.setItem("sc2", JSON.stringify(count_human));
                        }
                    } else if (index === random) {
                        play.innerText = "REPLAY";
                        winCon.style.display = "grid";
                        winner.innerText = "TIE UP";
                        looser.innerText = "BOTH CHOSE ROCK";  // You can change this to match the actual choice
                    } else {
                        play.innerText = "PLAY AGAIN";
                        computer[random].classList.add("design");
                        winCon.style.display = "grid";
                        winner.innerText = "YOU LOST";
                        looser.innerText = "AGAINST PC";

                        // Update pc score and save in local
                        count_computer++;
                        computer_score.innerText = count_computer;
                        if (isLocalStorageAvailable()) {
                            localStorage.setItem("sc1", JSON.stringify(count_computer));
                        }
                    }
                }, 500);  // Delay after both choices are shown
            }, 500);  // Delay for computer's to choose
        }, 500);  // Delay after human choice
    });
});

// Rule button logic to show the rules
ruleBtn.addEventListener("click", () => {
    ruleCon.style.display = "flex";
    setTimeout(() => {
        ruleImg.style.transform = "translateY(0)";
    }, 400);
});

// Close button for the rule page
let close = document.querySelector(".close-btn");
close.addEventListener("click", () => {
    ruleImg.style.transform = "translateY(-200%)";
    setTimeout(() => {
        ruleCon.style.display = "none";
    }, 400);
});

// Logic for "Next" button on the win page
nextBtn.addEventListener("click", () => {
    options.style.display = "none";
    info.style.display = "none";
    scoreBox.style.display = "none";
    remove.forEach((item) => item.style.display = "none");
    nextBtn.style.display = "none";
    winningPage.style.display = "flex";  // Show the "Hurray!!" page
    const celebrationMusic = document.getElementById("celebrationMusic");
    if (celebrationMusic) {
        celebrationMusic.play();
    }
    play.classList.add("play1");  // Apply additional styling to the "Play Again" button if necessary
   
});

// Reset the game view without resetting the scores
function resetGameView() {
    // Hide the win screen and show the game options again
    winCon.style.display = "none";
    winningPage.style.display = "none";  // Hide the "Hurray!!" page
    options.style.display = "flex";  // Show the game options
    info.style.display = "flex";  // Show info again
    scoreBox.style.display = "flex";  // Re-display the score container
    remove.forEach((item) => item.style.display = "block");  // Show elements like rule button, etc.

    // Reset the player and computer choices
    con.forEach(item => {
        item.style.display = "block";  // Show all options for the player again
        item.classList.remove("show"); // Remove any added classes
        item.classList.remove("design"); // Remove 'design' class if applied
    });

    computer.forEach(item => {
        item.style.display = "none";  // Hide the computer's choices
        item.classList.remove("right");  // Remove 'right' class if applied
        item.classList.remove("design");  // Remove 'design' class if applied
    });

    // Reset opacity and triangle visibility
    human.style.opacity = "0";
    PC.style.opacity = "0";
    triangle.style.display = "block";

    // Reset the Next button and play button styling
    nextBtn.style.opacity = "0";  // Hide the Next button initially
    nextBtn.style.display = "block";  
    play.classList.remove("play1");  // Remove additional styling from the play button
}

// Modify the event listener for "Play Again" button to reset the game view
play.addEventListener("click", () => {
    resetGameView();  // Reset the game view but keep the scores intact
});
