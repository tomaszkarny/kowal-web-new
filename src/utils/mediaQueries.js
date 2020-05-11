export const bp = {
  small: 576,
  tablet: 768,
  medium: 992,
  large: 1170,
}

export const mq = n => {
  const bpArray = Object.keys(bp).map(key => [key, bp[key]])

  const [result] = bpArray.reduce((acc, [name, size]) => {
    if (n === name) return [...acc, `@media (min-width: ${size}px)`]
    return acc
  }, [])

  return result
}
