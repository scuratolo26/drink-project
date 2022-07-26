const DRINK_QUERY_URL = ("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
const COCKTAIL_DETAIL_QUERY_URL = ("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=")
const RANDOM_FACT_QUERY = ("https://uselessfacts.jsph.pl/random.json?language=en");
const COCKTAIL_SEARCH = document.querySelector("#cocktail-search");
const COCKTAIL_SEARCH_BTN = document.querySelector("#cocktail-search-btn");
const COCKTAIL_LIST = document.querySelector(".cocktail-container")

COCKTAIL_SEARCH_BTN.addEventListener("click", () => {
    getDrink();
});
COCKTAIL_SEARCH.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        getDrink();
    }
});



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
    fetch(DRINK_QUERY_URL + COCKTAIL_SEARCH.value)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            removeChildren(COCKTAIL_LIST);
            displayDrinks(data.drinks);
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
function removeChildren(parent){
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
getNewFact()