const heightInput = document.getElementById("height");
const weightInput = document.getElementById("weight");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const activityInput = document.getElementById("activity");
const submit = document.getElementById("submitBtn");
const cardContainer = document.getElementById("cards-container");
const mealsDetails = document.getElementById("details");
const ingredientSection = document.getElementById("ingredients");
const stepsSection = document.getElementById("steps");
const equipmentSection = document.getElementById("equipment");
const recipeSection = document.getElementById("recipe-section");
const getCalorie = () => {
  let hv = heightInput.value;
  let wv = weightInput.value;
  let av = ageInput.value;
  let gv = genderInput.value;
  let avv = activityInput.value;
  let bmr;
  if (hv === "" || hv <= 0 || wv === "" || wv <= 0 || av === "" || av <= 0) {
    alert(
      "All input field should not be empty and should not have negetive value"
    );
    return;
  }
  if (gv === "female") {
    bmr = 655.1 + 9.563 * wv + 1.85 * hv - 4.676 * av;
  } else if (gv === "male") {
    bmr = 66.47 + 13.75 * wv + 5.003 * hv - 6.755 * av;
  }
  // Daily Calorie Requirement
  if (avv === "light") {
    bmr *= 1.375;
  } else if (avv === "moderate") {
    bmr *= 1.55;
  } else if (avv === "active") {
    bmr *= 1.725;
  }
  getMeals(bmr);
};

const getMeals = async (bmr) => {
  document.getElementById("loader").style.display = "block";
  const url = `https://api.spoonacular.com//mealplanner/generate?timeFrame=day&targetCalories=${bmr}&apiKey=${API_KEY}&includeNutrition=true`;

  let datas;
  await fetch(url)
	@@ -72,7 +72,7 @@ const generateMealsCard = (datas) => {
  </div>
  `;
  datas.meals.map(async (data) => {
    const url = `https://api.spoonacular.com/recipes/${data.id}/information?apiKey=${API_KEY}&includeNutrition=false`;
    let imgURL;
    await fetch(url)
      .then((res) => {
	@@ -103,7 +103,7 @@ const btnRecipe = async (data) => {
  ingredientSection.innerHTML = "";
  stepsSection.innerHTML = "";
  equipmentSection.innerHTML = "";
  const url = `https://api.spoonacular.com/recipes/${data}/information?apiKey=${API_KEY}&includeNutrition=false`;
  let information;

  await fetch(url)
	@@ -163,7 +163,7 @@ const btnRecipe = async (data) => {
  stepsSection.appendChild(stCardDiv);

  // equipmentSection
  const urlEquip = `https://api.spoonacular.com/recipes/${data}/equipmentWidget.json?apiKey=${API_KEY}&includeNutrition=false`;
  let equip;

  await fetch(urlEquip)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      equip = data;
    });
  let equipData = ``;
  let eqCardDiv = document.createElement("div");
  eqCardDiv.classList.add("carddesign", "card", "h-100");
  let eqCardBody = document.createElement("div");
  eqCardBody.classList.add("card-body");
  let eqOverlay = document.createElement("div");
  eqOverlay.classList.add("overlay");
  let equipUl = document.createElement("ul");
  equip.equipment.map((equip) => {
    equipData += `
            <li>${equip.name}</li>
            `;
  });
  equipUl.innerHTML = equipData;
  let equipH1 = document.createElement("h3");
  equipH1.textContent = "EQUIPMENT";
  eqCardBody.appendChild(eqOverlay);
  eqCardBody.appendChild(equipH1);
  eqCardBody.appendChild(equipUl);
  eqCardDiv.appendChild(eqCardBody);
  equipmentSection.appendChild(eqCardDiv);
};
submit.addEventListener("click", getCalorie);
