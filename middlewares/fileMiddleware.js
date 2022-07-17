const {constants} = require("../configs");
const {CustomsError} = require("../errors");

module.exports = {
    checkAvatar: async (req, res, next) => {
        try {
            // if (req.files && req.files.avatar ) второй вариан записи, писали на более старых вариантах ноды
            if (!req.files?.avatar) {
                return next();
            }
            const {mimetype, size} = req.files.avatar;

            if (size > constants.IMAGE_MAX_SIZE ){
                return next(new CustomsError("Max size 3MB"));
            }
            if (!constants.IMAGE_MIMETYPES.includes(mimetype) ){
                return next(new CustomsError("Wrong file type"));
            }
                next();
        } catch (e) {
            next(e);
        }
    }
}