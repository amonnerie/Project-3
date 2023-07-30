# Project-3

If running the html file on your local machine: run this server in your terminal, python -m http.server, open your browser and type localhost:8000 in the search bar. Or you can click the link below to see the live website.

Live site: https://amonnerie.github.io/

Slide show: https://docs.google.com/presentation/d/1gfs2tz7EZUSOuCXncZnrhCpsof87c2eE5A7h_NQcSek/edit?usp=sharing

Files to review: logic.js, index.html, style.css. The remaining files are resources used in the code (images, datasets, etc)

The live, interactive site linked above was created using the Global Shark Attacks dataset from Kaggle (https://www.kaggle.com/datasets/teajay/global-shark-attacks).

The dataset included over 6,000 worldwide shark attack events. Using MongoDB, the data was filtered to only include events from Canada, USA, and Mexico which reduced the dataset to 507 events. The original data only included the location name and country, with no coordinates for latitude and longitude. Using a combination of the exported JSON data (with unwanted columns removed), Python, Jupyter Notebook, and the Open Weather Map API, the latitude and longitude coordinates were added to each event. Not all locations mapped to a latitude and longitude point so our dataset was reduced to 265 events.

Each visual on the website was created using a different JavaScript library. The map was created with Leaflet, the chart was created with DataTables, and the bar graph was created using Plotly. 

The end result is an interactive website where the user can select specific dropdowns to visualize the reported shark attacks. All three of the visuals (map, chart, bar graph) will update when the dropdowns are modified. 
