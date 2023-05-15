# Rankings

The Rankings library is a powerful tool for managing and manipulating ordered lists. You can create chains of ordered elements, consolidate chains based on common elements, and more. 

The library is implemented in TypeScript and provides a clean, chainable API for managing your ordered lists.

## Key Features

- Add new chains
- Consolidate chains based on common elements
- Use chainable methods for readability and expressiveness

## API Methods

### set(element: string)

This method begins a new chain with a specified element. It returns an object with methods for defining the ranking of the element.

- `above(otherElement: string)`: This method adds the otherElement below the current element in the chain.
- `below(otherElement: string)`: This method adds the otherElement above the current element in the chain.
- `between(otherElement1: string)`: This method begins the definition of a range for the current element. It returns an object with an `and(otherElement2: string)` method, which completes the range and adds the current element between otherElement1 and otherElement2 in the chain.

### add(...args: string[])

This method adds a new chain to the list. The order of the elements in the chain is defined by the order of the arguments.

## Usage

```javascript
const rankings = new Rankings()

// create a simple chain
rankings.set('a').above('m')

// create multiple separate chains
rankings.set('j').above('k')

// consolidate lists
rankings.set('a').above('j')

// consolidate overlapping chains
rankings.set('k').above('m')

// use below syntax
rankings.set('j').below('d')

// consolidate more complex chains
rankings.set('d').below('a')

// use between syntax
rankings.set('b').between('a').and('d')

// add chains directly
rankings.add('a', 'j', 'k')
rankings.add('b', 'j', 'n')
rankings.add('m', 'n')
```
