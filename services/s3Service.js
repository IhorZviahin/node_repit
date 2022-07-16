const S3 = require("aws-sdk/clients/s3");
const path = require("path")
const uuid = require("uuid").v4;

const {AWS_S3_BUCKET, AWS_S3_SECRET_KEY, AWS_S3_ACCESS_KEY, AWS_S3_REGION} = require("../configs/config")

const BucketConfig = new S3({
    region: AWS_S3_REGION,
    secretAccessKey: AWS_S3_SECRET_KEY,
    accessKeyId: AWS_S3_ACCESS_KEY
})

const uploadFile = async (file, itemType, itemId) => {
    const Key = _buildFilePath(file.name,itemType, itemId)
    return BucketConfig.upload({
        Bucket: AWS_S3_BUCKET,
        Key,
        ACL: "public-read",
        Body: file.data
    })
        .promise()
}

module.exports = {
    uploadFile
}

function _buildFilePath(fileName, itemType, itemId) {

    const ext = fileName.split(".").pop() // >беру название файла разбиваю стрингу по "." и возваращаю с помощью pop() значение после точки, мое разширение <jpg>
    // const ext2 = path.extname(fileName) // функция которая с пути беерт разширение файла
    //return `${itemType}/${itemId}/${Date.now()}.${ext}` //v1
    return `${itemType}/${itemId}/${uuid()}.${ext}`  //v2
}