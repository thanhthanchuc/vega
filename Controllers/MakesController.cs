using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Models;
using vega.Persistance;

namespace vega.Controllers
{
    public class MakesController : Controller
    {
        private readonly VegaDbContext _context;

        public MakesController(VegaDbContext context)
        {
            _context = context;
        }

        [HttpGet("/api/makes")]
        public async Task<IEnumerable<Make>> GetMakes()
        {
            return await _context.Makes.Include(c => c.Models).ToListAsync();
        }
    }
}