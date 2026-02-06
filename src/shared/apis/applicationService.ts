import apiClient from './api';
import type {
    ApplicationRequest,
    ApplicationResponse,
    ApplicationDetailResponse,
    ApplicationsQueryParams,
    ResultUpdateRequest,
} from '../types/application';
import type { CursorPageResponse } from '../types/common';

/**
 * 지원자들의 신청서 목록 조회 (관리자)
 */
export const getApplications = async (
    params?: ApplicationsQueryParams
): Promise<CursorPageResponse<ApplicationResponse>> => {
    const response = await apiClient.get<CursorPageResponse<ApplicationResponse>>(
        '/api/v1/applications',
        { params }
    );
    return response.data;
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
    const response = await apiClient.get<ApplicationDetailResponse>(
        `/api/v1/applications/${applicationId}`
    );
    return response.data;
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
    const response = await apiClient.get<ApplicationResponse[]>('/api/v1/applications/me');
    return response.data;
};
