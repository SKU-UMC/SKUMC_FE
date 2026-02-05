import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 쿠키를 포함하여 요청을 보냄 (access token, refresh token)
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        // 필요한 경우 헤더에 토큰 추가 등의 작업 수행
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // 401 에러 처리 (토큰 만료 등)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Refresh token을 사용하여 새로운 access token 획득
                // 백엔드에서 쿠키로 관리하므로 별도의 처리가 필요 없을 수 있음
                // 필요 시 refresh 엔드포인트 호출

                return apiClient(originalRequest);
            } catch (refreshError) {
                // Refresh 실패 시 로그인 페이지로 리다이렉트
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
