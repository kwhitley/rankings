type List = any[]

const consolidate = (arrays: Chain[]) => {
  let r = arrays?.map(a => [...a])

  let c
  do {
    c = false
    for(let i = 0; i < r?.length; i++) {
      for(let j = 0; j < r?.length; j++) {
        if (i !== j) {
          let [f, s] = [r[i], r[j]]
          if (f?.[f.length - 1] === s?.[0]) {
            r[i] = [...f, ...s.slice(1)]
            r.splice(j, 1)
            j--, c = true
          } else if (s?.[s.length - 1] === f?.[0]) {
            r[i] = [...s, ...f.slice(1)]
            r.splice(j, 1)
            j--, c = true
          } else if (s?.includes(f?.[0]) && s?.includes(f?.[f.length - 1])) {
            let fis = s.indexOf(f?.[0])
            let lis = s.lastIndexOf(f?.[f.length - 1])
            if (Math.abs(fis - lis) === 1) {
              r[j] = [
                ...s.slice(0, fis + 1),
                ...f.slice(1, -1),
                ...s.slice(lis)
              ]
              r.splice(i, 1)
              i--, c = true
            }
          }
        }
      }
    }
    for(let i = 0; i < r?.length; i++) {
      for(let j = 0; j < r?.length; j++) {
        if (i !== j) {
          let [sub, superS] = [r[i], r[j]]
          let subI = sub?.map(it => superS?.indexOf(it)).filter(ix => ix !== -1)
          if (subI?.length === sub?.length && subI.join('') === subI.sort((a, b) => a - b).join('')) {
            r.splice(i, 1)
            i--, c = true
            break
          }
        }
      }
    }
  } while (c)

  return r
}

export class Rankings {
  lists: List[] = []

  add(...args: string[]) {
    this.lists.push(args)
    this.lists = consolidate(this.lists)
    console.log('adding chain', args, '\nresulting in', this.lists)
  }

  set(a: string) {
    return {
      above: (b: string) => this.add(a, b),
      below: (b: string) => this.add(b, a),
      between: (b: string) => ({
        and: (c: string) => this.add(b, a, c)
      }),
    }
  }
}
