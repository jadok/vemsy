Object.prototype.cloneCustom = function () {
  return Object.assign(Object.create(Object.getPrototypeOf(this)), this)
}
