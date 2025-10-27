// src/public/js/popup.js
// FILE NÀY BÂY GIỜ XỬ LÝ CẢ 3 FORM + TIMER THÔNG MINH

document.addEventListener("DOMContentLoaded", function() {
    
    // --- BIẾN TOÀN CỤC CHO TIMER ---
    let smartTimerId = null; // Timer cho popup
    let isUserTyping = false; // Cờ kiểm tra người dùng có đang gõ

    // --- HÀM DÙNG CHUNG ĐỂ GỬI FORM (ĐÃ CÓ) ---
    async function submitFormData(data, formElement) {
        if (!data.hoTen || !data.soDienThoai) {
            alert('Vui lòng nhập đầy đủ Họ tên và Số điện thoại.');
            return false; 
        }
        try {
            const response = await fetch('/customer/customer-register', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (result.success) {
                alert('Đăng ký thành công! Chúng tôi sẽ liên hệ lại.');
                if (formElement) formElement.reset(); 
                return true;
            } else {
                alert(result.message || 'Đã xảy ra lỗi, vui lòng thử lại.');
                return false; 
            }
        } catch (error) {
            console.error('Lỗi khi gửi form:', error);
            alert('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
            return false; 
        }
    }

    // --- LOGIC 1: DÀNH CHO POPUP FORM ---
    const modalOverlay = document.getElementById("popup-overlay");
    const closeModalBtn = document.getElementById("close-popup-btn");
    const popupForm = document.getElementById("popup-form"); 

    // --- LOGIC 2: DÀNH CHO FOOTER FORM ---
    const footerForm = document.getElementById("footer-form"); 

    // --- LOGIC 3: DÀNH CHO SIDE FORM ---
    const sideForm = document.getElementById("side-form"); // Lấy form bằng ID mới

    // --- LOGIC TIMER THÔNG MINH ---
    function resetPopupTimer() {
        if (smartTimerId) clearTimeout(smartTimerId); // Xóa timer cũ
        // Chỉ đặt timer mới nếu người dùng KHÔNG đang gõ
        if (!isUserTyping) {
            smartTimerId = setTimeout(showModal, 30000); // 30 giây
        }
    }

    function showModal() {
        // Chỉ hiện popup nếu người dùng KHÔNG đang gõ
        if (isUserTyping) return; 
        if (modalOverlay) modalOverlay.classList.add("show");
    }

    function closeModal() {
        if (modalOverlay) modalOverlay.classList.remove("show");
        // Khi đóng, khởi động lại timer
        resetPopupTimer();
    }

    // Gán sự kiện "đang gõ" cho TẤT CẢ input/textarea
    const allInputs = document.querySelectorAll('#popup-form input, #popup-form textarea, #footer-form input, #side-form input, #side-form textarea');
    
    allInputs.forEach(input => {
        input.addEventListener('focus', () => {
            isUserTyping = true;
            if (smartTimerId) clearTimeout(smartTimerId); // Dừng timer ngay
        });
        
        input.addEventListener('blur', () => {
            isUserTyping = false;
            resetPopupTimer(); // Gõ xong, đặt lại timer
        });
    });


    // --- KÍCH HOẠT LOGIC CÁC FORM ---

    // 1. Kích hoạt Popup
    if (modalOverlay && closeModalBtn && popupForm) {
        showModal(); // Hiển thị lần đầu
        closeModalBtn.addEventListener("click", closeModal);
        modalOverlay.addEventListener("click", function(event) {
            if (event.target === modalOverlay) closeModal();
        });

        popupForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const data = {
                hoTen: document.getElementById('ho-ten').value,
                soDienThoai: document.getElementById('sdt-zalo').value,
                noiDung: document.getElementById('noi-dung').value
            };
            const success = await submitFormData(data, popupForm);
            if (success) {
                closeModal(); // Đóng popup nếu gửi thành công
            }
        });
    } else {
        console.log("Không tìm thấy các phần tử của Popup Form.");
    }

    // 2. Kích hoạt Footer Form
    if (footerForm) {
        footerForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const data = {
                hoTen: document.getElementById('footer-ho-ten').value,
                soDienThoai: document.getElementById('footer-sdt').value,
                noiDung: document.getElementById('footer-noi-dung').value
            };
            await submitFormData(data, footerForm); 
        });
    } else {
        console.log("Không tìm thấy Footer Form.");
    }

    // 3. Kích hoạt Side Form
    if (sideForm) {
        sideForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const data = {
                // Dùng ID từ file sideForm.hbs
                hoTen: document.getElementById('lienhe_ho_va_ten').value,
                soDienThoai: document.getElementById('lienhe_so_dien_thoai').value,
                noiDung: document.getElementById('lienhe_noi_dung').value
            };
            await submitFormData(data, sideForm);
        });
    } else {
        console.log("Không tìm thấy Side Form.");
    }

});

