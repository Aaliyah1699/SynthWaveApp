import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide name'],
            minLength: 3,
            maxLength: 50,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Please provide email'],
            validate: {
                validator: validator.isEmail,
                message: 'Please provide valid email',
            },
        },
        password: {
            type: String,
            required: [true, 'Please provide password'],
            min: 6,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
