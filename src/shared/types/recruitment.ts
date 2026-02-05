
export interface Major {
    majorId: number;
    name: string;
    enabled: boolean;
}

export interface MajorRequest {
    name: string;
}

export interface Part {
    partId: number;
    name: string;
    description: string;
    enabled: boolean;
    color?: string; // Keep UI helper
}

export interface PartRequest {
    name: string;
    description: string;
}

export interface StatusUpdateRequest {
    status: boolean;
}

export interface Generation {
    cohortId: number;
    cohort: number;
    applyStartDate: string;
    applyEndDate: string;
    interviewStartDate: string;
    interviewEndDate: string;
    parts: Part[];
}

export interface GenerationRequest {
    cohort: number;
    applyStartDate: string;
    applyEndDate: string;
    interviewStartDate: string;
    interviewEndDate: string;
    partIds: number[];
}

export interface GenerationUpdateRequest {
    applyStartDate?: string;
    applyEndDate?: string;
    interviewStartDate?: string;
    interviewEndDate?: string;
    addPartIds?: number[];
    removePartIds?: number[];
}

export interface RecruitmentInfo {
    cohort: number;
    applyStartDate: string;
    applyEndDate: string;
    parts: Part[];
}
