// Main array that contain the date to/from localstorage
var allTasks = [];

// Function that get info from form and save into localstorage (including validation)
function saveTask() {
    var taskBox = document.getElementById("taskBox");
    var dateBox = document.getElementById("dateBox");
    let timeBox = document.getElementById("timeBox");
    var task = taskBox.value;
    var date = dateBox.value;
    let time = timeBox.value;

    // Validation for content and date (required field)
    if ( task === "" && date === "" ) {
        
        taskBox.style.backgroundColor = "red";
        dateBox.style.backgroundColor = "red";
        return false
    }
    
    if ( task === "" ) {
    
        taskBox.style.backgroundColor = "red";
        return false
    }
    
    if ( date === "" ) {
        dateBox.style.backgroundColor = "red";
        return false
    }

    if ( isFutureDate(date) === false ) {
        alert("Please insert future date");
        return false
    }
    
    // Make the info from user an object
    var taskInfo = {
        task: task,
        date: date,
        time: time
    };
    console.log(date)

    // Send info's user to localstorage 
    allTasks.push(taskInfo);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    displayTasks();

}

// create a notes
function displayTasks() {

    var containerDiv = document.getElementById("containerDiv");

    containerDiv.innerHTML = ""; // clear a previous data


    // create up to date notes
    var index = 0;
    for (var taskInfo of allTasks) {

        // Order display date
        const orderDisplayDate = taskInfo.date.split("-");
        const reversed = orderDisplayDate.reverse();
        const displayDate = reversed.join("-")

        
        var div = `<div id="t${index}" onmouseover="objectAppear(${index})">
                        <button id="removeObject" onclick="removeTask(${index})" type="button" class="btn btn-default" aria-label="Close">
                            <span class="fas fa-window-close" aria-hidden="true"></span>
                        </button>
                        <div class="taskClass">${taskInfo.task}</div>
                        <div class="dateClass">${displayDate}</div>
                        <div class="timeClass">${taskInfo.time}</div>   
                    </div>`;

        containerDiv.innerHTML += div;

        index++;
    }
        
}

// while the mouse hover a note, him remove button appears
function objectAppear(index) {

    document.getElementById("containerDiv").children[index].addEventListener("mouseover", mouseOver);
    document.getElementById("containerDiv").children[index].addEventListener("mouseout", mouseOut);
    
    function mouseOver() {
        document.getElementById("containerDiv").children[index].children[0].style.opacity = "1";
    }
    
    function mouseOut() {
        document.getElementById("containerDiv").children[index].children[0].style.opacity = "0";
    }

}


// Delete note from localstorage
function removeTask(index) {
    var result = confirm("Are you sure?");
    if (result) {
        allTasks.splice(index, 1); // מחיקת פריט הקיים באינדקס הזה
        localStorage.setItem("tasks", JSON.stringify(allTasks));
        displayTasks();
    }
}

  
// Upload notes from localstorage while user enter to page
function loadAllTasks() {
    if (localStorage.getItem("tasks") != null) {
        allTasks = JSON.parse(localStorage.getItem("tasks"));

        // Chack exparation date, if anyone is pass (only by date)
        for (const object of allTasks) {
            const day = object.date

            if (isFutureDate(day) === false) {
                let noExpireDate = allTasks.filter( n => n.date !== day );
                allTasks = noExpireDate 
                localStorage.setItem("tasks", JSON.stringify(allTasks));
            }  
        }    

        displayTasks();
    }
    
}

// Button - clear the form
function clearForm() {
    document.getElementById("form").reset();
    dateBox.style.backgroundColor = "white";
    taskBox.style.backgroundColor = "white";
}


// Validation for date, only future value 
function isFutureDate(idate){

    const numOfDate = idate.split("-");
    var currentdate = new Date(); 

    // validation for input - date
    if (parseInt(numOfDate[0]) > currentdate.getFullYear()) {
        return true
    }

    if (parseInt(numOfDate[1]) > (currentdate.getMonth()+1) && parseInt(numOfDate[0]) >= currentdate.getFullYear()) {
        return true
    }

    if (parseInt(numOfDate[2]) >= currentdate.getDate() && parseInt(numOfDate[1]) >= (currentdate.getMonth()+1) && parseInt(numOfDate[0]) >= currentdate.getFullYear()) {
        return true

    }

    return false

}



