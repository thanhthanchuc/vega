using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Models;
using vega.Persistance;

namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;
        public VehiclesController(IUnitOfWork unitOfWork, IMapper mapper, IVehicleRepository repository)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
            this.mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehiclesResources vehicleResources)
        {
            throw new Exception();
            //Validate
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = mapper.Map<SaveVehiclesResources, Vehicle>(vehicleResources);

            vehicle.LastUpdate = DateTime.Now;
            repository.Add(vehicle);
            await unitOfWork.CompleteAsync();

            vehicle = await repository.GetVehicle(vehicle.Id);


            var result = mapper.Map<Vehicle, VehiclesResources>(vehicle);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehiclesResources vehicleResources)
        {
            //Validate
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            //Seach vehicle in Db
            var vehicle = await repository.GetVehicle(id);

            if (vehicle == null)
                return NotFound(id);
            //Mapp VehiclesResources to Vehicle
            mapper.Map<SaveVehiclesResources, Vehicle>(vehicleResources, vehicle);
            vehicle.LastUpdate = DateTime.Now;

            //Save Data
            await unitOfWork.CompleteAsync();

            vehicle = await repository.GetVehicle(vehicle.Id);

            //Map for get value to Test from Postman.
            var result = mapper.Map<Vehicle, SaveVehiclesResources>(vehicle);
            return Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await repository.GetVehicle(id, includeReleased: false);

            if (vehicle == null)
                return NotFound(id);

            repository.Remove(vehicle);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await repository.GetVehicle(id);

            if (vehicle == null)
                return NotFound(id);

            var vehicleResources = mapper.Map<Vehicle, VehiclesResources>(vehicle);

            return Ok(vehicleResources);
        }
    }
}