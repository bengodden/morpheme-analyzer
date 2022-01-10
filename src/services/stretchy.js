"use strict";
const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({ node: "http://localhost:9200/" });
// const { Client } = require('@elastic/elasticsearch')
// const client = new Client({ node: 'http://localhost:9200/' })

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

async function searchTerm(index, category, term) {
  const response = await client.search({
    index: index,
    body: {
      query: {
        match: {
          [category]: term,
        },
      },
    },
  });
  console.log(response.hits.hits);
  return response.hits.hits;
}

async function wholeIndex(index) {
  const response = await client.search({
    index: index,
    size: 200 });
  // console.log(response.hits.hits);
  return response.hits.hits;
}


async function createIndex(indexName) {
  let indexLowered = indexName.toLowerCase();
  return await client.indices.create({
    index: indexLowered,
  });
}

export default { searchTerm, indexMorpheme, createIndex, wholeIndex };
