// Defining constant variables
const DRINK_QUERY_URL = ("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
const COCKTAIL_DETAIL_QUERY_URL = ("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=")
const RANDOM_FACT_QUERY = ("https://uselessfacts.jsph.pl/random.json?language=en");
const COCKTAIL_SEARCH = document.querySelector("#cocktail-search");
const COCKTAIL_SEARCH_BTN = document.querySelector("#cocktail-search-btn");
const COCKTAIL_LIST = document.querySelector(".cocktail-container");
const SEARCH_MODAL = document.querySelector(".modal");
const CLOSE_BUTTON = document.querySelector("#close-button");
var cocktailSearch = "";

// Event listeners for cocktail search
COCKTAIL_SEARCH_BTN.addEventListener("click", () => {
    cocktailSearch = COCKTAIL_SEARCH.value;
    getDrink();
});
COCKTAIL_SEARCH.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        getDrink();
    }
});
CLOSE_BUTTON.addEventListener("click", () => {
    closeAllModals();
});

document.addEventListener('keydown', (event) => {
    const e = event || window.event;
    if (e.key === "Escape") {
      closeAllModals();
    }
});

// Favorites function variables
var favorites = [];
var drinkName1 = "";
var drink;
var favoritesContainerEl = $("#favorites-container");

// Adding drink to localstorage when favorite button clicked
function addDrinkToFavorites() {
    favorites.push(drink);
    localStorage.setItem('drink', JSON.stringify(favorites));
    setFavorites();
};

// Create button for drinks that are favored
function setFavorites() {
    favoritesContainerEl.empty();

    for (let i = 0; i < favorites.length; i++) {
        var drink1 = favorites[i];
        var favButtonEl = $('<button>').text(drink1.strDrink);
        favButtonEl.attr('id', drink1.idDrink);
        favButtonEl.addClass('button is-light favButton');
        favButtonEl.attr('type', 'button');

        favoritesContainerEl.append(favButtonEl);
    }
    $(".favButton").on("click", function (event) {
        event.preventDefault();
        var id = $(this).attr('id');
        getDrinkDetails(id);
    });
};

// Load saved drink favorites from localstorage
function loadFavorites() {
    var temp = JSON.parse(localStorage.getItem('drink'));
    console.log(temp);
    if (temp !== null) {
        favorites = temp;
    }
};

// Display details for drink under cocktail list
function getDrinkDetails(id) {
    // Pull info from api using drink id
    fetch(COCKTAIL_DETAIL_QUERY_URL + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Clear container
            removeChildren(COCKTAIL_LIST);
            // Create elements for cocktail list
            var drinkName = document.createElement("h2");
            var drinkPic = document.createElement("img");
            var drinkGlass = document.createElement("p");
            var ingredientTitle = document.createElement("p");
            var instructionTitle = document.createElement("p");
            var drinkInstructions = document.createElement("p");
            var addToFavoritesBtn = document.createElement("button");

            // Assign content to cocktail list elements
            drinkName.textContent = data.drinks[0].strDrink;
            drinkName1 = data.drinks[0].strDrink;
            drink = data.drinks[0];
            drinkPic.src = data.drinks[0].strDrinkThumb;
            ingredientTitle.textContent = ("Ingredients");
            instructionTitle.textContent = ("Mixing Instructions");
            drinkGlass.innerHTML = ("Glass type - " + data.drinks[0].strGlass);
            drinkInstructions.innerHTML = (data.drinks[0].strInstructions);
            addToFavoritesBtn.textContent = ("Add drink to favorites");
            addToFavoritesBtn.addEventListener("click", () => {
                addDrinkToFavorites();
            });

            // Assign classes to elements for styling
            drinkName.classList.add("title", "is-size-1", "has-text-white", "has-text-centered");
            drinkPic.classList.add("image", "center");
            ingredientTitle.classList.add("is-size-3", "s-underline");
            instructionTitle.classList.add("is-size-3", "s-underline");
            addToFavoritesBtn.classList.add("button", "is-light", "is-centered");

            // Append elements to cocktail list
            COCKTAIL_LIST.appendChild(drinkName);
            COCKTAIL_LIST.appendChild(drinkPic);
            COCKTAIL_LIST.appendChild(ingredientTitle);
            for (var i = 0; i < 16; i++) {
                var ingredient = (data.drinks[0]["strIngredient" + i.toString()]);
                var measurement = (data.drinks[0]["strMeasure" + i.toString()]);
                if (ingredient && measurement) {
                    var e1 = document.createElement("p");
                    e1.textContent = (ingredient + " - " + measurement);
                    COCKTAIL_LIST.appendChild(e1);
                }
            }
            COCKTAIL_LIST.appendChild(instructionTitle);
            COCKTAIL_LIST.appendChild(drinkGlass);
            COCKTAIL_LIST.appendChild(drinkInstructions);
            COCKTAIL_LIST.appendChild(addToFavoritesBtn);
        })
}

// Search for drinks using cocktail search
function getDrink() {
    fetch(DRINK_QUERY_URL + COCKTAIL_SEARCH.value)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            removeChildren(COCKTAIL_LIST);
            displayDrinks(data.drinks);
            console.log(data);
        })
        .catch(error => {
            console.log(error);
            SEARCH_MODAL.classList.add("is-active", "is-clipped");

        });
}

// Display possible drinks when searched
function displayDrinks(list) {
    var title = document.createElement("p");
    title.innerHTML = ("Click button below to get more information<br>");
    title.classList.add("is-size-5", "has-text-white", "has-text-centered");
    COCKTAIL_LIST.appendChild(title);
    list.forEach(e => {
        var li = document.createElement("button");
        li.textContent = e.strDrink;
        li.addEventListener("click", () => {
            getDrinkDetails(e.idDrink);
        });
        li.classList.add("cocktail-list-item", "button", "is-light")
        COCKTAIL_LIST.appendChild(li);
    });

}

// Removes all children from a parent element
function removeChildren(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

// Remove modal class so it is hidden
function closeModal($el) {
    $el.classList.remove('is-active');
  }

// Remove active modal class for all modals
function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
}

// Define container variable
var factContainer = $("#random-fact-container");
// Get random fact and display in container
function getNewFact() {
    fetch(RANDOM_FACT_QUERY)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            factContainer.text(data.text);
        })
};
// Get random fact on page load
loadFavorites();
getNewFact();
setFavorites();