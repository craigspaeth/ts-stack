import { hydrate } from "solid-js/web";
import Browser from "../views/Browser";

hydrate(() => <Browser />, window.document.getElementById("app"));
