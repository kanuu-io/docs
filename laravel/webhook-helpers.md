# Webhook helpers (optional)

If you're creating a new Laravel application and need to handle Paddle's webhooks, Kanuu's Laravel package provides a `HandlePaddleWebhook` controller that can help you get started in no time.

![Diagram showing your application between Kanuu and Paddle.](/kanuu_paddle_diagram.png)

## 1. Add your Paddle's public key

First, the package will need your Paddle's public key so it can verify the signature of Paddle's webhooks. On your Paddle's account, go to "*Developer Tools > Public Key*" and copy your public key.

![Paddle screenshot of the "Public Key" page.](/paddle_public_key.png)

Then, paste it in your `.env` file. It should like this.

```
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

## 2. Register the webhook route

[Similarly to the `redirectRoute()` helper method](./redirect-to-kanuu), Kanuu provides a `webhookRoute()` helper method to define in your `routes/web` file.

```php
Kanuu::webhookRoute('webhooks/paddle')
```

You can now tell Paddle about your new webhook URL so it can start notifying you of new events. Whilst you're there, make sure the 3 subscription webhook events are selected.


![Paddle's screenshot of the "Alerts and Webhooks" page.](/paddle_webhooks.png)

Finally, since webhooks cannot be CSRF protected, you'll need to disable that route on the `VerifyCsrfToken` middleware.

```php
protected $except = [
    'webhooks/*',
];
```

## 3. Add subscription listeners

We're now listening to Paddle's webhook but not doing anything about it. Let's make sure we add our custom logic to these subscription events.

Go to your `AppServiceProvider` (or any other service provider), and add the following webhook listeners.

```php
Kanuu::on('subscription_created', function ($payload, $identifier) {
    // Create a new subscription in your application...
});

Kanuu::on('subscription_updated', function ($payload, $identifier) {
    // Update an existing subscription in your application...
});

Kanuu::on('subscription_cancelled', function ($payload, $identifier) {
    // Mark an existing subscription as cancelled in your application...
});
```

If you want to combine the logic of multiple events in one listener, you can use wildcard events like this:

```php
Kanuu::on('subscription_*', function ($payload, $identifier) {
    // Listens to any event starting with "subscription_".
    // Here we would update or create a subscription based on the payload.
});
```

Finally, you're likely going to reuse the same logic across all your listeners to parse the `$identifier` into a model that make sense to your application. You can parse that `$identifier` into a model before reaching a listener by calling the `getModelUsing` helper method.

```php
// Parse the identifier into a model once.
Kanuu::getModelUsing(function ($identifier) {
    return User::findOrFail($identifier);
});

// It is now already parsed in all your listeners.
Kanuu::on('subscription_*', function ($payload, User $user) {
    // ...
});
```

At this point, we've facilitate handling Paddle's webhooks but we still have to create some sort of `Subscription` model attached to our billable entity and implement the logic of our listeners.

Since this logic greatly depends on how your application handles billing, you might want to come up with your own models and migrations here. However, Kanuu's Laravel package can help you get started by publishing some boilerplate into your application.

[In the next page](./subscription-boilerplate), we'll see how we can use this package to generate the Subscription boilerplate we need to have billing all set up.
