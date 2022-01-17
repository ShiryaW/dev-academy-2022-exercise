# Farm data exercise
A simple web UI that displays data from different farms. The data can be filtered 
and sorted by date, value, or location.
The UI also generates charts showing temperature changes over time.

## Installation

#### With npm:
- install Java (version 8 or higher), nodeJS (v14+) and npm (v6) on your machine
- run `npm install` to install dependencies
- `npm start` to run the app on `http://localhost:3000`

#### Using the Docker image:
- install Docker, nodeJS (v14+) and npm (v6) on your machine
- run `npm install` to install dependencies
- `docker build -t {your-image-name} .` to build the Docker image for the backend
- (You can verify that the image has been built successfully with `docker images`)
- `docker run --rm -d --name server -p 8080:8080 {your-image-name}` to run the backend
- `npm run start-client` to run the frontend
- (When you're done, stop the server by running `docker stop server`)

## Testing

To run unit tests, use `npm run test-client`.

For E2E testcafe tests, first run the app with `npm start` and then run `npm run test-testcafe`.
By default this command uses Chrome. If you would like to run the tests in firefox,
run `npm run test-testcafe-firefox`.

Use `npm run lint-client` to run the linter.

## Known issues
- The temperature chart does not get generated until the second rerender for some reason
- Testcafe tests rely on specific data existing in specific cells (which works but would be 
better to avoid)

## Improvements I ran out of time for
- redraw the chart based on some user input e.g. show pH over time, rainfall over time
- add the ability for the user to specify a time range
- multiple charts for multiple metrics!
- make the chart(s) interactable e.g. with tooltips
- calculate average rainfall/pH/temperature (in a specified time range)

I wanted to do all of the above but did not because learning how to work with my chosen
data visualization library was too time-consuming and not my top priority in this exercise.

- Add a fakeAPI for when the client is being run without the server