# Fetch a subscripton

`POST https://kanuu.io/api/subscription`

Fetch the latest subscription details for the given `identifier`. This allows you to easily determine whether a billable entity should have access to
parts of your application that are subscription only.

This endpoint is heavily cached, changes to subscriptions or customers made within Kanuu should be reflected immediately but there can be a delay.

When using this endpoint in production you to should heavily cache the results, your application will likely be much slower if you are having to call Kanuu
on every single request to determine if a customer has subscribed or not.

--- 

### Body

| Attribute | Validation | Description |
| - | - | - |
| `identifier` | `required`<br><br>`string` | A unique identifier of your billable entity.<br><br>*For example, if you are creating subscriptions for users, then this could be your user ID. If you are creating subscriptions for teams, then it could be your team ID.* | 

### Request

Make the request by passing the `identifier` as a data attribute and authenticate your application by providing your API key as a Bearer token.

<code-group>
<code-block title="Curl" active>
```sh
curl --request POST \
  --url https://kanuu.io/api/subscription \
  --header 'authorization: Bearer <YOUR_API_KEY>' \
  --header 'content-type: application/json' \
  --data '{"identifier": "42"}'
```
</code-block>

<code-block title="PHP">
```php
$client = new http\Client;
$request = new http\Client\Request;

$body = new http\Message\Body;
$body->append('{"identifier": "42"}');

$request->setRequestUrl('https://kanuu.io/api/subscription');
$request->setRequestMethod('POST');
$request->setBody($body);

$request->setHeaders(array(
  'authorization' => 'Bearer <YOUR_API_KEY>',
  'content-type' => 'application/json'
));

$client->enqueue($request)->send();
$response = $client->getResponse();

echo $response->getBody();
```
</code-block>

<code-block title="Laravel">
```php
$response = Http::withToken("<YOUR_API_KEY>")
    ->asJson()
    ->post("https://kanuu.io/api/subscription", [
        "identifier" => "42"
    ]);

$response->json();
```
</code-block>

<code-block title="Ruby">
```ruby
require 'uri'
require 'net/http'

url = URI("https://kanuu.io/api/subscription")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Post.new(url)
request["content-type"] = 'application/json'
request["authorization"] = 'Bearer <YOUR_API_KEY>'
request.body = "{\"identifier\": \"42\"}"

response = http.request(request)
puts response.read_body
```
</code-block>

<code-block title="Java">
```java
HttpResponse<String> response = Unirest.post("https://kanuu.io/api/nonce")
  .header("content-type", "application/json")
  .header("authorization", "Bearer <YOUR_API_KEY>")
  .body("{\"identifier\": \"42\"}")
  .asString();
```
</code-block>
</code-group>


### Response

From this endpoint you should always receive a successful response - as long as the provided `identifier` is a valid string.

<code-group>
<code-block title="200 - Trialing" active>
```json
{
    "is_trialing" => true,
    "is_subscribed" => true,
    "status" => "trialing",
    "plan_id" => 12345, // Your Paddle plan identifier.
    "subscription_id" => 67890, // Your Paddle subscription identifier.
}
```
</code-block>

<code-block title="200 - Active">
```json
{
    "is_trialing" => false,
    "is_subscribed" => true,
    "status" => "active",
    "plan_id" => 12345, // Your Paddle plan identifier.
    "subscription_id" => 67890, // Your Paddle subscription identifier.
}
```
</code-block>

<code-block title="200 - Past Due">
```json
{
    "is_trialing" => false,
    "is_subscribed" => true,
    "status" => "past-due",
    "plan_id" => 12345, // Your Paddle plan identifier.
    "subscription_id" => 67890, // Your Paddle subscription identifier.
}
```
</code-block>

<code-block title="200 - Paused">
```json
{
    "is_trialing" => false,
    "is_subscribed" => false,  // Will remain true until the date they have paid up to.
    "status" => "paused",
    "plan_id" => 12345, // Your Paddle plan identifier.
    "subscription_id" => 67890, // Your Paddle subscription identifier.
}
```
</code-block>

<code-block title="200 - Canceled">
```json
{
    "is_trialing" => false,
    "is_subscribed" => false, // Will remain true until the date they have paid up to; see Paddle's webhook cancellation effective date.
    "status" => "canceled",
    "plan_id" => 12345, // Your Paddle plan identifier.
    "subscription_id" => 67890, // Your Paddle subscription identifier.
}
```
</code-block>
</code-group>
