import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/roboto-font/roboto-font.css";
import { Dialog, Loading, Notify } from "quasar";
import lang from "quasar/lang/pt-BR.js";
import "./styles/quasar.sass";

// To be used on app.use(Quasar, { ... })
export default {
  config: {
    notify: {},
    loading: {}
  },
  plugins: {
    Notify,
    Loading,
    Dialog
  },
  lang: lang,
};
