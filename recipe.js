// var all = document.getElementById('all')
var meaList = document.getElementById('meal-list')
var meaList1 = document.getElementById('meal-list1')
var searchBtn = document.getElementById('btn')
var BackBtn = document.getElementById('btn1')
var guide = document.getElementById('container3')

BackBtn.addEventListener('click', function () {
    meaList1.style.display = "grid"
    meaList.style.display= 'none'  
})

searchBtn.addEventListener('click', function (e) {
    e.preventDefault()
    let searchBox = document.getElementById('textfield').value
    if (searchBox != "") {
        meaList1.style.display = "none"
    }
    else{
        meaList1.style.display = "grid"
    }
    console.log(searchBox);
    fetch(`https://api.spoonacular.com/food/search?apiKey=80fefbbea3a04d39a616de8bc927ba92&query=${searchBox}`).then(response => response.json()).then(data =>{
        console.log(data);
        let html = ""
        if (data.searchResults[0].results){
            data.searchResults[0].results.forEach(results => {
                html +=`
                <div class="col"><div class="card" data-id = "${results.id}" data-name = "${results.name}" style="width: 18rem;">
                <img src="${results.image}" class="card-img-top" alt="">
                <div class="card-body">
                  <h5 class="card-title">${results.name}</h5>
                  <div class="d-flex justify-content-between">
                  <div class="p-2"> <a href="#" class="btn btn-primary btn-1">Get Recipe</a></div>
                  <div class="p-2"><a href="shopping.html"><i class="bi bi-cart-check-fill" ></i></a></div>
                  </div>
                 </div></div></div>
                `
            });
        }
        else{
            html = `<p class='unavailabe'>Sorry, we didnt find such meal.</p>`
            // meaList.classList.add('unavailable')
        }
    meaList.innerHTML = html


    })
  
})


meaList.addEventListener('click', function (e) {
    e.preventDefault()
    let searchBox = document.getElementById('textfield').value
    if (e.target.classList.contains('btn-1')) {
        let mealItem = e.target.parentElement.parentElement.parentElement.parentElement
        console.log(mealItem);
        fetch(`https://api.spoonacular.com/food/search?limit=40&apiKey=80fefbbea3a04d39a616de8bc927ba92&query=${mealItem.dataset.name}`)
        .then(response => response.json()).then(data => mealGuide(data.searchResults[0].results))
            // console.log(data);
            
    }
})
function mealGuide(results) {
    console.log(results)
    results = results[0]
    let html = `
    <div class="new" >
    <button type="button" class="btn-close" aria-label="Close" id= 'closebtn'></button>
               
    <h3>${results.name}</h3>
    <p class="card-text">${results.content}</p>
    <a href="${results.link}" style = "color:white;"> Click Here For Istructions to make your meal!</a>
                 
                </div>
                
    `
    guide.innerHTML= html
    // guide.classList.add('new')
    document.getElementById('closebtn').addEventListener('click',function (e) {
        let Recipe = e.target.parentElement
        Recipe.classList.remove('new')
        Recipe.style.display = 'none'
        
    })

}
