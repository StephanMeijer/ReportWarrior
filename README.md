# ReportWarrior

Tooling to create reports from TaskWarrior using Mozilla Nunjucks. This tool is ofcourse not limited to HTML. You can generate Markdown reports as well.

## Installation

```bash
$ npm install -g reportwarrior
```

## Usage

First usage will install configuration in ~/.reportwarrior.

```bash
$ task export | reportwarrior -f basic
$ task export | reportwarrior --flow clientAbc
```

## Example output:

```html
<h2>
   <span style="font-weight: bold;background-color: orange;">&nbsp;Pending&nbsp;</span>
   <span>&nbsp;<i>HASS: program Volume control, from Audiolab M-DAC to TV</i></span>
</h2>
<table>
   <tr>
      <th>Priority</th>
      <td>Low</td>
   </tr>
</table>
<small>Task ref bfafac85-84d5-47ab-9d11-0db61c6fd57c</small>
<hr/>
<h2>
   <span style="font-weight: bold;background-color: orange;">&nbsp;Pending&nbsp;</span>
   <span>&nbsp;<i>Buy bookshelves</i></span>
</h2>
<table>
   <tr>
      <th>Priority</th>
      <td>Medium</td>
   </tr>
</table>
<small>Task ref 55713ae1-9d75-48e9-ae28-800da70a4447</small>
<hr/>
<h2>
   <span style="font-weight: bold;background-color: orange;">&nbsp;Pending&nbsp;</span>
   <span>&nbsp;<i>HASS: Add TV to HomeAssistant</i></span>
</h2>
<table>
   <tr>
      <th>Priority</th>
      <td>Low</td>
   </tr>
</table>
<small>Task ref 4a04082b-af4c-46e3-a9b6-c981243cd654</small>
<hr/>
```

## Configuration

In the configuration, as seen as below, there are options to create your own titles, recipients and use specific templates per flow. In the configuration, you could even define `momentjs`-filters for Mozilla Nunjucks or use `momentjs` in your configuration. To do that, first run `npm init && npm install --save moment` in your `~/.reportwarrior`-directory.

```js
const os = require('os');
const path = require('path');

module.exports = {
    registerFilters: (njk) => {
        njk.addFilter('priority', p => ({ 'H': 'High', 'M': 'Medium', 'L': 'Low' })[p])
    },
    paths: { templates: path.resolve(os.homedir(), '.reportwarrior/templates') },
    flows: {
        basic: { template: "basic.html.njk" },
        email: { template: "email.html.njk" },
    }
}
```

## Templates

Templates are using [Mozilla Nunjucks](https://mozilla.github.io/nunjucks/). You can register new Filters in the configuration file.

## Use with email

### IMAP

Taskwarrior can easily be used in combination with IMAP. I personally use this to create a Draft on the remote server, to be able to check it and send it later on. You can even make a cronjob out of it.

```bash
$ TMP=$(mktemp); task export | reportwarrior -f email > $TMP && curl --url "imaps://imap.gmail.com:993/%5BGmail%5D%2FDrafts" --user "user@gmail.com:password" -T $TMP && rm $TMP
```

In this example, please replace the URL, TaskWarrior filters, username and password appropriately. You can replace the encoded suffix `[Gmail]Drafts` with any you want. For a IMAP representation of labels:

```bash
$ curl --url "imaps://imap.gmail.com:993/" --user "user@gmail.com:password"
```

In Gmail, you can easily create new labels. Those are usable by IMAP clients such as cURL.

### SMTP

To be documented.
