function hideDistractions(){


    chrome.storage.local.get(

        [
            "shorts",
            "comments",
            "recommend",
            "studyMode"
        ],

        (settings)=>{


            let blocked = 0;



            // HIDE SHORTS

            if(settings.shorts){

                document
                .querySelectorAll(
                    "ytd-rich-section-renderer"
                )
                .forEach((item)=>{

                    item.style.display = "none";

                    blocked++;

                });

            }



            // HIDE COMMENTS

            if(settings.comments){

                const comments =
                    document.getElementById("comments");

                if(comments){

                    comments.style.display = "none";

                    blocked++;

                }

            }



            // HIDE RECOMMENDATIONS

            if(settings.recommend){

                const related =
                    document.getElementById("related");

                if(related){

                    related.style.display = "none";

                    blocked++;

                }

            }



            // STUDY MODE

            if(settings.studyMode){

                const keywords = [

                    "coding",
                    "programming",
                    "tutorial",
                    "java",
                    "python",
                    "javascript",
                    "react",
                    "developer",
                    "study",
                    "education",
                    "design",
                    "figma",
                    "ai"

                ];



                const videos =
                    document.querySelectorAll(
                        "ytd-rich-item-renderer"
                    );



                let educational = 0;

                let entertainment = 0;



                videos.forEach((video)=>{

                    const titleElement =
                        video.querySelector(
                            "#video-title"
                        );



                    if(titleElement){

                        const title =
                            titleElement.innerText
                            .toLowerCase();



                        let good = false;



                        keywords.forEach((word)=>{

                            if(title.includes(word)){

                                good = true;

                            }

                        });



                        if(good){

                            educational++;

                        }

                        else{

                            entertainment++;

                            video.style.display =
                                "none";

                            blocked++;

                        }

                    }

                });



                const total =
                    educational + entertainment;



                let eduPercent = 0;

                let funPercent = 0;



                if(total > 0){

                    eduPercent = Math.round(
                        (educational / total) * 100
                    );

                    funPercent = Math.round(
                        (entertainment / total) * 100
                    );

                }



                chrome.storage.local.set({

                    eduPercent: eduPercent,

                    funPercent: funPercent

                });

            }



            chrome.storage.local.get(
                ["blockedToday"],

                (data)=>{

                    let total =
                        data.blockedToday || 0;

                    total += blocked;

                    chrome.storage.local.set({

                        blockedToday: total

                    });

                }

            );

        }

    );

}



setInterval(hideDistractions, 3000);