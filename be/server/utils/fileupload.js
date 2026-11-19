var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./server/utils/application.properties');
const { logger } = require('./../config/log-config');
const LOG = logger.getLogger('FileUpload.js');
var fs = require('fs');
var multer = require('multer');
var mime = require('mime-types')
var request = require('request');
let path = properties.get('media.file')
const _ = require('lodash');

var arr = new Array('pdf', 'png', 'jpeg', 'jpg');
var allowedMimeTypes = new Array("application/pdf", "image/jpg", "image/jpeg", "image/png");

var setPath = function (dir) {
    path = dir;
    checkDirectorySync(path);
}

// Upload file with multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path)
    },
    filename: function (req, file, cb) {
        let wfIds;
        let flag = false;
        let extArray = file.mimetype.split("/");
        let extension = file.originalname.split(".");
        console.log('File ', file);
        if (file.mimetype !== null) {
            _.forEach(allowedMimeTypes, async (wi) => {
                if (file.mimetype === wi) {
                    flag = true;
                }
            });
            if (flag) {
                LOG.debug('file ' + extArray + ' ext ' + extension[extension.length - 1]);
                fileName = Date.now() + '_' + new Date().getDate() + '_' + file.originalname;
                cb(null, fileName);
            } else {
                LOG.error('File is not correct...');
                return cb(null, "", new Error("Only images and pdf are allowed"));
            }
        }
    }
})
var upload = multer({ storage: storage });

// const upload = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//       if (
//         !file.mimetype.includes("jpeg") &&
//         !file.mimetype.includes("jpg") &&
//         !file.mimetype.includes("png") &&
//         !file.mimetype.includes("pdf")
//       ) {
//         return cb(null, false, new Error("Only images and pdf are allowed"));
//       }
//       cb(null, true);
//     }
//   });

// check directory whether exists or not
const checkDirectorySync = function (directory) {
    try {
        fs.statSync(directory);
        LOG.debug('created');
    } catch (e) {
        LOG.debug('created')
        fs.mkdirSync(directory);
    }
}

// copy files from source to destination
var copyFile = function (uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

// download files from destination
var download = function (uri, filename, req, res) {

    // added to prevent app crash 
    if (!filename) {
        return res.status(404).json({
            message: 'File not available'
        });
    }
    /////////

    var mimeType = mime.contentType(filename)
    console.log('mime ' + mimeType)

    if (mimeType === null) {
        mimeType = "application/octet-stream";
    }
    // filenames = fs.readdirSync('E:\rcs\media/');
    LOG.debug('Starting directory: ' + process.cwd());
    try {
        // process.chdir(uri);
        LOG.debug('New directory: ' + uri + filename);
    }
    catch (err) {
        LOG.debug('chdir: ' + err);
    }
    fs.readFile(uri + filename, function (err, content) {
        // if (err) {
        //     var img = fs.readFileSync(properties.get('media.file') + 'SampleTest.jpg');
        //     res.setHeader('content-type',mimeType)
        //     res.setHeader('content-length',img.length)
        //     res.setHeader("Content-Disposition", "attachment;filename=" + 'SampleTest.jpg')
        //     res.end(img, 'binary');
        // }

        if (err) {
            console.log('File read error:', err);

            try {
                const fallbackPath = properties.get('media.file') + 'SampleTest.jpg';

                if (fs.existsSync(fallbackPath)) {
                    var img = fs.readFileSync(fallbackPath);

                    res.setHeader('content-type', mimeType);
                    res.setHeader('content-length', img.length);
                    res.setHeader("Content-Disposition", "attachment;filename=SampleTest.jpg");

                    return res.end(img, 'binary');
                } else {
                    // fallback also missing → no crash
                    return res.status(404).json({
                        message: 'File not found'
                    });
                }

            } catch (e) {
                console.error('Fallback error:', e);
                return res.status(500).json({
                    message: 'Error retrieving file'
                });
            }
        }
        else {
            //specify the content type in the response will be an image
            res.setHeader('content-type', mimeType)
            res.setHeader('content-length', content.length)
            res.setHeader("Content-Disposition", "attachment;filename=" + filename)
            res.end(content, 'binary');
        }
    });
};
checkDirectorySync(path);
module.exports = {
    checkDirectorySync,
    download,
    copyFile,
    upload,
    setPath
}
