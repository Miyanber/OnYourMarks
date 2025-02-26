const onYourMarks = new Audio("mp3/onyourmark.mp3");
const set = new Audio("mp3/set.mp3");
const go = new Audio("mp3/go.mp3");

window.addEventListener("DOMContentLoaded", () => {
    const div = document.querySelectorAll("div.offers div");
    if (div.length !== 3) {
        console.warn("");
    }
    div[1].addEventListener("click", () => {
        window.location.href = "./measure/starter.html";
    })
    div[2].addEventListener("click", () => {
        window.location.href = "./measure/timer.html";
    })
    div[0].classList.add("active");

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
        //音源は先に読み込んでおく(iOSのセキュリティ回避)
        onYourMarks.load();
        set.load();
        go.load();

        await onYourMarks.play();   //on your marks...
        await sleep(number1.value);
        status.innerHTML = "Set";

        await set.play();           //set...
        if (choices[1].checked) {
            const sleepTime = 1.5 + Math.floor(Math.random() * 10 * 3) / 10;
            await sleep(sleepTime);
            console.log("Startまでの時間(s)=" + sleepTime);
        } else {
            await sleep(number2.value);
        }

        await go.play();            //Go!
        status.innerHTML = "Go!";
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
});

function sleep(sec) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, sec * 1000);
    });
}
