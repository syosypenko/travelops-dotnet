using Xunit;
using TravelOps.Api.Models;
using TravelOps.Api.Services;

namespace TravelTaskManager.Tests;

public class TravelTaskServiceTests
{
    private readonly TravelTaskService _service;

    public TravelTaskServiceTests()
    {
        _service = new TravelTaskService();
    }

    [Fact]
    public void Add_Task_Increments_Id_And_Finds_It()
    {
        // Arrange
        var newTask = new TravelTask { Title = "Test Task", Description = "Testing", Date = DateTime.Now };

        // Act
        var added = _service.Add(newTask);
        var found = _service.GetById(added.Id);

        // Assert
        Assert.NotNull(found);
        Assert.Equal("Test Task", found!.Title);
        Assert.True(added.Id > 0);
    }

    [Fact]
    public void GetAll_Returns_Tasks()
    {
        // Act
        var tasks = _service.GetAll();

        // Assert
        Assert.NotNull(tasks);
        Assert.NotEmpty(tasks); // Service seeds tasks
    }

    [Fact]
    public void Delete_Removes_Task()
    {
        // Arrange
        var task = _service.GetAll().First();
        int initialCount = _service.GetAll().Count;

        // Act
        var result = _service.Delete(task.Id);
        var afterDeleteCount = _service.GetAll().Count;

        // Assert
        Assert.True(result);
        Assert.Equal(initialCount - 1, afterDeleteCount);
        Assert.Null(_service.GetById(task.Id));
    }

    [Fact]
    public void Update_Modifies_Existing_Task()
    {
        // Arrange
        var task = _service.GetAll().First();
        var originalTitle = task.Title;
        task.Title = "Updated Title";

        // Act
        var result = _service.Update(task.Id, task);
        var updatedTask = _service.GetById(task.Id);

        // Assert
        Assert.True(result);
        Assert.Equal("Updated Title", updatedTask!.Title);
    }
}
