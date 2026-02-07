
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './shared/components/Navbar';
import AppRouter from './shared/routes/routing';
import type { User } from './shared/types/user';
import { tokenRefresh, logout } from './shared/apis/authService';
import type { AuthResponse } from './shared/types/auth';
import { storage } from './shared/utils/sessionStorage';

function App() {
  const [user, setUser] = useState<User | null>(null);

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
    // 로컬 환경에서만 더미 로그인 사용(추후 삭제 예정)
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

    if (isLocal) {
      const dummyAuth: AuthResponse = {
        email: "muwingky@skuniv.ac.kr",
        id: "2",
        isCompleted: true,
        isRegistered: true,
        name: "황무원",
        role: "ADMIN"
      };
      handleAuthSuccess(dummyAuth);
      console.log('Dummy login success:', dummyAuth);
    } else {
      window.location.href = import.meta.env.VITE_AUTH_GOOGLE_URL;
    }
  };

  const handleLogout = () => {
    storage.clearAll();
    setUser(null);
    logout();
    window.location.href = '/';
  };

  // 토큰 갱신
  const handleAuthRefresh = async () => {
    try {
      const response = await tokenRefresh();
      handleAuthSuccess(response);
    } catch (error) {
      console.error("Auth refresh failed", error);
      throw error;
    }
  }

  // 다른 도메인으로 로그인 시도하여 에러 콜백 받을 시, AuthCallbackPage에서 에러 전용 리턴값 띄워주기
  const handleAuthError = () => {
    storage.clearAll();
    setUser(null);
    logout();
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
        <Navbar
          isLoggedIn={!!user}
          onLogin={handleLogin}
          onLogout={handleLogout}
          externalTooltipMessage={
            user
              ? (user.isCompleted && user.isRegistered
                ? `환영합니다, ${user.name}님!`
                : `${user.name}님, 가입을 완료해주세요!`)
              : undefined
          }
        />
        <main className="flex-grow">
          <AppRouter user={user} onAuthRefresh={handleAuthRefresh} onAuthError={handleAuthError} />
        </main>

        <footer className="py-12 text-center bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-gray-400 text-sm">&copy; 2026 SKUMC. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
