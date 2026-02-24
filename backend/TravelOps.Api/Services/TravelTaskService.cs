using TravelOps.Api.Models;

namespace TravelOps.Api.Services;

public class TravelTaskService
{
    private static readonly List<TravelTask> _tasks = new();
    private static int _nextId = 1;

    public TravelTaskService()
    {
        // Seed some data
        if (!_tasks.Any())
        {
            _tasks.Add(new TravelTask { Id = _nextId++, Title = "Book Flight to Vienna", Description = "Flight via Austrian Airlines", Date = DateTime.Now.AddDays(10), IsCompleted = false });
            _tasks.Add(new TravelTask { Id = _nextId++, Title = "Hotel Reservation", Description = "Confirm booking at Hotel Sacher", Date = DateTime.Now.AddDays(11), IsCompleted = false });
        }
    }

    public List<TravelTask> GetAll() => _tasks;

    public TravelTask? GetById(int id) => _tasks.FirstOrDefault(t => t.Id == id);

    public TravelTask Add(TravelTask task)
    {
        task.Id = _nextId++;
        _tasks.Add(task);
        return task;
    }

    public bool Update(int id, TravelTask task)
    {
        var index = _tasks.FindIndex(t => t.Id == id);
        if (index == -1) return false;

        task.Id = id; // Ensure ID is consistent
        _tasks[index] = task;
        return true;
    }

    public bool Delete(int id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task == null) return false;
        
        _tasks.Remove(task);
        return true;
    }
}
