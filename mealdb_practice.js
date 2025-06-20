const loadAllFood = () => {
	fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
		.then((response) => response.json())
		.then((data) => displayFoods(data.meals));
};

const displayFoods = (foods) => {
	const foodContainer = document.getElementById("food-container");
	foodContainer.innerHTML = "";
	if (!foods) {
		foodContainer.innerHTML = "No Result Found";
		return;
	}

	foods.forEach((food) => {
		const div = document.createElement("div");
		div.innerHTML = `
			<div onclick="foodDetails('${food.idMeal}')" class="card" style="width:15rem; box-shadow: 4px 4px 8px gray;">
				<img src="${food.strMealThumb}" class="food-img" style="height:12rem" alt="${food.strMeal}">
				<div class="title">
					<h5 class="card-title text-center fw-bold" style="color: #F51FF2">${food.strMeal}</h5>
				</div>
			</div>
		`;
		foodContainer.appendChild(div);
	});
};

document.getElementById("search-btn").addEventListener("click", (event) => {
	const search = document.getElementById("search-box").value;
	const foodContainer = document.getElementById("food-container");

	if (search.length == "") {
		foodContainer.innerText = "No Result Found";
	} else if (search.length == 1) {
		fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
			.then((res) => res.json())
			.then((data) => displayFoods(data.meals));
	} else {
		fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
			.then((res) => res.json())
			.then((data) => displayFoods(data.meals));
	}
	document.getElementById("search-box").value = "";
});

function foodDetails(mealId) {
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
		.then((res) => res.json())
		.then((data) => {
			const food = data.meals[0];
			const details = document.getElementById("food-details");
			details.innerHTML = "";
			const ingredients = [];
			for (let i = 1; i <= 10; i++) {
				food[`strIngredient${i}`];
				if (food[`strIngredient${i}`])
					ingredients.push(food[`strIngredient${i}`]);
			}

			const div = document.createElement("div");
			div.innerHTML = `
				<div class="fd-card mt-5" style="width:17rem; height: auto; box-shadow: 5px 5px 9px gray; border-radius: 5px; padding-left: 10px; padding-top: 4px">
					<img src="${food.strMealThumb}" class="food-img" style="margin: 5px; width:90%; object-fit: cover; border-radius: 5px; display: block; height:10rem; box-shadow: 5px 5px 9px gray;" alt="${food.strMeal}">
					<h5 class="card-title mt-2 fw-bold" style="font-size: 22px;">${food.strMeal}</h5>
					<h6 class="mt-2" style="font-size: 15px; font-weight: bold;">Ingredients:</h6>
					<ul id="item-list" style="font-size: 13px; padding-left: 20px; margin: 0; text-align: left; line-height: 1.2;"></ul>
				</div>
			`;
			const ul = div.querySelector("#item-list");
			ingredients.forEach((ing) => {
				const li = document.createElement("li");
				li.innerText = ing;
				ul.appendChild(li);
			});

			details.appendChild(div);
		});
}

loadAllFood();
