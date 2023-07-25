/* Javascript for project 3 */

const data_json = "Shark_AttacksDB.Events.json";

d3.json(data_json).then(function(data){
  console.log("data:", data);
});

//d3.selectAll("#selyear").on("change", dropdown_year);
//d3.selectAll("#selcountry").on("change", dropdown_country);
//d3.selectAll("#seltype").on("change", dropdown_type);
//d3.selectAll("#selfatal").on("change", dropdown_fatal);

function removeDepulicates(arr) {
  let output = Array.from(new Set(arr))
  return output
}

function dropdown_year() {
    let dropdownMenu = d3.select("#selyear");

    d3.json(data_json).then((data) => {
    let years = [];

    for (let i = 0; i < data.length; i++){
      years.push(data[i].Year);
    };

    years = removeDepulicates(years);
    //console.log("years: ", years);

    for (let i = 0; i < years.length; i++){
      dropdownMenu
        .append("option")
        .text(years[i])
        .property("value", years[i]);
    };
  });
}
function dropdown_country() {
  let dropdownMenu = d3.select("#selcountry");

  d3.json(data_json).then((data) => {
  let countries = [];

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
  let type = [];

  for (let i = 0; i < data.length; i++){
   type.push(data[i].Type);
  };

  type = removeDepulicates(type);
  console.log("type: ", type);

  for (let i = 0; i < type.length; i++){
    dropdownMenu
      .append("option")
      .text(type[i])
      .property("value", type[i]);
  };
});
}
function dropdown_fatal() {
  let dropdownMenu = d3.select("#selfatal");
  
  let fatal = ["Y", "N"];

  for (let i = 0; i < fatal.length; i++){
    dropdownMenu
      .append("option")
      .text(fatal[i])
      .property("value", fatal[i]);
  };
}

dropdown_year();
dropdown_country();
dropdown_type();
dropdown_fatal();