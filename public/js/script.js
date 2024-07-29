const form = document.getElementById("form");
const search = document.getElementById("search");
const submit = document.getElementById("submit");
const resForm = document.getElementById("response");
const info = document.getElementById("info");
const infoContan = document.getElementById("infoContan");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    weatherGet(search.value)
})

async function weatherGet(address) {
    let data = await fetch("http://localhost:3000/weather?address=" + address);
    let res = await data.json();
    resForm.style.display = "block"
    infoContan.innerHTML = ""
    if (res.error) {
        info.style.backgroundColor = "red";
        info.style.color = "white";
        info.innerHTML = "ERROR";
        let p = document.createElement("p");
        p.innerHTML = res.error;
        p.id = "error";
        infoContan.appendChild(p);
    } else {
        info.style.backgroundColor = "green";
        info.style.color = "white";
        info.innerHTML = "RESULT";
        let dataArray = Object.entries(res);
        let count = 0;
        (function showData() {
            setTimeout(() => {
                let p = document.createElement("p");
                p.innerHTML = `${dataArray[count][0]} is : ${dataArray[count][1]}`
                p.id = dataArray[count][0];
                infoContan.appendChild(p);
                if (count < 3) {
                    count++;
                    showData();
                }
            }, 1000)
        })()
        search.value = '';
    }
}