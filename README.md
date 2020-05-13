### Goal
Goal of this appication is to provide boilerplate of master-detail image viewer.

### How to open application ?
https://images-eltrue-com.herokuapp.com

### How to run application in dev mode (server and client) ?
* `git clone https://github.com/staszekj/eltrue-images.git`
* `npm install`
* `npm run start:dev` (both: nodejs and react-scripts start)

Optionally:
* `npm run start:dev:srv` (nodejs in dev mode)
* `npm run start:dev:web` (react-scripts start)

### How to run unit tests ?
* `npm test`

### How to build application ?
* `npm install`
* `npm run build`

Optionally:
* `npm run build:web` (react-scripts start)
* `npm run build:srv` (nodejs in dev mode)

### How to locally run application in production mode?
* `npm run build`
* `npm start`

### What was implemented ?
* 600 image links are fetched from https://unsplash.com/ (with query: 'dog')
* application is implemented with strict type checking in TypeScript (client and server)
* simple nodejs app with search/delete/update endpoints
* example of unit test file `one-image-component.test.jsx`

#### master view
* downloading resized (small) images (maxHeight: 300px with aspect ratio)
* lazy loading of small images (downloading images which are in viewport only)
* debounce searching to reduce communication with nodejs server
* deleting image feature (on client and server side)

#### detailed view
* progressive loading of full image
* cancel loading of full images (while user fast clicking forward/backward buttons)
* picture details editing (client and server side)

### What was NOT implemented but IMHO is worth to implement
#### Improve user experiance
* scroll to element after switching from detail view to master view
* use http2 for downloading images (request multiplexing over a single TCP connection)
* use infinite scroll in master view
* virtual scrolling (restrict amount of dom elements for huge search result)

#### Improve code quality
* introduce ESLint/Prettier rules
* more unit tests
* end-2-end tests with Cypress or similar tool
