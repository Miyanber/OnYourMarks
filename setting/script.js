window.addEventListener("DOMContentLoaded", () => {
    const choices = document.getElementsByName("choices");
    const input = document.querySelector("input.timerName");
    const span = document.querySelector("span.timerName");
    /*choices[0].addEventListener("input", () => {//Manual
        input.classList.toggle("hidden");
        span.classList.toggle("hidden");
    })
    choices[1].addEventListener("input", () => {//Random
        input.classList.toggle("hidden");
        span.classList.toggle("hidden");
    })*/
    if(localStorage.getItem("timerName") !== null){
        input.value = localStorage.getItem("timerName");
    }

    const button = document.getElementById("submit");
    button.addEventListener("click", () => {
        if(input.value == "") return;
        button.innerHTML = "登録中...";
        button.disabled = true;
        let status = "";
        if(choices[0].checked) {
            status = "starter";
        } else if (choices[1].checked) {
            status = "timer";
        }
        localStorage.setItem("timerName", input.value);
        localStorage.setItem("status", status);

        window.location.href = "../index.html";
        //let paramater = `?timerName=${input.value}$status=${status}`;

        /**await fetch('https://script.google.com/macros/s/AKfycbyTQouJu2TQA1VksXgnmzSL9Dq9YxdDFeILXpNY1NrlGx3oXuQEPZLMCRYhmHafedrMkQ/exec' + paramater, {
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json();
        }).then((json) => {
            const settings = json.allData;
        });*/
    })
})