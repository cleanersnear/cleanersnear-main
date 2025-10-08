import { useBookingStore } from "../store";

export function StepSummary() {
  const { selectedService, serviceDetails, customerDetails, pricing } = useBookingStore();

  return (
    <aside className="hidden lg:block rounded-xl border border-gray-200 p-5">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">Booking Summary</h2>
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Service</span>
          <span>{selectedService ?? "--"}</span>
        </div>
        <div className="flex justify-between">
          <span>Duration</span>
          <span>{String(serviceDetails?.duration) ?? "--"}</span>
        </div>
        <div className="flex justify-between">
          <span>Frequency</span>
          <span>{String(serviceDetails?.frequency) ?? "--"}</span>
        </div>
        {customerDetails.firstName && (
          <div className="flex justify-between">
            <span>Customer</span>
            <span>{customerDetails.firstName} {customerDetails.lastName}</span>
          </div>
        )}
        {customerDetails.scheduleDate && (
          <div className="flex justify-between">
            <span>Date</span>
            <span>{new Date(customerDetails.scheduleDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">Booking Total</div>
        <div className="text-2xl font-bold text-gray-900">${pricing?.totalPrice?.toFixed(2) || '0.00'}</div>
      </div>
    </aside>
  );
}
