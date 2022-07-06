console.log("server dang chay");

const { Socket } = require("dgram");
var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangUser=["aaa"];

io.on("connection", function(socket){
    console.log(socket.id +" vu ket noi");
   
     socket.on("client-send-Username", function(data){
        console.log(data);

        if(mangUser.indexOf(data)>=0){
           //dang ky that bai
           socket.emit("Server_send_dk_thatBai");
        }
        else{
          //dang ky thanh cong
          mangUser.push(data);
          socket.UserName = data;
          socket.emit("Server_send_dk_thanhCong",data);
          
          io.sockets.emit("Server_send_danhsach-user", mangUser);
        }
     });

       socket.on("logout", function(){
        mangUser.splice(
            mangUser.indexOf(socket.UserName),1
        );

        socket.broadcast.emit("Server_send_danhsach-user", mangUser);
       })
    
       socket.on("user-send_tinhNhan",function(data){
        io.sockets.emit("server_send_mesage", {un:socket.UserName, nd:data})
       })
    socket.on("disconnect", function(){
        console.log(socket.id +" vu ngat ket noi");
    })

    socket.on("dang_soan_nt",function(){
        var s = socket.UserName + "dang soan tin";
        console.log(server.UserName + "dang soan tin");
        io.sockets.emit("dangsoangtin",s);
        
    })

    socket.on("ngung_soan_nt",function(){
        console.log(server.UserName + " ngung soan tin");
        io.sockets.emit("ngungSoanTinh");
    })
});

app.get("/", function(red, res){
    res.render("trangChu");
});