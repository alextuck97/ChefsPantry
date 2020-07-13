/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


import queryRecipe from '../Screens/HomeScreen/Requests';

it('renders correctly', () => {
  renderer.create(<App />);
});




//Test querying api
describe('requests.js', () => {
  it('given a list of ingredients queries the api and returns a list of recipes', () => {
    fetch.mockResponseOnce(JSON.stringify([{"recipe" : "yummy pork chops"}]));

    expect(queryRecipe(["yellow onion"]).then((result) =>
      result.length)).resolves.toBe(1);
  })

})
