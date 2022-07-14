export function check(msg: string, actual: unknown, expected: unknown): void {
  return test(msg, () => {
    expect(expected).toBe(actual)
  })
}
