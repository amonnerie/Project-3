/* Javascript for project 3 */
//constant/static values
const data_json = "Shark_AttacksDB.Events.json";
const dropdowns = document.querySelectorAll('select');
const activityBins = ["All", "Swimming", "Walking","Standing","Boating", "Fishing", "Surfing", "Playing", "Floating", "Kayaking","Shark Related Activites", "Other", "Unknown"];

//print the json data
/*d3.json(data_json).then(function(data){
  console.log("data:", data);
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

//the "main" function
function init() {

  const values = getValues();
  console.log("initial values:", values);
  
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

  return organized
};


//***helpful functions ended

//***create the dropdowns using data from json

function dropdown_year() {
    let dropdownMenu = d3.select("#selyear");

    d3.json(data_json).then((data) => {
    var years = [];

    for (let i = 0; i < data.length; i++){
      years.push(data[i].Year);
    };

    years = removeDepulicates(years);
    //console.log("years: ", years);

0
    for (let i = 0; i < years.length; i++){
      dropdownMenu
        .append("option")
        .text(years[i])
        .property("value", years[i]);
    };
    return years;
  });

}
function dropdown_country() {
  let dropdownMenu = d3.select("#selcountry");

  d3.json(data_json).then((data) => {
  var countries = [];

  for (let i = 0; i < data.length; i++){
    countries.push(data[i].Country);
  };

  countries = removeDepulicates(countries);
  //console.log("years: ", countries);

  for (let i = 0; i < countries.length; i++){
    dropdownMenu
      .append("option")
      .text(countries[i])
      .property("value", countries[i]);
  };
});
}
function dropdown_type() {
  let dropdownMenu = d3.select("#seltype");

  d3.json(data_json).then((data) => {
  var type = [];

  for (let i = 0; i < data.length; i++){
   type.push(data[i].Type);
  };

  type = removeDepulicates(type);
  //console.log("type: ", type);

  for (let i = 0; i < type.length; i++){
    dropdownMenu
      .append("option")
      .text(type[i])
      .property("value", type[i]);
    };
  });
}
function dropdown_act() {
  let dropdownMenu = d3.select("#selact");

  for (let i = 0; i < activityBins.length; i++){
    dropdownMenu
      .append("option")
      .text(activityBins[i])
      .property("value", activityBins[i]);
  };
}
function dropdown_fatal() {
  let dropdownMenu = d3.select("#selfatal");
  
  const fatal = ["All", "N", "Y"];

  for (let i = 0; i < fatal.length; i++){
    dropdownMenu
      .append("option")
      .text(fatal[i])
      .property("value", fatal[i]);
  };
}

//call the dropdown functions
//***create dropdowns ended
dropdown_year();
dropdown_country();
dropdown_type();
dropdown_act();
dropdown_fatal();
init();
organizeActivities();