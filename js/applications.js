// html-variables
let urlInput = document.getElementById("url");
let urlBtn = document.getElementById("url-btn");
let applicationsBody = document.getElementById("applications-body");
// other variables

let applications; 
if (JSON.parse(localStorage.getItem("applications"))) {
    applications = JSON.parse(localStorage.getItem("applications"));
}
else {
    applications = []
}


// button logic
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


function addApplicationRow(url) {

    let newRow = document.createElement("tr");
        for(let j=0; j<7; j++) {
            
            let newCell = document.createElement("td");

            newRow.appendChild(newCell);
                if(j === 5) {
                            newCell.textContent = url;
                        }
                else {
                    newCell.textContent = "-"; 
                }
        }
        applicationsBody.appendChild(newRow);
    }

for(let i=0; i<applications.length; i++) {
    addApplicationRow(applications[i]);
}

