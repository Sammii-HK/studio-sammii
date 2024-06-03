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

const url = process.env.PRODIGI_API_PATH

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


  const req = new Request(url, options);
  const response = await fetch(req);
  const responseJSON = await response.json()

  console.dir({responseJSON}, {depth: 20});
  return responseJSON;
};

export const cancelOrder = async (orderId: string) => {
  const reqHeaders = new Headers();
  reqHeaders.set("Cache-Control", "max-age=604800")
  reqHeaders.set("X-API-Key", process.env.PRODIGI_API_KEY!)
  reqHeaders.set("Content-Type", "application/json")

  const options = {
    headers: reqHeaders,
    method: 'POST',
  };

  const prodigiCancelOrder = `${url}/${orderId}/actions/cancel`

  const req = new Request(prodigiCancelOrder, options);
  const response = await fetch(req);
  const responseJSON = await response.json()

  console.log("responseJSON", responseJSON);
  console.dir({responseJSON}, {depth: 20});

  return responseJSON;
};
