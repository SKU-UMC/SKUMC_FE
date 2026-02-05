
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './shared/components/Navbar';
import AppRouter from './shared/routes/routing';
import type { User } from './shared/types/user';
import { tokenRefresh } from './shared/apis/authService';
import type { AuthResponse } from './shared/types/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

  useEffect(() => {
    const initializeAuth = async () => {
      // 1. 세션 스토리지 확인
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        return;
      }

      // 2. 세션 스토리지가 없으면 Refresh Token으로 갱신 시도
      try {
        const response = await tokenRefresh();
        handleAuthSuccess(response);
      } catch (error) {
        // 로그인 되어있지 않음 (조용히 실패)
        console.log('Not authenticated');
      }
    };

    initializeAuth();
  }, []);

  const handleAuthSuccess = (authData: AuthResponse) => {
    // User 객체 매핑
    const userData: User = {
      id: String(authData.userId),
      name: authData.name,
      email: authData.email,
      role: authData.role,
      isRegistered: authData.isRegistered,
      isCompleted: authData.isCompleted
    };

    // 세션 스토리지 저장
    sessionStorage.setItem('user', JSON.stringify(userData));
    sessionStorage.setItem('accessToken', authData.accessToken); // 필요하다면

    setUser(userData);
  };

  const handleLogin = () => {
    // Google OAuth 로그인 리다이렉트
    window.location.href = 'https://deltakim.tplinkdns.com/api/v1/auth/login';
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    // 필요 시 백엔드 로그아웃 API 호출 추가
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

        <footer className="py-8 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} SKUMC. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
