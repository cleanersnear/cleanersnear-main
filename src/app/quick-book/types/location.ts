export interface Suburb {
    name: string;
    postcode: string;
    region: string;
}

export interface LocationState {
    selectedSuburb: Suburb | null;
    searchQuery: string;
}

// Response type if we fetch suburbs from API in future
export interface LocationResponse {
    success: boolean;
    data: Suburb[];
    error?: string;
} 