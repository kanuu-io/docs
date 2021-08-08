# The Billable trait

Kanuu's Laravel package provides a useful `Billable` trait that abstracts the Subscription API for you. Simply add that trait to the model you want to bill (e.g. `User` or `Team`) and you're all sorted.

Here are all the methods available to you via this trait.

```php
$billable->isSubscribed();
$billable->onTrial();
$billable->onGracePeriod();

// Returns a `Kanuu\Laravel\Subscription` instance.
$subscription = $billable->getSubscription();

$subscription->isTrialing();
$subscription->isSubscribed();
$subscription->isActive();
$subscription->isCancelled();
$subscription->isPaused();
$subscription->isPastDue();
$subscription->onGracePeriod();
$subscription->getStatus();
$subscription->getPlanId();
$subscription->getSubscriptionId();
```

Under the hood, this trait will make an API call to Kanuu's subscription API to get the relevant information. It will also cache the result for that model for one hour by default. You may change the duration of that cache using the `Kanuu::cacheFor` method in any service provider like so.

```php
// Cache for two hour using seconds or a Datetime.
Kanuu::cacheFor(2 * 3600);
Kanuu::cacheFor(now()->addHours(2));
```

Note that, if you're using the provided `RedirectToKanuu` controller — via the `Kanuu::redirectRoute()` route — the cache will automatically be cleared for that identifier as things are likely going to change. If you are not using the `RedirectToKanuu` controller, make sure to flush the key `kanuu.{identifier}` before redirecting your customer to avoid a bad user experience.

**And that's it, you're now fully set up to use Kanuu in your Laravel application!** 🥳

If you decide that the Subscription API is not for you because you prefer having subscription data stored in your own database, then [this package can also help you set up Paddle's webhooks](./webhook-helpers).

## Summary

Here's a quick summary/checklist to go back whenever you're setting up Kanuu with a new Laravel application.

1. **Setup Paddle and Kanuu**. This requires no code. Follow these quick steps:
    - [1. Setup Paddle](../getting-started/setup-paddle)
    - [2. Setup Kanuu](../getting-started/setup-kanuu)

1. **Install the package**.
    ```sh
    composer require kanuu-io/kanuu-laravel
    ```

1. **Add one environment variable**. Add your Kanuu API key to your `.env` file.
    ```sh
    KANUU_API_KEY="sn71bn8tsZKY0oMtbqRqbnV4FYRCwRK21SVqcIfA"
    ```

1. **Add the `Billable` trait to your billable model**.
    ```php
    use Kanuu\Laravel\Billable;

    class User
    {
        use Billable;

        // ...
    }
    ```

1. **Add Kanuu's redirect controller to your routes**. In your `routes/web.php` file, add the following route with any middleware you might need to protect it.
    ```php
    Kanuu::redirectRoute()
        ->middleware('auth')
        ->name('kanuu.redirect');
    ```

1. **Add a button that redirects to Kanuu**. In your settings page, add a button that securely redirects your customers to Kanuu so they can manage their subscription.
    ```html
    <a href="{{ route('kanuu.redirect', $user) }}" class="...">
        Manage your subscription
    </a>
    ```

That's it!

Happy billing! 💸
