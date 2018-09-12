using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace vega.Controllers.Resources
{
    public class MakesResources
    {
         public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ModelsResources> Models { get; set; }

        public MakesResources() => Models = new Collection<ModelsResources>();
    }
}