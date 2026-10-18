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

        let newRow = document.createElement("tr");
        for(let i=0; i<7; i++) {
            let newCell = document.createElement("td");
            newRow.appendChild(newCell);
            if(i === 5) {
                newCell.textContent = urlInput.value;
            }
            else {
               newCell.textContent = "-"; 
            }
        }

        applicationsBody.appendChild(newRow);
        console.log(applications);

    } else {
        urlInput.placeholder = "Please enter a URL";
        setTimeout(function() {
            urlInput.placeholder = "Paste URL here";
        }, 2000);
    }
});