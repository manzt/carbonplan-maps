**Here be dragons** 🐉

# carbonplan

A Jupyter Widget for `@carbonplan/maps`. Built with [`anywidget`](https://github.com/manzt/anywidget).

# usage

```python
import carbonplan

map_widget = carbonplan.Widget(
    source="https://carbonplan-maps.s3.us-west-2.amazonaws.com/v2/demo/2d/tavg",
    variable="tavg",
    dimensions=("y", "x"),
)
map_widget
```

![Screen Recording 2023-07-13 at 10 55 42 PM](https://github.com/manzt/carbonplan/assets/24403730/cee6d5ef-f02c-475d-9ab7-eef745142889)


combine with other widgets...

```python
import ipywidgets

colormap = ipywidgets.Dropdown(options=["warm", "fire", "water"])
clim = ipywidgets.FloatRangeSlider(min=-20, max=30)
opacity = ipywidgets.FloatSlider(min=0, max=1, step=0.001)

ipywidgets.link((map_widget, "colormap"), (colormap, "value"))
ipywidgets.link((map_widget, "clim"), (clim, "value"))
ipywidgets.link((map_widget, "opacity"), (opacity, "value"))

ipywidgets.VBox([ipywidgets.HBox([colormap, opacity, clim]), map_widget])
```

![Screen Recording 2023-07-13 at 10 52 43 PM](https://github.com/manzt/carbonplan/assets/24403730/6037b99f-dc67-4e8e-8d27-acdecbdbfe01)

# development

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

```sh
jupyter lab
```
