'use strict'

var gentlyCopy = require('gently-copy')

var filesToCopy = ['./firebase-messaging-sw.js',]

// User's local directory
var path = process.env.NODE_ENV === 'production' ? 'build' : 'public'

// Moving files to user's local directory
gentlyCopy(filesToCopy, path, { overwrite: true })