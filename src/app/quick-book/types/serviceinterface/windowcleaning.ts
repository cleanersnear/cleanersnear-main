export interface WindowCleaningDetails {
    totalPrice: number;
}

export interface WindowCleaningState extends WindowCleaningDetails {
    isSubmitting: boolean;
    submitError?: string;
} 