import type { Major, Part, Generation } from '../shared/types/recruitment';

// --- Mock Data ---
export const MOCK_MAJORS: Major[] = [
    { majorId: 1, name: '컴퓨터공학과', enabled: true },
    { majorId: 2, name: '소프트웨어학과', enabled: true },
    { majorId: 3, name: '인공지능학과', enabled: false },
    { majorId: 4, name: '사이버보안학과', enabled: true },
];

export const MOCK_PARTS: Part[] = [
    { partId: 1, name: 'Plan', description: '기획', enabled: true, color: '#FFB800' },
    { partId: 2, name: 'Design', description: '디자인', enabled: true, color: '#FF4D4D' },
    { partId: 3, name: 'Web', description: '웹', enabled: true, color: '#007ACC' },
    { partId: 4, name: 'Spring Boot', description: '서버', enabled: true, color: '#6DB33F' },
];

export const MOCK_GENERATIONS: Generation[] = [
    {
        cohortId: 9, cohort: 9,
        applyStartDate: '2025-08-15T09:00:00', applyEndDate: '2025-08-30T23:59:59',
        interviewStartDate: '2025-09-01T10:00:00', interviewEndDate: '2025-09-05T18:00:00',
        parts: MOCK_PARTS.slice(0, 3)
    },
    {
        cohortId: 10, cohort: 10,
        applyStartDate: '2026-02-15T10:00:00', applyEndDate: '2026-02-25T23:59:59',
        interviewStartDate: '2026-03-01T10:00:00', interviewEndDate: '2026-03-05T20:00:00',
        parts: MOCK_PARTS
    }
];