function sum(a, b) {
  return a + b;
}

test('adds 5 + 5 to equal to 10', () => {
  expect(sum(5, 5)).toBe(10);
});
