using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Application.Interfaces;
using TaskManagerAPI.Application.Services;
using TaskManagerAPI.Infrastructure.Data;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);

// Adiciona os controllers (necess�rio para usar o atributo [ApiController])
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();  // Para documentar sua API com Swagger (�til)

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });


// Configura��o do banco de dados (SQL Server)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registra os servi�os da aplica��o (inje��o de depend�ncia)
builder.Services.AddScoped<ITaskService, TaskService>();

// Configura��o de CORS (Cross-Origin Resource Sharing)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()   // Permite qualquer origem (de onde o frontend pode acessar a API)
              .AllowAnyHeader()   // Permite qualquer cabe�alho HTTP
              .AllowAnyMethod()); // Permite qualquer m�todo HTTP (GET, POST, etc)
});

var app = builder.Build();

// Aplica a pol�tica de CORS, permitindo que o frontend fa�a requisi��es para a API
app.UseCors("AllowAll");

// Teste a conex�o com o banco de dados - Melhorado para rodar as migrations
try
{
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        // Aplica as migrations (caso necess�rio) automaticamente
        context.Database.Migrate();
        Console.WriteLine("Banco de dados migrado com sucesso.");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Erro ao aplicar as migrations ou conectar ao banco de dados: {ex.Message}");
}

// Condi��o para ambiente de desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();  // Swagger para documenta��o da API
    app.UseSwaggerUI(); // Interface para visualiza��o do Swagger
}

// Habilita o redirecionamento HTTPS (caso tenha o certificado configurado)
app.UseHttpsRedirection(); // for�ar HTTPS (opcional)


app.UseAuthorization();
app.MapControllers();
app.Run();