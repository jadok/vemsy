export const clone = orig => Object.assign(Object.create(Object.getPrototypeOf(orig)), orig)
