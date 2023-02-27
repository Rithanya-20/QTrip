
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  

  const params = new URLSearchParams(search);
  let ct = params.get('city')
  console.log(ct);
  return ct;


}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
      let getchApi = config.backendEndpoint + "/adventures?city=" + city;

      const res = await fetch(getchApi);
      let data = await res.json();
      console.log(data);

      return data;
  }
  catch(err){
      return null;
  }
  

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for(let i in adventures){

    let rEle = document.getElementById("data");
    let cELe = document.createElement("div");
    cELe.setAttribute("class", "col-6 col-lg-3 mb-3");

   

    let link = document.createElement("a");
    let l = "detail/?adventure="+adventures[i].id;
    link.setAttribute("href", l);
    link.setAttribute("id", adventures[i].id)

    let dummy = document.createElement("div");


    

    let cbEle = document.createElement("div");
    cbEle.setAttribute("class","category-banner");
    cbEle.innerText = adventures[i].category ;

   

    let actEle = document.createElement("div");
    actEle.setAttribute("class","activity-card");
    

    let image1 = document.createElement("img");
    image1.setAttribute("class","img-responsive");
    image1.setAttribute("src", adventures[i].image);
    image1.setAttribute("alt",adventures[i].name);
    
    actEle.appendChild(image1);


    let contEle = document.createElement("div");
    contEle.setAttribute("class", "container d-flex flex-wrap justify-content-between mt-3");
    
    let h5Ele = document.createElement("h5");
    h5Ele.innerText = adventures[i].name;

    let pEle = document.createElement("p");
    pEle.innerText = adventures[i].currency +" "+adventures[i].costPerHead;

    contEle.appendChild(h5Ele);
    contEle.appendChild(pEle);

    actEle.appendChild(contEle);

    let fcontEle = document.createElement("div");
    fcontEle.setAttribute("class", "container d-flex flex-wrap justify-content-between");

    let h5Ele2 = document.createElement("h5");
    h5Ele2.innerText= "Duration";

    let pEle2 = document.createElement("p");
    pEle2.innerText = adventures[i].duration;

    fcontEle.appendChild(h5Ele2);
    fcontEle.appendChild(pEle2);

    actEle.appendChild(fcontEle);
    
    actEle.appendChild(cbEle)
    // dummy.appendChild(cbEle);
    dummy.appendChild(actEle);

    link.appendChild(dummy);

    // link.appendChild(cbEle);
    // link.appendChild(actEle);
   
    
    cELe.appendChild(link);
    rEle.appendChild(cELe);


  }
  

  

  


  


}






//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  
  var l = parseInt(low);
 
  var h = parseInt(high);
  let ans = [];
  for(let i in list){
    
    if((list[i].duration >= l) && (list[i].duration <= h)){
    
      ans.push(list[i]);

 
    }
  }
  // console.log(res);
  return ans;

}

// const input = [
//   {
//     id: "3091807927",
//     name: "East Phisphoe",
//     price: "500",
//     currency: "INR",
//     image:
//       "https://images.pexels.com/photos/3380805/pexels-photo-3380805.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     duration: 10,
//     category: "Beaches",
//   },
//   {
//     id: "3091807927",
//     name: "Beach Cabanna",
//     price: "500",
//     currency: "INR",
//     image:
//       "https://images.pexels.com/photos/67566/palm-tree-palm-ocean-summer-67566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
//     duration: 15,
//     category: "Beaches",
//   },
// ];
// let output = filterByDuration(input, "6", "10");
// console.log(output);


//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  // console.log("im in cat");
  // console.log(list);
  
  let res = [];
  for(let i in categoryList){
    for(let j in list){
      if(list[j].category == categoryList[i]){
        res.push(list[j]);
      }
    }
  }

  // list= list.filter(function(item) {
  //   for (var key in categoryList) {
  //     if (item[key].category != categoryList[key])
  //       console.log(item[key].category);
  //       return false;
  //   }
  //   return true;
  // });
  
  // console.log(res)
  
  return res;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log("list :");
  // console.log(list);
  console.log(filters);
  var filList = [];

  if((filters.duration == "") && (filters.category != "")){
    // console.log("**"+filters.category);
    filList = filterByCategory(list,filters.category);
    return filList;
  }
  

  else if((filters.duration != "") && (filters.category == "")){
    
    var hh = filters.duration;
    var h = hh.split("-");
    var h1 = h[0];
    var h2 = h[1];
    // console.log(h1 + "$"+h2);
    let res = filterByDuration(list, h1, h2);
    return res;
   

  }

  else if((filters.duration != "") && (filters.category != "")){
    
    var dd = filters.duration;
    var d = dd.split("-");
    var d1 = d[0];
    var d2 = d[1];

    const df = list.filter(obj => (obj.duration >= d1 && obj.duration <= d2));
    var durationFiltered = filterByCategory(df,filters.category);
    return durationFiltered;




  }

  else if((filters.duration == "") && (filters.category == "")){
    return list;
  }

  // Place holder for functionality to work in the Stubs
  // console.log("%%%%"+filList);
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage


  localStorage.setItem('filters', 
    JSON.stringify(filters));


  return true;
}
// saveFiltersToLocalStorage();

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  var retrievedObject = localStorage.getItem('filters');

  var ret = JSON.parse(retrievedObject);

  console.log('retrievedObject: ', JSON.parse(retrievedObject));


  // // Place holder for functionality to work in the Stubs
  // generateFilterPillsAndUpdateDOM(ret);

  // return retrievedObject;

  return ret;

  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
   const rObj = getFiltersFromLocalStorage();  
   

  //  if(rObj.category != null){
  //   console.log("hey "+rObj.category);

  //  }
  //  else{
  //   console.log("hey "+rObj);

  //  }
   

    // let clEle = document.getElementById("category-list");
    // let dEle = document.createElement("div"); 
   
    // dEle.setAttribute("class","category-filter");
    // dEle.innerText = filters.category[i];
    // clEle.append(dEle);
        //   for (var i = 0, l = filters.duration.length; i < l; i++) {
        //     var obj = data.messages[i];
        //     let clEle = document.getElementById("category-list");
        //     let dEle = document.createElement("div"); 
          
        //     dEle.setAttribute("class","category-filter");
        //     dEle.innerText = filters.duration[i];
        //     clEle.append(dEle);
            
        // }
        // if(filters.duration != ""){
        //   let durationId = document.getElementById("duration-title");
        //   durationId.textContent = filters.duration + " Hours";
        //   console.log(filters.duration);
        // }

        for (var i = 0, l = filters.category.length; i < l; i++) {
          
          let clEle = document.getElementById("category-list");
          let dEle = document.createElement("div"); 
        
          dEle.setAttribute("class","category-filter");
          dEle.innerText = filters.category[i];
          clEle.append(dEle);
        
        }

  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
