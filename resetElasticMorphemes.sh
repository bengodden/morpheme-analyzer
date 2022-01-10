#!/bin/bash

curl -X DELETE "localhost:9200/morphemes?pretty"
#post payi morpheme to 'morphemes' index
curl -X POST "localhost:9200/morphemes/_doc?pretty" -H 'Content-Type: application/json' -d'
{
  "morpheme": "payi",
  "definition": "automatic; without SAP volition"
}'

#post 'h' morpheme to 'morphemes' index

curl -X POST "localhost:9200/morphemes/_doc?pretty" -H 'Content-Type: application/json' -d'
{
  "morpheme": "h",
  "definition": "causative"
}'