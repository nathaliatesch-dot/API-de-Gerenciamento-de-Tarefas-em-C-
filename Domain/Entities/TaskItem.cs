using System;

namespace TaskManagerAPI.Domain.Entities
{
    public enum TaskStatus
    {
        Pendente,
        EmProgresso,
        Concluida
    }

    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public DateTime DataCriacao { get; set; } = DateTime.Now;
        public DateTime? DataConclusao { get; set; }
        public TaskStatus Status { get; set; } = TaskStatus.Pendente;
    }
}