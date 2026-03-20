// axios ek HTTP client library hai jo frontend se backend ko request bhejne ke liye use hoti hai
// Alternative: browser ka built-in method "fetch" bhi same kaam karta hai
import axios from "axios";


// Yaha hum axios ka ek custom instance bana rahe hain
// Iska fayda: har request me same configuration automatically use hoga
const API = axios.create({

  // baseURL ka matlab hai: har request ke aage ye URL automatically add hoga
  // Example: API.get("/songs") → http://localhost:3000/api/songs
  
  // import.meta.env → Vite ka system hai jo .env file ke variables read karta hai
  // VITE_API_BASE_URL → ye ek environment variable hai (jo .env file me defined hota hai)
  
  // "||" ka matlab:
  // agar VITE_API_BASE_URL exist karta hai → usko use karo
  // warna fallback me "http://localhost:3000/api" use karo
  
  // Ye mainly dev vs production ke liye use hota hai:
  // - Development (local machine): localhost use hoga
  // - Production (live server): .env ka URL use hoga
  
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",

  
  // withCredentials: true ka matlab:
  // browser ko allow karna ki wo request ke saath cookies bhi bheje
  
  // Ye bahut important hai agar:
  // - tu authentication use kar raha hai (JWT in cookies)
  // - login ke baad server cookie set karta hai
  
  // Agar ye true nahi hoga:
  // - browser cookie nahi bhejega
  // - server ko user ka token nahi milega
  // - user unauthorized ho jayega
  
  withCredentials: true,
});


// Is instance ko export kar rahe hain taaki poori app me reuse ho sake
// Ab har jagah axios ki jagah API use karenge
export default API;



/* =========================================================
   🔥 FETCH VERSION (Same kaam manually kaise hota hai)
   =========================================================

   Agar axios na use kare aur fetch use kare, to hume ye sab manually likhna padega:

   Example:

   fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"}/songs`, {
     method: "GET",
     credentials: "include" // axios ke withCredentials: true ka equivalent
   })
   .then(res => {
     // fetch me manually check karna padta hai error ke liye
     if (!res.ok) {
       throw new Error("Request failed");
     }
     return res.json(); // manually JSON convert karna padta hai
   })
   .then(data => console.log(data))
   .catch(err => console.log(err));



   🔥 Difference summary:

   axios:
   - baseURL auto handle
   - cookies auto (withCredentials)
   - JSON auto parse
   - better error handling

   fetch:
   - sab manually likhna padta hai
   - built-in hai (install nahi karna padta)

   👉 Isliye large projects me axios prefer karte hain
*/