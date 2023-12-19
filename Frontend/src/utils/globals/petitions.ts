export const getDataApiJSON = async (url: string, body: any) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
  const result = await response.json();
  return result;
};
