define ['backbone', 'jquery', 'router', 'config', 'helpers/template-loader'], (Backbone, $, AppRouter, AppConfig) ->
  new AppRouter

  # kickoff backbone
  Backbone.history.start({pushState: true})

  $(document).on "click", "a[href]:not([data-bypass])", (e) ->
    # Get the absolute anchor href.
    href = { prop: $(this).prop("href"), attr: $(this).attr("href") }
    root = location.protocol + "//" + location.host + AppConfig.root

    # Ensure the root is part of the anchor href, meaning it's relative.
    if (href.prop.slice(0, root.length) == root)
      e.preventDefault()

      Backbone.history.navigate href.attr, true
