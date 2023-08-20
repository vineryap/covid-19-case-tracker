# Frontend - Web Dev Assignment

This is the frontend for a website providing COVID-19 statistics built with Nuxt 3.

The pages for the website are:
- `/home`: The homepage of the website. (Prerender/static - Client-Side Rendering with data fetched from the server)
- `/statistics`: To view COVID-19 statistics. (CSR)
- `/contact`: A contact page to send inquiry to info@corpy.co.jp

Utilizing Nuxt's framework features, the frontend serves as an API proxy to the backend, which is hidden from the client-side. This approach provides an extra layer of security to the application. The API proxy is implemented using Nuxt's built-in server middleware.