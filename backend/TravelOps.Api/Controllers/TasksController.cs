using Microsoft.AspNetCore.Mvc;
using TravelOps.Api.Models;
using TravelOps.Api.Services;

namespace TravelOps.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TravelTaskService _service;

    public TasksController(TravelTaskService service)
    {
        _service = service;
    }

    [HttpGet]
    public ActionResult<List<TravelTask>> GetAll()
    {
        return Ok(_service.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult<TravelTask> GetById(int id)
    {
        var task = _service.GetById(id);
        if (task == null) return NotFound();
        return Ok(task);
    }

    [HttpPost]
    public ActionResult<TravelTask> Create(TravelTask task)
    {
        var createdTask = _service.Add(task);
        return CreatedAtAction(nameof(GetById), new { id = createdTask.Id }, createdTask);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, TravelTask task)
    {
        if (!_service.Update(id, task)) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        if (!_service.Delete(id)) return NotFound();
        return NoContent();
    }
}
