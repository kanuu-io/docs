# Paddle webhooks

Since Kanuu is using your own Paddle's account under the hood, you can listen to subscription changes from Paddle directly using webhooks.

::: tip Using Laravel?
If you application is built on Laravel, Kanuu provides a `HandlePaddleWebhook` controller that takes care of everything for you including verifying the webhook's signature.

[Follow these steps](../laravel/installation) to install the package and see what else it can do for you.
:::

If you don't have webhooks setup already, go to your Paddle's account under "*Developer Tools > Alerts / Webhooks*" and add a webhook URL to your own application. Paddle will send a `POST` request to that URL everytime an event you've subscribed for happened.

This means, you need to make sure the 3 subscription events: `subscription_created`, `subscription_updated` and `subscription_cancelled` are selected on the same page below.

![Paddle's screenshot of the "Alerts and Webhooks" page.](/paddle_webhooks.png)

You can now implement that `POST` endpoint by following [Paddle's documentation](https://developer.paddle.com/webhook-reference/intro).

Kanuu uses the identifer you passed [when redirecting your customers](../getting-started/integrating-kanuu.html#redirect-to-kanuu), and adds it as a JSON string to the `passthrough` data that Paddle returns in the webhook. Within the JSON string you'll find your identifer with the key `kannu`.

```json
{
    "passthrough": { "kanuu": "42" },
    // ...
}
```
