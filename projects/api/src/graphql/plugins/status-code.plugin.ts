import Axios from "axios";

import type { PluginDefinition } from "apollo-server-core";

const errorToStatusCode = (error: Error) => {
  if (Axios.isAxiosError(error)) {
    return error.response?.status ?? 500;
  }

  return 500;
};

export const StatusCodePlugin: PluginDefinition = {
  async requestDidStart() {
    return {
      async willSendResponse(context) {
        if (!context.response.http) return;
        if (!context.errors || !context.errors.at(0)) {
          context.response.http.status = 200;

          return;
        }

        const statusCodes = context.errors
          .map((err) => err.originalError ?? err)
          .map(errorToStatusCode);

        context.response.http.status = Math.max(...statusCodes);
      },
    };
  },
};
