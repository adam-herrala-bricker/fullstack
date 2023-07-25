```mermaid
sequenceDiagram 
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server->>browser: HTTP status code 302 found
    Note right of browser: Server asks browser to do new GET request; browser reloads page.
```