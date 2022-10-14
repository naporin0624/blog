import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  delete: {
    resBody: {
      result: {
        //
      };
      result_info: null;
      success: true;
      errors: string[];
      messages: string[];
    };
  };
}>;
