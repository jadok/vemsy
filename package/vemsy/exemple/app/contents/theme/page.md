# Page

Page are part of the core functionalities offered by `vemsy`

The page are located in the `app/themes/my_theme_name/pages`.
A page is used to associate a template (twig) and styles to a route.

All the pages are loaded in the theme, when the page will be resolved, the theme will be looking for all the page matching the route defined in the page.

## Definition

A page define:

- a style through [StyleInterpreter](https://github.com/jadok/vemsy/blob/master/core/interpreters/style.ts)
- a template through [TemplateInterpreter](https://github.com/jadok/vemsy/blob/master/core/interpreters/template.ts)
- a generalStyle

Go [here](/#Style) for more information about how the style is resolved.

## Example

Let say we defined 3 pages:

- one for the route '/theme'
- another one for the route '/'
- last one for the route '/last

### Page resolution

#### Use case

Now, a user go to the [path](http://localhost:9999/theme/page).
The theme will look for all pages matching it [here the implementation of it](https://github.com/jadok/vemsy/blob/master/core/utils/route-like-page.ts).
In this example, pages matching this paths are: '/them' and '/'

The page with the route '/' may precise a style and a template.

The page with the route '/theme' is more precise, if a template is defined, it will override the one defined by the page '/'.

##### Style

The style does not work like that, by default you have the style of all the matching pages route.
If you define a globalstyle you will **ignore** the style defined in the matching pages route with a lower strictness then you.

In this exemple, it means that if you defined a global style on the page with the route '/theme', **the style from the page '/' will be ignore**

This allow you to have a custom style defined for each page and the possibility to aim for 100% stylesheet rules used on each page.
