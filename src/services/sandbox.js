'use strict'

const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({ node: 'http://localhost:9200/' })
// const { Client } = require('@elastic/elasticsearch')
// const client = new Client({ node: 'http://localhost:9200/' })

//Create and index with name: indexName


let index='testdelete'
let term = 'mīna'
let definition = 'This is a definition'


async function addToIndex(term, index, definition){
    return await client.index({
      index: index,
      body: {
        roman: term,
        definition: definition
      }
    });
  }


  async function searchTerm(query) {
    const response = await client.search({
      index: index,
      body: {
        query: {
          match: { 
            roman: query 
          }
        }
      }
    })
    console.log(response.hits.hits)
    return response.hits.hits
  
  }

  
// export default { search }

// addToIndex()
searchTerm(term)