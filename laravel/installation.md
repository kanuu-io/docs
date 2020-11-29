# Installation

If you want to get started with Kanuu and Paddle in your Laravel application, we've got you covered. We too use Laravel as our main backend framework and therefore we created a Laravel package for Kanuu.

On top of providing a helpful controller to redirect your users to Kanuu, it comes with additional helpers to help you get started with Paddle's webhooks and provide some optional Subscription boilerplate.

![Diagram showing your application between Kanuu and Paddle.](/kanuu_paddle_diagram.png)

To install Kanuu's Laravel package, you first need to download it using composer:

```sh
composer require kanuu-io/kanuu-laravel
```

Then, you'll need to add you Kanuu API key to your `.env` file like so:

```
KANUU_API_KEY="YOUR_API_KEY"
```

That's it! :sparkles:

Let's now see how we can use the package to securely redirect your customers to Kanuu [in the next step](./redirect-to-kanuu).
