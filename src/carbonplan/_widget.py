import anywidget
import traitlets

import pathlib

__all__ = ["Widget"]


class Widget(anywidget.AnyWidget):
    _esm = pathlib.Path(__file__).parent / "widget.js"

    # required
    source = traitlets.Unicode(allow_none=False).tag(sync=True)
    variable = traitlets.Unicode(allow_none=False).tag(sync=True)
    dimensions = traitlets.Tuple(allow_none=False).tag(sync=True)

    # optional
    opacity = traitlets.Float(1.0).tag(sync=True)
    colormap = traitlets.Unicode("warm").tag(sync=True)
    clim = traitlets.Tuple(default_value=(-20, 30)).tag(sync=True)
    height = traitlets.Unicode("300px").tag(sync=True)
    region = traitlets.Bool(False).tag(sync=True)
    selector = traitlets.Dict().tag(sync=True)
    mode = traitlets.Unicode("texture").tag(sync=True)

    # data
    data = traitlets.Any().tag(sync=True)
