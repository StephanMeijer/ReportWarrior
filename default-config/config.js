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
