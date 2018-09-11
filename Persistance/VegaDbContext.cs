using Microsoft.EntityFrameworkCore;
using vega.Models;

namespace vega.Persistance
{
    public class VegaDbContext : DbContext
    {
        public DbSet<Make> Makes { get; set; }
        public VegaDbContext(DbContextOptions<VegaDbContext> obtions) : base(obtions)
        {
            
        }
    }
}