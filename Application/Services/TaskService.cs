using TaskManagerAPI.Application.Interfaces;
using TaskManagerAPI.Domain.Entities;
using TaskManagerAPI.Infrastructure.Data;

namespace TaskManagerAPI.Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly AppDbContext _context;

        public TaskService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskItem>> GetAllAsync() =>
            _context.Tasks.ToList();

        public async Task<TaskItem?> GetByIdAsync(int id) =>
            _context.Tasks.FirstOrDefault(t => t.Id == id);

        public async Task<TaskItem> CreateAsync(TaskItem task)
        {
            if (task.DataConclusao.HasValue && task.DataConclusao < task.DataCriacao)
                throw new Exception("Data de conclusão não pode ser anterior à data de criação.");

            _context.Tasks.Add(task);
            _context.SaveChanges();
            return task;
        }

        public async Task<bool> UpdateAsync(TaskItem task)
        {
            var existing = _context.Tasks.FirstOrDefault(t => t.Id == task.Id);
            if (existing == null) return false;

            existing.Title = task.Title;
            existing.Description = task.Description;
            existing.DataConclusao = task.DataConclusao;
            existing.Status = task.Status;

            _context.SaveChanges();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var task = _context.Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return false;

            _context.Tasks.Remove(task);
            _context.SaveChanges();
            return true;
        }
    }
}