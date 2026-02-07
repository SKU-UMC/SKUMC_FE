import apiClient from './api';
import type { ProfileRequest, AuthResponse, ApiResponse } from '../types/auth';

/**
 * 프로필 설정 (로그인)
 * Google OAuth를 통한 소셜 로그인 후 프로필을 설정합니다.
 */
export const setProfile = async (data: ProfileRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/api/v1/auth/profile', data);
    return response.data.data;
};

export const tokenRefresh = async (): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/api/v1/auth/refresh');
    return response.data.data;
};

export const logout = async (): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/api/v1/auth/logout');
    return response.data.data;
};