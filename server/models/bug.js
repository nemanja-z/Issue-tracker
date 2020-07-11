const mongoose = require('mongoose');
const bugSchema = new mongoose.Schema({
    title: { required: true, type: String },
    description: { required: true, type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bugs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bug' }]
});
bugSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
});
module.exports = mongoose.model('Bug', bugSchema);