import { carpetCleaningService } from './carpetCleaning';
import { deepCleaningService } from './deepCleaning';
import { endOfLeaseCleaningService } from './endOfLeaseCleaning';
import { generalCleaningService } from './generalCleaning';
import { moveInCleaningService } from './moveInCleaning';
import { ndisCleaningService } from './ndisCleaning';
import { commercialCleaningService } from './commercialCleaning';
import { renovationCleaningService } from './renovationCleaning';
import { ovenCleaningService } from './ovenCleaning';
import { floorCleaningService } from './floorCleaning';
import { upholsteryCleaningService } from './upholsteryCleaning';
import { windowCleaningService } from './windowCleaning';
import { detailsService } from '../details';
import { ApiResponse } from '../types';

// Export all services
export {
    deepCleaningService,
    carpetCleaningService,
    endOfLeaseCleaningService,
    generalCleaningService,
    moveInCleaningService,
    ndisCleaningService,
    commercialCleaningService,
    renovationCleaningService,
    ovenCleaningService,
    floorCleaningService,
    upholsteryCleaningService,
    windowCleaningService,
    detailsService
};

export type { ApiResponse };

// Service type detection function
export const getCleaningService = (serviceType: string) => {
    switch (serviceType) {
        case 'carpet-clean':
            return carpetCleaningService;
        case 'deep-clean':
            return deepCleaningService;
        case 'end-of-lease':
            return endOfLeaseCleaningService;
        case 'general-clean':
            return generalCleaningService;
        case 'move-in-out':
            return moveInCleaningService;
        case 'ndis-clean':
            return ndisCleaningService;
        case 'commercial':
            return commercialCleaningService;
        case 'renovation':
            return renovationCleaningService;
        case 'oven':
            return ovenCleaningService;
        case 'floor':
            return floorCleaningService;
        case 'upholstery':
            return upholsteryCleaningService;
        case 'window':
            return windowCleaningService;
        case 'details':
            return detailsService;
        default:
            throw new Error(`Unknown service type: ${serviceType}`);
    }
}; 