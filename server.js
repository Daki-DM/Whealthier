const express = require("express");
const path = require("path");
const cors = require("cors");
const axios = require('axios');
const parseXML = require('xml2js').parseString;

const app = express();

// different mealType for different number of meals
const mealTypes = {
  'three': ['Breakfast', 'Lunch', 'Dinner'],
  'four': ['Breakfast', 'Lunch', 'Tea', 'Dinner'],
  'five': ['Breakfast Snack', 'Breakfast', 'Lunch', 'Afternoon Snack', 'Dinner']
};

const appKey = '3d52e4c7c6250b71a5430ed7671efc38';
const appId = '6e36b208';

app.use(cors());
app.use(express.json());

app.use("/src", express.static(path.resolve(__dirname, "src")));
app.use("/build", express.static(path.resolve(__dirname, "build")));

const renderHTML = (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
};

/*
 * What: Generates a query string
 * Why: for api request
 * @param data: object
 * @param id: string
 * @param key: string
 * @return queries: Array<string>
 **/
const generateQueryString = (data, id, key) => {
  let healthLabels = '';
  if (data.healthPreferences) {
    for (let healthLabel of data.healthPreferences) {
      healthLabels += `&health=${healthLabel}`;
    }
  }
  let noOfMeals = mealTypes[data.mealCount].length;
  let calories = data.calories / noOfMeals;
  let queries = [];
  for (let i = 0; i < noOfMeals; i++) {
    let queryParam = mealTypes[data.mealCount][i];
    let query = `q=${queryParam}&app_id=${id}&app_key=${key}&diet=${data.diet}${healthLabels}&calories=${Math.round(calories)-200}-${Math.round(calories)}&random=true`;
		queries.push(query);
  }
  return queries;
};

/*
 * What: fetch data from api
 * Why: for generating diet plan
 * @param data: object
 * @return result: Array<Promise>
 **/
const getPlan = (data) => {
  let result = [];
  let promises = [];
  let queries = generateQueryString(data, appId, appKey);
  for(const q of queries) {
    let url = `https://api.edamam.com/api/recipes/v2?type=public&${q}`;
    promises.push(
      axios.get(url)
        .then(res => {
          result.push(res.data.hits);
        })
        .catch(err => {
          console.log(err);
        })
    );
  }
  
  return Promise.all(promises).then(() => {
    return result;
  });
};

// endpoint for all static files
app.get("/*", renderHTML);
// endpoint for getting diet plan
app.post("/api/getPlan", (req, res) => {
  getPlan(req.body).then(result => {
    res.send(result);
  });
});
// endpoint for getting info on diseases
app.post("/api/getDiseaseInfo", (req, response) => {
  axios.get(`https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term=title:${req.body.query}`)
    .then(res => {
      parseXML(res.data, (err, _res) => {
        if(
          (_res.nlmSearchResult.list) &&
          (_res.nlmSearchResult.list[0]) &&
          (_res.nlmSearchResult.list[0].document) &&
          (_res.nlmSearchResult.list[0].document[0]) &&
          (_res.nlmSearchResult.list[0].document[0].content)
        ) {
          _res.nlmSearchResult.list[0].document[0].content.forEach(v => {
            if(v['$'].name === 'FullSummary') {
              response.send(v);
            }
          });
        } else {
          response.status(404);
          response.send({ reply: 'Unable to get information on the given query :/' });
        }
      });
    })
    .catch(err => console.error(err));
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));
