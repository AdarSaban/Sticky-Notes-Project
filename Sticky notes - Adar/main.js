
//getting the user "tasks" and put it on a object
function getUserInput() {
    firstBox = document.getElementById("mainInput");
    let task = firstBox.value;

    secondBox = document.getElementById("dateInput");
    let date = secondBox.value;

    thirdBox = document.getElementById("timeInput");
    let time = thirdBox.value;

    let userInput = new Object();
    userInput.task = task;
    userInput.date = date;
    userInput.time = time;

    return userInput;
}
//save array on local stoarge
//and push new user input(notes)to the array 
function addNote(userInput) {
    let allNotes = getNoteFromLocalStorage();
    allNotes.push(userInput);
    localStorage.setItem("note", JSON.stringify(allNotes))

}
function initUserInputValue(){

firstBox.value = "";
    secondBox.value = "";
    thirdBox.value = "";
}
//init user value and init the box
function initUserInputColor() {
    
    firstBox.style.backgroundColor = "";
    secondBox.style.backgroundColor = "";
    thirdBox.style.backgroundColor = "";
}
//validations for user inputs
function validations(userInput) {

    isUserInputValid = false;
    if (userInput.task == "") {
        alert("You must fill task");
        firstBox.style.backgroundColor = "pink";
        return;
    }
    if (userInput.date == "") {
        alert("You must fill due date");
        secondBox.style.backgroundColor = "pink";
        return;
    }
    if (userInput.time == "") {
        alert("You must fill Destination time");
        thirdBox.style.backgroundColor = "pink";
        return;
    }
    isUserInputValid = true;
}
//display the current arr "notes" on load
(function () {
    let oldSotrage = getNoteFromLocalStorage()
    drawNote(oldSotrage)

})();
//main function creating the new Elements and put in the user inputs
//add glyhicon and fit it to the delete function
function drawNote() {

    let missionContainer = document.getElementById("container");
    missionContainer.innerHTML = "";

    let allNotes = getNoteFromLocalStorage();


    for (let i = 0; i < allNotes.length; i++) {

        let noteSpace = document.createElement("div");
        let newTask = document.createElement("div");
        let newDateTime = document.createElement("div");
        let newClose = document.createElement("span");
     
        newTask.innerHTML = allNotes[i].task ;
        newDateTime.innerHTML = "Due date: " + allNotes[i].date +"<br>"+"at " +allNotes[i].time ;
        newClose.innerHTML="";

 
        newTask.className = "noteSpace";
        newDateTime.className = "newDateTime";

        newClose.className = "glyphicon glyphicon-remove-circle";
        newClose.classList.add("x-icon");
        newClose.id = i;
        newClose.onclick = deleteNote;
       
        noteSpace.appendChild(newClose);

        noteSpace.appendChild(newTask);

        noteSpace.appendChild(newDateTime);

        container.appendChild(noteSpace);

    }
}
//delete function
function deleteNote() {
    let allNotes = getNoteFromLocalStorage();
    for (let i = 0; i < allNotes.length; i++) {
        if (i == this.id) {
            allNotes.splice(i, 1);
        }
    }
    localStorage.setItem("note", JSON.stringify(allNotes))
    drawNote();
}
//delete the cuuret input "if it doesnt draw"
function clearNote() {
    getUserInput();
    let task = document.getElementById("mainInput");
    let date = document.getElementById("dateInput");
    let time = document.getElementById("timeInput");
    initUserInputValue(task, date, time);
    

    
}
//geting array from local storage 
function getNoteFromLocalStorage() {

    let oldSotrage = JSON.parse(localStorage.getItem("note"));
    if (oldSotrage == null) {
        oldSotrage = [];
    }
    return oldSotrage;
}
//active function
function go() {
    let userInput = getUserInput();

    validations(userInput);
    if (isUserInputValid === false) {
        return;
    }

    initUserInputColor();
    initUserInputValue();
    addNote(userInput);

    drawNote(userInput);

}


