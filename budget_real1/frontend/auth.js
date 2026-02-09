const API_URL = "http://localhost:5000/api";
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

function setSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function updateNavAuth() {
  const loggedIn = Boolean(getToken());
  document.querySelectorAll("[data-auth='logged-in']").forEach((el) => {
    el.style.display = loggedIn ? "inline-flex" : "none";
  });
  document.querySelectorAll("[data-auth='logged-out']").forEach((el) => {
    el.style.display = loggedIn ? "none" : "inline-flex";
  });
}

function handleLogout() {
  const logout = document.getElementById("logout-link");
  if (!logout) return;
  logout.addEventListener("click", (event) => {
    event.preventDefault();
    clearSession();
    window.location.href = "login.html";
  });
}

async function handleLogin(form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      setSession(data.token, data.user);
      window.location.href = "index.html";
    } catch (error) {
      alert("Login failed. Check server connection.");
    }
  });
}

async function handleSignup(form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const currency = document.getElementById("signup-currency").value;

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, currency }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Sign up failed");
        return;
      }

      setSession(data.token, data.user);
      window.location.href = "profile.html";
    } catch (error) {
      alert("Sign up failed. Check server connection.");
    }
  });
}

async function loadProfile() {
  const token = getToken();
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: { ...getAuthHeaders() },
    });
    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Failed to load profile");
      return;
    }

    document.getElementById("profile-name").value = data.name || "";
    document.getElementById("profile-email").value = data.email || "";
    document.getElementById("profile-currency").value = data.currency || "USD";
    document.getElementById("profile-budget").value = data.monthlyBudget || 0;
  } catch (error) {
    alert("Failed to load profile.");
  }
}

async function handleProfileUpdate(form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const payload = {
      name: document.getElementById("profile-name").value.trim(),
      email: document.getElementById("profile-email").value.trim(),
      currency: document.getElementById("profile-currency").value,
      monthlyBudget: Number(document.getElementById("profile-budget").value || 0),
    };

    try {
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Failed to update profile");
        return;
      }

      alert("Profile updated");
    } catch (error) {
      alert("Failed to update profile");
    }
  });
}

async function handlePasswordUpdate(form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const currentPassword = document.getElementById("current-password").value;
    const newPassword = document.getElementById("new-password").value;
    const confirm = document.getElementById("confirm-password").value;

    if (newPassword !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Failed to update password");
        return;
      }

      alert("Password updated");
      form.reset();
    } catch (error) {
      alert("Failed to update password");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateNavAuth();
  handleLogout();

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    handleLogin(loginForm);
  }

  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    handleSignup(signupForm);
  }

  const profileForm = document.getElementById("profile-form");
  if (profileForm) {
    loadProfile();
    handleProfileUpdate(profileForm);
  }

  const passwordForm = document.getElementById("password-form");
  if (passwordForm) {
    handlePasswordUpdate(passwordForm);
  }
});
