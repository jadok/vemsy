const mergeConfigurationWarn = (newConfiguration: any, formatedKey: string, options: any, silent: boolean) => {
  if (newConfiguration.hasOwnProperty(formatedKey)) {
    if (options.optional) {
      if (silent) {
        console.warn(
          'system config has been override for the key ' + formatedKey
        )
      }
    }
    else if (options.system) {
      console.error(
        'system config override on ' + formatedKey,
        'the system config will override your custom configuration.'
      )
    }
  }
}

export const mergeConfiguration: any = (systemFile: any, customFile: any, silent: boolean = true) => {
  const newConfiguration: any = { ...customFile }
  Object.keys(systemFile).forEach((keys) => {
    let formatedKey: string = keys
    const options: any = {
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
