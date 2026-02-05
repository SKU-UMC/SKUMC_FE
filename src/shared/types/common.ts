
export interface PageResponse<T> {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
}

export interface CursorPageResponse<T> {
    items: T[];
    nextCursor?: string;
    hasNext: boolean;
}