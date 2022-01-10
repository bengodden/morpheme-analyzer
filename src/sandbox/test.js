'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

async function run () {
  // Let's start by indexing some data
//   await client.index({
//     index: 'game-of-thrones',
//     body: {
//       character: 'Ned Stark',
//       quote: 'Winter is coming.'
//     }
//   })

//   await client.index({
//     index: 'game-of-thrones',
//     body: {
//       character: 'Daenerys Targaryen',
//       quote: 'I am the blood of the dragon.'
//     }
//   })

//   await client.index({
//     index: 'game-of-thrones',
//     // here we are forcing an index refresh,
//     // otherwise we will not get any result
//     // in the consequent search
//     refresh: true,
//     body: {
//       character: 'Tyrion Lannister',
//       quote: 'A mind needs books like a sword needs a whetstone.'
//     }
//   })

  // Let's search!
  const { body } = await client.search({
    index: 'words',
    body: {
      query: {
        match: {
          roman: 'mîna'
        }
      }
    }
  })

  console.log(body.hits.hits)
}

run().catch(console.log)


for (const [ id, value] of Object.entries(response)) {
  const tempObj={ id : {'morpheme': value.morpheme, 'definition': value.definition}}
  this.morphemeList.push(tempObj)
  console.log(this.morphemeList)
}

listMorphemes() {
      console.log(`listmorphemes() called on ${this.currentindex}`)
      stretchy
        .wholeIndex(this.currentindex)
        .then((response) => {
          console.log(`stretchy returned ${response.length} results. morphemeList is currently ${this.morphemeList.length} long`)
          let difference = response.filter(({'id':id1})=> !this.morphemeList.some(({ 'id': id2}) => id2 === id1))
          difference.forEach(x => {
            console.log(`difference: ${x.morpheme}`)
            this.morphemeList.push(x)
          })
          console.log(`difference is ${difference.length} long`)
          console.log(`morphemeList is now: ${this.morphemeList.length} long`)
        })
        .catch((error) => {
          console.error(error);
        });
    },