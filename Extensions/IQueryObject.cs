namespace vega.Extensions
{
    public interface IQueryObject
    {
        string SortBy { get; set; }

        bool IsSortAccending { get; set; }
    }
}