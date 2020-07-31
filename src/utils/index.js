import fs from 'fs';

export const readPlacesFromMock = () => {
  const { results } = JSON.parse(
    fs.readFileSync('./src/__mocks__/nearby.json').toString()
  );
  return results;
};
