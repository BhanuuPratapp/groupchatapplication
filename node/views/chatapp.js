//const { getmessages } = require("../controllers/msg");
let getgroupmessages
let getmessages
const sendmsg = document.getElementById("sdmsg");
const token = localStorage.getItem("token");
sendmsg.addEventListener("click", (e) => {
  e.preventDefault();
  const message = document.getElementById("msginput").value;
  const groupid = document.getElementById("groupid").value;

  let msgdetails = {
    token: token,
    message: message,
    groupid: groupid,
  };

  axios
    .post("http://localhost:9000/sendmsg", msgdetails, {
      headers: { Authorization: token },
    })
    .then(() => {
      document.getElementById("msginput").value = "";
      // nothing
    });
});


//setInterval(function() {

window.addEventListener("DOMContentLoaded", () => {
    /*
    axios.get('http://localhost:9000/getallmessages').then(response =>{

    console.log("response", response.data.allmessages)
     if(response.data.allmessages = [] )
     {
      // localStorage.clear();
     }
    })
    */
    getmessages = setInterval(function() {
  const lsdata = JSON.parse(localStorage.getItem("messages"));

  let lastid;
  if (lsdata == null) {
    lastid = 0;
    console.log("lsdata", lsdata)
  } else {
    lastid = lsdata[lsdata.length - 1].msgid;
    console.log("lastIdddddd", lastid)
  }
  let mergemsgs = [];
  axios
    .get(`http://localhost:9000/getmessages?id=${lastid}`)
    .then((messages) => {
        console.log('messages', messages)
      if (messages.data.length > 0) {
        if (lsdata) {
          mergemsgs = lsdata.concat(messages.data);
        } else {
          mergemsgs = messages.data;
        }
        if (mergemsgs.length > 10) {
            console.log("mergemsgLength", mergemsgs.length)
          let remove = mergemsgs.length - 10;
          for (let i = 0; i < remove; i++) {
            mergemsgs.shift();
          }
        }
      } else {
        mergemsgs = JSON.parse(localStorage.getItem("messages"));
      }
      localStorage.setItem("messages", JSON.stringify(mergemsgs));
      console.log("mergemsgLength", mergemsgs)
      const msgcontainer = document.getElementById("msgs");
      msgcontainer.innerHTML = "";
      msgcontainer.innerHTML = "<h1>Messages:</h1>";

      for (let i = 0; i < mergemsgs.length; i++) {
        const msgdiv = document.createElement("div");
        msgdiv.classList.add("msgdiv");
        const name = document.createElement("div");
        name.innerHTML = `<p>${mergemsgs[i].Username}:</p>`;
        msgdiv.appendChild(name);
        const msg = document.createElement("div");
        msg.innerHTML = `<p>${mergemsgs[i].message}</p>`;
        msgdiv.appendChild(msg);
        msgcontainer.appendChild(msgdiv);
      }
    });
},1000);
})

function displaymsgs() {
  const lsdata = JSON.parse(localStorage.getItem("messages"));

  let lastid;
  if (lsdata == null) {
    lastid = 0;
  } else {
    lastid = lsdata[lsdata.length - 1].msgid;
  }
  let mergemsgs = [];
  axios
    .get(`http://localhost:9000/getmessages?id=${lastid}`)
    .then((messages) => {
      if (messages.data.length > 0) {
        if (lsdata) {
          mergemsgs = lsdata.concat(messages.data);
        } else {
          mergemsgs = messages.data;
        }
        if (mergemsgs.lenght > 1000) {
          let remove = mergemsgs.length - 1000;
          for (let i = 0; i < remove; i++) {
            mergemsgs.shift();
          }
        }
      } else {
        mergemsgs = JSON.parse(localStorage.getItem("messages"));
      }
      localStorage.setItem("messages", JSON.stringify(mergemsgs));
      const msgcontainer = document.getElementById("msgs");
      msgcontainer.innerHTML = "";
      msgcontainer.innerHTML = "<h1>Messages:</h1>";

      for (let i = 0; i < mergemsgs.length; i++) {
        const msgdiv = document.createElement("div");
        msgdiv.classList.add("msgdiv");
        const name = document.createElement("div");
        name.innerHTML = `<p>${mergemsgs[i].Username}:</p>`;
        msgdiv.appendChild(name);
        const msg = document.createElement("div");
        msg.innerHTML = `<p>${mergemsgs[i].message}</p>`;
        msgdiv.appendChild(msg);
        msgcontainer.appendChild(msgdiv);
      }
    });
}

const creategroup = document.getElementById("cgp");
creategroup.addEventListener("click", (e) => {
    clearInterval(getmessages);
  e.preventDefault();
  const groupname = document.getElementById("gpname").value;
  let groupdetails = {
    groupname: groupname,
  };
  axios
    .post("http://localhost:9000/creategroup", groupdetails, {
      headers: { Authorization: token },
    })
    .then((e) => {
      alert("Group Created Succesfully");
      document.getElementById("gpname").value = "";
    })
    .catch((err) => console.log(err));
});

window.addEventListener("DOMContentLoaded", () => {
    axios
      .get("http://localhost:9000/getgroups", {
        headers: { Authorization: token },
      })
      .then((groups) => {
        const usergroups = groups.data.usergps;
        document.getElementById("groups").innerHTML = "";
        const groupcontainer = document.getElementById("groups");
  
        for (let i = 0; i < usergroups.length; i++) {
          const groupdiv = document.createElement("button");
          groupdiv.innerHTML = `<p>${usergroups[i].groupname}</p>`;
          groupdiv.setAttribute("type","button")
          groupdiv.classList.add("groupdiv");
          groupdiv.setAttribute("id", `${usergroups[i].id}`);
          groupcontainer.appendChild(groupdiv);
        }
      });
  });

  const groupscontainer = document.getElementById("groups");

groupscontainer.addEventListener("click", (e) => {
    clearInterval(getmessages);
    clearInterval(getgroupmessages)

    getgroupmessages = setInterval(function() {

  const groupid = e.target.parentNode.id;

  document.getElementById("groupid").value = groupid;
  axios
    .get(`http://localhost:9000/getgroupmessages/?gid=${groupid}`, {
      headers: { Authorization: token },
    })
    .then((msgs) => {
      const grpmsgs = msgs.data;
      const msgcontainer = document.getElementById("msgs");
      msgcontainer.innerHTML = "";
      msgcontainer.innerHTML = "<h1>Messages:</h1>";

      for (let i = 0; i < grpmsgs.length; i++) {
        const msgdiv = document.createElement("div");
        msgdiv.classList.add("msgdiv");
        const name = document.createElement("div");
        name.innerHTML = `<p>${grpmsgs[i].Username}:</p>`;
        msgdiv.appendChild(name);
        const msg = document.createElement("div");
        msg.innerHTML = `<p>${grpmsgs[i].message}</p>`;
        msgdiv.appendChild(msg);
        msgcontainer.appendChild(msgdiv);
      }
    });
},1000)
});

const adduser = document.getElementById("adu");
adu.addEventListener("click", (e) => {
  e.preventDefault();
  const addingemail = document.getElementById("adduser").value;
  const groupid = document.getElementById("groupid").value;
  const makeadmin = document.getElementsByName("makeadmin");
  var adminrights;
  if (makeadmin[0].checked) {
    adminrights = "on";
  } else {
    adminrights = "off";
  }

  let adduserdetails = {
    addingemail: addingemail,
    groupid: groupid,
    makeadmin: adminrights,
  };
  console.log(adduserdetails);
  axios
    .post("http://localhost:9000/addusertogroup", adduserdetails, {
      headers: { Authorization: token },
    })
    .then(() => {
      alert("user added to group successfully");
    })
    .catch((err) => {
      alert(err);
    });
});


const rmuser = document.getElementById("rmu");
rmu.addEventListener("click", (e) => {
  e.preventDefault();
  const rmemail = document.getElementById("rmuser").value;
  const rmgroupid = document.getElementById("groupid").value;
  let rmuserdetails = {
    rmemail: rmemail,
    rmgroupid: rmgroupid,
  };
  axios
    .post("http://localhost:9000/removeuserfromgroup", rmuserdetails, {
      headers: { Authorization: token },
    })
    .then(() => {
      alert("user removed from group successfully");
    })
    .catch((err) => {
      alert(err);
    });
});