document.addEventListener("DOMContentLoaded", function (event) {
    loadPortfolioItems();
});

function loadPortfolioItems(limit = 12, offset = 0, isAppend = false) {
    fetch("./js/portfolio-items.json")
        .then((response) => response.json())
        .then((data) => {
            if (!data.portfolio) {
                console.error("Помилка: нема даних");
                return;
            }
            const portfolioElements = data.portfolio.slice(offset, limit);

            const portfolioGallery = document.querySelector(".portfolio__gallery");
            if (!isAppend) {
                portfolioGallery.innerHTML = "";
            }
            portfolioElements.forEach((item) => {
                portfolioGallery.appendChild(generatePortfolioItem(item));
            });
        })
        .catch((error) => console.error("Помилка:", error));
}

function generatePortfolioItem(item) {
    const portfolioItem = document.createElement("div");
    portfolioItem.classList.add("portfolio__gallery-item");

    const portfolioImg = document.createElement("img");
    portfolioImg.classList.add("portfolio__gallery-item__image");
    portfolioImg.setAttribute("src", "./img/portfolio/" + item.image_path);
    portfolioImg.setAttribute("alt", item.title);
    portfolioItem.appendChild(portfolioImg);

    const itemDescription = document.createElement("div");
    itemDescription.classList.add("portfolio__gallery-item__description");

    const descriptionControls = document.createElement("div");
    descriptionControls.classList.add("gallery-item__controls");

    const btnLink = document.createElement("a");
    btnLink.classList.add("gallery-item__btn");
    btnLink.setAttribute("href", item.url);
    btnLink.setAttribute("target", "_blank");
    btnLink.innerHTML = '<svg><use xlink:href="img/icon-sprite.svg#link"></use></svg>';

    const btnSquare = document.createElement("a");
    btnSquare.classList.add("gallery-item__btn");
    btnSquare.innerHTML = '<svg><use xlink:href="img/icon-sprite.svg#square"></use></svg>';

    descriptionControls.appendChild(btnLink);
    descriptionControls.appendChild(btnSquare);

    const itemTitle = document.createElement("p");
    itemTitle.classList.add("gallery-item__title");
    itemTitle.innerText = item.title;

    const itemCategory = document.createElement("p");
    itemCategory.classList.add("gallery-item__category");
    itemCategory.innerText = item.category;

    itemDescription.appendChild(descriptionControls);
    itemDescription.appendChild(itemTitle);
    itemDescription.appendChild(itemCategory);

    portfolioItem.appendChild(itemDescription);

    return portfolioItem;
}
