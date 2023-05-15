import { expect, test } from 'bun:test'
import { Rankings } from '.'

test('rankings', () => {
  const rankings = new Rankings()

  // create a simple chain
  rankings.set('a').above('m')
  expect(rankings.lists).toEqual([['a', 'm']])

  // no overlap in these, they should stay separate
  rankings.set('j').above('k')
  expect(rankings.lists).toEqual([['a', 'm'], ['j', 'k']])

  // consolidates lists because [a, j] can match to [j, k]
  rankings.set('a').above('j')
  expect(rankings.lists).toEqual([['a', 'm'], ['a', 'j', 'k']])

  // [a, m] + [a, j, k] + [k, m] = [a, j, k, m]
  rankings.set('k').above('m')
  expect(rankings.lists).toEqual([['a', 'j', 'k', 'm']])

  // testing below syntax
  rankings.set('j').below('d')
  expect(rankings.lists).toEqual([['a', 'j', 'k', 'm'], ['d', 'j']])

  // [a, j, k, m] + [d, j] + [a, d] = [a, d, j, k, m]
  rankings.set('d').below('a')
  expect(rankings.lists).toEqual([['a', 'd', 'j', 'k', 'm']])

  // testing between - should insert a between a and d
  rankings.set('b').between('a').and('d')
  expect(rankings.lists).toEqual([['a', 'b', 'd', 'j', 'k', 'm']])

  // chain A is found (with gaps) in chain B
  rankings.add('a', 'j', 'k')
  expect(rankings.lists).toEqual([['a', 'b', 'd', 'j', 'k', 'm']])

  // chain A is found (with gaps) in chain B
  rankings.add('b', 'j', 'n')
  rankings.add('m', 'n')
  expect(rankings.lists).toEqual([['a', 'b', 'd', 'j', 'k', 'm', 'n']])
})

// test('circular rankings (does not break)', () => {
//   const rankings = new Rankings()

//   rankings.add('a', 'b')
//   rankings.add('b', 'c')
//   rankings.add('c', 'a')

//   expect(rankings.lists).toEqual([['a', 'b', 'c'], ['c', 'a']])
// })
