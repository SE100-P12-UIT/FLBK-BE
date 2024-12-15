const deleteAtPath = (obj, path, index) => {
    if(index === path.length - 1) {
        delete obj[path[index]];
        return;
    }
    deleteAtPath(obj[path[index]], path, index + 1);
}

const transform = (doc, ret, options) => {
    Object.keys(doc.schema.paths).forEach((path) => {
        if(doc.schema.paths[path].options && doc.schema.paths[path].options.private)
            deleteAtPath(ret, path.split('.'), 0);
    });

    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
}

const toJSON = (schema) => {
    schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
        transform,
    });

    schema.options.toObject = Object.assign(schema.options.toObject || {}, {
        transform,
    });
}

module.exports = toJSON;