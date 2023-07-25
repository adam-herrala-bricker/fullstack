```mermaid
sequenceDiagram
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    server->>browser: HTML document
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server->>browser: css document
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server->>browser: js script
    Note right of browser: Browser runs js script and fetchs json from server.
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server->>browser: json data
    Note right of browser: *user enters a new note*
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: POST request contains new note as json data. (Event handler in js code prevents new GET request, plus creates new note, adds to list, and re-renders list on page.)
    server->>browser: HTTP status code 201 Created.

``````
