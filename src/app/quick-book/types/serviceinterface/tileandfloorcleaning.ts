export interface TileAndFloorCleaningDetails {
    totalPrice: number;
}

export interface TileAndFloorCleaningState extends TileAndFloorCleaningDetails {
    isSubmitting: boolean;
    submitError?: string;
} 