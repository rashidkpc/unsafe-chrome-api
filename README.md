# Unsafe Chrome REST API

Dangerous HTTP service that gets page content using a headless Chrome instance. Optionally runs some javascript in the context of the page, like you might in a browser's debug console. Don't expose this, uh, anywhere really.

### API

The `/content` endpoint takes a JSON blob with several options. By default it will return the HTML content of the page requested
-  `uri`: The URL to load 
- `js`: Enable Javascript and wait for DOMContentLoaded *(optional)*
- `selector`: A DOM selector, eg `.someClass`. Returns the text content of the node if found, otherwise null. If you specify a selector, we'll wait for it to show up, but timeout after 5s. *(optional)*
- `script`: A snippet of javascript to run with eval(). You're not getting error handling here, so figure it out. *(optional)*
 
#### Curl Example
```
curl -H 'Content-Type: application/json' -XPOST http://localhost:3000/content -d '
{
  "uri": "https://example.com",
  "js": true,
  "selector": "h1"
}'
