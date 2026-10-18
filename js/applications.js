// html-variables
let urlInput = document.getElementById("url");
let urlBtn = document.getElementById("url-btn");
let applicationsBody = document.getElementById("applications-body");
let deleteBtn = document.getElementById("delete-btn");
// other variables

let applications; 
if (JSON.parse(localStorage.getItem("applications"))) {
    applications = JSON.parse(localStorage.getItem("applications"));
}
else {
    applications = []
}

deleteBtn.addEventListener("click", function(){
        applications = []
        localStorage.setItem("applications", JSON.stringify(applications));
        applicationsBody.innerHTML = "";
});


// add button logic
urlBtn.addEventListener("click", function() {
    if (urlInput.value) {

        // store locally
        applications.push(urlInput.value)
        localStorage.setItem("applications", JSON.stringify(applications));

        addApplicationRow(urlInput.value)

    } else {
        urlInput.placeholder = "Please enter a URL";
        setTimeout(function() {
            urlInput.placeholder = "Paste URL here";
        }, 2000);
    }
});

// add button - table 
function addApplicationRow(url) {
    let newRow = document.createElement("tr");
        for(let j=0; j<8; j++) {
            
            let newCell = document.createElement("td");

            newRow.appendChild(newCell);
                if(j === 5) {
                    newCell.textContent = url;
                        }
                else if(j === 7) {
                    let deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete row";
                    deleteButton.id = "delete-row-button";
                    newCell.appendChild(deleteButton);
                    deleteButton.addEventListener("click", function() {
                        console.log("DELETE BUTTON CLICKED")
                    })
                }
                else {
                    newCell.textContent = "-"; 
                }
        }
        applicationsBody.appendChild(newRow);
    }

// save table when reset
for(let i=0; i<applications.length; i++) {
    addApplicationRow(applications[i]);
}

deleteBtn.addEventListener("click", function() {

}) 