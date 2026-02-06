import apiClient from './api';
import type {
    Major,
    MajorRequest,
    Part,
    PartRequest,
    Generation,
    GenerationRequest,
    GenerationUpdateRequest,
    RecruitmentInfo,
    StatusUpdateRequest,
} from '../types/recruitment';

// ==================== Major APIs ====================

/**
 * 모든 학과 목록 조회
 * (관리자 권한일 경우 비활성화된 학과도 포함)
 */
export const getMajors = async (): Promise<Major[]> => {
    const response = await apiClient.get<Major[]>('/api/v1/common/majors');
    return response.data;
};

/**
 * 새로운 전공 학과 추가 (관리자)
 */
export const createMajor = async (data: MajorRequest): Promise<void> => {
    await apiClient.post('/api/v1/common/majors', data);
};

/**
 * 특정 전공 학과 활성화/비활성화 (관리자)
 */
export const updateMajorStatus = async (
    majorId: number,
    data: StatusUpdateRequest
): Promise<void> => {
    await apiClient.patch(`/api/v1/common/majors/${majorId}`, data);
};

// ==================== Part APIs ====================

/**
 * 모든 파트 목록 조회
 * (관리자 권한일 경우 비활성화된 파트도 포함)
 */
export const getParts = async (): Promise<Part[]> => {
    const response = await apiClient.get<Part[]>('/api/v1/common/parts');
    return response.data;
};

/**
 * 새로운 지원 파트 추가 (관리자)
 */
export const createPart = async (data: PartRequest): Promise<void> => {
    await apiClient.post('/api/v1/common/parts', data);
};

/**
 * 특정 지원 파트 활성화/비활성화 (관리자)
 */
export const updatePartStatus = async (
    partId: number,
    data: StatusUpdateRequest
): Promise<void> => {
    await apiClient.patch(`/api/v1/common/parts/${partId}`, data);
};

// ==================== Generation APIs ====================

/**
 * 모든 기수 목록 조회 (관리자)
 */
export const getGenerations = async (): Promise<Generation[]> => {
    const response = await apiClient.get<Generation[]>('/api/v1/common/generations');
    return response.data;
};

/**
 * 새로운 기수 추가 (관리자)
 */
export const createGeneration = async (data: GenerationRequest): Promise<void> => {
    await apiClient.post('/api/v1/common/generation', data);
};

/**
 * 특정 기수 정보 수정 (관리자)
 */
export const updateGeneration = async (
    cohortId: number,
    data: GenerationUpdateRequest
): Promise<void> => {
    await apiClient.patch(`/api/v1/common/generations/${cohortId}`, data);
};

// ==================== Recruitment APIs ====================

/**
 * 현재 모집 중인 코스 및 파트 목록 조회
 */
export const getRecruitmentInfo = async (): Promise<RecruitmentInfo> => {
    const response = await apiClient.get<RecruitmentInfo>('/api/v1/common/recruitment');
    return response.data;
};
