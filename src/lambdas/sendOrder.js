import fetch from 'node-fetch';
const {API_TOKEN, API_URL} = process.env;

const header = {
  'x-api-key': API_TOKEN,
  'Content-Type': 'application/x-www-form-urlencoded',
}

const checkStatus = (res) => {
  if (res.ok) {
    return res.json()
  } else {
    throw new Error(res.statusText)
  }
}

export const handler = async function(event, context, callback) {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      headers: header,
      method: 'POST'
    });
    const data = await checkStatus(response)

    callback(null, {
      statusCode: 200,
      headers: { 'Content-type': 'application/json'},
      body: JSON.stringify(data)
    })
  } catch (error) {
    callback(error)
  }
}