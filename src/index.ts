import * as JoiBase from 'joi';

const objectIdRegex = /^[a-f\d]{24}$/i;

const objectIdExtension: JoiBase.Extension = {
    type: 'objectId',
    base: JoiBase.any(),
    messages: {
        'objectId.base': '"{{#label}}" must be a valid 24-character hex ObjectId',
    },
    validate(value: any, helpers: JoiBase.CustomHelpers) {
        const stringValue = typeof value === 'object' && value !== null && typeof value.toString === 'function'
            ? value.toString()
            : value;
            
        if (typeof stringValue !== 'string' || !objectIdRegex.test(stringValue)) {
            return { value, errors: helpers.error('objectId.base') };
        }
        
        return { value };
    },
};

export function extendJoiWithObjectId(joi: typeof JoiBase) {
    return joi.extend(objectIdExtension);
}

export default objectIdExtension;
