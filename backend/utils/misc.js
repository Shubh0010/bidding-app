const PARSE_JSON = (data) => {

  let result = data;

  try {
    
    result = JSON.parse(data);

  } catch (error) {}

  return result;
}

module.exports = {
  PARSE_JSON
}