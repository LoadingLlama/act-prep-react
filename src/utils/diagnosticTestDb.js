/**
 * @deprecated This file is deprecated. Import from services/api/diagnostic.service.js instead
 * Kept for backward compatibility - re-exports from DiagnosticService
 */

import DiagnosticService from '../services/api/diagnostic.service';

// Re-export all methods for backward compatibility
export const getDiagnosticQuestions = DiagnosticService.getDiagnosticQuestions.bind(DiagnosticService);
export const getDiagnosticQuestionsByLesson = DiagnosticService.getDiagnosticQuestionsByLesson.bind(DiagnosticService);
export const saveDiagnosticAnswer = DiagnosticService.saveDiagnosticAnswer.bind(DiagnosticService);
export const createDiagnosticSession = DiagnosticService.createDiagnosticSession.bind(DiagnosticService);
export const completeDiagnosticSession = DiagnosticService.completeDiagnosticSession.bind(DiagnosticService);
export const getUserDiagnosticHistory = DiagnosticService.getUserDiagnosticHistory.bind(DiagnosticService);
export const getUserPerformanceBySection = DiagnosticService.getUserPerformanceBySection.bind(DiagnosticService);
export const bulkInsertDiagnosticQuestions = DiagnosticService.bulkInsertDiagnosticQuestions.bind(DiagnosticService);
