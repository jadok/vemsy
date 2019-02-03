# Routing file

This express middleware from the path it convert it the supposed path in the content folder.
This express middleware is the first one so it ìnit the variables:

- `req.variables`: thoses variables will be available in the template.
- `req.hidden_variables`: those variables will not be available in the template (Ex: loaded pages are not available for rendering.)
