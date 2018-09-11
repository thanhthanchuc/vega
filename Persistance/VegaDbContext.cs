using Microsoft.EntityFrameworkCore;

namespace vega.Persistance
{
    public class VegaDbContext : DbContext
    {
        public VegaDbContext(DbContextOptions<VegaDbContext> obtions) : base(obtions)
        {
            
        }
    }
}