import { sliceString } from "../slice-string";

describe("slice-string", () => {
  it("should slice string and add three dots", () => {
    const sliced = sliceString("abcdefg", 3);

    expect(sliced).toBe("abc...");
  });

  it("should not slice the string", () => {
    const sliced = sliceString("abc", 5);

    expect(sliced).toBe("abc");
  });
});
