let apNumber = document.getElementById("ap-number")
let inNumber = document.getElementById("in-number")
let ofNumber = document.getElementById("of-number")

let count_apNumber = 0
let count_inNumber = 0
let count_ofNumber = 0


let applications = JSON.parse(localStorage.getItem("applications")) || []

apNumber.textContent = applications.length
inNumber.textContent = applications.filter(app => app.status === "interview").length
ofNumber.textContent = applications.filter(app => app.status === "pending").length





