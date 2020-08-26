# ReportWarrior

Tooling to create reports from TaskWarrior using Mozilla Nunjucks.

## Installation

```bash
# npm install -g reportwarrior
```

## Usage

First usage will install configuration in ~/.reportwarrior.

```bash
$ task export | reportwarrior -f basic
$ task export | reportwarrior --flow clientAbc
```

## Configuration

In the configuration, as seen as below, there are options to create your own titles, recipients and use specific templates per flow. In the configuration, you could even define `momentjs`-filters for Mozilla Nunjucks or use `momentjs` in your configuration. To do that, first run `npm init && npm install --save moment` in your `~/.reportwarrior`-directory.

On the moment, attributes `$.flows[*].recipients` and `$.flows[*].title` are not being used, because there isn't any email-support yet.

```js
const os = require('os');
const path = require('path');

module.exports = {
    registerFilters: (njk) => {
        njk.addFilter('priority', p => ({ 'H': 'High', 'M': 'Medium', 'L': 'Low' })[p])
    },
    paths: {
	templates: path.resolve(os.homedir(), '.reportwarrior/templates')
    },
    flows: {
        basic: {
            template: "basic.html.njk",
            recipients: [ 'HelloThere@example.com' ],
            title: "[UPDATE] Basic Todo-list"
        },
    }
}
```

## Templates

Templates are using [Mozilla Nunjucks](https://mozilla.github.io/nunjucks/). You can register new Filters in the configuration file.
