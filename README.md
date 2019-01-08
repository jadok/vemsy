# Vemsy

[![Build Status](https://travis-ci.org/jadok/vemsy.svg?branch=master)](https://travis-ci.org/jadok/vemsy)
[![Coverage Status](https://coveralls.io/repos/github/jadok/vemsy/badge.svg?branch=master)](https://coveralls.io/github/jadok/vemsy?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/5798bfd75f7b46a292f52a205ede14c3)](https://app.codacy.com/app/quentin.jadeau/vemsy?utm_source=github.com&utm_medium=referral&utm_content=jadok/vemsy&utm_campaign=Badge_Grade_Dashboard)
[![GitHub version](https://badge.fury.io/gh/jadok%2Fvemsy.svg)](https://badge.fury.io/gh/jadok%2Fvemsy)

## What is it ?

When coding, we like to write it is for me mandatory to write files with a limited number of lines and functions as well as 1 file >= 1 functionality.

The question now is why would I not impose the same rigor when writing a text / documentation about some subjects.

### Rich text editor

Normally to do such thing, I use a rich text editor (such as Microsoft Word), write a summary, with a lot of sub-subject in it. When doing that at some points they are subjects difficult to categorize to put in your section _x_ page 10 or you section _y_ page 30, that the moment when I realize splitting the document might be interesting.
Another use case that might appear is when you have repeated category of subject with the same sub-section, and sub-sub-sections... splitting it in multiple files is more interesting.

### CMS

In case I want to write something bigger, with more people working on it, I will probably chose to use a CMS.
This will allow me to write different types of content with some of the most used features of a rich text edition thanks to [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG).
This gives the possibility to a very details roles permissions to handle all kind of contributors of your project.

Th downside of it, is when you want new type of content, you will need developer to release your new type of content even if no specific features are needed aside adding some fields with no dependency between contents.
When you chose a CMS, you will have to think about your database, the charge your website can handle, if you need cache on your webpage ... and so one.

## How to use it ?

Unfortunatly, there is no boilerplate available for the moment.
Instead you can coppy the [example folder](./package/vemsy/example/)

The [entry point](./package/vemsy/example/app/index.js) defined all the tasks loader that will be executed to [set up](https://github.com/jadok/middleware-setup) the application.

## Features

The list of all the features currently available:

- Render markdown files following folder structure
- Task loading setup
- Add your own express middlewares

