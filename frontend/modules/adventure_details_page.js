import config from "../conf/index.js";


//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search);
  var ss = search.split("=");
  var s = ss[1];
  console.log(s);

  // Place holder for functionality to work in the Stubs
  return s;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
  let getApi = config.backendEndpoint +  "/adventures/detail?adventure=" + adventureId;
  
  const res = await fetch(getApi);
  let data = await res.json();

  console.log(data);

  // Place holder for functionality to work in the Stubs
  return data;
  }
  catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  let h5Ele = document.querySelector("#adventure-name")
  h5Ele.textContent = adventure.name;

  document.querySelector("#adventure-subtitle").innerHTML = adventure.subtitle;

  for(let i in adventure.images){
    let photoEle = document.getElementById("photo-gallery");
    let dEle = document.createElement("div");
    let iEle = document.createElement("img");

    iEle.setAttribute("src", adventure.images[i]);
    iEle.setAttribute("alt",adventure.name);
    iEle.setAttribute("class","activity-card-image");
    
    dEle.appendChild(iEle);
    photoEle.appendChild(dEle);

  }

  let contEle = document.getElementById("adventure-content");
  contEle.innerText = adventure.content;


  


}



//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  
      <div id="carouselExampleIndicators" class="carousel slide " data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner" id="cimg">
        <div class="carousel-item active" >       
          <img src="${images[0]}" class="d-block w-100 activity-card-image" alt="...">
        </div>
        
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>  
  
   
  `;
  
  for(let i = 1; i<images.length ; i++){

    let ci = document.getElementById("cimg");
    let dimg = document.createElement("div");
    dimg.setAttribute("class","carousel-item");

    let im = document.createElement("img");
    im.setAttribute("src",images[i]);
    im.setAttribute("class","d-block w-100 activity-card-image");
    im.setAttribute("alt","#");

    dimg.appendChild(im);
    ci.appendChild(dimg);


  }
  


}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = 'none';
    document.getElementById("reservation-panel-available").style.display = 'block';
    document.getElementById("reservation-person-cost").innerText = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display = 'block';
    document.getElementById("reservation-panel-available").style.display = 'none';

  }


}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let toto = adventure.costPerHead * persons;

  // console.log(toto);
  document.getElementById("reservation-cost").innerText = toto;


}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // const form = document.getElementById('myForm');
  // form.addEventListener("submit", function (event) {
   
  //   event.preventDefault();
//*********************** */
      
        
    // ******************************************
//https://stackoverflow.com/questions/29775797/fetch-post-json-data
const form = document.getElementById("myForm");
form.addEventListener("submit", async(event)=>{
  event.preventDefault();
  let url = config.backendEndpoint + "/reservations/new";
  let formElements = form.elements;

  let bodyString = JSON.stringify({
    name : formElements["name"].value,
    date : formElements["date"].value,
    person: formElements["person"].value,
    adventure : adventure.id,

  });

  try{
    let res = await fetch(url, {
      method: 'POST',
      body:bodyString,
      headers :{
        "Content-Type":"application/json",
      },
    });

    if(res.ok){
      alert("Success!");
      window.location.reload();

    }else{
      let data = await res.json();
      alert(`Failed - ${data.message}`);
    }
  }catch(err){
    console.log(err);
    alert("Failed - fetch call resulted in error");
  }


});

  
  
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";

  }
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }
 

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
