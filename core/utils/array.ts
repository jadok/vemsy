const filters = {
  onlyUnique: (value: any, index: number, self: any[]) => self.indexOf(value) === index
}

export const arrayUnique: any = (arr: any[]) => [ ...new Set(arr) ]// arr.filter(filters.onlyUnique)
