# Style

## Role

The **style** is refered in different cases in the project:
- The style file that should be compiled (Ex: app/themes/_mytheme_/style/index.scss)
- The compiler of the style file
- The public access of the resource in the public folder

## Compiler

The compiler are registered in the theme constructor.

Each compiler defined which file type it supports.
Each compiler may have a compiler for its file type, however **each compiler have to write the style in the public folder**.

## Implementation

A style file is implemented in the project through [style interpreter](../../../../../core/interpreters/style.ts) and pages.

## Supported styles

For the moment **only** sass and scss are supported.
