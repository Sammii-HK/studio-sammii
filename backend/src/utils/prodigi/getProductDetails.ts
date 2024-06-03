require('dotenv');

export const getProductDetails = async (sku: string) => {
  const reqHeaders = new Headers();
  reqHeaders.set("Cache-Control", "max-age=604800")
  reqHeaders.set("X-API-Key", process.env.PRODIGI_API_KEY!)
  reqHeaders.set("Content-Type", "application/json")

  const options = {
    headers: reqHeaders,
  };

  const url = `${process.env.PRODIGI_API_PATH}/${sku}`

  const req = new Request(url, options);

  const response = await fetch(req);

  const res = await response.json();
  return res.product
};
