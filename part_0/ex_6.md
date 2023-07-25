```mermaid
sequenceDiagram
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: POST request contains new note as json data. 
    Note right of browser: Event handler in js code prevents new GET request, plus creates new note, adds to list, and re-renders list on page.
    server->>browser: HTTP status code 201 Created.
``````