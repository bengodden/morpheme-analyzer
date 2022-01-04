"use strict";
const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({ node: "http://localhost:9200/" });
// const { Client } = require('@elastic/elasticsearch')
// const client = new Client({ node: 'http://localhost:9200/' })

async function searchTerm(query) {
  const response = await client.search({
    index: "words",
    body: {
      query: {
        match: {
          roman: query,
        },
      },
    },
  });
  return response.hits.hits;
}

async function createIndex(indexName) {
  let indexLowered = indexName.toLowerCase();
  return await client.indices.create({
    index: indexLowered,
  });
}

export default { searchTerm, createIndex };
