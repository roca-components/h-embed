Usage
-----

```html
<a is="h-embed" href="$uri">$label</a>
```

will be transformed to

```html
<a is="h-embed" href="$uri" style="display: none;">$label</a>
<div class="h-embed">
    $transclusion
</div>
```

### Options

via DOM attributes

* `container`: tag name to use (defaults to `"div"`)
* `fragment` **TODO**
* `cors="true"` activates CORS support
* `poll` **TODO**


Alternatives
------------

h-transclude is inspired by [h-include](https://gustafnk.github.io/h-include/),
which in turn is based on [HInclude](https://mnot.github.io/hinclude/).

[pjax](https://github.com/defunkt/jquery-pjax) has similar capabilities, though
it's typically used in a different context.


Contributing
------------

* ensure [Node](http://nodejs.org) is installed
* `npm install` downloads dependencies
* `npm run compile` performs a one-time compilation, generating `dist/bundle.js`
* `npm start` automatically recompiles while monitoring code changes
* `npm test` checks code for stylistic consistency

note that the basic infrastructure is provided by
[ES6 seed](https://github.com/FND/es6-seed)
