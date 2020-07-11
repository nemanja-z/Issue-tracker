const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    project: { required: true, type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bugs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bug' }]
});
projectSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
});
module.exports = mongoose.model('Project', projectSchema);