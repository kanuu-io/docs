# 1. Setup Paddle

If you haven't already, you will need to [create a Paddle account](https://paddle.com/demo/) which will require a manual review by Paddle. Ensure you have a landing page set up so Paddle can understand what your application does and thefore accept your application.

Once you have a Paddle account, go to "*Developer Tools > Authentication*" and create a new API key under "*Generate Auth Code*".

![Create an API key screenshot of a Paddle's account.](/paddle_api_key.png)

You will need this **API key** and the "**Vendor ID**" (located at the top of the page) [in the next step](./setup-kanuu).

Unless you're using Kanuu's [custom domain feature](../advanced/custom-domains), you will also need to set Kanuu up as a Paddle 'Approved Domain'. Head over to "*Checkout > Checkout Settings > Approved Domains*" and you can add `kanuu.io` here. This will allow Kanuu to load Paddle's checkout models for your account.
