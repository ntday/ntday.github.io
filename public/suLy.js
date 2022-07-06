//ket noi voi server
var socket = io("http://localhost:3000/");

socket.on("Server_send_dk_thatBai", function(){
    alert("đăng ký thất bại");
})

socket.on("Server_send_dk_thanhCong", function(data){
    $("#currentUser").html(data);
    $("#loginForm").hide(2000);
    $("#chatForm").show(1000);
})

socket.on("Server_send_danhsach-user",function(data){
  $("#boxContent").html("");
    data.forEach(function(i){
        $("#boxContent").append("<div class='user'>"+i+"</div>");
        $("#txtMessage").html("");
    })
});

socket.on("dangsoangtin",function(data){
  $("#thongBaoDangSoan").html(data);
})

socket.on("ngungSoanTinh",function(data){
    $("#thongBaoDangSoan").html("");
  })

socket.on("server_send_mesage",function(data){
    $("#LisMessages").append( "<div class='ms'>"+data.un+": "+ data.nd+"</div>")
})
$(document).ready(function(){
  $("#loginForm").show();
  $("#chatForm").hide();
  $("#btnRegister").click(function (e) { 
    e.preventDefault();
    socket.emit("client-send-Username", $("#txtUserName").val())
       
});

$("#btnLogout").click(function(){
    socket.emit("logout");
    $("#loginForm").show(1000);
    $("#chatForm").hide(2000);
})

$("#btnSendMessage").click(function(){
    socket.emit("user-send_tinhNhan",
     $("#txtMessage").val()
    )
})

$("#txtMessage").focusin(function(data){
    socket.emit("dang_soan_nt");
})

$("#txtMessage").focusout(function(){
    socket.emit("ngung_soan_nt");
})
})