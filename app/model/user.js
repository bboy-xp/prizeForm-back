module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    id: { type: String },
    staffId: { type: String },
    product: { type: String },
    phoneCardType: { type: String },
    name: { type: String },
    phoneNum: { type: String },
    province: { type: String },
    city: { type: String },
    area: { type: String },
    address: { type: String },
    isAccept: { type: Boolean },
    num: { type: Number }
  }, {
      timestamps: true,
    });

  return mongoose.model('User', UserSchema);
}