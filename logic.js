/* Javascript for project 3 */

const data_json = "Shark_AttacksDB.Events.json";

d3.json(data_json, function(data) {
  console.log("data", data);
});

function dropdown() {
    let dropdownMenu = d3.select("#selDataset");
    
    d3.json(api_url).then((data) => {
    let sampleNames = data.names;

    for (let i = 0; i < sampleNames.length; i++){
      dropdownMenu
        .append("option")
        .text(sampleNames[i])
        .property("value", sampleNames[i]);
    };
  });
}