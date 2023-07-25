let detailsContainer = document.getElementById('details-container');
// Get MealId from URL Param
let MealId = window.location.href.split('=').reverse()[0];

var newURL = window.location.protocol + "/" + window.location.host + "/" + window.location.pathname + window.location.search
console.log("Base-URL "+newURL);
// checking MealId
if(!isNaN(MealId)){
    getDetail(MealId);
}else{
    window.location.href = "/";
}

// Get detail of the meal by id
function getDetail(Id){
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i="+Id)
    .then(res => {return res.json()})
    .then(data => {
        let detail = data.meals[0];
        let strTemp = `
            <div class="detail-img">
                <img src="${detail.strMealThumb}"/>
            </div>
            <div class="detail-content">
                <h3>${detail.strMeal}</h3>
                <h4>Category :- ${detail.strCategory}</h4>
                <p><strong>Instruction :-</strong> ${detail.strInstructions}</p>
                <div><strong>Ingredients :-</strong>
                <ul>
                ${(()=>{
                        let Ingredients = "";
                        for(let i=1;i<=20;i++){
                            let temp = detail["strIngredient"+i]; 
                            if(temp){
                                Ingredients += "<li>"+temp+"</li>"
                            }
                        }
                        return Ingredients;
                    })()
                }
                </ul>
                </div>
            </div>
        `;

        detailsContainer.innerHTML = strTemp;
    });
    
}

// redirect to backPage
function back(){
    window.history.back();
}
