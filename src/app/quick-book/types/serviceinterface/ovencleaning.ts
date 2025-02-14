export interface OvenCleaningDetails {
    totalPrice: number;
}

export interface OvenCleaningState extends OvenCleaningDetails {
    isSubmitting: boolean;
    submitError?: string;
} 