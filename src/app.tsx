import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Main from "./Main";
import Store from "./Store";

function render() {
  ReactDOM.render(
    <Provider store={Store}>
      <Main />
    </Provider>,
    document.getElementById("root")
  );
}

render();
