#!/usr/bin/env node

import { join } from 'path'
import { GenerateDirectory } from 'generate-folders'

const srcDir = join(__dirname);
const gen = new GenerateDirectory(srcDir, process.cwd())
gen.fullGeneration()
