using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace vega.Controllers.Resources
{
    public class MakesResources : KeyValuePairResources
    {
        public ICollection<KeyValuePairResources> Models { get; set; }

        public MakesResources() => Models = new Collection<KeyValuePairResources>();
    }
}