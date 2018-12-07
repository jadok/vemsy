# View

The view engine is defined as a configuration of the [theme](./theme.md) used.

In your [config file](../configs/files.ts), you can change the `theme_view` to change the view used.
That view must be implemented in the view factory:

- add a new view engine inheriting [View (IDE link)](../../../../core/view/view.ts)
- add the view in the [View factory (IDE link)](../../../../core/view/factory.ts)

The view template are located in your theme in the views folder ([Exemple](../themes/black/views/root.html.twig))

## View engines supported

- Twig
