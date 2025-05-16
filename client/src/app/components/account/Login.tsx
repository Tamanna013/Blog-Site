"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignupInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Signup successful.");
        setSignup({ name: "", email: "", password: "" });
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    } catch {
      alert("Unable to connect to the server.");
    }
  };

  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      alert("Please enter both email and password.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (response.ok) {
        alert(`Welcome, ${data.user.name}.`);
      } else {
        alert(`Login failed: ${data.message}`);
      }
    } catch {
      alert("Unable to connect to the server.");
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4 sm:p-8">
      <Card
        className={cn(
          "w-full max-w-md shadow-2xl border border-pink-200",
          "bg-white/90 rounded-2xl transition-all duration-500"
        )}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-pink-600">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <p className="text-pink-400 text-sm mt-2">
            {isLogin ? "Login to continue" : "Sign up to proceed"}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue={isLogin ? "login" : "signup"}
            className="w-full"
            onValueChange={() => setIsLogin((prev) => !prev)}
          >
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-pink-100 border border-pink-300">
              <TabsTrigger
                value="login"
                className="text-pink-600 data-[state=active]:bg-pink-300 data-[state=active]:text-white rounded-none"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="text-pink-600 data-[state=active]:bg-pink-300 data-[state=active]:text-white rounded-none"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <form className="space-y-6">
              <TabsContent value="login">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-pink-600 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={loginData.email}
                      onChange={handleLoginInput}
                      className="bg-white text-pink-600 placeholder:text-pink-300 border-pink-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password" className="text-pink-600 flex items-center gap-2">
                      <Lock className="w-4 h-4" /> Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={loginData.password}
                      onChange={handleLoginInput}
                      className="bg-white text-pink-600 placeholder:text-pink-300 border-pink-300"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleLogin}
                    className="w-full bg-pink-400 text-white hover:bg-pink-500 transition duration-300 font-semibold shadow-md flex items-center justify-center gap-2"
                  >
                    Login <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="signup">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-pink-600 flex items-center gap-2">
                      <User className="w-4 h-4" /> Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      value={signup.name}
                      onChange={handleSignupInput}
                      className="bg-white text-pink-600 placeholder:text-pink-300 border-pink-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email-signup" className="text-pink-600 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email
                    </Label>
                    <Input
                      id="email-signup"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={signup.email}
                      onChange={handleSignupInput}
                      className="bg-white text-pink-600 placeholder:text-pink-300 border-pink-300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password-signup" className="text-pink-600 flex items-center gap-2">
                      <Lock className="w-4 h-4" /> Password
                    </Label>
                    <Input
                      id="password-signup"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={signup.password}
                      onChange={handleSignupInput}
                      className="bg-white text-pink-600 placeholder:text-pink-300 border-pink-300"
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleSignup}
                    className="w-full bg-pink-400 text-white hover:bg-pink-500 transition duration-300 font-semibold shadow-md flex items-center justify-center gap-2"
                  >
                    Sign Up <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
