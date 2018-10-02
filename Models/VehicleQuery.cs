using vega.Extensions;

namespace vega.Models
{
    public class VehicleQuery : IQueryObject
    {
        public int? MakeId { get; set; }

        public string SortBy { get; set; }

        public bool IsSortAccending { get; set; }
    }
}