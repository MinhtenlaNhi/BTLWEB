import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import {createStore} from "redux";
import { allReducers } from "./redux/reducers/index.jsx";

const store = createStore(allReducers);
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </BrowserRouter>
);
