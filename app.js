//the picked name can be repeated
/* function pickWinner() {
    const names = document.getElementById("names").value.split(",");
    const randomIndex = Math.floor(Math.random() * names.length);
    const winner = names[randomIndex];
    document.getElementById("winner").innerHTML = `The winner is ${winner}!`;
} */


//the picked name is not repeated and is removed from the names list
let names = [];
//Example: name-1,name-2,name-3,name-4,name-5,name-6,name-7

function pickWinner() {
    const inputNames = document.getElementById("names").value.split(",");
    const validNames = inputNames.filter(name => name.trim() !== '');

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
        alert("All names have been picked, enter new names!");
        return;
    }

    const randomIndex = Math.floor(Math.random() * allNames.length);
    const winner = allNames[randomIndex];
    names = allNames.filter(name => name !== winner);

    const winnerElement = document.getElementById("winner");

    if (names.length === 0) {
        // remove winner-picked class from #winner element
        winnerElement.classList.remove("winner-picked");
        winnerElement.innerHTML = `All names have been picked, enter new names!`;
    } else {
        // add winner-picked class to #winner element
        winnerElement.classList.add("winner-picked");
        winnerElement.innerHTML = `The winner is ${winner}!`;
        // trigger bounceIn animation by adding/removing bounceIn class
        setTimeout(() => {
            winnerElement.classList.add("bounceIn");
            setTimeout(() => {
                winnerElement.classList.remove("bounceIn");
            }, 1000);
        }, 10);

    }

    document.getElementById("names").value = names.join(",");
};

