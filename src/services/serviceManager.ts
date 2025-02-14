{/*

export type ServiceType = 
    | 'deep-clean'
    | 'carpet-clean'
    | 'general-clean'
    | 'end-of-lease'
    | 'move-in-out'
    | 'ndis-clean'
    | 'commercial-clean'
    | 'after-renovation'
    | 'oven-clean'
    | 'tile-and-floor'
    | 'upholstery-clean'
    | 'window-clean';



export interface SelectedService {
    type: ServiceType;
    name: string;
    details: string;
    price: number;
    timestamp: string;
}

class ServiceManager {
    private static instance: ServiceManager;
    private currentService: SelectedService | null = null;

    private constructor() {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('selectedService');
            if (saved) {
                this.currentService = JSON.parse(saved);
            }
        }
    }

    public static getInstance(): ServiceManager {
        if (!ServiceManager.instance) {
            ServiceManager.instance = new ServiceManager();
        }
        return ServiceManager.instance;
    }

    public setSelectedService(service: Omit<SelectedService, 'timestamp'>): void {
        this.currentService = {
            ...service,
            timestamp: new Date().toISOString()
        };
        
        console.log('Setting service with price:', this.currentService);
        localStorage.setItem('selectedService', JSON.stringify(this.currentService));
    }

    public getSelectedService(): SelectedService | null {
        return this.currentService;
    }

    public clearSelectedService(): void {
        this.currentService = null;
        localStorage.removeItem('selectedService');
    }

    public isServiceSelected(): boolean {
        return this.currentService !== null;
    }

    public updateServiceDetails(details: string): void {
        if (this.currentService) {
            this.currentService = {
                ...this.currentService,
                details,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('selectedService', JSON.stringify(this.currentService));
        }
    }

    public updateServicePrice(price: number): void {
        if (this.currentService) {
            this.currentService = {
                ...this.currentService,
                price,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('selectedService', JSON.stringify(this.currentService));
        }
    }
}

export const serviceManager = ServiceManager.getInstance();  */}