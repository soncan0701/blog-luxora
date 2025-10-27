// File này chỉ chứa logic layout (hiện/ẩn form khi cuộn)
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Lấy các phần tử
    const headerBanner = document.querySelector('.header');
    const formLienHe = document.querySelector('.formlienhe-container');
    const iconsTrai = document.querySelector('.lienhe-icons-trai');
    const bodyTag = document.querySelector('body'); 

    if (!formLienHe || !iconsTrai || !bodyTag) {
        return;
    }

    // 2. Kiểm tra xem có phải trang chủ (có banner 100vh) không
    const isHomePageWithBanner = headerBanner && !headerBanner.classList.contains('no-background');

    if (isHomePageWithBanner) {
        // 3. NẾU LÀ TRANG CHỦ:
        
        // Ẩn chúng đi lúc đầu
        formLienHe.style.opacity = '0';
        formLienHe.style.visibility = 'hidden';
        iconsTrai.style.opacity = '0';
        iconsTrai.style.visibility = 'hidden';

        // Thêm hiệu ứng mượt
        formLienHe.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        iconsTrai.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';

        // Lấy chiều cao của banner
        const bannerHeight = headerBanner.offsetHeight;

        // 4. Gán sự kiện lắng nghe cuộn chuột
        window.addEventListener('scroll', function() {
            if (window.scrollY > (bannerHeight * 0.8)) {
                // Hiện ra khi cuộn qua banner
                formLienHe.style.opacity = '1';
                formLienHe.style.visibility = 'visible';
                iconsTrai.style.opacity = '1';
                iconsTrai.style.visibility = 'visible';
            } else {
                // Ẩn đi khi cuộn ngược lên
                formLienHe.style.opacity = '0';
                formLienHe.style.visibility = 'hidden';
                iconsTrai.style.opacity = '0';
                iconsTrai.style.visibility = 'hidden';
            }
        });

    } else {
        // 5. NẾU LÀ TRANG CON (Vị Trí, Mặt Bằng...):
        bodyTag.classList.add('subpage-layout');
    }
});
