import assert from 'node:assert/strict'
import { test } from 'node:test'
import { greet } from './greet.ts'

test('blank names fall back to world', () => {
  assert.equal(greet('  '), 'Hello, world!')
  assert.equal(greet('Ada'), 'Hello, Ada!')
})
