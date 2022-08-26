import { Notify } from "quasar";

export const notifyMixin = {
  methods: {
    notify(type: string, title: string, description: string) {
      Notify.create({
        message: title,
        caption: description,
        type: type,
      });
    },
  },
};
