/* Javascript for project 3 */
//constant/static values
const data_json = "Shark_AttacksDB.Events.json";
const geo_json = "Project3.LocationDB.json";
const dropdowns = document.querySelectorAll('select');
const activityBins = ["Swimming", "Walking","Standing","Boating", "Fishing", "Surfing", "Playing", "Floating", "Kayaking","Shark"];
const typeBins = ["Unprovoked", "Provoked"];
const ctx = document.getElementById('visual2').getContext('2d');

//constant variables for map1//
const marker_id = "1";
var mapMarkers = [];
const map = L.map("visual1", {
  center: [40.752895, -101.010851],
  zoom: 4

});

//*map with color
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
//**************************//
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
    map1(values);
    graph1(values);
  });
});

//the init function
function init() {

  const values = getValues();
  console.log("current values:", values);
  map1(values);
  graph1(values);
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

/*function organizeActivities() {
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
};   */

function map1(values) {

  d3.json(geo_json).then((data) => {

    let filteredData = filterData(values, data);

    if (mapMarkers.length > 0) {
      for(var i = 0; i < mapMarkers.length; i++){
        map.removeLayer(mapMarkers[i]);
      }
    };

    filteredData.forEach(feature => {
    
    // Customize the marker appearance based on the earthquake magnitude
    /*var marker = L.circleMarker([feature.Lat, feature.Lng], {
      //radius: mag * 5,
      fillColor: "red",
      color: 'white',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7,
    }).addTo(map);*/
    
    var sharkIcon = L.icon({
      iconUrl: 'https://static.thenounproject.com/png/1220701-200.png',
  
      iconSize:     [35, 35], // size of the icon
      iconAnchor:   [22, 34], // point of the icon which will correspond to marker's location
      popupAnchor:  [-1, -20] // point from which the popup should open relative to the iconAnchor
  });
    var marker = L.marker([feature.Lat, feature.Lng],
    {icon: sharkIcon}).addTo(map);
    this.mapMarkers.push(marker);
    marker.bindPopup(`<b>Date:</b> ${feature.Date}
      <br><b>Location:</b> ${feature.Location}
      <br><b>Country:</b> ${feature.Country}
      <br><b>Type of Attack:</b> ${feature.Type}
      <br><b>Activity When Attacked:</b> ${feature.Activity}
      <br><b>Injury:</b> ${feature.Injury}
      <br><b>Fatal:</b> ${feature.Fatal}
      <br><b>More Info:</b> ${feature["href formula"]}
      <br>`);
});

  if(filteredData.length == 0) {
    alert("No data with current parameters");
  }
  });
  };

function graph1(values) {

  d3.json(geo_json).then((data) => {
  let filteredData = filterData(values, data);
  let dates = [];
  for (i=0; i < filteredData.length; i++) {
    dates.push(filteredData[i].Date);
  };
  dates.sort();

  var trace = {
    x: dates,
    type: 'histogram',
  };
  var layout = {
    title: {
      text:'Frequency of Attacks by Date',
      y: 0.95
    },
    xaxis: {
      title: {
        text: 'Date of Attack',
        y: 1
      },
    },
    yaxis: {
      title: {
        text: 'Frequency',
      }
    },
    margin: {
      t: 30,
      b: 100
    },
    pad: {
      b: 20
    }
  };


  var dataTrace = [trace];
  Plotly.newPlot('visual3', dataTrace, layout);
  });
}

function graph2(values) {

  d3.json(geo_json).then((data) => {
    let filteredData = filterData(values, data);

    let activities = [];
    for (i=0; i < filteredData.length; i++) {
      activities.push(filteredData[i].Activity);
    };
    activities.sort();

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: activityBins,
        datasets: [{
          label: 'Activities',
          data: filteredData.Activity,
          backgroundColor: 'green',
        }]
      },
      options: {
        scales: {
          xAxes: [{
            display: false,
            barPercentage: 1.3,
            ticks: {
              max: 3,
            }
          }, {
            display: true,
            ticks: {
              autoSkip: false,
              max: 4,
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  });
};
/*
function createMarkers(values) {

  d3.json(geo_json).then((data) => {
    ///console.log("data: ", data[0].Year);
    let filteredData = filterData(values, data);
    console.log("filteredData in createmarkers: ", filteredData);

    filteredData.forEach(feature => {
    
    // Customize the marker appearance based on the earthquake magnitude
    var marker = L.circleMarker([feature.Lat, feature.Lng], {
      //radius: mag * 5,
      fillColor: "red",
      color: 'white',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.7,
    }).addTo(map);
    var sharkIcon = L.icon({
      iconUrl: 'https://static.thenounproject.com/png/1220701-200.png',
  
      iconSize:     [35, 35], // size of the icon
      iconAnchor:   [22, 34], // point of the icon which will correspond to marker's location
      popupAnchor:  [-1, -20] // point from which the popup should open relative to the iconAnchor
  });


    console.log("create marker");
    // If there is no marker with this id yet, instantiate a new one.
    var marker = new L.marker([feature.Lat, feature.Lng],
      {icon: sharkIcon}).addTo(map);

    marker.bindPopup(`Date: ${feature.Date}
      <br>Location: ${feature.Location}
      <br>Country: ${feature.Country}
      <br>`);



    });

});
};*/

function filterData(values, data) {
  let newData = data;
  
  if(values["selyear"] != "All") {
    newData = data.filter(filterYear);
  }
  if(values["selcountry"] != "All") {
    newData = newData.filter(filterCountry);
  }
  if(values["seltype"] != "All") {
    newData = gatherType(values, newData);
  }
  if(values["selact"] != "All") {
    newData = gatherAct(values, newData);
  }
  if(values["selfatal"] != "All") {
    newData = newData.filter(filterFatal);
  }

  return newData
};

function filterYear(events) {
  values = getValues();
  return events.Year == values["selyear"];
};

function filterCountry(events) {
  values = getValues();
  return events.Country == values["selcountry"];
};

/*function filterType(events) {
  values = getValues();
  return events.Type == values["seltype"];
};*/
/*
function filterAct(events) {
  values = getValues();
  acts = gatherAct(values);
  for(i=0; i < acts.length; i++){
    events = filterAct(acts[i]);
  };
  return events.Activity == values["selact"];
};*/

function filterFatal(events){
  values = getValues();
  return events.Fatal == values["selfatal"];
};

function gatherType(values, data){
  selType = values["seltype"];
  let filteredType = [];

  for(i=0; i<data.length; i++){
    type = data[i].Type;

    if(selType === "Other"){
      
      for (let j = 0; j < typeBins.length; j++){
        if (type.includes(typeBins[j])){
          break;
        } else if (j = 1) {
          filteredType.push(data[i]);
        } else {
          break;
        };
      };
    } else {
      if(type.includes(selType)) {
        filteredType.push(data[i]);
      };
    };
  };
  return filteredType;
};


function gatherAct(values, data) {
  const selAct = values["selact"];
  let filteredAct = [];
    //let activities = [];
  console.log("in gatherAct:", selAct);
    //get all events' activites in list
    /*for (let i = 0; i < data.length; i++){
      activities.push(data[i].Activity);
    };*/
  
  for (let i = 0; i < data.length; i++){
    eventact = data[i].Activity;
    
    if(selAct === "Unknown") {
      //find the activities that are undefined
      if(eventact === undefined){
        filteredAct.push(data[i]);
      }
      } else if (selAct != "Other") {
      //find activites by selact
      console.log("else if:", eventact)
        if(eventact === undefined){
        } else {
          if(eventact.includes(selAct.toLowerCase()) || eventact.includes(selAct)){
            console.log("includes");
            filteredAct.push(data[i]);
          }
        }
        
      } else {
        //selAct is "Other"
        for (let j = 0; j < activityBins.length; j++){
          if(eventact === undefined){
          }
          if (eventact.includes(activityBins[j])){
          } else if (j = 9) {
            filteredAct.push(data[i]);
          } else {
          };
        };
      };

    };
//return the filtered Data
return filteredAct;
};
init();
//organizeActivities();