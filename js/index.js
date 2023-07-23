// Intialize Variables
let inputField = document.querySelector('#container input');
let autoSuggestion = document.querySelector('#container .auto-suggestion')
let FavIds = localStorage.getItem('favIds')?JSON.parse(localStorage.getItem('favIds')):[];

// capture input event 
inputField.addEventListener('input',autoSuggestionf);
setInterval(autoSuggestionCheck,10);

let ul = document.createElement('ul');
autoSuggestion.appendChild(ul);

// AutoSuggestion function
function autoSuggestionf(e){
    if(inputField.value.length>0){
        let link = "https://www.themealdb.com/api/json/v1/1/search.php?s="+inputField.value;
        fetch(link).then(response => {return response.json()})
        .then(data=>{
            ul.innerHTML = "";
            if(data.meals!=null){
                data.meals.forEach(element => {
                    let FavAdded = false;
                    FavIds.forEach(value=>{
                        if(value==element.idMeal){
                            FavAdded = true;
                            return;
                        }
                    })
                    let li = document.createElement('li');
                    // li.onclick = function(){detailPage(element.idMeal);}
                    let template = `<img src="${element.strMealThumb}" onclick="detailPage(${element.idMeal})"/>
                    <h5 onclick="detailPage(${element.idMeal})">${element.strMeal}</h5>
                    ${(()=>{
                        if(FavAdded){
                            return `<i class="fa-solid fa-heart fav-icons" data-Id="${element.idMeal}" onclick="addFav(event,${element.idMeal})"></i>`
                        }else{
                            return `<i class="fa-regular fa-heart fav-icons" data-Id="${element.idMeal}" onclick="addFav(event,${element.idMeal})"></i>`
                        }
                    })()}`;

                    li.innerHTML = template; 
                    ul.appendChild(li);
                });
                autoSuggestion.style.display="block";
            }else{
                autoSuggestion.style.display="none";
            }
        })
        autoSuggestionCheck();
    }
}

// Check inputField to make autoSuggestion tab display
function autoSuggestionCheck(){
    if(inputField.value.length==0){
        autoSuggestion.style.display="none";
    }
}

// Add Meals to favList by storing Ids to localStorage
function addFav(event,id){
    const index = FavIds.indexOf(id);
    if(index==-1){
        FavIds.push(id);
        event.target.classList.remove("fa-regular");
        event.target.classList.add("fa-solid");
    }else{
        FavIds.splice(index,1);
        event.target.classList.remove("fa-solid");
        event.target.classList.add("fa-regular");
    }
    localStorage.setItem('favIds',JSON.stringify(FavIds));
}

// Redirect to detailPage 
function detailPage(id){
    const url = "http://127.0.0.1:5500/pages/mealDetailPage.html?id="+id;
    window.location.href = url;
}