import { processRequest } from "@src/examples/test-utils/process-request"

test("Create Article", () => {
  // Test preparation
  
  const reqMethod = "POST"
  const path = "articles"
  const expectedStatus = 200
  
  const reqBody = 
    {
      "article": {
        "title": "How to train your dragon",
        "description": "Ever wonder how?",
        "body": "Very carefully.",
        "tagList": [
          "training",
          "dragons"
        ]
      }
    }
  
  // This call sends the request to the target endpoint, asserts the expected response code,
  // and transforms the response body if required.
  const resBody = processRequest(path, reqMethod, reqBody, expectedStatus)
  
  // Assertions

  expect(1).toBe(1)
  
  // var responseJSON = JSON.parse(responseBody);
  //
  // tests['Response contains "article" property'] = responseJSON.hasOwnProperty('article');
  //
  // var article = responseJSON.article || {};
  //
  // tests['Article has "title" property'] = article.hasOwnProperty('title');
  // tests['Article has "slug" property'] = article.hasOwnProperty('slug');
  // pm.globals.set('slug', article.slug);
  //
  // tests['Article has "body" property'] = article.hasOwnProperty('body');
  // tests['Article has "createdAt" property'] = article.hasOwnProperty('createdAt');
  // tests['Article\'s "createdAt" property is an ISO 8601 timestamp'] = /^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/.test(article.createdAt);
  // tests['Article has "updatedAt" property'] = article.hasOwnProperty('updatedAt');
  // tests['Article\'s "updatedAt" property is an ISO 8601 timestamp'] = /^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/.test(article.updatedAt);
  // tests['Article has "description" property'] = article.hasOwnProperty('description');
  // tests['Article has "tagList" property'] = article.hasOwnProperty('tagList');
  // tests['Article\'s "tagList" property is an Array'] = Array.isArray(article.tagList);
  // tests['Article has "author" property'] = article.hasOwnProperty('author');
  // tests['Article has "favorited" property'] = article.hasOwnProperty('favorited');
  // tests['Article has "favoritesCount" property'] = article.hasOwnProperty('favoritesCount');
  // tests['favoritesCount is an integer'] = Number.isInteger(article.favoritesCount);
  
})
