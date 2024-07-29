const form = document.getElementById("form");
const search = document.getElementById("search");
// const submit = document.getElementById("submit");
const submit = document.getElementById("submit");
const resForm = document.getElementById("response");
const errF = document.getElementById("error");
const locationF = document.getElementById("location");
const forcastF = document.getElementById("forcast");
const info = document.getElementById("info");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    weatherGet(search.value)
})

async function weatherGet(address) {
    let data = await fetch("http://localhost:3000/weather?address=" + address);
    let res = await data.json();
    resForm.style.display = "block"
    if (res.error) {
        info.style.backgroundColor = "red";
        info.style.color = "white";
        info.innerHTML = "ERROR";
        errF.innerHTML = res.error;
        locationF.innerHTML = "";
        forcastF.innerHTML = "";
    } else {
        info.style.backgroundColor = "green";
        info.style.color = "white";
        info.innerHTML = "RESULT";
        errF.innerHTML = "";
        locationF.innerHTML = res.location;
        forcastF.innerHTML = res.response;
        search.value = ''
    }
}