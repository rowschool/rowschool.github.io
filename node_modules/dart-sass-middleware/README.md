## Express SASS Middleware

This middleware is designed to compile SASS on the fly.

It uses the new [Dart Sass](https://sass-lang.com/dart-sass) compiler.

**Should only be used for development. SASS should be compiled during a build process.**

### Installing


### Behavior

For every request, this middleware checks the following:
1. Requested via GET method
2. Request is a CSS file (`req.path` ends with `.css`)
3. No matching CSS file is found
4. A matching SASS file is found

If any of those four conditions is not true, then the middleware will continue on via `next()`.

If they are all true, then the middleware will compile the SASS file, and deliver the resulting css.

If the SASS compiler returns an error, then the middleware will deliver the formatted error with a 500 status code.

### Usage Example


#### License

MIT
