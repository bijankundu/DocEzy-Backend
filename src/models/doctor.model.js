const mongoose = require("mongoose");
const validator = require("validator");
const bycrypt = require("bcryptjs");

const doctorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid email");
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/))
          throw new Error("Password must contain at least on letter and one number");
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    doctor_id: {
      type: String,
      require: true,
      unique: true,
    },
    photo: {
      type: String,
      required: true,
      default: function () {
        return `https://avatars.dicebear.com/api/initials/${this.name}.svg`;
      },
    },
    specialities: {
      type: Array,
      default: [],
    },
    fees: {
      type: Number,
      default: 0,
    },
    experience: {
      type: Number,
      default: 0,
    },
    languages: {
      type: Array,
      default: [],
    },
    is_opt_for_listing: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

//check if email is taken
doctorSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

doctorSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bycrypt.compare(password, user.password);
};

doctorSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bycrypt.hash(user.password, 8);
  }
  next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
