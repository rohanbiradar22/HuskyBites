import mongoose, { Schema } from 'mongoose';

const AddressSchema = new Schema({
    addressLine: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    zipCode: {
        type: String,
        required: false
    },
    geolocation: {
        latitude: {
            type: String,
            required: false
        },
        longitude: {
            type: String,
            required: false
        }
    }
});

const AddressModel = mongoose.model('Address', AddressSchema);

export default AddressModel;