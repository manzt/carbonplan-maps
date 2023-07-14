import React from "https://esm.sh/react@18";
import ReactDOM from "https://esm.sh/react-dom@18/client";
import { Map, Raster } from "https://esm.sh/@carbonplan/maps@3?deps=react@18";
import { useColormap } from "https://esm.sh/@carbonplan/colormaps@4?deps=react@18";

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
  let colormap = useColormap(colormap_str, {});
  return React.createElement(
    "div",
    { style: { height } },
    React.createElement(
      Map,
      null,
      React.createElement(
        Raster,
        { colormap, clim, source, variable, dimensions, opacity },
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
