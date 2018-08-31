#!/usr/bin/env node

import { join } from 'path'
const generateDirectory = require("generate-directory")

const srcDir = join('.', 'folder-structure');
const gen = new generateDirectory.GenerateDirectory(srcDir, process.cwd())
gen.fullGeneration()
