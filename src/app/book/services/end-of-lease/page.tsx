"use client";

import { useBookingStore } from "../../store";
import type { EndOfLeaseCleaningDetails, EndOfLeaseCleaningPricing, EndOfLeaseAddition, BookingStep } from "../../types";
import { END_OF_LEASE_CLEANING_CONFIG } from "./config";

export default function EndOfLeaseCleaningPage() {
  const { serviceDetails, updateServiceDetails, setCurrentStep, updatePricing } = useBookingStore();
  
  // Simple and clean - just cast serviceDetails to EndOfLeaseCleaningDetails
  const details = (serviceDetails || {}) as unknown as EndOfLeaseCleaningDetails;
  
  // Service updater available but not used in this component
  // const updateEndOfLeaseDetails = createServiceUpdater(updateServiceDetails);

  const setHomeSize = (size: EndOfLeaseCleaningDetails['homeSize']) => {
    const sizeCfg = END_OF_LEASE_CLEANING_CONFIG.SIZES.find((s) => s.label === size)!;
    updateServiceDetails({
      homeSize: size,
      baseBathrooms: sizeCfg.bathrooms,
      baseToilets: sizeCfg.toilets,
      // store ACTUAL counts equal to base by default; pricing will add beyond base
      extraBathrooms: sizeCfg.bathrooms,
      extraToilets: sizeCfg.toilets,
    });
    recalc();
  };

  const recalc = () => {
    const pricing = calculatePricing(details);
    updatePricing(pricing);
  };

  const calculatePricing = (d: EndOfLeaseCleaningDetails): EndOfLeaseCleaningPricing => {
    const additions: Array<EndOfLeaseAddition> = [];

    const sizeCfg = END_OF_LEASE_CLEANING_CONFIG.SIZES.find((s) => s.label === d.homeSize);
    const basePrice = sizeCfg ? sizeCfg.price : 0;
    let total = basePrice;

    if (sizeCfg?.manualQuote) {
      return { basePrice, additions, total: 0, totalPrice: 0 };
    }

    const baseBath = Number(d.baseBathrooms || 0);
    const baseToil = Number(d.baseToilets || 0);
    const actualBath = Number(d.extraBathrooms ?? baseBath);
    const actualToil = Number(d.extraToilets ?? baseToil);
    const extraBath = Math.max(0, actualBath - baseBath);
    const extraToil = Math.max(0, actualToil - baseToil);

    if (extraBath > 0) {
      const amt = extraBath * END_OF_LEASE_CLEANING_CONFIG.PRICES.EXTRA_BATHROOM;
      additions.push({ label: `Additional bathrooms ×${extraBath}`, amount: amt });
      total += amt;
    }
    if (extraToil > 0) {
      const amt = extraToil * END_OF_LEASE_CLEANING_CONFIG.PRICES.EXTRA_TOILET;
      additions.push({ label: `Additional toilets ×${extraToil}`, amount: amt });
      total += amt;
    }

    if (d.furnished) {
      additions.push({ label: "Furnished", amount: END_OF_LEASE_CLEANING_CONFIG.PRICES.FURNISHED });
      total += END_OF_LEASE_CLEANING_CONFIG.PRICES.FURNISHED;
    }
    if (d.studyRoom) {
      additions.push({ label: "Study room", amount: END_OF_LEASE_CLEANING_CONFIG.PRICES.STUDY_ROOM });
      total += END_OF_LEASE_CLEANING_CONFIG.PRICES.STUDY_ROOM;
    }
    if (d.pets) {
      additions.push({ label: "Pets (additional cleaning)", amount: END_OF_LEASE_CLEANING_CONFIG.PRICES.PETS });
      total += END_OF_LEASE_CLEANING_CONFIG.PRICES.PETS;
    }

    if (d.steamCarpet) {
      additions.push({ label: "Steam carpet cleaning (base)", amount: END_OF_LEASE_CLEANING_CONFIG.PRICES.STEAM_BASE });
      total += END_OF_LEASE_CLEANING_CONFIG.PRICES.STEAM_BASE;
      const bedrooms = Math.max(0, Number(d.steamCounts?.bedrooms || 0));
      const living = Math.max(0, Number(d.steamCounts?.livingRooms || 0));
      if (bedrooms > 0) {
        const amt = bedrooms * END_OF_LEASE_CLEANING_CONFIG.PRICES.STEAM_PER_ROOM;
        additions.push({ label: `Carpeted bedrooms ×${bedrooms}`, amount: amt });
        total += amt;
      }
      if (living > 0) {
        const amt = living * END_OF_LEASE_CLEANING_CONFIG.PRICES.STEAM_PER_ROOM;
        additions.push({ label: `Carpeted living rooms ×${living}`, amount: amt });
        total += amt;
      }
      if (d.steamCounts?.hallway) {
        additions.push({ label: "Hallway", amount: END_OF_LEASE_CLEANING_CONFIG.PRICES.STEAM_HALLWAY });
        total += END_OF_LEASE_CLEANING_CONFIG.PRICES.STEAM_HALLWAY;
      }
      if (d.steamCounts?.stairs) {
        additions.push({ label: "Stairs", amount: END_OF_LEASE_CLEANING_CONFIG.PRICES.STEAM_STAIRS });
        total += END_OF_LEASE_CLEANING_CONFIG.PRICES.STEAM_STAIRS;
      }
    }

    if (d.extras?.balcony) {
      additions.push({ label: "Balcony", amount: END_OF_LEASE_CLEANING_CONFIG.PRICES.EXTRA_BALCONY });
      total += END_OF_LEASE_CLEANING_CONFIG.PRICES.EXTRA_BALCONY;
    }
    if (d.extras?.garage) {
      additions.push({ label: "Garage clean", amount: END_OF_LEASE_CLEANING_CONFIG.PRICES.EXTRA_GARAGE });
      total += END_OF_LEASE_CLEANING_CONFIG.PRICES.EXTRA_GARAGE;
    }

    return { basePrice, additions, total, totalPrice: total };
  };

  const sizeCfg = END_OF_LEASE_CLEANING_CONFIG.SIZES.find((s) => s.label === details.homeSize);
  const pricing = calculatePricing(details);

  const handleContinue = () => {
    recalc();
    setCurrentStep(3 as BookingStep);
  };

  const disabledManual = sizeCfg?.manualQuote;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">End of Lease Cleaning Details</h3>
      <p className="text-gray-700 mb-6">Bond-ready move-in/move-out cleaning to meet inspection standards.</p>

      <div className="space-y-6">
        {/* Home Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Home Size</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {END_OF_LEASE_CLEANING_CONFIG.SIZES.map((s) => (
              <button
                key={s.label}
                className={`p-3 border rounded-lg text-left transition-colors ${
                  details.homeSize === s.label ? 'border-[#1E3D8F] bg-blue-50' : 'border-gray-300 hover:border-[#1E3D8F]'
                }`}
                onClick={() => setHomeSize(s.label)}
              >
                <div className="font-medium text-gray-900">{s.label}</div>
                <div className="text-sm text-gray-600">{s.manualQuote ? 'Contact office' : `$${s.price.toFixed(2)}`}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Additional bathrooms/toilets */}
        {!disabledManual && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-700 mb-1">Bathrooms</div>
              <div className="flex items-center gap-4">
                <button type="button" className="h-9 w-9 rounded-full border border-gray-300" onClick={() => { const min = Number(details.baseBathrooms || 0); updateServiceDetails({ extraBathrooms: Math.max(min, (details.extraBathrooms ?? min) - 1) }); recalc(); }}>−</button>
                <div className="text-gray-900 font-medium">{details.extraBathrooms ?? details.baseBathrooms ?? 0}</div>
                <button type="button" className="h-9 w-9 rounded-full border border-gray-300" onClick={() => { const min = Number(details.baseBathrooms || 0); updateServiceDetails({ extraBathrooms: (details.extraBathrooms ?? min) + 1 }); recalc(); }}>+</button>
              </div>
              <div className="text-xs text-gray-500 mt-1">${END_OF_LEASE_CLEANING_CONFIG.PRICES.EXTRA_BATHROOM} each after base ({details.baseBathrooms || 0} included)</div>
            </div>
            <div>
              <div className="text-sm text-gray-700 mb-1">Toilets</div>
              <div className="flex items-center gap-4">
                <button type="button" className="h-9 w-9 rounded-full border border-gray-300" onClick={() => { const min = Number(details.baseToilets || 0); updateServiceDetails({ extraToilets: Math.max(min, (details.extraToilets ?? min) - 1) }); recalc(); }}>−</button>
                <div className="text-gray-900 font-medium">{details.extraToilets ?? details.baseToilets ?? 0}</div>
                <button type="button" className="h-9 w-9 rounded-full border border-gray-300" onClick={() => { const min = Number(details.baseToilets || 0); updateServiceDetails({ extraToilets: (details.extraToilets ?? min) + 1 }); recalc(); }}>+</button>
              </div>
              <div className="text-xs text-gray-500 mt-1">${END_OF_LEASE_CLEANING_CONFIG.PRICES.EXTRA_TOILET} each after base ({details.baseToilets || 0} included)</div>
            </div>
          </div>
        )}

        {/* Flags */}
        {!disabledManual && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => { updateServiceDetails({ furnished: !details.furnished }); recalc(); }}
              className={`flex items-center justify-between rounded-lg border px-4 py-2 text-sm ${details.furnished ? 'border-[#1E3D8F] bg-blue-50 text-gray-900' : 'border-gray-300 text-gray-700 hover:border-[#1E3D8F]'}`}
            >
              <span>Furnished</span>
              <span className={`h-5 w-10 rounded-full relative transition-colors ${details.furnished ? 'bg-[#1E3D8F]' : 'bg-gray-300'}`}>
                <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${details.furnished ? 'translate-x-5' : ''}`}></span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => { updateServiceDetails({ studyRoom: !details.studyRoom }); recalc(); }}
              className={`flex items-center justify-between rounded-lg border px-4 py-2 text-sm ${details.studyRoom ? 'border-[#1E3D8F] bg-blue-50 text-gray-900' : 'border-gray-300 text-gray-700 hover:border-[#1E3D8F]'}`}
            >
              <span>Study room </span>
              <span className={`h-5 w-10 rounded-full relative transition-colors ${details.studyRoom ? 'bg-[#1E3D8F]' : 'bg-gray-300'}`}>
                <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${details.studyRoom ? 'translate-x-5' : ''}`}></span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => { updateServiceDetails({ pets: !details.pets }); recalc(); }}
              className={`flex items-center justify-between rounded-lg border px-4 py-2 text-sm ${details.pets ? 'border-[#1E3D8F] bg-blue-50 text-gray-900' : 'border-gray-300 text-gray-700 hover:border-[#1E3D8F]'}`}
            >
              <span>Was pets </span>
              <span className={`h-5 w-10 rounded-full relative transition-colors ${details.pets ? 'bg-[#1E3D8F]' : 'bg-gray-300'}`}>
                <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${details.pets ? 'translate-x-5' : ''}`}></span>
              </span>
            </button>
          </div>
        )}

        {/* Steam carpet */}
        {!disabledManual && (
          <div className="rounded-lg border border-gray-200 p-4">
            <button
              type="button"
              onClick={() => { updateServiceDetails({ steamCarpet: !details.steamCarpet }); recalc(); }}
              className={`flex items-center justify-between rounded-lg border px-4 py-2 text-sm w-full ${details.steamCarpet ? 'border-[#1E3D8F] bg-blue-50 text-gray-900' : 'border-gray-300 text-gray-700 hover:border-[#1E3D8F]'}`}
            >
              <span className="text-sm text-gray-900 font-medium">Steam Carpet Cleaning Required</span>
              <span className={`h-5 w-10 rounded-full relative transition-colors ${details.steamCarpet ? 'bg-[#1E3D8F]' : 'bg-gray-300'}`}>
                <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${details.steamCarpet ? 'translate-x-5' : ''}`}></span>
              </span>
            </button>

            {details.steamCarpet && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-700 mb-2">Bedrooms (+$30 each)</div>
                  <div className="flex items-center gap-4">
                    <button type="button" className="h-9 w-9 rounded-full border border-gray-300" onClick={() => { updateServiceDetails({ steamCounts: { ...details.steamCounts, bedrooms: Math.max(0, (details.steamCounts?.bedrooms || 0) - 1) } }); recalc(); }}>−</button>
                    <div className="text-gray-900 font-medium">{details.steamCounts?.bedrooms || 0}</div>
                    <button type="button" className="h-9 w-9 rounded-full border border-gray-300" onClick={() => { updateServiceDetails({ steamCounts: { ...details.steamCounts, bedrooms: (details.steamCounts?.bedrooms || 0) + 1 } }); recalc(); }}>+</button>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-700 mb-2">Living rooms (+$30 each)</div>
                  <div className="flex items-center gap-4">
                    <button type="button" className="h-9 w-9 rounded-full border border-gray-300" onClick={() => { updateServiceDetails({ steamCounts: { ...details.steamCounts, livingRooms: Math.max(0, (details.steamCounts?.livingRooms || 0) - 1) } }); recalc(); }}>−</button>
                    <div className="text-gray-900 font-medium">{details.steamCounts?.livingRooms || 0}</div>
                    <button type="button" className="h-9 w-9 rounded-full border border-gray-300" onClick={() => { updateServiceDetails({ steamCounts: { ...details.steamCounts, livingRooms: (details.steamCounts?.livingRooms || 0) + 1 } }); recalc(); }}>+</button>
                  </div>
                </div>
                <button type="button" onClick={() => { updateServiceDetails({ steamCounts: { ...details.steamCounts, hallway: !details.steamCounts?.hallway } }); recalc(); }} className={`flex items-center justify-between rounded-lg border px-4 py-2 text-sm ${details.steamCounts?.hallway ? 'border-[#1E3D8F] bg-blue-50 text-gray-900' : 'border-gray-300 text-gray-700 hover:border-[#1E3D8F]'}`}>
                  <span>Hallway </span>
                  <span className={`h-5 w-10 rounded-full relative transition-colors ${details.steamCounts?.hallway ? 'bg-[#1E3D8F]' : 'bg-gray-300'}`}>
                    <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${details.steamCounts?.hallway ? 'translate-x-5' : ''}`}></span>
                  </span>
                </button>
                <button type="button" onClick={() => { updateServiceDetails({ steamCounts: { ...details.steamCounts, stairs: !details.steamCounts?.stairs } }); recalc(); }} className={`flex items-center justify-between rounded-lg border px-4 py-2 text-sm ${details.steamCounts?.stairs ? 'border-[#1E3D8F] bg-blue-50 text-gray-900' : 'border-gray-300 text-gray-700 hover:border-[#1E3D8F]'}`}>
                  <span>Stairs </span>
                  <span className={`h-5 w-10 rounded-full relative transition-colors ${details.steamCounts?.stairs ? 'bg-[#1E3D8F]' : 'bg-gray-300'}`}>
                    <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${details.steamCounts?.stairs ? 'translate-x-5' : ''}`}></span>
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Extras */}
        {!disabledManual && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button type="button" onClick={() => { updateServiceDetails({ extras: { ...details.extras, balcony: !details.extras?.balcony } }); recalc(); }} className={`flex items-center justify-between rounded-lg border px-4 py-2 text-sm ${details.extras?.balcony ? 'border-[#1E3D8F] bg-blue-50 text-gray-900' : 'border-gray-300 text-gray-700 hover:border-[#1E3D8F]'}`}>
              <span>Balcony (+$55)</span>
              <span className={`h-5 w-10 rounded-full relative transition-colors ${details.extras?.balcony ? 'bg-[#1E3D8F]' : 'bg-gray-300'}`}>
                <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${details.extras?.balcony ? 'translate-x-5' : ''}`}></span>
              </span>
            </button>
            <button type="button" onClick={() => { updateServiceDetails({ extras: { ...details.extras, garage: !details.extras?.garage } }); recalc(); }} className={`flex items-center justify-between rounded-lg border px-4 py-2 text-sm ${details.extras?.garage ? 'border-[#1E3D8F] bg-blue-50 text-gray-900' : 'border-gray-300 text-gray-700 hover:border-[#1E3D8F]'}`}>
              <span>Garage Clean (+$40)</span>
              <span className={`h-5 w-10 rounded-full relative transition-colors ${details.extras?.garage ? 'bg-[#1E3D8F]' : 'bg-gray-300'}`}>
                <span className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform ${details.extras?.garage ? 'translate-x-5' : ''}`}></span>
              </span>
            </button>
          </div>
        )}

        {/* Pricing summary */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Pricing Summary</h4>
          {sizeCfg?.manualQuote ? (
            <div className="text-sm text-blue-700">For 5+ bedrooms, please contact our office for a manual quote.</div>
          ) : (
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>Base:</span><span>${pricing.basePrice.toFixed(2)}</span></div>
              {pricing.additions.map((a: EndOfLeaseAddition) => (
                <div key={a.label} className="flex justify-between"><span>{a.label}:</span><span>${a.amount.toFixed(2)}</span></div>
              ))}
              <div className="flex justify-between font-semibold border-t border-gray-300 pt-2"><span>Total:</span><span>${pricing.total.toFixed(2)}</span></div>
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            className="w-full bg-[#1E3D8F] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#1E3D8F]/90 disabled:bg-gray-400"
            onClick={handleContinue}
            disabled={!details.homeSize}
          >
            Continue to Your Details
          </button>
        </div>
      </div>
    </div>
  );
}
