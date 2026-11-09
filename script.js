//global variables here: word, word array(s), guesses, guessedLetters
let word = "";
let iteration = 0;
let int;
//event listeners for startGame and guessLetter
//for example:
document.getElementById("start").addEventListener("click", startGame);
document.getElementById("guessLetter").addEventListener("click", guessLetter)
//178961
//once at start of the game
function startGame(mode) {
    mode = document.getElementById("mode").value

    if (mode == 1) word = words[Math.round(Math.random() * words.length)];
    if (mode == 2) word = simpleWords[Math.round(Math.random() * simpleWords.length)];
    if (mode == 3) word = places[Math.round(Math.random() * places.length)];

    word = word.toUpperCase();

    console.log(word);

    document.getElementById("numGuesses").innerText = word.length + 3;

    document.getElementById("word").innerHTML = "";
    for (let c = 0; c < word.length; c++) {
        document.getElementById("word").innerHTML += "_ ";
    }
    document.getElementById("guessedLetters").innerHTML = "";

    /*
    - Reset the board, empty guessedLetters 
    - Set a word from words array into word - this line will grab  a random element from your words array for you:
    word = words[Math.floor(Math.random() * words.length)];
    */
    document.getElementById("buttonList0").replaceChildren();
    document.getElementById("buttonList1").replaceChildren();
    document.getElementById("buttonList2").replaceChildren();

    createButtons();
}

let letters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm']

//at start and every time the user enters a guess
function printWord() {

    /*
    Compare each letter in answer word to the letters in guessedLetters using guessedLetters.indexOf(letter).  Use this to build the “_” word with the correctly guessed letters filled in.
    there is a help video for this in classroom 
    */


}

//every time the user enters a guess
function guessLetter() {


    /*
    Manage the game: Add letters to guessedLetters, call printWord, deduct from guesses, check for a win or loss.
    */

}

function letterButtonPressed(index, letter) {
    let childNumber = index
    let row = 0;
    letter = letter.toUpperCase();
    if (index > 9) {
        row++;
        childNumber -= 10;
    }
    if (index > 18) {
        row++;
        childNumber -= 9;
    }
    let button = document.getElementById("buttonList" + row).childNodes[childNumber]
    button.disabled = true;
    button.innerText = "/";
    document.getElementById("guessedLetters").innerHTML += " " + letter;

    if (word.indexOf(letter) != -1) {
        button.style.backgroundColor = "#44ff44";
        let letterIndicies = [word.indexOf(letter)];
        for (let n = word.indexOf(letter) + 1; n < word.length; n++) {
            if (word.indexOf(letter, n) != -1) {
                letterIndicies.push(word.indexOf(letter, n));
                n = word.indexOf(letter, n) + 1;
            }
        }

        let pageWord = document.getElementById("word").innerText;

        let arrayVersion = pageWord.split("");
        for (let i = 0; i < letterIndicies.length; i++) {
            let replaceIndex = letterIndicies[i]
            arrayVersion[replaceIndex * 2] = letter;
        }
        document.getElementById("word").innerText = arrayVersion.join("");

        let spaced = document.getElementById("word").innerText.split(" ");


        spaced = spaced.join("");

        if (word == spaced) {
            console.log("Great Job!");
            int = setInterval(changeRainbow, 40);
        }
    } else {
        button.style.backgroundColor = "#ff4444";
        document.getElementById("numGuesses").innerText -= 1;
        if (document.getElementById("numGuesses").innerText == 0) startGame(1);
    }
}

function createButtons() {
    for (let i = 0; i < letters.length; i++) {
        let row = 0;
        if (i > 9) row++;
        if (i > 18) row++;
        let tempButton = document.createElement("button");
        tempButton.id = letters[i];
        tempButton.innerText = letters[i];
        tempButton.value = i;
        tempButton.disabled = false;
        document.getElementById("buttonList" + row).appendChild(tempButton)
        tempButton.onclick = function () { letterButtonPressed(this.value, this.id) };
    }
}

function changeRainbow() {
    iteration+= 3.6;
    rainbow = iteration % 360;
    let saturation = '75%';
    let lightness = '50%';
    let stylish = document.getElementById("word")
    stylish.style.color = `hsl(${rainbow}, ${saturation}, ${lightness})`
    console.log('test');
    if(iteration == 36000) clearInterval(int);
}