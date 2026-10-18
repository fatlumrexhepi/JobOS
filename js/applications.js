let urlInput = document.getElementById("url");
let urlBtn = document.getElementById("url-btn");
let applicationsBody = document.getElementById("applications-body");

urlBtn.addEventListener("click", function() {
    if (urlInput.value) {
        console.log(urlInput.value);

        let newRow = document.createElement("tr");
        let newCell = document.createElement("td");

        newCell.textContent = urlInput.value;

        newRow.appendChild(newCell);
        applicationsBody.appendChild(newRow);

    } else {
        console.log("Please enter a URL");
    }
});