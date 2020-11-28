# 4. Redirect to Kanuu

To redirect your customers to Kanuu, you need to first make a `POST` call to the Kanuu API using your API key to generate a secure URL that can only be used once.

::: tip Using Laravel?
If you application is built on Laravel, Kanuu provides a `RedirectToKanuu` controller that takes care of everything for you.

[Follow these steps](/laravel/installation) to install the package and see what else it can do for you.
:::

To generate that URL, call the following endpoint:

```
POST https://kanuu.io/api/nonce
```

Use your Kanuu API key as a Bearer token to authenticate yourself:

```
Authorization: Bearer <YOUR_API_KEY>
```

And provide an identifier in the endpoint's data that uniquely identify your customer throughout your application.

```json
{
    "identifier": "42"
}
```

You can [learn more about this endpoint in the API references](/api/create-nonce).

If successful, this endpoint will return you a nonce (a unique token that can only be used once) and a URL to Kanuu generated using this nonce.

```json
{
	"nonce": "d3e2c48bb1fb4badfa27fe9a03924207",
	"url": "https://kanuu.io/manage/acme/d3e2c48bb1fb4badfa27fe9a03924207"
}
```

Use the `url` provided in the response to redirect your user to Kanuu. They will be automatically authenticated based on the provided `identifier`.

That's it! :sparkles:

Kanuu is now taking over and your customers can manage all aspects of their subscription. They will be presented with a "*Back to Your Application*" button to return to your application when they are done.

[In the next step](./listen-to-paddles-webhooks), we will make sure you application listen to subscription changes using Paddle's webhooks.

::: warning
Note that, for security purposes, we recommend only generating a nonce (and thus a redirect URL) when the user clicks on the button that redirects to Kanuu (as opposed to pre-generating the url on page load).
:::
