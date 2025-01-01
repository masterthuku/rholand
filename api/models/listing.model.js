import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    regularPrice: {
        type: Number,
        required: true,
    },
    discoutPrice: {
        type: Number,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: false,
    },
    furnished: {
        type: Boolean,
        required: false,
    },
    parking : {
        type: Boolean,
        required: false,
    },
    type: {
        type: String,
        required: true
    },
    offer : {
        type: Boolean,
        required: true
    },
    imageUrls: {
        type: Array,
        required: true
    },
    userRef: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;