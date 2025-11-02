import "../../css/style.css";
import { API_CONFIG, apiRequest } from "../config/api.js";

export default function loadSigninPage() {
  const root = document.getElementById("signin-root");
  if (!root) return;

  let showPassword = false;

  root.innerHTML = `
<div class="flex flex-col md:flex-row w-full h-screen overflow-hidden">
  <!-- left column with Sign In form -->
  <div class="w-full md:w-1/2 bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 overflow-y-auto pt-6">
    <div class="w-full max-w-md">
      <!-- get back button-->
      <a href="../landing.html" class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-8">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to landing page
      </a>

      <!-- tittle -->
      <h1 class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">Sign In</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Enter your email and password to sign in!</p>

      <!-- separator -->
      <div class="relative py-3 mb-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="px-2 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm"></span>
        </div>
      </div>

      <!-- form -->
      <form id="signin-form" class="space-y-4">
        <!-- email -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="info@gmail.com"
            required
            class="email-input h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:border-brand-300 focus:ring focus:ring-brand-300 dark:focus:outline-none dark:focus:border-brand-500 dark:focus:ring dark:focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
            autocomplete="email"
          />
        </div>
        
        <!-- password -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Password <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              class="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:border-brand-300 focus:ring focus:ring-brand-300 dark:focus:outline-none dark:focus:border-brand-500 dark:focus:ring dark:focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
            />
            <button
              type="button"
              id="togglePassword"
              class="absolute z-30 right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
          >
              <svg id="eyeCloseIcon" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
              </svg>
              <svg id="eyeOpenIcon" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- submit button -->
        <div>
          <button 
            type="submit" 
            class="w-full py-2 px-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:bg-brand-500 dark:hover:bg-brand-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <!-- register link -->
      <div class="mt-6 text-start">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account? 
          <a href="/signup.html" class="text-brand-500 hover:text-brand-600 dark:text-brand-400 font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  </div>

<!-- right column - gray bg -->
  <div class="hidden md:flex md:w-1/2 bg-brand-950 dark:bg-gray-800 relative">
    <!-- grid container -->
    <div class="absolute inset-0 overflow-hidden z-0">
      <!-- grid top right -->
      <div class="absolute right-0 top-0 w-full max-w-[500px]">
       <img 
         src="/src/images/shape/grid-01.svg" 
         alt="grid"
         class="w-full h-auto opacity-90 dark:opacity-90 mix-blend-overlay"
       />
      </div>
      <!-- gdrid bottom left (rotated) -->
      <div class="absolute bottom-0 left-0 w-full max-w-[500px] rotate-180">
        <img 
          src="/src/images/shape/grid-01.svg" 
          alt="grid"
          class="w-full h-auto opacity-90 dark:opacity-90 mix-blend-overlay"
        />
      </div>
    </div>
    <!-- logo-->
    <div class="flex items-center justify-center w-full h-full">
      <img 
        src="/src/images/logo/logo-dark.svg" 
        alt="Budget Buddy Logo"
        class="h-22 w-auto"
      />
    </div>
    <!-- theme toggle button -->
    <div class="absolute bottom-6 right-6">
      <button id="themeToggle" class="p-4 rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-colors duration-200">
        <!-- moon icon (visible in light mode) -->
        <svg id="moonIcon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
        <!-- sun icon (visible in dark mode) -->
        <svg id="sunIcon" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      </button>
    </div>
  </div>
</div>
`;

  // toggle password visibility
  const toggleBtn = document.getElementById("togglePassword");
  const pwdInput  = document.getElementById("password");
  const eyeOpen   = document.getElementById("eyeOpenIcon");
  const eyeClose  = document.getElementById("eyeCloseIcon");

  toggleBtn?.addEventListener("click", () => {
    showPassword = !showPassword;
    pwdInput.type = showPassword ? "text" : "password";
    eyeOpen.classList.toggle("hidden");
    eyeClose.classList.toggle("hidden");
  });

  const signinForm = document.getElementById("signin-form");
  signinForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email    = document.getElementById("email").value;
    const password = pwdInput.value;

    const submitBtn = signinForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Iniciando sesión...";
    submitBtn.disabled = true;

    try {
      const data = await apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("userInfo", JSON.stringify({
        id: data.id,
        fullName: data.fullName,
        email: data.email,
        role: data.role
      }));

      showNotification("Login successful!", "success");
      
      setTimeout(() => {
        if (data.role === "ADVISOR") {
          window.location.href = "/financialAdv.html"; 
        } else {
          window.location.href = "/index.html"; 
        }
      }, 1000);

    } catch (err) {
      console.error("Error de login:", err);
      showNotification("Credenciales incorrectas. Intenta nuevamente.", "error");
    } finally {

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });

  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white' :
      type === 'error' ? 'bg-red-500 text-white' :
      'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // theme toggle button
  const themeToggle = document.getElementById("themeToggle");
  const sunIcon     = document.getElementById("sunIcon");
  const moonIcon    = document.getElementById("moonIcon");
  let darkMode      = localStorage.getItem("darkMode") === "true";

  const applyTheme = () => {
    document.documentElement.classList.toggle("dark", darkMode);
    sunIcon.classList.toggle("hidden", !darkMode);
    moonIcon.classList.toggle("hidden",  darkMode);
  };
  applyTheme();
  themeToggle?.addEventListener("click", () => {
    darkMode = !darkMode;
    localStorage.setItem("darkMode", darkMode);
    applyTheme();
  });
}