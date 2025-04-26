import * as JoiBase from 'joi';
import { ObjectId as MongoObjectId } from 'mongodb';
import { ObjectId as BSONObjectId } from 'bson';
import mongoose from 'mongoose';

import { extendJoiWithObjectId } from '../src';

const Joi = extendJoiWithObjectId(JoiBase);

describe('Joi ObjectId Extension', () => {
    const schema = Joi.object({
        id: Joi.objectId().required(),
    });

    it('should validate a correct ObjectId', () => {
        const result = schema.validate({ id: '507f191e810c19729de860ea' });
        expect(result.error).toBeUndefined();
        expect(result.value.id).toBe('507f191e810c19729de860ea');
    });

    it('should reject an ObjectId that is too short', () => {
        const result = schema.validate({ id: '507f191e810c19729de860' });
        expect(result.error).toBeDefined();
        expect(result.error?.details[0].message).toContain('must be a valid 24-character hex ObjectId');
    });

    it('should reject an ObjectId with non-hex characters', () => {
        const result = schema.validate({ id: '507f191e810c19729de860ez' });
        expect(result.error).toBeDefined();
    });

    it('should reject an ObjectId that is too long', () => {
        const result = schema.validate({ id: '507f191e810c19729de860eaffff' });
        expect(result.error).toBeDefined();
    });

    it('should fail if id is missing', () => {
        const result = schema.validate({});
        expect(result.error).toBeDefined();
        expect(result.error?.details[0].message).toContain('"id" is required');
    });

    it('should accept an ObjectId with uppercase hex letters', () => {
        const result = schema.validate({ id: '507F191E810C19729DE860EA' });
        expect(result.error).toBeUndefined();
    });
    
    it('should reject a string with correct length but with special characters', () => {
        const result = schema.validate({ id: '507f191e810c19729de86@ea' });
        expect(result.error).toBeDefined();
    });
    
    it('should reject an ObjectId with whitespace', () => {
        const result = schema.validate({ id: '507f191e810c19729d e860ea' });
        expect(result.error).toBeDefined();
    });
    
    it('should reject an empty string as ObjectId', () => {
        const result = schema.validate({ id: '' });
        expect(result.error).toBeDefined();
    });
    
    it('should reject a non-string value (e.g., number)', () => {
        const result = schema.validate({ id: 123456789012345678901234 });
        expect(result.error).toBeDefined();
    }); 

    it('should accept a MongoDB BSON ObjectId instance', () => {
        const objectId = new MongoObjectId('507f191e810c19729de860ea');
        const result = schema.validate({ id: objectId });
        expect(result.error).toBeUndefined();
    });
    
    it('should accept a BSON package ObjectId instance', () => {
        const objectId = new BSONObjectId('507f191e810c19729de860ea');
        const result = schema.validate({ id: objectId });
        expect(result.error).toBeUndefined();
    });
    
    it('should accept a Mongoose ObjectId instance', () => {
        const objectId = new mongoose.Types.ObjectId('507f191e810c19729de860ea');
        const result = schema.validate({ id: objectId });
        expect(result.error).toBeUndefined();
    });
});
