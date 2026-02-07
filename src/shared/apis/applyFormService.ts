import apiClient from './api';
import type {
    ApplyFormRequest,
    ApplyFormResponse,
    ApplyFormDetailResponse,
    ApplyFormUpdateRequest,
    ApplyFormsQueryParams,
} from '../types/application';
import type { CursorPageResponse } from '../types/common';
import type { ApiResponse } from '../types/auth';

/**
 * 신청서 템플릿 전체 리스트 조회 (관리자)
 */
export const getApplyForms = async (
    params?: ApplyFormsQueryParams
): Promise<CursorPageResponse<ApplyFormResponse>> => {
    const response = await apiClient.get<ApiResponse<CursorPageResponse<ApplyFormResponse>>>(
        '/api/v1/applications/apply-forms',
        { params }
    );
    return response.data.data;
};

/**
 * 새 신청서 템플릿 추가 (관리자)
 */
export const createApplyForm = async (data: ApplyFormRequest): Promise<void> => {
    await apiClient.post('/api/v1/applications/apply-forms', data);
};

/**
 * 기존 신청서 템플릿 수정 (관리자)
 */
export const updateApplyForm = async (data: ApplyFormUpdateRequest): Promise<void> => {
    await apiClient.put('/api/v1/applications/apply-forms', data);
};

/**
 * 특정 신청서 템플릿 세부 정보 조회 (관리자)
 */
export const getApplyFormDetail = async (formId: string): Promise<ApplyFormDetailResponse> => {
    const response = await apiClient.get<ApiResponse<ApplyFormDetailResponse>>(
        `/api/v1/applications/apply-forms/${formId}`
    );
    return response.data.data;
};

/**
 * 특정 신청서 템플릿을 기본으로 설정 (관리자)
 */
export const setDefaultApplyForm = async (formId: string): Promise<void> => {
    await apiClient.patch(`/api/v1/applications/apply-forms/${formId}`);
};

/**
 * 특정 신청서 템플릿 삭제 (관리자)
 */
export const deleteApplyForm = async (formId: string): Promise<void> => {
    await apiClient.delete(`/api/v1/applications/apply-forms/${formId}`);
};
