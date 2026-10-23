import assert from 'node:assert/strict'
import { test } from 'node:test'
import { greet, shout } from './greet.ts'

test('blank names fall back to world', () => {
  assert.equal(greet('  '), 'Hello, world!')
  assert.equal(greet('Ada'), 'Hello, Ada!')
})

test('shout upper-cases the greeting', () => {
  assert.equal(shout('Ada'), 'HELLO, ADA!')
})
