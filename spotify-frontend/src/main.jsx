// ==========================
// 🔹 STEP 0: IMPORTS
// ==========================

// StrictMode → Development me extra checking (bugs detect karne ke liye)
// Note: Production me ignore ho jata hai
import { StrictMode } from 'react'

// createRoot → React 18 ka new rendering engine
// Ye React ko browser ke DOM ke saath connect karta hai
// Also enables:
// - Batching
// - Concurrent rendering
// - Optimized updates
import { createRoot } from 'react-dom/client'

// Global CSS (UI styling ke liye)
import './index.css'

// Main component (poori app ka starting point)
import App from './App.jsx'



// ==========================
// 🔹 STEP 1: BROWSER LOADS HTML
// ==========================

// Browser pehle index.html load karta hai
// Usme ek empty container hota hai:

// <div id="root"></div>

// Abhi ye empty hai → kuch bhi UI nahi dikh raha



// ==========================
// 🔹 STEP 2: SELECT ROOT ELEMENT
// ==========================

// JS ke through hum us div ko select karte hain
const container = document.getElementById('root')

// 👉 Ye REAL DOM ka element hai (browser ka actual structure)


// ==========================
// 🔹 STEP 2a: WHAT HAPPENS TO ROOT
// ==========================

// Initially <div id="root"></div> empty hota hai
// React ke render karte hi ye div React ke under poora UI contain karega

// Example: Agar App.jsx me h1 return ho
// function App() { return <h1>Hello Komal</h1> }
// Toh final DOM:

// <div id="root">
//   <h1>Hello Komal</h1>
// </div>

// Root kabhi empty nahi rehta, React fills it with your app
// Aur saari updates bhi isi root ke andar hoti hain



// ==========================
// 🔹 STEP 3: CREATE REACT ROOT (VERY IMPORTANT)
// ==========================

// React ko bol rahe hain:
// "Is container ka control ab tumhare paas hai"

const root = createRoot(container)

// 👉 Internally React:
// - Fiber tree banata hai
// - Rendering system initialize karta hai
// - Update queue setup karta hai
// - Batching enable karta hai
// - Concurrent rendering enable karta hai

// 👉 Ab React is container ka "manager" ban gaya
// 👉 Saari UI updates, state changes, diffing ye root ke andar handle hote hain



// ==========================
// 🔹 STEP 4: RENDER APP
// ==========================

root.render(

  // StrictMode → sirf development ke liye (extra checks)
  <StrictMode>

    {/* 
      👇 MAIN COMPONENT
      
      Ye poori app ka entry point hai
      
      App.jsx me jo return hoga:
      - wahi Virtual DOM banega
      - wahi UI me dikhega
    */}
    <App />

  </StrictMode>
)


// ==========================
// 🔹 FULL PIPELINE (VERY IMPORTANT)
// ==========================

/*

1. Browser loads HTML
   → <div id="root"></div> (empty initially)

2. JS runs
   → container select hota hai

3. createRoot(container)
   → React takes control of root
   → Rendering system start
   → Root ab manager ban gaya

4. root.render(<App />)
   → React App component read karta hai

5. Virtual DOM create hota hai
   → JS object form me UI

6. Virtual DOM → Real DOM me convert hota hai
   → Root ke andar inject hota hai
   → Root ab empty nahi, app ka content dikhta hai

7. UI screen pe show hota hai ✅
   → Browser pe sab visible

------------------------------
🔄 AFTER THIS (IMPORTANT PART)
------------------------------

8. Jab state change hoti hai (e.g., setCount)

   → React immediately DOM update nahi karta ❌

   → Instead:
      - Updates queue karta hai
      - Batching karta hai
      - Final state compute karta hai

   → New Virtual DOM banata hai

   → Old vs New compare karta hai (Diffing)

   → Sirf changed parts update karta hai ✅
   → Ye sab **root ke andar hi hota hai**, bahar kuch nahi

------------------------------
⚡ WHY REACT IS FAST
------------------------------

- Direct DOM manipulation avoid karta hai
- Virtual DOM use karta hai
- Batching karta hai (multiple updates → 1 render)
- Concurrent rendering (pause/resume work)
- Efficient diffing algorithm

------------------------------
🧠 FINAL UNDERSTANDING
------------------------------

👉 createRoot = React ka control center
👉 root.render() = UI ko screen pe mount karna
👉 <App /> = poori application
👉 root = ab React ka manager, poora app isi ke andar render aur update hota hai
👉 React = smart system to update UI efficiently

*/