# 3. Integrating Kanuu

Now that you're all set up with both Paddle and Kanuu, all you need to do is integrate your application with Kanuu. This should only take a few minutes.

Concretely, we'll need to:
- [Redirect your customers to Kanuu](#redirect-to-kanuu) so they can subscribe or manage their subscription.
- [Find out if your customers are subscribed or not](#subscription-api).

We'll see both of these point in this page.

::: tip Using Laravel?
If you application is built on Laravel, Kanuu provides a `RedirectToKanuu` controller and a `Billable` trait that take care of everything for you.

[Follow these steps](/laravel/installation) to install the package and see what else it can do for you.
:::

## Redirect to Kanuu

Somewhere on your application, you'll need a link or a button that redirects your users to Kanuu so they can subscribe or manage their subscription. When they click on it, you need to make an API call to the Kanuu API using your API key to generate a secure URL that can only be used once.

To generate that URL, call the following endpoint. You can [learn more about this endpoint in the API references](../api/create-nonce).

```sh
curl --request POST \
  --url https://kanuu.io/api/nonce \
  --header 'authorization: Bearer <YOUR_API_KEY>' \
  --header 'content-type: application/json' \
  --data '{"identifier": "42"}'
```

Notice how this endpoint requires an `identifier`. This should be an identifier that uniquely identify your customer throughout your application. For example, if you bill users, it could be your user ID; or if you bill teams, it could be your team ID. If you bill both, make sure to prefix your identifier accordingly so it is unique to your application.

```json
{
    "identifier": "42"
}
```

This endpoint will then return you a nonce (a unique token that can only be used once) and a URL to Kanuu generated using this nonce.

```json
{
	"nonce": "d3e2c48bb1fb4badfa27fe9a03924207",
	"url": "https://acme.kanuu.io/d3e2c48bb1fb4badfa27fe9a03924207"
}
```

Use the `url` provided in the response to redirect your user to Kanuu. They will be automatically authenticated based on the provided `identifier`.

That's it! :sparkles:

Kanuu is now taking over and your customers can manage all aspects of their subscription. They will be presented with a "*Back to Your Application*" button to return to your application when they are done.

::: warning
Note that, for security purposes, we recommend only generating a nonce (and thus a redirect URL) when the user clicks on the button that redirects to Kanuu (as opposed to pre-generating the url on page load).
:::

## Subscription API

Since your customers are managing their subscription directly on Kanuu, your application needs to know if they are subscribed or not.

Whilst [you may use Paddle's webhooks](#using-paddle-s-webhooks) for that, Kanuu provides a Subscription API endpoint that makes the whole thing even easier.

Simply call the following endpoint with your Kanuu API Key and your customer's unique identifier and it will tell you what you need to know about their subscription status.

```sh
curl --request POST \
  --url https://kanuu.io/api/subscription \
  --header 'authorization: Bearer <YOUR_API_KEY>' \
  --header 'content-type: application/json' \
  --data '{"identifier": "42"}'
```

For example, here's the response you will get for a customer with an active subscription. You can [learn more about this endpoint in the API references](../api/fetch-subscription).

```json
{
    "is_trialing" => false,
    "is_subscribed" => true,
    "status" => "past-due",
    "plan_id" => 12345, // Your Paddle plan identifier.
    "subscription_id" => 67890, // Your Paddle subscription identifier.
}
```

In order to make this approach more efficient, Kanuu caches the result of this endpoint for an hour but will always flush that cache when a customer manages their subscription has some changes will likely follow.

We recommend that you add some caching on your side as well to avoid making API calls every time you need access to a customer's subscription status. If you do, make sure to also flush that cache before redirecting your customer to Kanuu. Note that if you're using [Kanuu's Laravel package](../laravel/installation), we handle all of this for you out-of-the-box.

**Congratulations, you're all set!** :tada:

This is what we've done:
- Your application now has a "Manage your subscription" button that redirects your customers to Kanuu securely.
- When your customers interact with Kanuu's UI, they are using Paddle's modals and therefore Paddle is notified of any changes.
- Your application uses the Subscription API to check whether your customers are subscribed or not.

## Using Paddle's webhooks

Instead of using the Subscription API, you might want to set up Paddle's webhooks instead. Since Kanuu is using Paddle's SDK directly, anything that happens on Kanuu, will happen on Paddle and therefore, you will be notified via webhooks.

You might want to check out [our advanced guide to set up Paddle's webhooks](../advanced/paddle-webhooks).
