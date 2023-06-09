//Declaration and Selection.
let namesArr = [];
const inputNamesEl = document.getElementById("names");
const namesContainer = document.getElementById("names_container");
const buttonPick = document.querySelector(".btn-pick");
const buttonNewRound = document.querySelector(".btn-newRound");
const buttonAdd = document.querySelector(".btn-add");
const buttonDel = document.querySelector(".btn-del");
const spanNumber = document.querySelector(".number");
const spanNameWord = document.querySelector(".name_word");
const displayNamesContainer = document.querySelector(".display-names-container");


//Immediately invoked function checks first of all if the `names Array` is in local storage already.
(function () {
    if (localStorage.namesArrStorage) {
        // console.log("namesArrStorage:", localStorage.namesArrStorage);
        namesArr = JSON.parse(localStorage.getItem("namesArrStorage"));
    } else {
        // console.log("`namesArrStorage` not found in local storage");
        newRound();
    }
    //Enable new round button.
    buttonNewRound.disabled = false;

    //If no names are entered, disable the add names button and delete names button.
    buttonAdd.disabled = true;
    buttonDel.disabled = true;

    //if the names array is empty
    if (namesArr.length === 0) {
        buttonPick.disabled = true;
    } else {
        buttonPick.disabled = false;
    }


    inputNamesEl.addEventListener("input", () => {
        if (namesArr.length === 0) {
            buttonPick.disabled = true;
            buttonAdd.disabled = false;
            buttonDel.disabled = true;
        } else {
            buttonPick.disabled = false;
            buttonAdd.disabled = false;
            buttonDel.disabled = false;
        }
    });

    //Create and fill the names list based on the names array.
    createNamesList(namesArr);

    setNameWord();
})();

//Basic App Function to pick and show a name. It is triggered when the button `Pick a name` i clicked.
function pickName() {

    namesContainer.classList.remove("empty");
    inputNamesEl.value = "";

    //Generate a random integer between 0 and the index of last name in the names array
    const randomIndex = randomInteger(0, namesArr.length - 1);

    //Generate a random integer between 1000 and 3000
    const randomTimeOut = randomInteger(1000, 3000);


    //Pick a random name from names array.
    const pickedName = namesArr[randomIndex];

    // console.log(randomIndex, pickedName);

    // console.log(namesArr.length);

    //Update the `namesArr` array.
    namesArr = namesArr.filter(name => name !== pickedName);
    // console.log("namesArr:", namesArr);

    if (namesArr.length === 0) {
        createNamesList(namesArr);
        namesContainer.classList.add("empty");
        namesContainer.innerHTML = "All names have been picked!";
        buttonPick.disabled = true;
        buttonNewRound.disabled = false;
    } else {
        const namesList = document.querySelector(".names_list");
        namesList.classList.add("accelerate");
        buttonPick.disabled = true;
        buttonAdd.disabled = true;
        buttonDel.disabled = true;
        buttonNewRound.disabled = false;
        setTimeout(() => {
            //Animation
            const displayNamesAll = document.querySelectorAll(".display-name");
            for (displayName of displayNamesAll) {
                if (displayName.innerText === pickedName) {
                    displayName.style.animation = "pick 4s 2s";
                }
            };
            namesContainer.classList.add("picked_name");
            namesContainer.innerHTML = pickedName;
            // showNumberOfNames(namesArr);
        }, randomTimeOut);
        setTimeout(() => {
            buttonPick.disabled = false;
            /* buttonAdd.disabled = false;
            buttonDel.disabled = false; */
            namesList.classList.remove("accelerate");
            namesContainer.classList.remove("picked_name");
            createNamesList(namesArr);
            // console.log("namesArr:", namesArr);
            // console.log("namesContainer;", namesContainer);
        }, 6000);
    };
    setNameWord();
};

//App Function to start a new picking round. It is triggered when the button `New rund` i clicked.
function newRound() {
    //Disable new round button.
    buttonNewRound.disabled = true;

    buttonPick.disabled = false;

    namesContainer.classList.remove("empty");

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

    createNamesList(namesArr);
    setNameWord();
    // console.log("namesArr", namesArr);
};

//App Function to add new names based on input names. It is triggered when the button `Add names` is clicked.
function addNames() {
    //Enable new round button.
    buttonNewRound.disabled = false;
    buttonDel.disabled = false;
    buttonPick.disabled = false;

    namesContainer.classList.remove("empty");

    //Get input names and remove the spaces .
    const inputNames = inputNamesEl.value.split(",");
    const validInputName = inputNames.map(name => name.trim());
    // console.log("validInputName", validInputName);
    inputNamesEl.value = "";
    const validNames = validInputName.filter(name => name.trim() !== '');
    // console.log("To add names:", validNames);


    //Alert no input names and empty names array!
    if (validNames.length === 0 && namesArr.length === 0) {
        namesContainer.classList.add("empty");
        alert("Please enter some names or start a new round!");
        buttonPick.disabled = true;
        buttonDel.disabled = true;
        return;
    };
    //Alert no input names
    if (validNames.length === 0) {
        alert("Please enter some names to add");
        return;
    };

    //Remove repeated names and update names array.
    namesArr = Array.from(new Set(validNames.concat(namesArr)));
    // console.log("namesArr after add", namesArr);

    // Save the names array into localStorage.
    localStorage.setItem("namesArrStorage", JSON.stringify(namesArr));

    createNamesList(namesArr);
    setNameWord();
    //Animation
    const displayNamesAll = document.querySelectorAll(".display-name");
    for (displayName of displayNamesAll) {
        if (validNames.includes(displayName.innerText)) {
            displayName.style.animation = "bounceIn 3s ease-out";
        }
    };
};

//App Function to delete names based on input names. It is triggered when the button `Delete names` is clicked.
function delNames() {
    //Enable new round button.
    buttonNewRound.disabled = false;

    buttonPick.disabled = false;

    namesContainer.classList.remove("empty");

    //Get input names and remove the spaces .
    const inputNames = inputNamesEl.value.split(",");
    const validInputName = inputNames.map(name => name.trim());
    // console.log("validInputName", validInputName);
    inputNamesEl.value = "";
    const validNames = validInputName.filter(name => name.trim() !== '');
    // console.log("To delete names:", validNames);

    //Alert no input names and empty names array!
    if (validNames.length === 0 && namesArr.length === 0) {
        namesContainer.classList.add("empty");
        alert("Please enter some names or start a new round!");
        buttonPick.disabled = true;
        buttonDel.disabled = true;
        return;
    };

    //Alert no input names
    if (validNames.length === 0) {
        alert("Please enter some names to delete");
        return;
    };

    //Remove the common items from the validNames an namesArr.
    const uniqueNames = namesArr.filter(name => !validNames.includes(name));
    namesArr = uniqueNames;
    console.log("uniqueNames", uniqueNames);
    // console.log("namesArr after delete", namesArr);

    // Save the names array into localStorage.
    localStorage.setItem("namesArrStorage", JSON.stringify(namesArr));

    //Animation
    const displayNamesAll = document.querySelectorAll(".display-name");
    for (displayName of displayNamesAll) {
        if (validNames.includes(displayName.innerText)) {
            displayName.style.animation = "delete 3s 0.2s";
        }
    };
    setTimeout(() => {
        createNamesList(namesArr);
        setNameWord();
    }, 2000);

};

//Auxiliary Functions.

//Function to 
//1. create and fill the names list into the namesContainer based on a given names array.
//2. run the function createDisplayNamesList()
function createNamesList(arr) {
    let namesList = document.createElement("div");
    namesContainer.innerHTML = "";
    namesContainer.appendChild(namesList);
    namesList.classList.add("names_list");
    for (let i = 0; i < arr.length; i++) {
        const nameItem = document.createElement("div");
        nameItem.classList.add("name_item");
        nameItem.innerHTML = arr[i];
        namesList.appendChild(nameItem);
    };
    const nameItemList = document.querySelectorAll(".name_item");
    // console.log("nameItem", nameItemList);
    for (nameItem of nameItemList) {
        nameItem.style.color = randomHsl();
    };

    const namesArrLength = namesArr.length;
    // console.log("namesArrLength:", namesArrLength);
    namesList.setAttribute("style", `--length:${namesArrLength}`);
    // console.log("namesContainer:", namesContainer);

    //Show number of available names in the names array.
    showNumberOfNames(namesArr);

    // Save the names array into localStorage.
    localStorage.setItem("namesArrStorage", JSON.stringify(namesArr));
    // console.log(localStorage.getItem("namesArrStorage"));

    createDisplayNamesList(arr);
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

//Function to set the name word by `name` or `names`
function setNameWord() {
    spanNameWord.innerHTML = namesArr.length < 2 ? "name" : "names";
};

//Function to create and fill the display names list into the displayNamesContainer based on a given names array.
function createDisplayNamesList(arr) {
    // console.log("Display names list is created");
    const displayNamesList = document.createElement("div");
    displayNamesList.classList.add("display-names-list");

    arr.forEach((name, index) => {
        const displayName = document.createElement("div");
        displayName.classList.add("display-name", `display-name-${index}`);
        displayName.style.animationDelay = `calc(0.1s * ${index + 1})`;
        displayName.innerHTML = name;
        displayNamesList.appendChild(displayName);
    });
    displayNamesContainer.innerHTML = "";
    displayNamesContainer.appendChild(displayNamesList);
};