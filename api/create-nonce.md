# Create a nonce

`POST https://kanuu.io/api/nonce`

Create Kanuu redirect URL for the provided identifier using a secure token that can be used only once.

--- 

### Body

| Attribute | Validation | Description |
| - | - | - |
| `identifier` | `required`<br><br>`string` | A unique identifier of your billable entity.<br><br>*For example, if you are creating subscription for users, then this could be your user ID. If you are creating subscription for teams, then it could be your team ID.* | 

### Request

TODO

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

TODO

<code-group>
<code-block title="201 Created" active>
```
TODO
```
</code-block>

<code-block title="402 Payment Required">
```
TODO
```
</code-block>
</code-group>
