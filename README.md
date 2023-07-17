**Here be dragons** 🐉

# carbonplan

A Jupyter Widget for `@carbonplan/maps`. Built with
[`anywidget`](https://github.com/manzt/anywidget).

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

![Screen Recording 2023-07-17 at 7 48 47 AM](https://github.com/manzt/carbonplan/assets/24403730/3bd2256e-9c4b-4b2b-9fc9-a8d5d1197f05)

combine with other widgets...

```python
import ipywidgets

colormap = ipywidgets.Dropdown(options=["warm", "fire", "water"])
clim = ipywidgets.FloatRangeSlider(min=-20, max=30)
opacity = ipywidgets.FloatSlider(min=0, max=1, step=0.001)
region = ipywidgets.Checkbox(description="Region")

ipywidgets.link((map_widget, "colormap"), (colormap, "value"))
ipywidgets.link((map_widget, "clim"), (clim, "value"))
ipywidgets.link((map_widget, "opacity"), (opacity, "value"))
ipywidgets.link((map_widget, "region"), (region, "value"))

ipywidgets.VBox([
    ipywidgets.HBox([colormap, opacity, clim]),
    region,
    map_widget,
])
```

![Screen Recording 2023-07-17 at 8 00 16 AM](https://github.com/manzt/carbonplan/assets/24403730/4d35f702-1833-471a-9e11-8c7de2aed289)

# development

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

```sh
jupyter lab
```
