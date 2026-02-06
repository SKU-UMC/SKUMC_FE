
export type QuestionType = 'TEXT' | 'TEXTAREA' | 'RADIO' | 'CHECKBOX';
export type ResultStatus = 'PENDING' | 'PASSED' | 'FAILED';
export type AppliedAtOrder = 'LATEST' | 'OLDEST';

export interface Selection {
    content: string;
    enabled: boolean;
}

export interface Question {
    question: string;
    type: QuestionType;
    required: boolean;
    enabled: boolean;
    selections?: Selection[];
}

export interface QuestionWithId extends Question {
    questionId: string;
}

export interface Answer {
    questionId: string;
    answer: string | string[];
}

export interface ApplicationRequest {
    formId: string;
    answers: Answer[];
}

export interface ApplicationResponse {
    applicationId: string;
    formId: string;
    applicantName: string;
    partName: string;
    firstResult: ResultStatus;
    secondResult: ResultStatus;
    createdAt: string;
}

export interface ApplicationDetailResponse extends ApplicationResponse {
    answers: Answer[];
    questions: QuestionWithId[];
}

export interface ApplicationsQueryParams {
    partId?: number;
    appliedAtOrder?: AppliedAtOrder;
    firstResult?: ResultStatus;
    secondResult?: ResultStatus;
    cursor?: string;
    take?: number;
}

export interface ApplyFormRequest {
    templateName: string;
    partId: number;
    questions: Question[];
}

export interface ApplyFormUpdateRequest {
    formId: string;
    deleteQuestionIds?: string[];
    modifyQuestionIds?: {
        questionId: string;
        question: Question;
    }[];
    addQuestions?: Question[];
}

export interface ApplyFormResponse {
    formId: string;
    templateName: string;
    partId: number;
    partName: string;
    isDefault: boolean;
    createdAt: string;
}

export interface ApplyFormDetailResponse extends ApplyFormResponse {
    questions: QuestionWithId[];
}

export interface ApplyFormsQueryParams {
    partId?: number;
    sort?: string;
    cursor?: string;
    take?: number;
}

export interface ResultUpdateRequest {
    firstResult?: ResultStatus;
    secondResult?: ResultStatus;
}