const services = document.querySelector(".services__menu");
let activeTab = "web-design";
const serviceImage = document.querySelector(".service__image");
const serviceDescription = document.querySelector(".service__description");
document.addEventListener("DOMContentLoaded", function (event) {
    serviceImage.setAttribute("src", servicesData[activeTab].src);
    serviceDescription.innerText = servicesData[activeTab].description;
});

const servicesData = {
    "web-design": {
        src: "./img/services/web-design.png",
        description:
            "Web design is a similar process of creation, with the intention of presenting the content on electronic web pages, which the end-users can access through the internet with the help of a web browser. Web designers use many technologies but commonly rely on hypertext and hypermedia resources including HTML, CSS and additional Web design tools."
    },
    "graphic-design": {
        src: "./img/services/graphic-design.png",
        description:
            "Graphic design is the process of visual communication and problem-solving through the use of typography, photography, iconography and illustration. The field is considered a subset of visual communication and communication design, but sometimes the term 'graphic design' is used synonymously. Graphic designers create and combine symbols, images and text to form visual representations of ideas and messages. They use typography, visual arts, and page layout techniques to create visual compositions. Common uses of graphic design include corporate design (logos and branding), editorial design (magazines, newspapers and books), wayfinding or environmental design, advertising, web design, communication design, product packaging, and signage."
    },
    "online-support": {
        src: "./img/services/online-support.png",
        description:
            "Online chat may refer to any kind of communication over the Internet that offers a real-time transmission of text messages from sender to receiver. Chat messages are generally short in order to enable other participants to respond quickly. Thereby, a feeling similar to a spoken conversation is created, which distinguishes chatting from other text-based online communication forms such as Internet forums and email. Online chat may address point-to-point communications as well as multicast communications from one sender to many receivers and voice and video chat, or may be a feature of a web conferencing service. Online chat in a less stringent definition may be primarily any direct text-based or video-based (webcams), one-on-one chat or one-to-many group chat (formally also known as synchronous conferencing), using tools such as instant messengers, Internet Relay Chat (IRC), talkers and possibly MUDs. The expression online chat comes from the word chat which means 'informal conversation'."
    },
    "app-design": {
        src: "./img/services/app-design.png",
        description:
            "Mobile app design is the process of creating a mobile application that is attractive, convenient and easy to use. App design combines a user interface (UI) and user experience (UX). Designers typically begin the design process by researching the user and their needs. Next, they create wireframes, mockups, and prototypes. Afterward, they test the designs, tweak it, and test it again until they reach the desired outcome. The design process is iterative, meaning it repeats until the designer and developer are satisfied with the results."
    },
    "online-marketing": {
        src: "./img/services/online-marketing.png",
        description:
            "Online marketing is the practice of leveraging web-based channels to spread a message about a company's brand, products, or services to its potential customers. The methods and techniques used for online marketing include email, social media, display advertising, search engine optimization, Google AdWords and more. The objective of marketing is to reach potential customers through the channels where they spend their time reading, searching, shopping, and socializing online. Online marketing is the practice of leveraging web-based channels to spread a message about a company's brand, products, or services to its potential customers. The methods and techniques used for online marketing include email, social media, display advertising, search engine optimization, Google AdWords and more. The objective of marketing is to reach potential customers through the channels where they spend their time reading, searching, shopping, and socializing online."
    },
    "seo-service": {
        src: "./img/services/seo-service.png",
        description:
            "SEO stands for Search Engine Optimization, which is the practice of increasing the quantity and quality of traffic to your website through organic search engine results. What goes into SEO? To understand the true meaning of SEO, let's break that definition down and look at the parts: Quality of traffic. You can attract all the visitors in the world, but if they're coming to your site because Google tells them you're a resource for Apple computers when really you're a farmer selling apples, that is not quality traffic. Instead, you want to attract visitors who are genuinely interested in the products that you offer. Quantity of traffic. Once you have the right people clicking through from those search engine results pages (SERPs), more traffic is better. Organic results. Ads make up a significant portion of many SERPs. Organic traffic is any traffic that you don't have to pay for. Organic search traffic is specifically any unpaid traffic that comes from SERPs."
    }
};

services.addEventListener("click", function (e) {
    if (!e.target.classList.contains("services__menu-tab")) {
        return;
    }

    if (activeTab === e.target.dataset["tab"]) {
        return;
    }

    const tabs = this.querySelectorAll(".services__menu-tab");

    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });

    e.target.classList.add("active");

    activeTab = e.target.dataset["tab"];

    serviceImage.setAttribute("src", servicesData[activeTab].src);
    serviceImage.setAttribute("alt", activeTab);
    serviceDescription.textContent = servicesData[activeTab].description;
});
