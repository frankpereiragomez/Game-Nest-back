import mongoose from "mongoose";

const connectToDatabase = async (mongoUrl: string) => {
  mongoose.set("debug", false);
  mongoose.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      delete ret._id;
    },
  });

  await mongoose.connect(mongoUrl);
};

export default connectToDatabase;
