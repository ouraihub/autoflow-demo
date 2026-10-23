import assert from 'node:assert/strict'
import { test } from 'node:test'
import { farewell } from './farewell.ts'

test('farewell preserves names in the specified format', () => {
  assert.equal(farewell('Ada'), '再见，Ada！')
  assert.equal(farewell('小明'), '再见，小明！')
  assert.equal(farewell(''), '再见，！')
  assert.equal(farewell(' Ada '), '再见， Ada ！')
  assert.equal(farewell('  '), '再见，  ！')
})
