import apiClient from './api';
import type {
    ApplicationRequest,
    ApplicationResponse,
    ApplicationDetailResponse,
    ApplicationsQueryParams,
    ResultUpdateRequest,
} from '../types/application';
import type { CursorPageResponse } from '../types/common';
import type { ApiResponse } from '../types/auth'; // 추가

/**
 * 지원자들의 신청서 목록 조회 (관리자)
 */
export const getApplications = async (
    params?: ApplicationsQueryParams
): Promise<CursorPageResponse<ApplicationResponse>> => {
    const response = await apiClient.get<ApiResponse<CursorPageResponse<ApplicationResponse>>>(
        '/api/v1/applications',
        { params }
    );
    return response.data.data;
};

/**
 * 신청서 제출
 */
export const submitApplication = async (data: ApplicationRequest): Promise<void> => {
    await apiClient.post('/api/v1/applications', data);
};

/**
 * 신청서 삭제 (관리자)
 */
export const deleteApplication = async (formId: string): Promise<void> => {
    await apiClient.delete(`/api/v1/applications/${formId}`);
};

/**
 * 특정 신청서 상세 정보 조회 (관리자)
 */
export const getApplicationDetail = async (
    applicationId: string
): Promise<ApplicationDetailResponse> => {
    const response = await apiClient.get<ApiResponse<ApplicationDetailResponse>>(
        `/api/v1/applications/${applicationId}`
    );
    return response.data.data;
};

/**
 * 특정 신청서 합불 여부 설정 (관리자)
 */
export const updateApplicationResult = async (
    applicationId: string,
    data: ResultUpdateRequest
): Promise<void> => {
    await apiClient.patch(`/api/v1/applications/${applicationId}`, data);
};

/**
 * 내가 지원한 신청서 목록과 결과 조회
 */
export const getMyApplications = async (): Promise<ApplicationResponse[]> => {
    const response = await apiClient.get<ApiResponse<ApplicationResponse[]>>('/api/v1/applications/me');
    return response.data.data;
};
