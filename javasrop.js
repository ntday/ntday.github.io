var caito = document.getElementById('to');
var tong;
function up(){
    caito.classList.remove('chuyenDong2');
       caito.classList.add('chuyenDong1');
    

       setTimeout(() => {
    const kq1 = Math.floor(Math.random()*6)+1;
    const anhKQ1 = `images/dice${kq1}.png`;
    document.getElementById('ketQua1').setAttribute('src',anhKQ1);
  
    const kq2 = Math.floor(Math.random()*6)+1;
    const anhKQ2 = `images/dice${kq2}.png`;
    document.getElementById('ketQua2').setAttribute('src',anhKQ2);
  
    const kq3 = Math.floor(Math.random()*6)+1;
    const anhKQ3 = `images/dice${kq3}.png`;
    document.getElementById('ketQua3').setAttribute('src',anhKQ3);
  
    tong = kq1+kq2+kq3;
    if(tong>=4 && tong<=10){  
          document.getElementById("inKetQua").innerHTML = tong+" điểm: Xỉu";
  }
  else if(tong>=11 && tong<=17){
          document.getElementById("inKetQua").innerHTML = tong+" điểm: Tài";

      
  }
  else{
      
          document.getElementById("inKetQua").innerHTML = tong+" điểm: ngoại lệ cái ăn hết";
      
      
  }

},1000);
  }

  function mo(){
      caito.classList.remove('chuyenDong1');
      caito.classList.add('chuyenDong2');
  }