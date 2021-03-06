/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/
/*jslint node: true */
/*global setImmediate*/
var fs = require("fs-extra");
var path = require("path");
var JoDoc = require("./cordova/jodoc");
var FileHelpers = require("./file_helpers");
var cheerio = require('cheerio');
var jsdiff = require('diff'),
    yaml = require("js-yaml"),
    dir = require("node-dir");
require('colors');

var DocsValidator = (function () {
    'use strict';

    function processEachFileSync(source_path, fileCallback, directoryCallback) {
        var directoryEntries = fs.readdirSync(source_path);
        directoryEntries.forEach(function (dirEntry) {
            var fullPath = path.join(source_path, dirEntry),
                stat;
            if (!fs.existsSync(fullPath)) {
                return;
            }

            stat = fs.lstatSync(fullPath);
            if (stat.isFile()) {
                fileCallback(fullPath);
                return;
            }

            if (stat.isDirectory()) {
                if (directoryCallback(fullPath)) {
                    processEachFileSync(fullPath, fileCallback, directoryCallback);
                }

                return;
            }
        });
    }

    function processEachFile(source_path, fileCallback, directoryCallback, errorCallback) {
        fs.readdirSync(source_path, function (err, directoryEntries) {
            if (err) {
                errorCallback(err);
                return;
            }

            directoryEntries.forEach(function (dirEntry) {
                var fullPath = path.join(source_path, dirEntry);
                fs.exists(fullPath, function (exists) {
                    if (!exists) {
                        return;
                    }

                    fs.lstat(fullPath, function (err, stat) {
                        if (err) {
                            errorCallback(err);
                            return;
                        }

                        if (stat.isFile()) {
                            fileCallback(fullPath);
                            return;
                        }

                        if (stat.isDirectory()) {
                            if (directoryCallback(fullPath)) {
                                processEachFile(fullPath, fileCallback, directoryCallback, errorCallback);
                            }

                            return;
                        }
                    });
                });
            });
        });
    }

    /**
    * Creates a new instance of DocsValidator
    * @param inputDirectory Directory which contains files which has to be processed.
    */
    function DocsValidator(originalDirectory) {
        this.original_directory = originalDirectory || path.join(FileHelpers.getRootDirectory(), "docs");
    }

    /**
    * Validates the specific version of documentation
    * @param language Language which has to be validated.
    * @param version Version which files has to be validated.
    * @param verbose_mode Verbosity level.
    */
    DocsValidator.prototype.validate = function (language, version, verbose_mode) {
        var self = this,
            ignore_list = ['.', '..', '.DS_Store', 'test'];

        verbose_mode = verbose_mode || 0;
        if (verbose_mode > 0) {
            console.log("Comparing docs for lang " + language + " and version " + version);
            console.log("Clearing output directory");
        }

        fs.readdirSync(this.original_directory).forEach(function (language_dir) {
            if (ignore_list.indexOf(language_dir) !== -1) {
                return;
            }

            if (language && language_dir !== language) {
                return;
            }

            var language_path = path.join(self.original_directory, language_dir);

            fs.readdirSync(language_path).forEach(function (version_dir) {
                if (ignore_list.indexOf(version_dir) !== -1) {
                    return;
                }

                if (version && version_dir !== version) {
                    return;
                }

                var input_path = path.join(self.original_directory, language_dir, version_dir),
                    options = {
                        lang: language_dir,
                        version: version_dir,
                        verbose: verbose_mode
                    };

                console.log(" => Validating the Cordova Documentation for " + version_dir + "-" + language_dir + "...");
                self.process(input_path, options);
            });
        });
    };
    DocsValidator.prototype.process = function (original_directory, options) {
        var self = this,
            compareFiles,
            completed;
        console.log("Processing " + original_directory);
        compareFiles = function (fileName) {
            self.validateYaml(fileName, options);
        };
        completed = false;
        dir.readFiles(original_directory,
            { match: /\.md$/ },
            function (err, content, filename, next) {
                if (err) {
                    throw err;
                }

                self.validateYaml(filename, content, options);
                next();
            },
            function (err, files) {
                if (err) {
                    throw err;
                }

                completed = true;
            });
        function waitCompletition() {
            if (!completed) {
                setImmediate(waitCompletition);
            }
        }

        setImmediate(waitCompletition);
    };

    DocsValidator.prototype.validateYaml = function (sourceFile, content, options) {
        if (options.verbose > 0) {
            console.log("Validate " + sourceFile);
        }

        var yamlRegexStripper = /^(---\s*\n[\s\S]*?\n?)^(---\s*$\n?)/m,
            match = yamlRegexStripper.exec(content);

        if (!match) {
            console.log("File " + sourceFile + " miss the YAML license header");
        } else {
            if (match[1].indexOf("license:") === -1) {
                console.log("File " + sourceFile + " has invalid YAML license header");
            }
        }
    };

    return DocsValidator;
}());
module.exports = DocsValidator;
