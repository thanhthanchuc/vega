using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resources;
using vega.Models;

namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        public VehiclesController(IMapper mapper)
        {
            this.mapper = mapper;
        }
        [HttpPost]
        public IActionResult CreateVehicle([FromBody] VehiclesResources vehicleResources)
        {
            var vehicle = mapper.Map<VehiclesResources, Vehicle>(vehicleResources);
            return Ok(vehicle);
        }
    }
}