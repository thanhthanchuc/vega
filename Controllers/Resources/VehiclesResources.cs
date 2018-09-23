using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace vega.Controllers.Resources
{
    public class VehiclesResources
    {
        public int Id { get; set; }
        public KeyValuePairResources Model { get; set; }
        public bool IsRegistered { get; set; }
        public KeyValuePairResources Makes { get; set; }
        public ContactsResources Contact { get; set; }
        public DateTime LastUpdate { get; set; }
        public ICollection<KeyValuePairResources> Features { get; set; }
        public VehiclesResources() => Features = new Collection<KeyValuePairResources>();
    }
}