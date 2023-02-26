import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  
  let cities = await fetchCities();

  console.log(cities);

  console.log("From init()")
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });

  // addCityToDOM("london", "London", "London", "http://43.205.54.27:8082/London");

}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let getApi = config.backendEndpoint + "/cities";
    let res = await fetch(getApi);
    let data = await res.json();
    return data;

  }
  catch(err){

    return null;

  }
  
  

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let idEle = document.getElementById("data");
  let divEle = document.createElement("div");
  divEle.setAttribute("class","col-lg-3 col-6 mb-3");
  // divEle.setAttribute("class","col-6");
  // divEle.setAttribute("class","mb-3");

  let link = document.createElement("a");
  link.setAttribute("href","/frontend/pages/adventures/?city="+id);
  link.setAttribute("id", id);

  let tileDiv = document.createElement("div");
  tileDiv.setAttribute("class","tile");

  let tileTextDiv = document.createElement("div");
  tileTextDiv.setAttribute("class","tile-text text-center")
  // tileTextDiv.setAttribute("class","text-center");

  let h5Ele = document.createElement("h5");
  h5Ele.innerText = city;

  tileTextDiv.appendChild(h5Ele);
 

  let pEle = document.createElement("p");
  pEle.innerText = description;

  tileTextDiv.appendChild(pEle);

  tileDiv.appendChild(tileTextDiv);

  let image1 = document.createElement("img");
  image1.setAttribute("class","img-responsive");
  image1.setAttribute("src", image);
  image1.setAttribute("alt", city);

  tileDiv.appendChild(image1);

  link.appendChild(tileDiv);

  divEle.appendChild(link);

  idEle.appendChild(divEle);



}

export { init, fetchCities, addCityToDOM };
