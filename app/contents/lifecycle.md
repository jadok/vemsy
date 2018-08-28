# Life Cycle

## Loading

### Init Template

Initialize the template (markdown)

### Load Configuration

Load all the configuration files

### Load Theme

Load the theme used precised by the configuration

_____________________


## Resolving Routes

The template (markdown) is resolved before the other trigger.
There is actually no cache on it, it will resolve again the route looking for the corresponding .md file anytime the route is called.

### Load all the pages of the theme

### Load stylesheets of the page

Load only stylesheets needed for the page

### Load template of the page

Load only template (twig)

### Page resolved

An event should be fired when the page is resolved
