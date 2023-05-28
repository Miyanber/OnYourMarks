window.addEventListener("DOMContentLoaded", () => {
    const timerName = document.querySelector("input.timerName");
    if (localStorage.getItem("timerName") !== null) {
        timerName.value = localStorage.getItem("timerName");
    }

    const div = document.querySelectorAll("div.offers div");
    if (div.length !== 3) {
        console.warn("");
    }
    div[0].addEventListener("click", () => {
        window.location.href = "../index.html";
    })
    div[1].addEventListener("click", () => {
        window.location.href = "./starter.html";
    })
    div[2].classList.add("active");

    const qrcode = document.querySelector("p.QRcode");
    const img = document.querySelector("img");
    qrcode.addEventListener("click", () => {
        if (qrcode.innerHTML == "QRコードを非表示") {
            qrcode.innerHTML = "QRコードを表示";
        } else {
            qrcode.innerHTML = "QRコードを非表示";
        }
        img.classList.toggle("QRcode");
    })

    const submit = document.getElementById("submit");
    const finished = document.getElementById("finish");
    const getRecords = document.getElementById("getRecords");
    const finishTime = document.getElementById("time");
    let finishTimeArray = [];
    finished.addEventListener("click", () => {
        const now = Date.now();
        finishTime.innerHTML += `${finishTimeArray.length + 1} : ${now}<br>`;
        finishTimeArray.push(now);
        submit.disabled = false;
    })
    submit.addEventListener("click", () => {
        if (timerName.value == "") {
            const button = document.getElementById("start");
            const status = document.getElementById("status");
            button.classList.add("hidden");
            status.classList.remove("hidden");
            status.innerHTML = "タイム計測コードを入力して下さい";
            sleep(3);
            button.classList.remove("hidden");
            status.classList.add("hidden");
            return
        }
        localStorage.setItem("timerName", timerName.value);

        submit.disabled = true;
        const now = Date.now();
        let paramater = `?timerName=${localStorage.getItem("timerName")}&status=timer&now=${finishTimeArray}&fetchTime=${now}`;
        fetch('https://script.google.com/macros/s/AKfycbzbWTISwrAgyEYXsJFZrKEZ5FlMrRSgF2OZYm2RTlVVyktLQvWvxl0gAYRPfZdIz_QP/exec' + paramater, {
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            const message = json.allData;
            finishTimeArray = [];
            finishTime.innerHTML = "";
        });
    })

    const records = document.getElementById("record");
    const tbody = records.firstElementChild;
    getRecords.addEventListener("click", () => {
        let paramater = `?timerName=${localStorage.getItem("timerName")}&status=record&now=${new Date().getTime()}`;
        getRecords.disabled = true;
        fetch('https://script.google.com/macros/s/AKfycbzbWTISwrAgyEYXsJFZrKEZ5FlMrRSgF2OZYm2RTlVVyktLQvWvxl0gAYRPfZdIz_QP/exec' + paramater, {
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            const array = json.allData;
            const tbody_children_length = tbody.children.length;
            for (let i = tbody_children_length - 1; i > 1; i--) {
                tbody.children[i].remove();
            }
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array[i].length; j++) {
                    const tr = document.createElement("tr");
                    const td2 = document.createElement("td"); td2.innerHTML = j + 1;
                    const td3 = document.createElement("td"); td3.innerHTML = array[i][j];
                    if (j == 0) {
                        const td1 = document.createElement("td"); td1.innerHTML = i + 1;
                        tr.appendChild(td1);
                        td1.setAttribute("rowSpan", array[i].length);
                    }
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tbody.appendChild(tr);
                }
            }
            getRecords.disabled = false;
        });
    })
});

function sleep(sec) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, sec * 1000);
    });
}
