"use strict";
const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({ node: "http://localhost:9200/" });
// const { Client } = require('@elastic/elasticsearch')
// const client = new Client({ node: 'http://localhost:9200/' })

async function indexMorpheme(index, morpheme, definition) {
  return await client.index({
    index: index,
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
  await client.indices.refresh({index})
  const response = await client.search({
    index: index,
    size: 200,
  })
  const returnArray =[]
  response.hits.hits.forEach(element => {
    returnArray.push ({
      "id": element._id,
      "morpheme": element['_source']['morpheme'],
      "definition": element['_source']['definition']
    })
  })
  console.log(`Stretchy: returning response of ${returnArray.length} elements`)
  return returnArray;
}

async function createIndex(indexName) {
  let indexLowered = indexName.toLowerCase();
  return await client.indices.create({
    index: indexLowered,
  });
}

export default { searchTerm, indexMorpheme, createIndex, wholeIndex };

// wholeIndex('morphemes')
