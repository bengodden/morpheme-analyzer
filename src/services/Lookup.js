//Derpeciated - moved this to stretchy.js

"use strict";

const elasticsearch = require("elasticsearch");
const client = new elasticsearch.Client({ node: "http://localhost:9200/" });
// const { Client } = require('@elastic/elasticsearch')
// const client = new Client({ node: 'http://localhost:9200/' })

async function search(query) {
  console.log(`inside Lookup.js query: ${query}`);
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

export default { search };
