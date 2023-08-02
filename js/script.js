const categoriesFilter = document.querySelector(".portfolio__filters");
const portfolioGallery = document.querySelector(".portfolio__gallery");
let activeFilterElement = null;
const loadMoreButton = document.querySelector("#load-more-button");
let currenOffset = 0;
const loader = document.querySelector(".loader");
let filterCategory = "all";

const categories = {
    all: "All",
    graphic_design: "Graphic Design",
    web_design: "Web Design",
    landing_pages: "Landing Pages",
    wordpress: "Wordpress"
};

document.addEventListener("DOMContentLoaded", function (event) {
    loadCategories();
    setTimeout(loadPortfolioItems, 2000);
});

function loadPortfolioItems(limit = 12, isAppend = false) {
    fetch("./js/portfolio-items.json")
        .then((response) => response.json())
        .then((data) => {
            if (!data.portfolio) {
                console.error("Помилка: нема даних");
                return;
            }

            const portfolioElements = data.portfolio.slice(currenOffset, limit + currenOffset);
            console.log(portfolioElements);

            if (!isAppend) {
                portfolioGallery.innerHTML = "";
            }
            portfolioElements.forEach((item) => {
                portfolioGallery.append(generatePortfolioItem(item));
            });
            currenOffset += limit;
            loader.style.display = "none";
        })
        .then(() => {
            filterGalleryItems(filterCategory);
        })
        .catch((error) => console.error("Помилка:", error));
}

function generatePortfolioItem(item) {
    const portfolioItem = document.createElement("div");
    portfolioItem.classList.add("portfolio__gallery-item");
    portfolioItem.dataset["category"] = item.category;

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
    itemCategory.innerText = categories[item.category];

    itemDescription.appendChild(descriptionControls);
    itemDescription.appendChild(itemTitle);
    itemDescription.appendChild(itemCategory);

    portfolioItem.appendChild(itemDescription);

    return portfolioItem;
}

function loadCategories() {
    let isActive = true;
    for (let category in categories) {
        let categoryElement = generateCategory(category, categories[category], isActive);
        isActive = false;

        categoriesFilter.appendChild(categoryElement);
    }
}

function generateCategory(categoryAlias, categoryTitle, isActive) {
    const categoryItem = document.createElement("li");
    categoryItem.classList.add("portfolio__filters-item");
    categoryItem.dataset["category"] = categoryAlias;
    categoryItem.innerText = categoryTitle;
    if (isActive) {
        categoryItem.classList.add("active");
        activeFilterElement = categoryItem;
    }

    return categoryItem;
}

categoriesFilter.addEventListener("click", function (e) {
    if (!e.target.classList.contains("portfolio__filters-item")) {
        return;
    }
    filterCategory = e.target.dataset["category"];

    filterGalleryItems(filterCategory);

    activeFilterElement.classList.remove("active");
    e.target.classList.add("active");

    activeFilterElement = e.target;
});

function filterGalleryItems(filterCategory) {
    const allItems = portfolioGallery.querySelectorAll(".portfolio__gallery-item");

    allItems.forEach((item) => {
        if (item.dataset["category"] === filterCategory || filterCategory === "all") {
            item.style.display = "block";
            setTimeout(function () {
                item.style.opacity = "1";
                item.style.transform = "scale(1)";
            }, 0);
        } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0)";
            setTimeout(function () {
                item.style.display = "none";
            }, 400);
        }
    });
}

loadMoreButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.tagName !== "A") {
        return;
    }

    const btn = e.target.closest("#load-more-button");
    loader.style.display = null;
    btn.style.display = "none";

    setTimeout(loadMore, 2000, btn);
});

function loadMore(btn) {
    loadPortfolioItems(12, true);

    if (currenOffset < 24) {
        btn.style.display = null;
    }
}
