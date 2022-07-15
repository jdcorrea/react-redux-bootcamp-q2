const fetch = require('node-fetch');

const handler = async function(event, context) {
  const header = {
    'Authorization': 'Token ' + process.env.REACT_APP_SERVER_API_TOKEN,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  let response;

  console.log('ticky', 'm', process.env.API)
  try {
    response = await fetch(process.env.REACT_APP_SERVER_API_URL, {
      headers: header,
      method: 'GET'
    })
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({
        error: error.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response
    })
  }
}

module.exports = {handler}