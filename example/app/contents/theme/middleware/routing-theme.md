# Routing theme

This express middleware finds the page matching the path. Those pages are stored in `req.hidden_variables.pages`.
This data is stored in `req.hidden_variables` instead of `req.variables` because the pages' class are not a data that should be used to the template.

_In this kind of case, another middleware should be used to format the data and fill `req.variables`_
_Ex: [render theme](./render-theme)_
