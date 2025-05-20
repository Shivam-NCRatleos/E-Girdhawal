const API_BASE_URL = "http://localhost:8000/api"; // Update if needed

export async function loginUser(email, password, userType) {
    console.log(`User Login Tried with ${email} ${password} ${userType}` )
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, userType }),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Login failed");
  console.log("User :", res.json(), "token")
  return res.json(); // Should return { user, token }
}

export async function registerUser(name, email, password, userType) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, userType }),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Signup failed");
  return res.json(); // Should return { user, token }
}

export async function getProfile(token) {
  const res = await fetch(`${API_BASE_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error((await res.json()).message || "Profile fetch failed");
  return res.json();
}