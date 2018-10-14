export interface IConfigOption {
  optional: boolean;
  system: boolean;
}

/**
 * Debugs message for configuration properties used.
 *
 * @param {object} newConfiguration
 *   configuration object
 * @param {string} formatedKey
 *   configuration key
 * @param {IConfigOption} options
 *   options object
 * @param {boolean} options.optional
 *   true if the configuration property is optional
 * @param {boolean} silent
 *   if true does not display warning
 */
export const mergeConfigurationWarn = (
  newConfiguration: any,
  formatedKey: string,
  options: IConfigOption,
  silent: boolean
) => {
  if (newConfiguration.hasOwnProperty(formatedKey)) {
    if (options.optional) {
      if (silent) {
        console.warn(
          'system config has been override for the key ' + formatedKey
        )
        return 1
      }
      return 1
    }
    else if (options.system) {
      console.error(
        'system config override on ' + formatedKey,
        'the system config will override your custom configuration.'
      )
      return -1
    }
  }
  return 0
}

export const mergeConfiguration: any = (systemFile: any, customFile: any, silent: boolean = true) => {
  const newConfiguration: any = { ...customFile }
  Object.keys(systemFile).forEach((keys) => {
    let formatedKey: string = keys
    const options: IConfigOption = {
      optional: false,
      system: false
    }
    if (formatedKey.endsWith('?')) {
      formatedKey = formatedKey.substring(0, formatedKey.length - 1)
      options.optional = true
    }
    if (formatedKey.indexOf('_', 0) === 0) {
      formatedKey = formatedKey.substr(1)
      options.system = true
    }
    mergeConfigurationWarn(newConfiguration, formatedKey, options, silent)
    newConfiguration[formatedKey] = systemFile[keys]
  });
  return newConfiguration
}
