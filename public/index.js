// * FRONTEND

//* lista de productos
function renderProds(data) {
    const html = data.map((el) => 
    `<tr>
        <td>${el.title}</td>
        <td>${el.price}</td>
        <td>${el.thumbnail}</td>
    </tr>`
    )
    .join(" ");
  
    document.getElementById("productList").innerHTML = html;
    }

//* lista de mensajes
function renderMessages(data) {
    const html = data.map((el) => 
    `<li class='my-1 list-group-item'>
        <span class='text-primary fw-bold'>${el.author}</span>
        <span class='text-danger'>[${el.date}]:</span>
        <span class='text-success fst-italic'>${el.msg}</span>
    </li>`
  
    )
    .join("</br>");
  
    document.getElementById("msgContainer").innerHTML = html;
  }

  const socket = io.connect();

  // mensajes
  function sendMessage(e) {
    e.preventDefault()    //para que el formulario no se envíe
    const email = document.getElementById("email").value;
    const msgContent = document.getElementById("msgContent").value;
    document.getElementById("msgContent").value = "";
    socket.emit("newMsg", { author: email, date: new Date, msg: msgContent });
  }

  const formMsg=document.getElementById('formMsg')
  formMsg.addEventListener('submit', sendMessage)

  socket.on("listMsg", (data) => {
    console.log(data);
    renderMessages(data);
  });
  
  // productos
  function sendProd(e) {
    e.preventDefault()    //para que el formulario no se envíe
    const title = document.getElementById("formTitle").value;
    const price = document.getElementById("formPrice").value;
    const thumbnail = document.getElementById("formThumbnail").value;
    document.getElementById("formTitle").value = "";
    document.getElementById("formPrice").value = "";
    document.getElementById("formThumbnail").value = "";
    socket.emit("newProd", { title: title, price: price, thumbnail: thumbnail });
  
  }
  const formProds=document.getElementById('formProds')
  formProds.addEventListener('submit', sendProd)
  
  socket.on("listProds", (data) => {
    console.log(data);
    renderProds(data)
  });
  