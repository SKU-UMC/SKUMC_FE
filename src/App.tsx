
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './shared/components/Navbar';
import AppRouter from './shared/routes/routing';
import type { User } from './shared/types/user';
import { tokenRefresh } from './shared/apis/authService';
import type { AuthResponse } from './shared/types/auth';
import { storage } from './shared/utils/sessionStorage';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      // 1. 세션 스토리지 확인
      const storedUser = storage.getUser();
      if (storedUser) {
        setUser(storedUser);
        return;
      }

      // 2. 세션이 없으면 refresh token 시도
      try {
        const authData = await tokenRefresh();
        handleAuthSuccess(authData);
      } catch (error) {
        console.log('Not authenticated');
      }
    };

    initializeAuth();
  }, []);

  const handleAuthSuccess = (authData: AuthResponse) => {
    // User 객체 매핑
    const userData: User = {
      id: authData.id,
      name: authData.name,
      email: authData.email,
      role: authData.role,
      isRegistered: authData.isRegistered,
      isCompleted: authData.isCompleted
    };

    storage.setUser(userData);

    setUser(userData);
  };

  const handleLogin = () => {
    window.location.href = import.meta.env.VITE_AUTH_GOOGLE_URL;
  };

  const handleLogout = () => {
    storage.clearAll();
    setUser(null);
    // 백엔드 로그아웃 api 추가 예정
    window.location.href = '/';
  };

  const handleAuthRefresh = async () => {
    try {
      const response = await tokenRefresh();
      handleAuthSuccess(response);
    } catch (error) {
      console.error("Auth refresh failed", error);
    }
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
        <Navbar
          isLoggedIn={!!user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          externalTooltipMessage={user ? `환영합니다, ${user.name}님!` : undefined}
        />
        <main className="flex-grow">
          <AppRouter user={user} onAuthRefresh={handleAuthRefresh} />
        </main>

        <footer className="py-12 border-t text-center bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-gray-400 text-sm">&copy; 2026 SKUMC. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
