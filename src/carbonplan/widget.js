import React from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18/client";
import {
  Line,
  Map,
  Raster,
  RegionPicker,
} from "https://esm.sh/@carbonplan/maps@3?deps=react@18";
import { useColormap } from "https://esm.sh/@carbonplan/colormaps@4?deps=react@18";

let bucket = "https://storage.googleapis.com/carbonplan-maps/";

let WidgetModelContext = React.createContext();

function useModelState(name) {
  let model = React.useContext(WidgetModelContext);
  let [state, setState] = React.useState(model.get(name));
  React.useEffect(() => {
    let event = `change:${name}`;
    let cb = () => setState(model.get(name));
    model.on(event, cb);
    return () => {
      model.off(event, cb);
    };
  }, [model, name]);
  return [state, (val, options) => {
    model.set(name, val, options);
    model.save_changes();
  }];
}

function App() {
  let [source] = useModelState("source");
  let [colormap_str] = useModelState("colormap");
  let [clim] = useModelState("clim");
  let [variable] = useModelState("variable");
  let [dimensions] = useModelState("dimensions");
  let [height] = useModelState("height");
  let [opacity] = useModelState("opacity");
  let [region] = useModelState("region");
  let [selector] = useModelState("selector");
  let [mode] = useModelState("mode");
  let colormap = useColormap(colormap_str, {});

  // setting this way avoids constant re-rendering
  let model = React.useContext(WidgetModelContext);
  let regionOptions = {
    setData(data) {
      model.set("data", data);
      model.save_changes();
    },
  };

  return React.createElement(
    "div",
    { style: { height } },
    React.createElement(
      Map,
      null,
      region && React.createElement(RegionPicker, null),
      React.createElement(
        Line,
        { color: "white", source: bucket + "basemaps/land", variable: "land" },
      ),
      React.createElement(
        Raster,
        {
          colormap,
          clim,
          source,
          variable,
          dimensions,
          opacity,
          regionOptions,
          selector,
          mode,
        },
      ),
    ),
  );
}

export function render({ model, el }) {
  let root = ReactDOM.createRoot(el);
  let app = React.createElement(App);
  root.render(
    React.createElement(
      WidgetModelContext.Provider,
      { value: model },
      React.createElement(App),
    ),
  );
  return () => root.unmount();
}
