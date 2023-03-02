import config from "../conf/index.js";


//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  let gitapi = config.backendEndpoint + "/reservations/";
  try{

    let res = await fetch(gitapi);
    let data = await res.json();
    
    return data;

  }
  catch(err){
    return null;
  }
  

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
   

    if(reservations.length == 0){
      document.getElementById("no-reservation-banner").style.display = "block";
      document.getElementById("reservation-table-parent").style.display = "none";
    

    }
    else{
      document.getElementById("no-reservation-banner").style.display = "none";
      document.getElementById("reservation-table-parent").style.display = "block";
      for(let i in reservations){
        let r = document.getElementById("reservation-table");

        const time = reservations[i].time;
        let tt = time.split(" ");
        var dt = new Date(time);
        

        const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

      
        let name = month[dt.getMonth()];
        console.log(name);

        let timeText = dt.toLocaleString("en-IN",{day: 'numeric', month: 'long', year: 'numeric'})+", "+dt.toLocaleTimeString('en-IN');
        // ${new Date(reservations[i].time).toLocaleString("en-IN",{day: 'numeric', month: 'long', year: 'numeric'})}
        let r1 = document.createElement("tr");
        r1.innerHTML = `
           <td>${reservations[i].id}</td>
           <td>${reservations[i].name}</td>
           <td>${reservations[i].adventureName}</td>
           <td>${reservations[i].person}</td>
           <td>${new Date(reservations[i].date).toLocaleDateString('en-IN')}</td>
           <td>${reservations[i].price}</td>
           <td>${timeText}</td>

           
        `;
        


        // let c7 = document.createElement("td");
        // const time = reservations[i].time;
        // let tt = time.split(" ");
        // var dt = new Date(time);
       
        

        // c7.innerText =timeText;


        let c8 = document.createElement("td");
        
       

        let btn = document.createElement("button");

        btn.setAttribute("class","reservation-visit-button");
        btn.setAttribute("id",reservations[i].id);
        // btn.innerHTML = `
        //  <a href="../detail/?adventure=${reservations[i].adventure}">View Adventure</a>
        // res[i].id
        //href
        // `;
       
        
        let link = document.createElement("a");
        // let l = "../detail/?adventure="+ reservations[i].adventure;
        
        link.setAttribute("href","../detail/?adventure="+ reservations[i].adventure);

        link.innerText = "View Adventure";

        btn.appendChild(link);

        c8.appendChild(btn);
        // r1.appendChild(c1);
        // r1.appendChild(c2);
        // r1.appendChild(c3);
        // r1.appendChild(c4);
        // r1.appendChild(c5);
        // r1.appendChild(c6);
        // r1.appendChild(c7);
        r1.appendChild(c8);
        r.appendChild(r1);








      }
    }


}

export { fetchReservations, addReservationToTable };
