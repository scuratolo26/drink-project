const DRINK_QUERY_URL = ("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
const COCKTAIL_DETAIL_QUERY_URL = ("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=")
const RANDOM_FACT_QUERY = ("https://uselessfacts.jsph.pl/random.json?language=en");
const COCKTAIL_SEARCH = document.querySelector("#cocktail-search");
const COCKTAIL_SEARCH_BTN = document.querySelector("#cocktail-search-btn");
const COCKTAIL_LIST = document.querySelector(".cocktail-container")
var cocktailSearch = "";

COCKTAIL_SEARCH_BTN.addEventListener("click", () => {
    cocktailSearch = COCKTAIL_SEARCH.value;
    getDrink();
});
COCKTAIL_SEARCH.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        getDrink();
    }
});

var favorites = [];
var drinkName1 = "";
var drink;
var favoritesContainerEl = $("#favorites-container");

function addDrinkToFavorites() {
    console.log(drink);
    favorites.push(drink);
    localStorage.setItem('drink', JSON.stringify(favorites));
    setFavorites();
};

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

function loadFavorites() {
    var temp = JSON.parse(localStorage.getItem('drink'));
    console.log(temp);
    if (temp !== null) {
        favorites = temp;
    }
};

function getDrinkDetails(id) {
    fetch(COCKTAIL_DETAIL_QUERY_URL + id)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            removeChildren(COCKTAIL_LIST);
            var drinkName = document.createElement("h2");
            var drinkPic = document.createElement("img");
            var drinkGlass = document.createElement("p");
            var drinkIngredient1 = document.createElement("p");
            var drinkMeasure1 = document.createElement("p");
            var drinkInstructions = document.createElement("p");
            var addToFavoritesBtn = document.createElement("button");

            drinkName.textContent = data.drinks[0].strDrink;
            drinkName1 = data.drinks[0].strDrink;
            drink = data.drinks[0];
            drinkPic.src = data.drinks[0].strDrinkThumb;
            drinkGlass.textContent = data.drinks[0].strGlass;
            drinkIngredient1.textContent = data.drinks[0].strIngredient1 + " - " + data.drinks[0].strMeasure1;
            drinkInstructions.innerHTML = ("Mixing instructions<br>" + data.drinks[0].strInstructions);
            addToFavoritesBtn.textContent = ("Add drink to favorites");
            addToFavoritesBtn.addEventListener("click", () => {
                addDrinkToFavorites(); // Create this function
            });


            COCKTAIL_LIST.appendChild(drinkName);
            COCKTAIL_LIST.appendChild(drinkPic);
            COCKTAIL_LIST.appendChild(drinkGlass);
            COCKTAIL_LIST.appendChild(drinkIngredient1);
            COCKTAIL_LIST.appendChild(drinkMeasure1);
            COCKTAIL_LIST.appendChild(drinkInstructions);
            COCKTAIL_LIST.appendChild(addToFavoritesBtn);


            // console.log(data.drinks[0].strDrink);

            // for(var i=0; i<16; i++) {
            //     str = "data.drinks[0].strMeasure" + i
            //     if (str.length > 1) {
            //         console.log(data.strMeasure[i]);

            //     }
            // }


            console.log(data);
        })
}

function getDrink() {
    // fetch(DRINK_QUERY_URL + COCKTAIL_SEARCH.value)
    fetch(DRINK_QUERY_URL + cocktailSearch)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            removeChildren(COCKTAIL_LIST);
            displayDrinks(data.drinks);
            console.log(data);
        })
        .catch(error => console.log('error', error));
}

function displayDrinks(list) {
    list.forEach(e => {
        var li = document.createElement("p");
        li.textContent = e.strDrink;
        li.addEventListener("click", () => {
            getDrinkDetails(e.idDrink);
        });
        li.classList.add("cocktail-list-item")
        COCKTAIL_LIST.appendChild(li);
    });

}

// Removes all children from a parent element
function removeChildren(parent) {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}


// define container variable - sam
var factContainer = $("#random-fact-container");
// get random fact and display in container - sam
function getNewFact() {
    fetch(RANDOM_FACT_QUERY)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            factContainer.text(data.text);
        })
};
// get random fact on page load - sam
loadFavorites();
getNewFact();
setFavorites();