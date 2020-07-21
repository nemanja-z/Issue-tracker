//import * as shortid from "shortid";
//import { createWriteStream } from "fs";
const { createWriteStream } = require("fs");
const { shortid } = require("shortid");
const storeUpload = async (stream, mimetype) => {

    const extension = mimetype.split("/")[1];
    const id = `${shortid.generate()}.${extension}`;
    const path = `src/images/${id}`;

    return new Promise((resolve, reject) =>
        stream
            .pipe(createWriteStream(path))
            .on("finish", () => resolve({ id, path }))
            .on("error", reject)
    );
};

const processUpload = async (upload) => {
    const { stream, mimetype } = await upload;
    const { id } = await storeUpload(stream, mimetype);
    return id;
};
module.exports = {
    Mutation: {
        createIssue: async (_, { input: { attachment, ...data } }, { models, user }) => {
            const attachmentUrl = attachment ? processUpload(attachment) : null;
            try {
                await models.Issue.create({
                    ...data,
                    attachment: attachmentUrl,
                    userId: user.id
                });
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        }
    }
}