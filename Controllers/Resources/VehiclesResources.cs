using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace vega.Controllers.Resources
{
    public class VehiclesResources
    {
        public int Id { get; set; }
        public ModelsResources Model { get; set; }
        public bool IsRegistered { get; set; }
        public MakesResources Makes { get; set; }
        public ContactsResources Contact { get; set; }
        public DateTime LastUpdate { get; set; }
        public ICollection<FeatureResources> Features { get; set; }
        public VehiclesResources() => Features = new Collection<FeatureResources>();
    }
}