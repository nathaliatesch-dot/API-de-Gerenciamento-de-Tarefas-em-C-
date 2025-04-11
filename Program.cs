using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Application.Interfaces;
using TaskManagerAPI.Application.Services;
using TaskManagerAPI.Infrastructure.Data;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);

// Adiciona os controllers (necessário para usar o atributo [ApiController])
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();  // Para documentar sua API com Swagger (útil)

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });


// Configuração do banco de dados (SQL Server)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registra os serviços da aplicação (injeção de dependência)
builder.Services.AddScoped<ITaskService, TaskService>();

// Configuração de CORS (Cross-Origin Resource Sharing)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()   // Permite qualquer origem (de onde o frontend pode acessar a API)
              .AllowAnyHeader()   // Permite qualquer cabeçalho HTTP
              .AllowAnyMethod()); // Permite qualquer método HTTP (GET, POST, etc)
});

var app = builder.Build();

// Aplica a política de CORS, permitindo que o frontend faça requisições para a API
app.UseCors("AllowAll");

// Teste a conexão com o banco de dados - Melhorado para rodar as migrations
try
{
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        // Aplica as migrations (caso necessário) automaticamente
        context.Database.Migrate();
        Console.WriteLine("Banco de dados migrado com sucesso.");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Erro ao aplicar as migrations ou conectar ao banco de dados: {ex.Message}");
}

// Condição para ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();  // Swagger para documentação da API
    app.UseSwaggerUI(); // Interface para visualização do Swagger
}

// Habilita o redirecionamento HTTPS (caso tenha o certificado configurado)
app.UseHttpsRedirection(); // forçar HTTPS (opcional)


app.UseAuthorization();
app.MapControllers();
app.Run();