namespace vega.Controllers.Resources
{
    public class ModelsResources
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public MakesResources MakesResources { get; set; }
        public int MakeId { get; set; }
    }
}