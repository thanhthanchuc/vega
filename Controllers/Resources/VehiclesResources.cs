using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace vega.Controllers.Resources
{
    public class VehiclesResources
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public bool IsRegistered { get; set; }
        [Required]
        public ContactsResources Contact { get; set; }
        public ICollection<int> Features { get; set; }
        public VehiclesResources() => Features = new Collection<int>();
    }
}