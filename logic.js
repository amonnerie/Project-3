/* Javascript for project 3 */
//constant/static values
const data_json = "Shark_AttacksDB.Events.json";
const geo_json = "Project3.LocationDB.json";
const dropdowns = document.querySelectorAll('select');
const activityBins = ["All", "Swimming", "Walking","Standing","Boating", "Fishing", "Surfing", "Playing", "Floating", "Kayaking","Shark Related Activites", "Other", "Unknown"];

//print the json data
/*d3.json(data_json).then(function(data){
  console.log("data:", data);
});*/
/*d3.json(geo_json).then((data) => {
    console.log(data)
  });*/

//create event listener in order to get 
//all values from dropdowns
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('change', () => {
    const values = getValues();
    console.log("current values:", values);

    //making maps and graphs here
  });
});

//the init function
function init() {

  const values = getValues();
  console.log("initial values:", values);
  map1();
};


//***helpful functions
function removeDepulicates(array) {
  let output = Array.from(new Set(array))
  return output
}

function getValues() {
  var dropdownValues = {};

  dropdowns.forEach(dropdown => {
    //get the id of each dropdown (ex: "selyear")
    const dropdownId = dropdown.id;

    //get value of each dropdown
    const selectedValue = dropdown.value;

    //create dict
    dropdownValues[dropdownId] = selectedValue;
  });

  return dropdownValues;
};


function organizeActivities() {
  var organized = {};

  d3.json(data_json).then((data) => {
    let activities = [];

    //collect case numbers
    let caseNumbers = [];

    for (let i = 0; i < data.length; i++){
      activities.push(data[i].Activity);
      caseNumbers.push(data[i]["Case Number"]);
      //NOTE: caseNumbers and activities should have the same length

    };

    for (let i = 0; i < activities.length; i++){
      for (let j = 1; j < activityBins.length; j++){
        eventact = activities[i];

        if(eventact === undefined) {
          organized[caseNumbers[i]] = "Unknown";
          break;
        }
        if(eventact.includes(activityBins[j])) {
          organized[caseNumbers[i]] = activityBins[j];
          break;
        }
      };
    };
    
  });
  console.log("organized", organized);
  return organized
};

function map1() {
  console.log("in map1");
  //const map = L.map('visual1').setView([40.752895, -101.010851], 3);
  const map = L.map("visual1", {
    center: [40.752895, -101.010851],
    zoom: 3
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
};

init();
organizeActivities();