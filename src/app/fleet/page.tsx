import { getVehicles } from '@/lib/data';
import Link from 'next/link';

const statusColors = {
  'service-worthy': 'bg-green-500',
  'off-road': 'bg-orange-500',
  'away': 'bg-gray-500',
  'trainer': 'bg-yellow-500',
  'auxillary': 'bg-blue-500',
};

export default function FleetList() {
  const vehicles = getVehicles();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-navy">Vehicle Fleet</h1>
        <Link 
          href="/fleet/create"
          className="bg-navy text-cream px-6 py-2 rounded-lg hover:bg-navy-light transition-colors"
        >
          Add Vehicle
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="bg-cream-dark p-8 rounded-lg text-center">
          <p className="text-navy text-lg mb-4">No vehicles in the fleet yet.</p>
          <Link 
            href="/fleet/create"
            className="text-navy-light hover:text-navy transition-colors font-medium"
          >
            Add your first vehicle →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-navy text-cream">
                <tr>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Fleet No.</th>
                  <th className="px-4 py-3 text-left">Registration</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Engine</th>
                  <th className="px-4 py-3 text-left">Gearbox</th>
                  <th className="px-4 py-3 text-left">Chassis</th>
                  <th className="px-4 py-3 text-left">Livery</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="border-b border-cream-dark hover:bg-cream-dark transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${statusColors[vehicle.status]}`} />
                        <span className="capitalize">{vehicle.status.replace('-', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{vehicle.fleetNumber}</td>
                    <td className="px-4 py-3">{vehicle.registration}</td>
                    <td className="px-4 py-3">{vehicle.vehicleType}</td>
                    <td className="px-4 py-3">{vehicle.engineType}</td>
                    <td className="px-4 py-3">{vehicle.gearboxType}</td>
                    <td className="px-4 py-3">{vehicle.chassisType}</td>
                    <td className="px-4 py-3">{vehicle.livery}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/fleet/${vehicle.id}`}
                        className="text-navy-light hover:text-navy font-medium"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
