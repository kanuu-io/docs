# Subscription boilerplate (optional)

Most of the time, when adding billing to your application, all you need is a `Subscription` model attach to a `User` or a `Team` based on what entity you want to bill.

Therefore this package offers some useful stubs that you can publish to your application using the following command:

```sh
php artisan kanuu:publish
```

This will publish the following files in your application:
- A `Subscription` model.
- A `create_subscriptions_table` migration.
- A `SubscriptionFactory`.
- A `HasSubscription` trait to add to your billable entity (e.g. `User` or `Team`). By default it will be added to your `User` model.
- A `KanuuServiceProvider` implementing all the webhook listeners we need. It will also be registered in your `config/app.php` file.

Additionally, it will add the following routes to your `routes/web` file if they don't already exists:
- `Kanuu::redirectRoute()->name('kanuu.redirect')`.
- `Kanuu::webhookRoute()->name('webhooks.paddle')` — And it will add `'webhooks/*'` to the `$except` array of the `VerifyCsrfToken`.

By default, the subscription boilerplate will assume our billable entity is the `User` model. If you want to subscribe teams instead of users, you can provide the `--team` option to the `kanuu:publish` command.

```sh
php artisan kanuu:publish --team
```

Note that, with or without that option, you can always tweak the migration and the model to attach it to whatever model you want. This is just a boilerplate to get you started but don’t let that restrict your creativity.
