# Create a nonce

`POST https://kanuu.io/api/nonce`

Creates a Kanuu redirect URL for the provided identifier using a secure token that can be used only once.

--- 

### Body

| Attribute | Validation | Description |
| - | - | - |
| `identifier` | `required`<br><br>`string` | A unique identifier of your billable entity.<br><br>*For example, if you are creating subscriptions for users, then this could be your user ID. If you are creating subscriptions for teams, then it could be your team ID.* | 
| `supplemental` | `optional`<br><br>`array`<br><br>`max_length:16` | An array of key:value pairs.<br><br>*This additional set of supplemental information is passed to Paddle as passthrough data which you can then receive within your webhooks.* |
| `supplemental.*` | `string`<br><br>`max_length:64` | |

### Request

Make the request by passing the `identifier` as a data attribute and authenticate your application by providing your API key as a Bearer token.

<code-group>
<code-block title="Curl" active>
```sh
curl --request POST \
  --url https://kanuu.io/api/nonce \
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

$request->setRequestUrl('https://kanuu.io/api/nonce');
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
    ->post("https://kanuu.io/api/nonce", [
        "identifier" => "42"
    ]);

$response->json();
```
</code-block>

<code-block title="Ruby">
```ruby
require 'uri'
require 'net/http'

url = URI("https://kanuu.io/api/nonce")

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

If everything went well, you will receive a `nonce` and a `url` generated using this nounce. You can use this URL to securely redirect your users to Kanuu.

If you've not yet subscribed to Kanuu and reached more than 20 active customers, then you will receive a `402` asking you to subscribe to Kanuu to continue.

<code-group>
<code-block title="201 Created" active>
```json
{
	"nonce": "d3e2c48bb1fb4badfa27fe9a03924207",
	"url": "https://kanuu.io/manage/acme/d3e2c48bb1fb4badfa27fe9a03924207"
}
```
</code-block>

<code-block title="402 Payment Required">
```json
{
	"message": "Payment Required"
}
```
</code-block>
</code-group>
