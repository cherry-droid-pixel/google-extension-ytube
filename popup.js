// SAVE SETTINGS

document.querySelectorAll("input")
.forEach((toggle)=>{

    toggle.addEventListener("change", ()=>{

        chrome.storage.local.set({

            shorts:
                document.getElementById("shorts").checked,

            comments:
                document.getElementById("comments").checked,

            recommend:
                document.getElementById("recommend").checked,

            studyMode:
                document.getElementById("studyMode").checked

        });

    });

});



// LOAD SETTINGS

chrome.storage.local.get(

    [
        "shorts",
        "comments",
        "recommend",
        "studyMode",
        "blockedToday",
        "streak",
        "eduPercent",
        "funPercent"
    ],

    (data)=>{

        document.getElementById("shorts").checked =
            data.shorts || false;

        document.getElementById("comments").checked =
            data.comments || false;

        document.getElementById("recommend").checked =
            data.recommend || false;

        document.getElementById("studyMode").checked =
            data.studyMode || false;



        document.getElementById("blockedCount")
        .innerText =
            data.blockedToday || 0;



        let score = Math.min(
            100,
            (data.blockedToday || 0) * 5
        );

        document.getElementById("focusScore")
        .innerText = score + "%";



        document.getElementById("streak")
        .innerText =
            data.streak || 1;



        const edu =
            data.eduPercent || 0;

        document.getElementById("eduText")
        .innerText = edu + "%";

        document.getElementById("eduBar")
        .style.width = edu + "%";



        const fun =
            data.funPercent || 0;

        document.getElementById("funText")
        .innerText = fun + "%";

        document.getElementById("funBar")
        .style.width = fun + "%";

    }

);



// TIMER

let timerRunning = false;

let time = 25 * 60;

const timerDisplay =
    document.getElementById("timer");



document.getElementById("startTimer")
.addEventListener("click", ()=>{

    if(timerRunning) return;

    timerRunning = true;

    const interval = setInterval(()=>{

        let minutes =
            Math.floor(time / 60);

        let seconds =
            time % 60;

        seconds =
            seconds < 10
            ? "0" + seconds
            : seconds;

        timerDisplay.innerText =
            `${minutes}:${seconds}`;

        time--;



        if(time < 0){

            clearInterval(interval);

            timerDisplay.innerText =
                "DONE!";

            timerRunning = false;

        }

    }, 1000);

});