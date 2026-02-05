
import { useQuery } from '@tanstack/react-query';
import * as commonService from '../apis/commonService';
import * as applicationService from '../apis/applicationService';
import * as applyFormService from '../apis/applyFormService';
import type { Major } from '../types/recruitment';
import type { ApplyFormResponse, ApplicationResponse, ApplicationsQueryParams } from '../types/application';

/**
 * 모든 학과 목록 조회
 */
export const useMajors = () => {
    return useQuery<Major[]>({
        queryKey: ['majors'],
        queryFn: async () => {
            return await commonService.getMajors();
        },
    });
};

/**
 * 신청서 템플릿 리스트 조회
 */
export const useApplyForms = (partId?: number) => {
    return useQuery<ApplyFormResponse[]>({
        queryKey: ['applyForms', partId],
        queryFn: async () => {
            const res = await applyFormService.getApplyForms({ partId });
            return res.items;
        },
    });
};

/**
 * 지원자들의 신청서 목록 조회 (관리자)
 */
export const useApplications = (params?: ApplicationsQueryParams) => {
    return useQuery<ApplicationResponse[]>({
        queryKey: ['applications', params],
        queryFn: async () => {
            const res = await applicationService.getApplications(params);
            return res.items;
        },
    });
};

/**
 * 내가 지원한 신청서 목록 조회
 */
export const useMyApplications = () => {
    return useQuery<ApplicationResponse[]>({
        queryKey: ['myApplications'],
        queryFn: async () => {
            return await applicationService.getMyApplications();
        },
    });
};

/**
 * 현재 모집 중인 코스 및 파트 목록 조회
 */
export const useRecruitmentInfo = () => {
    return useQuery({
        queryKey: ['recruitmentInfo'],
        queryFn: async () => {
            return await commonService.getRecruitmentInfo();
        },
    });
};

/**
 * 모든 파트 목록 조회
 */
export const useParts = () => {
    return useQuery({
        queryKey: ['parts'],
        queryFn: async () => {
            return await commonService.getParts();
        },
    });
};
