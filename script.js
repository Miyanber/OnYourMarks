const onYourMarks = new Audio("mp3/onyourmark.mp3");
const set = new Audio("mp3/set.mp3");
const go = new Audio("mp3/go.mp3");

window.addEventListener("DOMContentLoaded", () => {
    const line1 = document.getElementById("interval1_line");
    const number1 = document.getElementById("interval1_number");
    const line2 = document.getElementById("interval2_line");
    const number2 = document.getElementById("interval2_number");
    line1.addEventListener("input", () => {
        number1.value = line1.value;
    })
    number1.addEventListener("input", () => {
        line1.value = number1.value;
    })
    line2.addEventListener("input", () => {
        number2.value = line2.value;
    })
    number2.addEventListener("input", () => {
        line2.value = number2.value;
    })

    const choices = document.getElementsByName("choices");
    choices[0].addEventListener("input", () => {//Manual
        line2.disabled = false;
        number2.disabled = false;
    })
    choices[1].addEventListener("input", () => {//Random
        line2.disabled = true;
        number2.disabled = true;
    })

    const button = document.getElementById("start");
    const status = document.getElementById("status");
    button.addEventListener("click", async () => {
        button.classList.add("hidden");
        status.classList.remove("hidden");
        status.innerHTML = "On Your Marks";
        onYourMarks.load();
        set.load();
        go.load();
        await onYourMarks.play();
        await sleep(number1.value);
        status.innerHTML = "Set";
        await set.play();
        if (choices[1].checked) {
            const sleepTime = 1.5 + Math.floor(Math.random() * 10 * 3) / 10;
            await sleep(sleepTime);
            console.log("Startまでの時間(s)=" + sleepTime);
        } else {
            await sleep(number2.value);
        }
        status.innerHTML = "Go!";
        await go.play().then(async () => {
            const now = new Date().getTime();
            if (localStorage.getItem("timerName") !== null) {
                let paramater = `?timerName=${localStorage.getItem("timerName")}&status=starter&now=${now}`;
                fetch('https://script.google.com/macros/s/AKfycbzbWTISwrAgyEYXsJFZrKEZ5FlMrRSgF2OZYm2RTlVVyktLQvWvxl0gAYRPfZdIz_QP/exec' + paramater, {
                    "headers": {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((response) => {
                    return response.json();
                }).then((json) => {
                    const message = json.allData;
                });
            }
        });
        await sleep(1);
        button.classList.remove("hidden");
        status.classList.add("hidden");
    })

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

    const measure = document.querySelectorAll("a.measure");
    const measureDiv = document.querySelector("div.timerName");
    const timerName = document.getElementById("timerName");
    if (localStorage.getItem("timerName") === null) {
        measure[0].classList.remove("hidden");
    } else {
        measureDiv.classList.remove("hidden");
        measure[1].classList.remove("hidden");
        timerName.innerHTML = localStorage.getItem("timerName");
        button.innerHTML = "計測を開始";
    }
    if (localStorage.getItem("status") == "timer") {
        const starter = document.querySelector("section.starter");
        const timer = document.querySelector("section.timer");
        starter.classList.add("hidden");
        timer.classList.remove("hidden");
    }

    const finished = document.getElementById("finish");
    const submit = document.getElementById("submit");
    finished.addEventListener("click", () => {
        let paramater = `?timerName=${localStorage.getItem("timerName")}&status=timer&now=${new Date().getTime()}`;
        fetch('https://script.google.com/macros/s/AKfycbzbWTISwrAgyEYXsJFZrKEZ5FlMrRSgF2OZYm2RTlVVyktLQvWvxl0gAYRPfZdIz_QP/exec' + paramater, {
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            const message = json.allData;
        });
    })
    submit.addEventListener("click", () => {
        let paramater = `?timerName=${localStorage.getItem("timerName")}&status=record&now=${new Date().getTime()}`;
        fetch('https://script.google.com/macros/s/AKfycbzbWTISwrAgyEYXsJFZrKEZ5FlMrRSgF2OZYm2RTlVVyktLQvWvxl0gAYRPfZdIz_QP/exec' + paramater, {
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            const array = json.allData;
            const data_paragraph = document.getElementById("data");
            data_paragraph.innerHTML = "";
            for (let i = 0; i < array.length; i++) {
                data_paragraph.innerHTML = data_paragraph.innerHTML + (i + 1) + "回目" + array[i];
                if (i !== array.length - 1) {
                    data_paragraph.innerHTML += "<br>";
                }
            }
        });
    })
});

function sleep(sec) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, sec * 1000);
    });
}
