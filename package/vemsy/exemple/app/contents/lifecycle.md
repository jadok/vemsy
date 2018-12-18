# Life Cycle

It will describe the life cycle of the project at the **bootstrap** and **when resolving a request**.

## Bootstrap

### Load Configuration

Load all the configuration files.

### Define public path

Define in express the public path folder (listed in the configuration files).

### Define the Template

Define markdown as the first content middleware.

### Load Theme

Load the theme used precised by the configuration

#### Define view engine

Define the view engine (twig).

#### Load the pages

Find all the pages defined in the theme.
Load all of those pages.

#### Compile styles

Retrieve all the style files defined in those pages, compile it and generate it in the public folder.
_____________________

## Resolving Routes

### content route resolving

The content middle (markdown) is resolved before the other triggers.
There is actually no cache on it, it will resolve again the route looking for the corresponding .md file anytime the route is called.

Markdown content is added to the request through the middleware.

### Matched pages

Find the page matching the route.
**The pages have an inheritance through route.**

### style files of the route

Resolve the route inheritance of the page.

### template variables

All the variables are added to the request in the `req.variables`.

### render template

Render the page template defined for the most matching route `Page`.
the `req.variables` are send to the template as variables that might be used in the template file (_Ex: twig_).
