// html-variables
let urlInput = document.getElementById("url");
let urlBtn = document.getElementById("url-btn");
let applicationsBody = document.getElementById("applications-body");
let deleteBtn = document.getElementById("delete-btn");

// other variables
let job; 
let applications; 
const columns = [
    "company",
    "summary",
    "pensum",
    "location",
    "status",
    "url",
    "notes"
];

// local storage logic - refreshing page
if (JSON.parse(localStorage.getItem("applications"))) {
    applications = JSON.parse(localStorage.getItem("applications"));
}
else {
    applications = []
}


// deleteAll-button
deleteBtn.addEventListener("click", function(){
        applications = []
        localStorage.setItem("applications", JSON.stringify(applications));
        applicationsBody.innerHTML = "";

});

function isValidURL(input) {
    try {
        const url = new URL(input);
        if(url.protocol === "https:" || url.protocol === "http:") { 
            return url.protocol === "https:" || url.protocol === "http:";
        }
        else {
            alert("Please enter a full URL (e.g. https://example.com)");
            return false }
    } catch {
        alert("Please enter a full URL (e.g. https://example.com)");
        return false
    }
}

// addInput-button
urlBtn.addEventListener("click", function() {
    if (isValidURL(urlInput.value)) {
            fetch("http://127.0.0.1:5050/", {
            method: "POST", // Was für HTTP-Anfrage machen wir
                
            headers: 
            {
                "Content-Type": "application/json" // Zusätzliche Informationen
            },

            body : JSON.stringify ( // konkreten Daten, die wir an den Server schicken.
                {
                    url: urlInput.value
                }
            )
        })// return jsonify({"error": "Analysis failed"}), 500
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.error) {
                    return alert("Error: " + data.error)
                }
                job = {
                    company: data.company,
                    summary: data.summary,
                    pensum: data.pensum,
                    location: data.location,
                    status: data.status,
                    url: data.url,
                    notes: data.notes,
                    id: crypto.randomUUID()
                    };
            
                // add current application to list of other applications && store locally
                applications.push(job);
                localStorage.setItem("applications", JSON.stringify(applications));

                // give current application to the function - add to table
                addApplicationRow(job);
    
            });


    } else {
        urlInput.placeholder = "Please enter a URL";
        setTimeout(function() {
            urlInput.placeholder = "Paste URL here";
        }, 2000);
    }



});

// add Input to table 
function addApplicationRow(application) {
    let newRow = document.createElement("tr");
        
    for(let i=0; i< columns.length + 2; i++) {
            let newCell = document.createElement("td");
            
            // add deleteRow-button
            if(i === columns.length) {
                    let deleteButton = document.createElement("button");
                    deleteButton.textContent = "Delete row";
                    deleteButton.className = "delete-row-button";

                    newCell.appendChild(deleteButton);

                    // let user delete row:
                    deleteButton.addEventListener("click", function() {
                        newRow.remove()

                        applications = applications.filter(function(item) {
                            return item.id !== application.id;
                        });
                        localStorage.setItem("applications", JSON.stringify(applications))
                    })}
            
            // add editRow-button
            else if(i === columns.length +1) {
                    let editButton = document.createElement("button");
                    editButton.textContent = "edit input";
                    editButton.className = "edit-row-button";

                    newCell.appendChild(editButton);


                    // let user edit cell:
                    let cells = newRow.querySelectorAll("td");
                    let isEditing = false;

                    editButton.addEventListener("click", function() {
                        
                        // edit
                        if(!isEditing){
                            isEditing = true
                            for(let i=0; i<columns.length; i++){
                            cells[i].contentEditable = "true"
                        }

                        newRow.classList.add("editing")
                        editButton.textContent = "save input";}
                        
                        //save
                        else {
                            isEditing = false

                            //local storage
                            for(let i=0; i<columns.length; i++){
                                application[columns[i]] = cells[i].textContent;
                                cells[i].contentEditable = "false"
                            }
                            localStorage.setItem("applications", JSON.stringify(applications));
                            newRow.classList.remove("editing")
                            editButton.textContent = "edit input";   
                        }             

                    })}


            else {
                newCell.textContent = application[columns[i]];
            }

            newRow.appendChild(newCell);
        }
        applicationsBody.appendChild(newRow);
    }

// save table when reset
for(let i=0; i<applications.length; i++) {
    addApplicationRow(applications[i]);
}


