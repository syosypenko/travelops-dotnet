namespace TravelOps.Api.Models;

public class TravelTask
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public bool IsCompleted { get; set; }
}
