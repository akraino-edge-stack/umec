import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App.jsx";

if (typeof window !== "undefined") {
    main();
}

function main() {
    const app = document.getElementById("app");

    ReactDOM.render(
        <App />,
        app
    );
}
