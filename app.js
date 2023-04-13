//Declaration and Selection.
let namesArr = [];
const namesContainer = document.getElementById("names_container");
const buttonPick = document.querySelector(".btn-pick");
const buttonNewRound = document.querySelector(".btn-newRound");
const buttonAdd = document.querySelector(".btn-add");
const spanNumber = document.querySelector(".number");


//Immediately invoked function checks first of all if the `names Array` is in local storage already.
(function () {
    if (localStorage.namesArrStorage) {
        console.log("namesArrStorage:", localStorage.namesArrStorage);
        namesArr = JSON.parse(localStorage.getItem("namesArrStorage"));
    } else {
        console.log("`namesArrStorage` not found in local storage");
        newRound();
    }
    //Enable new round button.
    buttonNewRound.disabled = false;

    //Show number of available names in the names array.
    showNumberOfNames(namesArr)

    //Create and fill the names list based on the names array.
    createNamesList(namesArr);
})();

//Basic App Function to pick and show a name. It is triggered when the button `Pick a name` i clicked.
function pickName() {

    addNames();

    //Generate a random integer between 0 and the index of last name in the names array
    const randomIndex = randomInteger(0, namesArr.length - 1);

    //Generate a random integer between 1000 and 3000
    const randomTimeOut = randomInteger(1000, 3000);


    //Pick a random name from names array.
    const pickedName = namesArr[randomIndex];
    console.log(randomIndex, pickedName);


    //Update the `namesArr` array.
    namesArr = namesArr.filter(name => name !== pickedName);
    console.log("namesArr:", namesArr);


    if (namesArr.length === 0) {
        showNumberOfNames(namesArr);
        namesContainer.classList.add("empty");
        namesContainer.innerHTML = "All names have been picked!";
    } else {
        createNamesList(namesArr);
        const namesList = document.querySelector(".names_list");
        namesList.classList.add("accelerate");
        buttonPick.disabled = true;
        buttonAdd.disabled = true;
        setTimeout(() => {
            namesContainer.classList.add("picked_name");
            namesContainer.innerHTML = pickedName;
            showNumberOfNames(namesArr);
        }, randomTimeOut);
        setTimeout(() => {
            buttonPick.disabled = false;
            buttonAdd.disabled = false;
            namesList.classList.remove("accelerate");
            namesContainer.classList.remove("picked_name");
            createNamesList(namesArr);
            console.log("namesArr:", namesArr);
            console.log("namesContainer;", namesContainer);
        }, 6000);
    };
};

//App Function to start a new picking round. It is triggered when the button `New rund` i clicked.
function newRound() {
    //Disable new round button.
    buttonNewRound.disabled = true;
    //Default names array
    const DefaultNamesArr = [
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
    // Save the Default names array into localStorage.
    localStorage.setItem("namesArrStorage", JSON.stringify(DefaultNamesArr));
    namesArr = JSON.parse(localStorage.getItem("namesArrStorage"));
    showNumberOfNames(namesArr);
    console.log("namesArr", namesArr);
};

//App Function to add new names based on input names. It is triggered when the button `Add names` i clicked.
function addNames() {
    //Enable new round button.
    buttonNewRound.disabled = false;

    console.log("Added names");

    //Get input names.
    const inputNames = document.getElementById("names").value.split(",");
    document.getElementById("names").value = "";
    const validNames = inputNames.filter(name => name.trim() !== '');

    //Alert no input names and empty names array!
    if (validNames.length === 0 && namesArr.length === 0) {
        alert("Please enter some names!");
        return;
    };

    //remove repeated names and update names array.
    namesArr = Array.from(new Set(validNames.concat(namesArr)));

    // Save the names array into localStorage.
    localStorage.setItem("namesArrStorage", JSON.stringify(namesArr));

    showNumberOfNames(namesArr);
    //Create and fill the names list based on the names array.
    createNamesList(namesArr);
}

//Auxiliary Functions.

//Function to create and fill the names list based on a given names array.
function createNamesList(arr) {
    let namesList = document.createElement("div");
    namesList.classList.add("names_list");
    namesContainer.innerHTML = "";
    namesContainer.appendChild(namesList)
    for (let i = 0; i < arr.length; i++) {
        const nameItem = document.createElement("div");
        nameItem.classList.add("name_item", `name_item_${i + 1}`);
        nameItem.innerHTML = arr[i];
        namesList.appendChild(nameItem);
    };
    const nameItemList = document.querySelectorAll(".name_item");
    console.log("nameItem", nameItemList);
    for (nameItem of nameItemList) {
        nameItem.style.color = randomHsl();
    }

    const namesArrLength = namesArr.length;
    console.log("namesArrLength:", namesArrLength);
    namesList.setAttribute("style", `--length:${namesArrLength}`);
    console.log("namesContainer:", namesContainer);
}

//Function to generate an integer between `min` and `max` numbers.
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//Function to show the number of available names in a given array.
function showNumberOfNames(arr) {
    spanNumber.innerHTML = arr.length;
};

// Function to generate a random color
function randomHsl() {
    return 'hsla(' + (Math.random() * 360) + ', 90%, 60%, 1)';
};