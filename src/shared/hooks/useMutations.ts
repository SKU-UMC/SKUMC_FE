
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as applicationService from '../apis/applicationService';
import * as applyFormService from '../apis/applyFormService';
import * as authService from '../apis/authService';
import type { ApplicationRequest, ResultUpdateRequest, ApplyFormRequest, ApplyFormUpdateRequest } from '../types/application';
import type { ProfileRequest } from '../types/auth';

/**
 * 프로필 설정 (로그인)
 */
export const useSetProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ProfileRequest) => authService.setProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });
};

/**
 * 신청서 제출
 */
export const useSubmitApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ApplicationRequest) => applicationService.submitApplication(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myApplications'] });
            queryClient.invalidateQueries({ queryKey: ['applications'] });
        },
    });
};

/**
 * 신청서 삭제 (관리자)
 */
export const useDeleteApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formId: string) => applicationService.deleteApplication(formId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applications'] });
        },
    });
};

/**
 * 신청서 합불 여부 업데이트 (관리자)
 */
export const useUpdateApplicationResult = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ applicationId, data }: { applicationId: string; data: ResultUpdateRequest }) =>
            applicationService.updateApplicationResult(applicationId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applications'] });
        },
    });
};

/**
 * 신청서 템플릿 생성 (관리자)
 */
export const useCreateApplyForm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ApplyFormRequest) => applyFormService.createApplyForm(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applyForms'] });
        },
    });
};

/**
 * 신청서 템플릿 수정 (관리자)
 */
export const useUpdateApplyForm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ApplyFormUpdateRequest) => applyFormService.updateApplyForm(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applyForms'] });
        },
    });
};

/**
 * 신청서 템플릿 삭제 (관리자)
 */
export const useDeleteApplyForm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formId: string) => applyFormService.deleteApplyForm(formId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applyForms'] });
        },
    });
};

/**
 * 신청서 템플릿 기본 설정 (관리자)
 */
export const useSetDefaultApplyForm = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formId: string) => applyFormService.setDefaultApplyForm(formId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['applyForms'] });
        },
    });
};
