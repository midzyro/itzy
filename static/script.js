document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleSectionBtn');
    const photoGallery = document.getElementById('photoGallery');
    const recordsWrapper = document.getElementById('recordsWrapper');
    const form = document.getElementById('auctionForm');
    const statusMsg = document.getElementById('statusMsg');
    const purchaseChannelSelect = document.getElementById('purchase_channel');
  
    // 限制 ms1 選項到 6/4
    const today = new Date();
    const deadline = new Date('2025-06-04');
    if (today > deadline) {
      [...purchaseChannelSelect.options].forEach(option => {
        if (option.value.toLowerCase().includes('ms1')) {
          option.disabled = true;
          option.textContent += '（已截止）';
        }
      });
    }
  
    // 表單送出
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
  
      try {
        const res = await fetch(
          'https://script.google.com/macros/s/AKfycbziuTpxNyOEAOWgqwyhAaYaw9Peo1KYKw05pBjNb3xrUUdqNQyYJphKovWCBZOeW2TZ/exec',
          {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const result = await res.json();
        if (result.result === 'success') {
          statusMsg.textContent = '✅ 成功送出！';
          form.reset();
        } else {
          statusMsg.textContent = '❌ 發生錯誤，請稍後再試';
        }
      } catch (err) {
        console.error(err);
        statusMsg.textContent = '❌ 發送失敗，請檢查網路或聯絡管理員';
      }
    });
  
    // 單一按鈕切換特典圖片區和對帳表，互斥顯示
    toggleBtn.addEventListener('click', () => {
      if (photoGallery.classList.contains('visible')) {
        photoGallery.classList.remove('visible');
        photoGallery.classList.add('hidden');
  
        recordsWrapper.classList.remove('hidden');
        recordsWrapper.classList.add('visible');
      } else {
        recordsWrapper.classList.remove('visible');
        recordsWrapper.classList.add('hidden');
  
        photoGallery.classList.remove('hidden');
        photoGallery.classList.add('visible');
      }
    });
  });
  