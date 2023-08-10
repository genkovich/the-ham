const feedbacks = {
    john: {
        name: "John Doe",
        feedback:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        position: "CEO",
        img: "img/feedback/alden.jpg"
    },
    alex: {
        name: "Alex Doe",
        feedback:
            "Ux design is a design process whose sole objective is to design a system that offers a great experience to its users. It is a human-first way of designing products. It is a human-first way of designing products. It is a human-first way of designing products.",
        position: "Ux Designer",
        img: "img/feedback/kaley500.jpg"
    },
    jane: {
        name: "Jane Doe",
        feedback:
            "Web development is the work involved in developing a Web site for the Internet or an intranet. Web development can range from developing a simple single static page of plain text to complex Web-based Internet applications, electronic businesses, and social network services.",
        position: "Web Developer",
        img: "img/feedback/megane500.jpg"
    },
    patric: {
        name: "Patrick Doe",
        feedback:
            "Designers are the people who make the products you use everyday—from your phone to your apps to your favorite website. Designers are the people who make the products you use everyday—from your phone to your apps to your favorite website. Designers are the people who make the products you use everyday—from your phone to your apps to your favorite website.",
        position: "Web Designer",
        img: "img/feedback/phil.jpg"
    },
    cosmin: {
        name: "Cosmin Doe",
        feedback:
            "Space is the boundless three-dimensional extent in which objects and events have relative position and direction. Physical space is often conceived in three linear dimensions, although modern physicists usually consider it, with time, to be part of a boundless four-dimensional continuum known as spacetime.",
        position: "Web Developer",
        img: "img/feedback/saltynaut.jpg"
    }
};

const feedbackText = document.querySelector(".feedback__item-text");
const feedbackName = document.querySelector(".feedback__author-name");
const feedbackPosition = document.querySelector(".feedback__author-position");
const feedbackImg = document.querySelector(".feedback__author-photo");
const controlPhotos = document.querySelector(".feedback__controls .control-photos");
const controlPhotosWrapper = document.querySelector(".feedback__controls .control-photos-wrapper");
let activePhoto = null;
let currentIndex = 2;
document.addEventListener("DOMContentLoaded", () => {
    Object.keys(feedbacks).forEach((key, index) => {
        const controlPhotoLink = document.createElement("a");
        controlPhotoLink.href = "#";
        const controlPhoto = document.createElement("img");
        controlPhoto.classList.add("control-photo-item");
        controlPhoto.src = feedbacks[key].img;
        controlPhoto.alt = feedbacks[key].name;
        controlPhoto.dataset.name = key;
        controlPhotoLink.appendChild(controlPhoto);
        controlPhotos.appendChild(controlPhotoLink);
    });

    setActiveFeedback(currentIndex);

    document.querySelector(".control-left").addEventListener("click", (e) => slide(-1, e));
    document.querySelector(".control-right").addEventListener("click", (e) => slide(1, e));
});

function slide(direction, e) {
    e.preventDefault();
    currentIndex += direction;

    const keys = Object.keys(feedbacks);

    if (currentIndex < 0) {
        currentIndex = keys.length - 1;
    } else if (currentIndex >= keys.length) {
        currentIndex = 0;
    }

    setActiveFeedback(currentIndex);
}

function setActiveFeedback(index) {
    const keys = Object.keys(feedbacks);
    const key = keys[index];

    const feedbackItem = document.querySelector(".feedback__item");
    feedbackItem.classList.add("fade-out");

    setTimeout(() => {
        feedbackText.textContent = feedbacks[key].feedback;
        feedbackName.textContent = feedbacks[key].name;
        feedbackPosition.textContent = feedbacks[key].position;
        feedbackImg.src = feedbacks[key].img;

        if (activePhoto) {
            activePhoto.classList.remove("active");
        }

        activePhoto = document.querySelectorAll(".control-photo-item")[index];
        activePhoto.classList.add("active");

        const offset = index > 2 ? (index - 3) * (activePhoto.offsetWidth + 32) /* gap */ : 0;
        controlPhotos.style.transform = `translateX(-${offset}px)`;

        feedbackItem.classList.remove("fade-out");
        feedbackItem.classList.add("fade-in");

        setTimeout(() => {
            feedbackItem.classList.remove("fade-in");
        }, 500);
    }, 500);
}

controlPhotos.addEventListener("click", function (event) {
    event.preventDefault();

    if (event.target.classList.contains("control-photo-item")) {
        const photo = event.target;
        const name = photo.dataset.name;
        const index = Object.keys(feedbacks).indexOf(name);
        setActiveFeedback(index);
        currentIndex = index;
    }
});
