# joi-objectid-extension

A Joi extension for validating MongoDB ObjectIDs in your validation schemas.

[![npm version](https://img.shields.io/npm/v/joi-objectid-extension.svg)](https://www.npmjs.com/package/joi-objectid-extension)
[![License](https://img.shields.io/npm/l/joi-objectid-extension.svg)](https://github.com/yourusername/joi-objectid-extension/blob/main/LICENSE)

## Features

- Validates ObjectID strings (24 character hex strings)
- Works with actual MongoDB ObjectId instances
- Compatible with multiple ObjectId implementations:
  - MongoDB native driver (`mongodb`)
  - BSON package (`bson`)
  - Mongoose ObjectIds (`mongoose.Types.ObjectId`)
- TypeScript support
- Zero dependencies
- Simple API

## Installation

```bash
npm install joi-objectid-extension --save
# or
yarn add joi-objectid-extension
```

## Usage

### Basic usage

```typescript
import Joi from "joi";
import { extendJoiWithObjectId } from "joi-objectid-extension";

// Extend Joi with the ObjectId type
const ExtendedJoi = extendJoiWithObjectId(Joi);

// Create a schema with ObjectId validation
const schema = ExtendedJoi.object({
  id: ExtendedJoi.objectId().required(),
  optionalId: ExtendedJoi.objectId(),
});

// Validate a string ObjectId
const result1 = schema.validate({
  id: "507f191e810c19729de860ea",
  optionalId: "507f191e810c19729de860eb",
});
// result1.error is undefined (validation passes)

// Validate with invalid ObjectId
const result2 = schema.validate({
  id: "not-an-objectid",
});
// result2.error contains validation error
```

### Using with MongoDB's ObjectId

```typescript
import Joi from "joi";
import { ObjectId } from "mongodb";
import { extendJoiWithObjectId } from "joi-objectid-extension";

const ExtendedJoi = extendJoiWithObjectId(Joi);

const schema = ExtendedJoi.object({
  id: ExtendedJoi.objectId().required(),
});

// Create a MongoDB ObjectId instance
const objectId = new ObjectId("507f191e810c19729de860ea");

// Validate the ObjectId instance
const result = schema.validate({ id: objectId });
// result.error is undefined (validation passes)
```

### Using with Mongoose

```typescript
import Joi from "joi";
import mongoose from "mongoose";
import { extendJoiWithObjectId } from "joi-objectid-extension";

const ExtendedJoi = extendJoiWithObjectId(Joi);

const schema = ExtendedJoi.object({
  id: ExtendedJoi.objectId().required(),
});

// Create a Mongoose ObjectId
const objectId = new mongoose.Types.ObjectId("507f191e810c19729de860ea");

// Validate the Mongoose ObjectId
const result = schema.validate({ id: objectId });
// result.error is undefined (validation passes)
```

### Using with BSON package

```typescript
import Joi from "joi";
import { ObjectId } from "bson";
import { extendJoiWithObjectId } from "joi-objectid-extension";

const ExtendedJoi = extendJoiWithObjectId(Joi);

const schema = ExtendedJoi.object({
  id: ExtendedJoi.objectId().required(),
});

// Create a BSON ObjectId
const objectId = new ObjectId("507f191e810c19729de860ea");

// Validate the BSON ObjectId
const result = schema.validate({ id: objectId });
// result.error is undefined (validation passes)
```

## API

### `extendJoiWithObjectId(joi)`

Extends a Joi instance with the ObjectId extension.

**Parameters:**

- `joi`: Joi module to extend

**Returns:** Extended Joi with ObjectId validation support

### `Joi.objectId()`

Creates a Joi schema that validates ObjectIds.

- Validates strings of exactly 24 hex characters
- Works with MongoDB ObjectId instances, Mongoose ObjectIds, and BSON package ObjectIds

## Compatibility

- Works with Joi v17+
- Compatible with Node.js 12+
- TypeScript 4.0+

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
