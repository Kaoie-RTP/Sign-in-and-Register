import { serve } from "bun";

const users: { email: string; username: string; password: string }[] = [];

serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    if (req.method === "GET" && url.pathname === "/") {
      const html = await Bun.file("src/pages/signin.html").text();
      return new Response(html, { headers: { "Content-Type": "text/html" } });
    }

    if (req.method === "GET" && url.pathname.endsWith(".html")) {
      const filePath = `src/pages${url.pathname}`;
      try {
        const file = Bun.file(filePath);
        if (await file.exists()) {
          const html = await file.text();
          return new Response(html, { headers: { "Content-Type": "text/html" } });
        }
      } catch {}
    }

    
    if (req.method === "POST" && url.pathname === "/signin") {
      let body;
      try {
        body = await req.formData();
      } catch {
        return new Response("Invalid form data", { status: 400 });
      }
      const username = body.get("username");
      const password = body.get("password");
      
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        return new Response("Login successful!");
      } else {
        return new Response("Invalid credentials.");
      }
    }
    
    if (req.method === "POST" && url.pathname === "/register") {
      let body;
      try {
        body = await req.formData();
      } catch {
        return new Response("Invalid form data", { status: 400 });
      }
      const email = String(body.get("email") ?? "");
      const username = String(body.get("username") ?? "");
      const password = String(body.get("password") ?? "");
      const confirm_password = String(body.get("confirm_password") ?? "");
      
      if (password !== confirm_password) {
        return new Response("Passwords do not match.");
      }
      
      if (users.some(u => u.username === username)) {
        return new Response("Username already exists.");
      }
      
      users.push({ email, username, password });
      return new Response("Registration successful!");
    }

    return new Response("Not found", { status: 404 });
  },
});