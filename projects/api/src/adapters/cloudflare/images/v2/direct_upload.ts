import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    reqBody?: {
      requireSignedURLs?: boolean;
      metadata?: Record<string, unknown>;
      expiry?: Date;
    };

    resBody: {
      success: boolean;
      errors: string[];
      messages: string[];
      result: {
        uploadURL: string;
        id: string;
      };
    };
  };
}>;
