import "../../css/style.css";

export default function loadSignupPage() {
  const root = document.getElementById("signup-root");
  if (!root) return;

  // local states
  let showPassword = false;

  root.innerHTML = `
<div class="flex flex-col md:flex-row w-full h-screen overflow-hidden">
  <!-- left column with Sign Up form -->
  <div class="w-full md:w-1/2 bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 overflow-y-auto pt-6">
    <div class="w-full max-w-md">
      <!-- get back button-->
      <a href="../landing.html" class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-8">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to landing page
      </a>

      <!-- title -->
      <h1 class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">Sign Up</h1>
      <p class="text-sm text-gray-500 dark:text-gray-400">Enter your details to sign up!</p>

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
      <form id="signup-form" class="space-y-4">
        <!-- Name Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- First Name -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              First Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              required
              class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:border-brand-300 focus:ring focus:ring-brand-300 dark:focus:outline-none dark:focus:border-brand-500 dark:focus:ring dark:focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
              autocomplete="given-name"
            />
          </div>
          
          <!-- Last Name -->
          <div>
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Last Name <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              required
              class="h-11 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:border-brand-300 focus:ring focus:ring-brand-300 dark:focus:outline-none dark:focus:border-brand-500 dark:focus:ring dark:focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
              autocomplete="family-name"
            />
          </div>
        </div>
        
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
        
        <!-- confirm password -->
        <div>
          <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
            Confirm Password <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Repeat your password"
              required
              class="h-11 w-full rounded-lg border border-gray-300 appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:border-brand-300 focus:ring focus:ring-brand-300 dark:focus:outline-none dark:focus:border-brand-500 dark:focus:ring dark:focus:ring-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30"
            />
            <button
              type="button"
              id="toggleConfirmPassword"
              class="absolute z-30 right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
            >
              <svg id="eyeCloseIconConfirm" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
              </svg>
              <svg id="eyeOpenIconConfirm" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </button>
          </div>
          <p id="passwordMatchError" class="mt-1 text-sm text-red-600 hidden">Passwords do not match</p>
        </div>
        
        <!-- submit button -->
        <div>
          <button 
            type="submit" 
            class="w-full py-2 px-4 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:bg-brand-500 dark:hover:bg-brand-600"
          >
            Sign Up
          </button>
        </div>
      </form>

      <!-- login link -->
      <div class="mt-6 text-start">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Already have an account? 
          <a href="#" class="text-brand-500 hover:text-brand-600 dark:text-brand-400 font-medium">
            Sign In
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

  // events logic
  const togglePasswordBtn = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
  const eyeOpenIcon = document.getElementById("eyeOpenIcon");
  const eyeCloseIcon = document.getElementById("eyeCloseIcon");

  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", () => {
      showPassword = !showPassword;
      passwordInput.type = showPassword ? "text" : "password";
      eyeOpenIcon.classList.toggle("hidden");
      eyeCloseIcon.classList.toggle("hidden");
    });
  }

  // theme toggle
  const themeToggle = document.getElementById("themeToggle");
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");

  let darkMode = localStorage.getItem("darkMode") === "true";

  if (darkMode) {
    document.documentElement.classList.add("dark");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      darkMode = !darkMode;
      document.documentElement.classList.toggle("dark", darkMode);
      sunIcon.classList.toggle("hidden");
      moonIcon.classList.toggle("hidden");
      localStorage.setItem("darkMode", darkMode);
    });
  }

    // toggle confirm password visibility
  const toggleConfirmPasswordBtn = document.getElementById("toggleConfirmPassword");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const eyeOpenIconConfirm = document.getElementById("eyeOpenIconConfirm");
  const eyeCloseIconConfirm = document.getElementById("eyeCloseIconConfirm");

  if (toggleConfirmPasswordBtn) {
    toggleConfirmPasswordBtn.addEventListener("click", () => {
      showPassword = !showPassword;
      confirmPasswordInput.type = showPassword ? "text" : "password";
      eyeOpenIconConfirm.classList.toggle("hidden");
      eyeCloseIconConfirm.classList.toggle("hidden");
    });
  }

  // validating password match
  const passwordMatchError = document.getElementById("passwordMatchError");
  
  function validatePasswordMatch() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    if (password && confirmPassword && password !== confirmPassword) {
      passwordMatchError.classList.remove("hidden");
      return false;
    } else {
      passwordMatchError.classList.add("hidden");
      return true;
    }
  }

  // event listeners for password match validation
  document.getElementById("password")?.addEventListener("input", validatePasswordMatch);
  document.getElementById("confirmPassword")?.addEventListener("input", validatePasswordMatch);

  // submit
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      if (!validatePasswordMatch()) {
        return;
      }
      
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      console.log("Signing up with:", { firstName, lastName, email, password });
      alert("Registration successful!");
    });
  }

}