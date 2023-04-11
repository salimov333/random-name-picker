//the picked name can be repeated
/* function pickWinner() {
    const names = document.getElementById("names").value.split(",");
    const randomIndex = Math.floor(Math.random() * names.length);
    const winner = names[randomIndex];
    document.getElementById("winner").innerHTML = `The winner is ${winner}!`;
} */


//the picked name is not repeated and is removed from the names list
let names = [
    "Dennis",
    "Adrian",
    "Lennart",
    "Durmus",
    "Lila",
    "Felix",
    "Nicole",
    "Ahmad",
    "David",
    "Hendri",
    "Masoud",
    "Leonard",
    "Ksenia",
    "Shahab",
    "Elena",
    "Lili",
    "Abderrazak",
    "Nao",
    "Olaf",
    "Cemil"
];


function pickWinner() {
    const inputNames = document.getElementById("names").value.split(",");
    const validNames = inputNames.filter(name => name.trim() !== '');
    const winnerElement = document.getElementById("winner");
    const winnerList = document.getElementById("winner_list");
    const buttonPick = document.querySelector(".btn-pick");

    if (validNames.length === 0 && names.length === 0) {
        alert("Please enter some names!");
        return;
    }

    //to ensure that allNames does not contain repeated names.
    //Way-1 using the filter() method
    /* const allNames = validNames.concat(names).filter((name, index, array) => {
        return array.indexOf(name) === index;
    }); */
    //Way-2 using a `Set` object from the concatenation of the input names and the existing `names` array.
    const allNames = Array.from(new Set(validNames.concat(names)));

    if (allNames.length === 0) {
        alert("All names have been picked!");
        return;
    }

    const randomIndex = Math.floor(Math.random() * allNames.length);
    const winner = allNames[randomIndex];
    names = allNames.filter(name => name !== winner);

    if (names.length === 0) {
        winnerElement.style.fontSize = "1rem";
        winnerElement.innerHTML = `All names have been picked!`;
    } else {
        setTimeout(() => {
            // add chosen-name class to #winner element
            winnerElement.classList.add("chosen-name")
            winnerElement.textContent = winner
        }, 500);
        setTimeout(() => {
            winnerElement.textContent = ""
            winnerElement.classList.remove("chosen-name")
            winnerElement.appendChild(winnerList)
        }, 6000)
    }
};