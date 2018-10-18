# Vemsy

[![Build Status](https://travis-ci.org/jadok/vemsy.svg?branch=master)](https://travis-ci.org/jadok/vemsy)
[![Coverage Status](https://coveralls.io/repos/github/jadok/vemsy/badge.svg?branch=master)](https://coveralls.io/github/jadok/vemsy?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5798bfd75f7b46a292f52a205ede14c3)](https://app.codacy.com/app/quentin.jadeau/vemsy?utm_source=github.com&utm_medium=referral&utm_content=jadok/vemsy&utm_campaign=Badge_Grade_Dashboard)
[![GitHub version](https://badge.fury.io/gh/jadok%2Fvemsy.svg)](https://badge.fury.io/gh/jadok%2Fvemsy)

## What is it ?

CMS (Content Management System) are overused specially when creating blogs. A static website could respond to the need in many case which means a smaller architecture (no database) and probably a lower hosting cost.

When you are creating a documentation or synthesizing a subject you read on maybe severals articles or books, you may create a big Text document and styling it. For those need Markdown solve most of them specially if you customize a little the css or use some that was done by other (Ex: [markdown-css-themes](https://github.com/jasonm23/markdown-css-themes) )

## How to use it ?

This package is not ready yet to be publish. It should be publish soon.
Meanwhile it is possible to use it through the [development environment](./cli/.setup-folder/app/contents/DevEnv.md).

The project provide a library extending `express`, rendering **markdown** throught `twig` view template.

The project provide as well a boilerplate through [generate-folders](https://www.npmjs.com/package/generate-folders) to deploy and install the setup folders.

The website is served by default on the port [9999](http://localhost:9999)

## Features

The list of all the features currently available:

- Render markdown files
- Compile style files (sass / scss) and render it in the public folder
