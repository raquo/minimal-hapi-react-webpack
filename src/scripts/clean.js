const path = require('path');
const FileWriter = require('../tools/file-writer');
const config = require('../config/variables');

FileWriter.remove('.eslintignore');
FileWriter.remove('nodemon.json');
FileWriter.remove(path.relative(config.paths.root, path.join(config.paths.build, '*')));
