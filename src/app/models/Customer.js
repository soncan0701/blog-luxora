const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
    {
        // Tên trường phải khớp với form của bạn
        hoTen: { type: String, required: true },
        soDienThoai: { type: String, required: true },
        noiDung: { type: String }, // Nội dung là tùy chọn, không 'required'
    },
    {
        timestamps: true, // Rất quan trọng, để biết khách đăng ký lúc nào
    },
);

module.exports = mongoose.model('Customer', CustomerSchema);