let urlInput = document.getElementById("url");
let urlBtn = document.getElementById("url-btn");
let applicationsBody = document.getElementById("applications-body");

urlBtn.addEventListener("click", function() {
    if (urlInput.value) {
        console.log(urlInput.value);

        let newRow = document.createElement("tr");
        for(let i=0; i<7; i++) {
            let newCell = document.createElement("td");
            newRow.appendChild(newCell);
            newCell.textContent = "-";
        }

        applicationsBody.appendChild(newRow);

    } else {
        console.log("Please enter a URL");
    }
});