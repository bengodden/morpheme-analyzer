"use strict";

const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({ node: "http://localhost:9200/" });
// const { Client } = require('@elastic/elasticsearch')
// const client = new Client({ node: 'http://localhost:9200/' })

//Create and index with name: indexName

let index = "testdelete";
let morpheme = "google";
let definition = "This is a definition";


async function indexMorpheme(index, morpheme, definition) {
  return await client.index({
    index: index,
    type: 'morpheme',
    body: {
      morpheme: morpheme,
      definition: definition,
    },
  });
}

async function searchTerm(index, query) {
  const response = await client.search({
    index: index,
    body: {
      query: {
        match: {
          roman: query,
        },
      },
    },
  });
  console.log(response.hits.hits);
  return response.hits.hits;
}

// export default { search }

// indexMorpheme(index, morpheme, definition)
searchTerm(index, morpheme);
