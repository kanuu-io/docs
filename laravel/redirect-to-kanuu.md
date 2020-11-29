# Redirect to Kanuu

## Using the `RedirectToKanuu` controller

The easiest way to redirect your users to Kanuu using the Laravel package is to add the following to your `routes/web` file.

```php
use Kanuu\Laravel\Facades\Kanuu;

// ...

Kanuu::redirectRoute();
```

This helper method is syntactic sugar for the following route definition.

```php
Route::get('kannu/{identifier}', '\Kanuu\Laravel\RedirectToKanuu');
```

You can override the URL by providing your custom URL as the first argument. You just need to make sure your URL contain the `{identifier}` parameter. For example:

```php
Kanuu::redirectRoute('users/{identifier}/subscription');
```

Since `Kanuu::redirectRoute()` returns an instance of `Illuminate\Routing\Route`, you can chain any route method you want to configure it.

```php
Kanuu::redirectRoute()
    ->middleware('auth')
    ->name('kanuu.redirect');
```

You can now use that route in your templates to securely redirect to Kanuu.

```html
<a href="{{ route('kanuu.redirect', $user) }}" class="...">
    Manage your subscription
</a>
```

You're now all set up with Kanuu! :sparkles:

If you haven't already done it, the next step is to listen to subscription changes using Paddle's webhooks.

[In the next step](./webhook-helpers), we'll see how this Laravel package can help with that.

## Manually creating redirect URLs

Alternatively, you can create your own controller and use Kanuu's facade to generate a new secure redirect URL from a given identifier.

```php
Kanuu::getNonce($identifier)
```

This will return a PHP array containing the `nonce` and a redirect `url` generated from that nonce ([See API reference](/api/create-nonce)).

The `$identifier` argument can be one of the following:
- A `string` — In this case, we'll use that identifier as provided.
- An `Eloquent` model — In this case, we'll use the `getKey()` method to get the identifier from the model.
- Any `object` — In this case, we'll try to use the `getKanuuIdentifier()` method to get the identifier from the object.
