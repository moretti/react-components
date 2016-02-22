import ReactQuerystringRouter from 'react-querystring-router';
import ComponentPlayground from 'react-component-playground';
import isEmpty from 'lodash/lang/isEmpty';

function getTitleForFixture(params) {
  let title = 'React Component Playground';

  // Set document title to the name of the selected fixture
  if (params.component && params.fixture) {
    title = params.component + ':' + params.fixture + ' – ' + title;
  }

  return title;
}

/**
  * This file holds the logic for aggregating all the component and fixture
  * paths from the drive for the Component Playground. It could easily be a
  * separate module, but since the file structure differs from project to
  * project, it's useful to be able to alter this file as needed.
  *
  * Output example:
  * {
  *   "SimpleButton": {
  *     "class": [ReactClass],
  *     "fixtures": {
  *       "disabled": {
  *         "disabled": true
  *       },
  *       "with-100-clicks": {
  *         "disabled": false,
  *         "state": {
  *           "clicks": 100
  *         }
  *       }
  *     }
  *   }
  * }
  */
function getComponentFixtureTree() {
  const requireComponent = require.context('COSMOS_COMPONENTS', true),
    isComponent = /^\.\/(.+)\.jsx?$/,
    components = {};

  requireComponent.keys().forEach(function(componentPath) {
    const match = componentPath.match(isComponent);
    if (!match) {
      return;
    }

    // Fixtures are grouped per component
    const componentName = match[1];
    components[componentName] = {
      class: requireComponent(componentPath),
      fixtures: getFixturesForComponent(componentName),
    };

    // Allow users to browse components before creating fixtures
    if (isEmpty(components[componentName].fixtures)) {
      components[componentName].fixtures['auto-empty'] = {};
    }
  });

  return components;
}

function getFixturesForComponent(componentName) {
  const requireFixture = require.context('COSMOS_FIXTURES', true),
    isFixtureOfComponent = new RegExp(`./${componentName}/([^/]+).js`),
    fixtures = {};

  requireFixture.keys().forEach(fixturePath => {
    const match = fixturePath.match(isFixtureOfComponent);
    if (match) {
      fixtures[match[1]] = requireFixture(fixturePath);
    }
  });

  return fixtures;
}

export default new ReactQuerystringRouter.Router({
  container: document.getElementById('root'),
  defaultProps: {
    components: getComponentFixtureTree(),
  },
  getComponentClass() {
    return ComponentPlayground;
  },
  onChange(params) {
    document.title = getTitleForFixture(params);
  },
});
