const QUERY_URL = ("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
const COCKTAIL_SEARCH = document.querySelector("cocktail-search");

COCKTAIL_SEARCH.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        getDrink();
    }
});



function getDrink() {
    fetch(QUERY_URL + COCKTAIL_SEARCH.value)
        .then(function (response) {
        return response.json();
        })
        .then(function (data){
            console.log(data);
        })
}

