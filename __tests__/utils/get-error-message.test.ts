import { getErrorMessage } from "@/utils/get-error-message";
import { describe, it, expect } from "vitest";

describe("getErrorMessage", () => {
  it("should return string data if error.data is a string", () => {
    const error = {
      status: 400,
      data: "Bad request",
    } as any;

    expect(getErrorMessage(error)).toBe("Bad request");
  });

  it("should return stringified data if error.data is an object", () => {
    const error = {
      status: 404,
      data: { message: "Not found" },
    } as any;

    expect(getErrorMessage(error)).toBe(
      JSON.stringify({ message: "Not found" })
    );
  });

  it("should return error.message if provided", () => {
    const error = {
      message: "Something went wrong",
    } as any;

    expect(getErrorMessage(error)).toBe("Something went wrong");
  });

  it("should return 'Unknown error' if no message is provided", () => {
    const error = {} as any;

    expect(getErrorMessage(error)).toBe("Unknown error");
  });
});
