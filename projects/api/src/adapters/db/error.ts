import {
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime";

type PrismaError =
  | PrismaClientInitializationError
  | PrismaClientKnownRequestError
  | PrismaClientUnknownRequestError
  | PrismaClientRustPanicError
  | PrismaClientValidationError;

export const isPrismaError = (err: unknown): err is PrismaError => {
  return (
    err instanceof PrismaClientInitializationError ||
    err instanceof PrismaClientKnownRequestError ||
    err instanceof PrismaClientUnknownRequestError ||
    err instanceof PrismaClientRustPanicError ||
    err instanceof PrismaClientValidationError
  );
};
