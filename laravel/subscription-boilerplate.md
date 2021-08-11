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
- `Kanuu::webhookRoute()->name('webhooks.paddle')` — And it will add `'webhooks/*'` to the `$except` array of the `VerifyCsrfToken` middleware.

By default, the subscription boilerplate will assume our billable entity is the `User` model. If you want to subscribe teams instead of users, you can provide the `--team` option to the `kanuu:publish` command.

```sh
php artisan kanuu:publish --team
```

Note that, with or without that option, you can always tweak the migration and the model to attach it to whatever model you want. This is just a boilerplate to get you started but don’t let that restrict your creativity.

## Summary using Paddle's webhooks

This page provides a quick checklist allowing you to add billing to your Laravel applications using Paddle's webhooks in 5 minutes. Let's go!

1. **Setup Paddle and Kanuu**. This requires no code. Follow these quick steps:
    - [1. Setup Paddle](../getting-started/setup-paddle)
    - [2. Setup Kanuu](../getting-started/setup-kanuu)

1. **Install the package**.
    ```sh
    composer require kanuu-io/kanuu-laravel
    ```

1. **Add some environment variables**. Add your Kanuu API key and your Paddle public key to your `.env` file. It should look like this:
    ```sh
    KANUU_API_KEY="sn71bn8tsZKY0oMtbqRqbnV4FYRCwRK21SVqcIfA"
    PADDLE_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----
    MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgFCTPPt2xm/rFTN2FAp9R4Lc3gzr
    SHkHj9BJp5JWcuFkJlvU/6BUHUTnidJPtf9P4MmqW+vF5Rcuabg7FhOiumytfQZg
    f7UTXYeZTh8/BFOub2LRdvM8rEr16I2smtFbHy0W2tSkPzTLnV8jFBdlbZ90wIWo
    ChAqYGhgexmc1ZOkt/oOC7F659hNlXSkVHhLjv4aN1jJ+Kqi/GK2mzxEmHiZATgR
    XKbWz/xxGrHZ705ibQu7NCZKNh97M9QSjU5Sc67/f/yA1zjSt+Cm2ZdEEHoqMiY0
    I61h/YSxrBUe7l/ABBYp6ETYjWFqmUzOYZcmuihQKkumrJi7dlI+s2mqrCK6A/Hq
    IVekLilKDo6jsnwLmkQwU/HKKL75wtQJVqxD7Qa0YoZ/7ifTdsaabOBxSx17ZdeO
    u9jHK47oDzAZT6cpzXRmsPwFibgMTUAy4LfE7SEHx+g6Qelc4KbiXjaEMsrqQI0t
    23qli1Z4RnAm1U3nnh1yIdlObgEECAFT2oXij13tPahTDOidbvo7X9vZpguyObuA
    OVHv+CAmSrxwEs0u8I1X65cUa0rU5nIxv1qTUUozcUfypx42b80BM5x7uFT54SR/
    TmFLWITRjm34jDE9BlfeqmFkIElcNmNOPEcpmzcOeyezUprZ1ZfXbPe3iw0HjjKb
    jmN/Z5OEgY3c9J87A9psTDAQABEAAQ==
    -----END PUBLIC KEY-----"
    ```

1. **Publish the subscription boilerplate**. Don't forget to tweak the `Subscription` model and its migration to fit your need.
    ```sh
    php artisan kanuu:publish

    # Or, when charging teams instead of users:
    php artisan kanuu:publish --team
    ```

1. **Add your webhook URL to Paddle**. In your Paddle's account, go to "*Developer Tools > Alerts / Webhooks*" and add your application's base URL followed by `/webhooks/paddle` as a webhook URL.
    ![Paddle's screenshot of the "Alerts and Webhooks" page.](/paddle_webhooks.png)

1. **Add a button that redirects to Kanuu**. In your settings page, add a button that securely redirects your customers to Kanuu so they can manage their subscription.
    ```html
    <a href="{{ route('kanuu.redirect', $user) }}" class="...">
        Manage your subscription
    </a>
    ```

That's it!

Happy billing! 💸
