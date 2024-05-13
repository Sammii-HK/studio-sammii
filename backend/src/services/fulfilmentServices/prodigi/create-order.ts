export type ProdigiOrder = {
  "shippingMethod": string
  "recipient": {
      "address": {
          "line1": string
          "line2": string
          "postalOrZipCode": string
          "countryCode": string
          "townOrCity": string
          "stateOrCounty": string
      },
      "name": string
      "email": string
  },
  "items": {
          "sku": string
          "copies": number,
          "sizing": string
          "assets": {
                  "printArea": string
                  "url": string
          }[]
    
      }[]
}

export const createOrder = async (prodigiOrder: ProdigiOrder) => {
  const reqHeaders = new Headers();
  reqHeaders.set("Cache-Control", "max-age=604800")
  reqHeaders.set("X-API-Key", process.env.PRODIGI_API_KEY!)
  reqHeaders.set("Content-Type", "application/json")

  const options = {
    headers: reqHeaders,
    method: 'POST',
    body: JSON.stringify(prodigiOrder),
  };

  const url = `https://api.sandbox.prodigi.com/v4.0/Orders`

  const req = new Request(url, options);

  const response = await fetch(req);

  const responseJSON = await response.json()

  console.dir({responseJSON}, {depth: 20});

  return responseJSON;
};
