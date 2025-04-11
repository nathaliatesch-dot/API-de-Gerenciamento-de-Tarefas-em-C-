using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Domain.Entities;

namespace TaskManagerAPI.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<TaskItem> Tasks => Set<TaskItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskItem>(entity =>
            {
                entity.HasKey(t => t.Id);
                entity.Property(t => t.Title)
                      .IsRequired()
                      .HasMaxLength(100);


                entity.Property(t => t.Status)
                      .HasConversion<int>();
            });
        }
    }
}
