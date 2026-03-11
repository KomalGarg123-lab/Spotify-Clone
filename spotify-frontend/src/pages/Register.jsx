import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register(){

const navigate = useNavigate()

const [username,setUsername] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

async function handleRegister(){

try{

const res = await API.post("/auth/register",{
username,
email,
password
})

alert("User registered successfully")

navigate("/login")

}catch(err){

console.log(err)

}

}

return(

<div>

<h2>Register</h2>

<input
placeholder="username"
onChange={(e)=>setUsername(e.target.value)}
/>

<br/>

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

<button onClick={handleRegister}>
Register
</button>

</div>

)

}