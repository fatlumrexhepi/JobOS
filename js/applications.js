// html-variables
let urlInput = document.getElementById("url");
let urlBtn = document.getElementById("url-btn");
let applicationsBody = document.getElementById("applications-body");
let deleteBtn = document.getElementById("delete-btn");

// other variables
let job; 
let applications; 

// local storage logic - refreshing page
if (JSON.parse(localStorage.getItem("applications"))) {
    applications = JSON.parse(localStorage.getItem("applications"));
}
else {
    applications = []
}





// deleteAll-button logic
deleteBtn.addEventListener("click", function(){
        applications = []
        localStorage.setItem("applications", JSON.stringify(applications));
        applicationsBody.innerHTML = "";
});

// addInput-button logic
urlBtn.addEventListener("click", function() {
    if (urlInput.value) {
        
        job = {
            company: "-",
            summary: "-",
            pensum: "-",
            location: "-",
            status: "Pending",
            url: urlInput.value,
            Notes: "-"
        };

        // add current application to list of other applications && store locally
        applications.push(job);
        localStorage.setItem("applications", JSON.stringify(applications));

        // give current application to the function - add to table
        addApplicationRow(job);

    } else {
        urlInput.placeholder = "Please enter a URL";
        setTimeout(function() {
            urlInput.placeholder = "Paste URL here";
        }, 2000);
    }
});

// add Input to table 
// {
//             company: "-",
//             summary: "-",
//             pensum: "-",
//             location: "-",
//             status: "Pending",
//             url: urlInput.value,
//             Notes: "-"
//         }
function addApplicationRow(application) {
    let newRow = document.createElement("tr");
        
    for(let i=0; i<8; i++) {
            let newCell = document.createElement("td");
            
            if(i === 7) {
                    let deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete row";
                    deleteButton.className = "delete-row-button";

                    newCell.appendChild(deleteButton);

                    deleteButton.addEventListener("click", function() {
                        newRow.remove()

                        applications = applications.filter(function(item) {
                            return item !== application;
                        });
                        localStorage.setItem("applications", JSON.stringify(applications))
                    })}
            else {
                newCell.textContent = Object.values(application)[i];
            }

            newRow.appendChild(newCell);
        }
        applicationsBody.appendChild(newRow);
    }

// save table when reset
for(let i=0; i<applications.length; i++) {
    addApplicationRow(applications[i]);
}
