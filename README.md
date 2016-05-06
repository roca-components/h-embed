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
