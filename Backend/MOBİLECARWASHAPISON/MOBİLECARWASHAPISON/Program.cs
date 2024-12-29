
using Microsoft.EntityFrameworkCore;
using MOBİLECARWASHAPISON.Entities;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<CarwashContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))); // Bağlantı dizesini ayarlayın

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    options.RoutePrefix = string.Empty;  // Swagger ana sayfasına doğrudan yönlendirme
});
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();



app.Run();
