export interface AfterRenovationCleaningDetails {
    totalPrice: number;
}

export interface AfterRenovationCleaningState extends AfterRenovationCleaningDetails {
    isSubmitting: boolean;
    submitError?: string;
} 