```mermaid
sequenceDiagram
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    server->>browser: HTML document
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server->>browser: css document
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server->>browser: js code
    Note right of browser: Browser runs js code and fetchs json from server.
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server->>browser: json data
    Note right of browser: Browser runs js code to render json data on page.
```
