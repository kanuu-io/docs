# Custom Domains

::: tip Subscription only
Custom domains are a subscribed customer only feature. If you want to use them just head over to your team settings, click on the "Manage your subscription" button to get subscribed!
:::

Custom domains allow you to **securely** use Kanuu with your very own vanity URL. Once setup, you could visit a subdomain like `billing.yourapp.com` and get the full Kanuu, managed billing UI, experience on your own domain. Neat, right?!

Let's get started.

### DNS Setup

Firstly, we are going to need to make a quick DNS change, head over to your DNS provider, which will either be where you registered your domain e.g Hover, GoDaddy etc, or if you are using a manged DNS service like Cloudflare or DigitalOcean.

We need to create a new CNAME record for the subdomain you want to use and you'll need to point it towards `proxy.kanuu.io`, just like in the example below.

![Example DNS settings.](/dns-example.png)

Once that is setup, and propagated (can take upto 24 hours). Then you are ready to set everything up in Kanuu.

### Kanuu Settings

In your team settings you'll find a new section for custom domains. Here you can enter the domain you setup in the previous step _e.g billing.yourapp.com_, hit 'Save' and we will begin the process of verifiying everything.

At this point we need to check your DNS is setup correctly and then issue you with a SSL certificate so your custom domain can be served over `https`. If your DNS records are setup correctly, then this step should only take around 5 minutes.

![Example unverified domain.](/kanuu_custom_domains.png)

Once verification is complete you'll see a green shield, to confirm you are secured!

### Enable / Disable

::: warning Paddle Approved Domains
Before enabling your custom domain you'll want to ensure that you have added your custom domain to Paddle's 'Approved Domains' list, which you can find in your Paddle checkout settings. Without this there is a high likelyhook that the Paddle checkout will not succeed.
:::

Once you see the green shield, you'll be able to enable and disable the custom domain.

Enabling the custom domain, firstly allows access to Kanuu via the custom domain but secondly Kanuu will change the URL in your API response to be that of your custom domain, meaning if you already have a setup using Kanuu, with the API and the `url` then there is nothing more for you to do.

If you are manually generating the URLs then you'll need to adjust your own logic - just make sure you have enabled the custom domain first!
