import Style from './style.js'

const styleTypeCheck = (input) => {
  return input instanceof Style
    && typeof input.file === 'string'
    && typeof input.media === 'string'
    && ['string', 'undefined'].includes(typeof input.priority)
}

export default styleTypeCheck
