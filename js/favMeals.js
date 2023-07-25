// Get favListIds from localStorage
let favListIds = JSON.parse(localStorage.getItem('favIds'));

// Get the FavMeals Ids and display it
function getData(){
    let favList = document.querySelector(".fav-lists")
    favList.innerHTML = "";
    favListIds.forEach(Id => {
        let link = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+Id;
        fetch(link).then(response => {return response.json()})
        .then(data=>{
            // console.log(data);
            let strTemp = `
                <li>
                    <img src="${data.meals[0].strMealThumb}"  onclick="detailPage(${data.meals[0].idMeal})"/>
                    <h3  onclick="detailPage(${data.meals[0].idMeal})">${data.meals[0].strMeal}</h3>
                    <i class="fa-solid fa-xmark" onclick="removeFav(${Id})"></i>
                </li>
            `;
            favList.innerHTML += strTemp;
        });
    });
}

// Remove Meals from FavList
function removeFav(Id){
    favListIds = favListIds.filter((value)=>{
        return value!=Id;
    })
    localStorage.setItem('favIds',JSON.stringify(favListIds));
    getData();
}

// Redirect to detailPage
function detailPage(id){
    var re = new RegExp(/^.*\//);
    var BaseURL = re.exec(window.location.href);
    const url = BaseURL+"mealDetailPage.html?id="+id;
    window.location.href = url;
}

// Initial Function Load
(function intialRun(){
    getData();
})();
