const DRINK_QUERY_URL = ("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
const RANDOM_FACT_QUERY = ("https://uselessfacts.jsph.pl/random.json?language=en");
const COCKTAIL_SEARCH = document.querySelector("#cocktail-search");

COCKTAIL_SEARCH.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        getDrink();
    }
});



function getDrink() {
    fetch(DRINK_QUERY_URL + COCKTAIL_SEARCH.value)
        .then(function (response) {
        return response.json();
        })
        .then(function (data){
            console.log(data);
        })
}

function getRandomFact() {
    fetch(RANDOM_FACT_QUERY)
    .then(function (response) {
    return response.json();
    })
    .then(function (data){
        console.log(data.text);
    })
}
getRandomFact();