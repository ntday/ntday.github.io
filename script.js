//  

const timDiaChi = document.getElementById("timDiaChi");
const chiDuong = document.getElementById("chiDuong");
var diemCanTim = document.getElementById("diemCanTim");
const danhSachGoiY = document.getElementById("danhSachGoiY");
const btn_tk = document.getElementById("btn_tk");
const diemBD = document.getElementById("diemBD");
const diemKT = document.getElementById("diemKT");
const danhSachGoiYVT1 = document.getElementById("danhSachGoiYVT1")
const danhSachGoiYVT2 = document.getElementById("danhSachGoiYVT2")
const thongTin_box = document.getElementById("thongTin_box")
var thongtinVT = document.getElementById("thongtinVT")
var huongDan = document.getElementById("huongDan")
// 

const td1 = 10.007623
const td2 = 105.723286
var marker1 = null;
var marker2 = null;
var marker3 = null;
var marker = null;
var vt1, vt2;
var vtCT = { lat: '', lng: '' }, vtCT1 = { lat: '', lng: '' }, vtCT2 = { lat: '', lng: '' }; // vị trí cần tìm
var vt = [], vtCanTim1 = [], vtCanTim2 = []
var popup = L.popup();

var map = L.map('map').setView([td1, td2], 13);

map.removeControl(map.zoomControl);

L.control.zoom({ position: 'topright' }).addTo(map);

L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


function timD() {

    if (timDiaChi.style.display === "block") {
        timDiaChi.style.display = "none"
        thongTin_box.style.display = "block"
        danhSachGoiY.innerHTML = ""
        diemCanTim.value = ""
    } else {
        timDiaChi.style.display = "block"
        thongTin_box.style.display = "none"
        chiDuong.style.display = "none"
        danhSachGoiY.innerHTML = ""
        diemCanTim.value = ""
    }
}

function thongtin() {

    if (thongTin_box.style.display == "block") {
        thongTin_box.style.display = "none"

    } else {
        thongTin_box.style.display = "block"
        timDiaChi.style.display = "none"
        chiDuong.style.display = "none"
    }
}

function chiD() {

    if (chiDuong.style.display == "block") {
        chiDuong.style.display = "none"
        diemBD.value = ""
        diemKT.value = ""
        danhSachGoiYVT1.innerHTML = ""
        danhSachGoiYVT2.innerHTML = ""
    } else {
        chiDuong.style.display = "block"
        thongTin_box.style.display = "none"
        timDiaChi.style.display = "none"
        thongTin_box.style.display = "none"
    }
}


function layInforTheoDoaDo(latU, lonU, value) {

    let urlAPI = `https://nominatim.openstreetmap.org/reverse.php?lat=${latU}&lon=${lonU}&zoom=18&format=jsonv2`
    fetch(urlAPI)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            value(data)
        })
        .catch((err) => {
            console.log("lỗi ")
            value("err")
        })
}


map.on('click', function (e) {
    // chiDuong.style.display = "block"
    if (marker1 === null) {
        thongtinVT.innerHTML = ""
        marker1 = L.marker(e.latlng).addTo(map);
        vt1 = e.latlng
        //console.log(marker1)

        layInforTheoDoaDo(marker1._latlng.lat, marker1._latlng.lng, (data) => {
            if (data != "err") {
                diemBD.value = data.display_name
                console.log(data)
                popup.setLatLng(e.latlng).setContent(data.display_name).openOn(map);
                // thongTin_box.style.display = "block"
                thongtinVT.innerHTML =
                    `<span class="chu">Tên hiển thị </span>: <span>${data.display_name}</span><br>` +
                    `<span class="chu">Địa phận tỉnh thành </span>: <span>${data.address.city}</span><br>` +
                    `<span class="chu">Huyện thành phố </span>: <span>${data.address.city_district}</span><br>` +
                    `<span class="chu">Đường </span>: <span>${data.address.road}</span><br>` +
                    `<span class="chu">Phường</span>: <span>${data.address.suburb}</span><br>` +
                    `<span class="chu">Xã</span>: <span>${data.address.village}</span><br>` +
                    `<span class="chu">Quốc gia </span>: <span>${data.address.country}</span><br>` +
                    `<hr>` +
                    `<span class="chu">Vĩ độ</span>: <span>${data.lat}</span><br>` +
                    `<span class="chu">kinh độ</span>: <span>${data.lon}</span><br>`
            }
        })

    }
    else if (marker2 === null) {
        thongtinVT.innerHTML = ""
        marker2 = L.marker(e.latlng).addTo(map);
        vt2 = e.latlng
        if (chiDuong.style.display == "none") {
            chiDuong.style.display = "block"
        }
        layInforTheoDoaDo(marker2._latlng.lat, marker2._latlng.lng, (data) => {
            if (data != "err") {
                diemKT.value = data.display_name
                console.log(data)
                popup.setLatLng(e.latlng).setContent(data.display_name).openOn(map);
                // thongTin_box.style.display = "block"
                thongtinVT.innerHTML =
                    `<span class="chu">Tên hiển thị </span>: <span>${data.display_name}</span><br>` +
                    `<span class="chu">Địa phận tỉnh thành </span>: <span>${data.address.city}</span><br>` +
                    `<span class="chu">Huyện thành phố </span>: <span>${data.address.city_district}</span><br>` +
                    `<span class="chu">Đường </span>: <span>${data.address.road}</span><br>` +
                    `<span class="chu">Phường</span>: <span>${data.address.suburb}</span><br>` +
                    `<span class="chu">Xã</span>: <span>${data.address.village}</span><br>` +
                    `<span class="chu">Quốc gia </span>: <span>${data.address.country}</span><br>` +
                    `<hr>` +
                    `<span class="chu">Vĩ độ</span>: <span>${data.lat}</span><br>` +
                    `<span class="chu">kinh độ</span>: <span>${data.lon}</span><br>`
            }
        })
    }
    else {
        thongtinVT.innerHTML = ""
        map.removeLayer(marker1);
        map.removeLayer(marker2);
        marker1 = null;
        marker2 = null;
    }

});

// function timVitri(ten) {
//     var url = "https://nominatim.openstreetmap.org/search?format=json&q=" + ten;
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//         })
//         .catch(error => console.error(error));
// }





function timKiemTen2() {
    timKiemTen()
}


function timKiemTen() {
    danhSachGoiY.innerHTML = ""
    console.log(diemCanTim.value)
    let ten = diemCanTim.value
    var url = "https://nominatim.openstreetmap.org/search?format=json&q=" + ten;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            vt = data
            if(data.length<=0){
                alert("không có thông tin vị trí của "+diemCanTim.value)
            }
            for (let i = 0; i < data.length; i++) {
                danhSachGoiY.innerHTML = danhSachGoiY.innerHTML + `<li>${data[i].display_name}</li>`
            }
            return data
        })
        .then((data) => {
            console.log(vt)
        })
        .catch(error => console.error(error));
}



danhSachGoiY.addEventListener("click", function (event) {
    diemCanTim.value = ""
    const clickedItem = event.target;
    const itemValue = clickedItem.textContent;
    diemCanTim.value = itemValue;
    danhSachGoiY.innerHTML = ""
    for (let i = 0; i < vt.length; i++) {
        if (vt[i].display_name === itemValue) {

            vtCT = {
                lat: vt[i].lat,
                lng: vt[i].lon
            }

            marker = L.marker(vtCT).addTo(map);
            thongTin_box.style.display = "block"

            layInforTheoDoaDo(vt[i].lat, vt[i].lon, (data) => {

                if (data != "err") {
                    console.log(data)
                    // popup.setLatLng(e.latlng).setContent(data.display_name).openOn(map);
                    // thongTin_box.style.display = "block"
                    thongtinVT.innerHTML =
                        `<span class="chu">Tên hiển thị </span>: <span>${data.display_name}</span><br>` +
                        `<span class="chu">Địa phận tỉnh thành </span>: <span>${data.address.city}</span><br>` +
                        `<span class="chu">Huyện thành phố </span>: <span>${data.address.city_district}</span><br>` +
                        `<span class="chu">Đường </span>: <span>${data.address.road}</span><br>` +
                        `<span class="chu">Phường</span>: <span>${data.address.suburb}</span><br>` +
                        `<span class="chu">Xã</span>: <span>${data.address.village}</span><br>` +
                        `<span class="chu">Quốc gia </span>: <span>${data.address.country}</span><br>` +
                        `<hr>` +
                        `<span class="chu">Vĩ độ</span>: <span>${data.lat}</span><br>` +
                        `<span class="chu">kinh độ</span>: <span>${data.lon}</span><br>`

                }
            })
        }
    }

});



function timKiemTenBD2() {
    timKiemTenDB()
}


function timKiemTenDB() {
    danhSachGoiYVT1.innerHTML = ""
    console.log(diemBD.value)
    let ten = diemBD.value
    var url = "https://nominatim.openstreetmap.org/search?format=json&q=" + ten; //api tìm kiếm theo tên
    fetch(url)
        .then(response => response.json())
        .then(data => {

            console.log(data)
            if (data.length <= 0) {
                alert("không tìm thấy địa chỉ")
            }
            vtCanTim1 = data
            for (let i = 0; i < data.length; i++) {
                danhSachGoiYVT1.innerHTML = danhSachGoiYVT1.innerHTML + `<li>${data[i].display_name}</li>`
            }
            return data
        })
        .then((data) => {
            console.log(vtCanTim1)
        })
        .catch(error => console.error(error));
}


function timKiemTenDKT2() {
    timKiemTenDKT()
}


function timKiemTenDKT() {
    danhSachGoiYVT2.innerHTML = ""
    console.log(diemKT.value)
    let ten = diemKT.value
    var url = "https://nominatim.openstreetmap.org/search?format=json&q=" + ten;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            vtCanTim2 = data
            if (data.length <= 0) {
                alert("không tìm thấy địa chỉ")
            }
            for (let i = 0; i < data.length; i++) {
                danhSachGoiYVT2.innerHTML = danhSachGoiYVT2.innerHTML + `<li>${data[i].display_name}</li>`
            }
            return data
        })
        .then((data) => {
            console.log(vtCanTim2)
        })
        .catch(error => console.error(error));
}


danhSachGoiYVT1.addEventListener("click", function (e) {
    diemBD.value = ""
    const clickedItem = event.target;
    const itemValue = clickedItem.textContent;
    diemBD.value = itemValue;
    danhSachGoiYVT1.innerHTML = ""
    for (let i = 0; i < vtCanTim1.length; i++) {
        if (vtCanTim1[i].display_name === itemValue) {
            vtCT1 = {
                lat: vtCanTim1[i].lat,
                lng: vtCanTim1[i].lon
            }
        }
    }

    marker1 = L.marker(vtCT1).addTo(map);
    vt1 = e.latlng

    // var markerTemp = marker

    // if(marker === null){
    //     marker = L.marker(vtCT).addTo(map);
    // }
    // else{
    //     map.removeLayer(markerTemp);
    // }

});

danhSachGoiYVT2.addEventListener("click", function (e) {
    diemKT.value = ""
    const clickedItem = event.target;
    const itemValue = clickedItem.textContent;
    diemKT.value = itemValue;
    danhSachGoiYVT2.innerHTML = ""
    for (let i = 0; i < vtCanTim2.length; i++) {
        if (vtCanTim2[i].display_name === itemValue) {
            vtCT2 = {
                lat: vtCanTim2[i].lat,
                lng: vtCanTim2[i].lon
            }
        }
    }

    marker2 = L.marker(vtCT2).addTo(map);
    vt2 = e.latlng

    // var markerTemp = marker

    // if(marker === null){
    //     marker = L.marker(vtCT).addTo(map);
    // }
    // else{
    //     map.removeLayer(markerTemp);
    // }

});

// diemBD.addEventListener('click', function (e) {
//     marker1 = L.marker(e.latlng).addTo(map);
//     layInforTheoDoaDo(marker1._latlng.lat, marker1._latlng.lng, (data) => {
//         if (data != "err") {
//             diemBD.value = data.display_name
//             console.log(data)
//             popup.setLatLng(e.latlng).setContent(data.display_name).openOn(map);
//         }
//     })

// })

// diemKT.addEventListener('click', function (e) {
//     console.log(e.latlng)
//     marker2 = L.marker(e.latlng).addTo(map);
//     layInforTheoDoaDo(marker2._latlng.lat, marker2._latlng.lng, (data) => {
//         if (data != "err") {
//             diemKT.value = data.display_name
//             console.log(data)
//             popup.setLatLng(e.latlng).setContent(data.display_name).openOn(map);
//         }
//     })

// })


function timDuongDi() {

    if (marker1 === null || marker2 === null) {
        alert("chưa chọn địa điểm")
    }
    else {
        var bounds = new L.LatLngBounds(marker1._latlng, marker2._latlng);
        map.fitBounds(bounds);
        L.Routing.control({
            waypoints: [
                L.latLng(marker1._latlng),
                L.latLng(marker2._latlng)
            ]
        }).addTo(map);


        huongDan.innerHTML = "di con trỏ vào đường hướng dẫn màu đỏ sao đó vừa nấm và kéo thả vào vị trí cần đến <br> hoặt nấm và kéo thả nút tích chọn vào vị trí mới"


    }
}

function reset() {
    location.reload();
}

map.on('contextmenu', function (e) {
    chiDuong.style.display == "block"
    console.log(vt1)
    if (vt1 === undefined) {
        alert('chưa chọn địa điểm')
    }
    else {
        L.Routing.control({
            waypoints: [
                L.latLng(vt1),
                L.latLng(vt2)
            ]
        }).addTo(map);

        // timVitri("hậu giang")
        huongDan.innerHTML = "di con trỏ vào đường hướng dẫn màu đỏ sao đó vừa nấm và kéo thả vào vị trí cần đến <br> hoặt nấm và kéo thả nút tích chọn vào vị trí mới"

    }

});