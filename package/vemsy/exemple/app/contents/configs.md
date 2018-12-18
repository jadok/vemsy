# Configs

## Introduction

The configuration of the site are done in the `configs` folder of your application.
You can create your own configuration.
The system configurations start with an '_' before their name.

## Loading

### System properties

Once your custom configuration and the core configuration are loaded they are aggregated in a single data.
In the process of doing it the variables starting with an '_' have their '_'  removed.

### Default system properties

By default, you cannot override a system property.
If the system property end with an '?', this means that the property can be override.
When the property is aggregated the '?' will be removed.
