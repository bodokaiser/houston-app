# Houston App

Houston connects your lab equipment.

## Usage

Install node dependencies with

    npm install

then build the front end files with

    RESOURCE=http://localhost:8000 npm run build

this will use `localhost:8000` as url for HTTP requests.

Finally all frontend files can be found in the `dist` folder.

## Development

For development you can run

    npm run serve

which will start a development server supporting hot module replacement
which means that you can edit code located under `src` and observe changes
directly in your browser without the need for a manual refresh.
