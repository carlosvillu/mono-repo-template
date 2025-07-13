import { describe, it, expect } from "vitest"
import { capitalize, slugify, clamp, randomId, isEmailValid, cn } from "./index"

describe("capitalize", () => {
  it("should capitalize the first letter", () => {
    expect(capitalize("hello")).toBe("Hello")
    expect(capitalize("WORLD")).toBe("World")
    expect(capitalize("")).toBe("")
  })
})

describe("slugify", () => {
  it("should convert text to slug", () => {
    expect(slugify("Hello World")).toBe("hello-world")
    expect(slugify("This is a test!")).toBe("this-is-a-test")
  })
})

describe("clamp", () => {
  it("should clamp values between min and max", () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-5, 0, 10)).toBe(0)
    expect(clamp(15, 0, 10)).toBe(10)
  })
})

describe("randomId", () => {
  it("should generate a random string", () => {
    const id1 = randomId()
    const id2 = randomId()
    expect(id1).not.toBe(id2)
    expect(typeof id1).toBe("string")
    expect(id1.length).toBeGreaterThan(0)
  })
})

describe("isEmailValid", () => {
  it("should validate email addresses", () => {
    expect(isEmailValid("test@example.com")).toBe(true)
    expect(isEmailValid("user.name@domain.co.uk")).toBe(true)
    expect(isEmailValid("invalid-email")).toBe(false)
    expect(isEmailValid("@domain.com")).toBe(false)
    expect(isEmailValid("user@")).toBe(false)
  })
})

describe("cn", () => {
  it("should combine class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2")
    expect(cn("class1", null, "class2", false, undefined)).toBe("class1 class2")
    expect(cn()).toBe("")
  })
})
