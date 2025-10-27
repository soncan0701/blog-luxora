const Customer = require('../models/Customer');

class CustomerController {
    
    // [POST] /customer/store
    async store(req, res) {
        try {
            const newCustomer = new Customer(req.body);
            await newCustomer.save();

            console.log('Đã lưu khách hàng mới:', req.body.hoTen);

            // === SỬA LỖI Ở ĐÂY ===

            // 1. Lấy URL của trang trước đó từ 'Referer' header.
            // 2. Nếu không có (ví dụ: do trình duyệt chặn), thì quay về trang chủ ('/')
            const backUrl = req.headers.referer || '/';

            // 3. Chuyển hướng về URL đó
            res.redirect(backUrl); 

            // === HẾT SỬA ===

        } catch (error) {
            console.error('Lỗi khi lưu khách hàng:', error);
            // Nếu lỗi, cũng chuyển hướng về trang cũ
            const backUrl = req.headers.referer || '/';
            res.redirect(backUrl);
        }
    }
    //
    async registerPopup(req, res) {
        // req.body sẽ chứa dữ liệu JSON từ 'fetch'
        const { hoTen, soDienThoai, noiDung } = req.body;

        // Kiểm tra cơ bản
        if (!hoTen || !soDienThoai) {
            return res.status(400).json({ 
                success: false, 
                message: 'Thiếu thông tin Họ tên hoặc Số điện thoại.' 
            });
        }

        try {
            // Tạo một khách hàng mới từ Model
            const newCustomer = new Customer({
                hoTen,
                soDienThoai,
                noiDung
            });

            // Lưu vào database
            await newCustomer.save();

            // Trả về thông báo thành công
            res.status(201).json({ 
                success: true, 
                message: 'Đăng ký nhận thông tin thành công!' 
            });

        } catch (error) {
            console.error('Lỗi khi lưu Customer:', error);
            res.status(500).json({ 
                success: false, 
                message: 'Đã xảy ra lỗi máy chủ, không thể đăng ký.' 
            });
        }
    }
}

module.exports = new CustomerController();