#!/usr/bin/env node

import { join } from 'path'
const generateDirectory = require("generate-directory")

const srcDir = join('.');
const gen = new generateDirectory.GenerateDirectory(srcDir, process.cwd())
gen.fullGeneration()
