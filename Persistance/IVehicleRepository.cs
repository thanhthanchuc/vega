using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Models;

namespace vega.Persistance
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicle(int id, bool includeReleased = true);
         void Add(Vehicle vehicle);
         void Remove(Vehicle vehicle);

         Task<IEnumerable<Vehicle>> GetAllVehicles(VehicleQuery filter);
    }
}