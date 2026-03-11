import { useState } from "react";
import API from "../services/api";

export default function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

async function handleLogin(){

console.log("login clicked")

try{

const res = await API.post("/auth/login",{
email,
password
})

console.log(res.data)
alert("Login Success")

}catch(err){

console.log(err)

}

}

return(

<div>

<h2>Login</h2>

<input
placeholder="email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/>

<input
type="password"
placeholder="password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/>

<button onClick={handleLogin}>
Login
</button>

</div>

)

}