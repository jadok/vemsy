#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var path_1 = require("path");
var generateDirectory = require("generate-directory");
var srcDir = path_1.join('.');
var gen = new generateDirectory.GenerateDirectory(srcDir, process.cwd());
gen.fullGeneration();
