using RealTimeAuctionSystem.Context;
using RealTimeAuctionSystem.Hubs;
using RealTimeAuctionSystem.Repositories.AuctionRepo;
using RealTimeAuctionSystem.Repositories.BidRepo;
using RealTimeAuctionSystem.Repositories.CategoryRepo;
using RealTimeAuctionSystem.Repositories.UserRepo;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<DapperContext>();
builder.Services.AddScoped<ICategoryRepo, CategoryRepo>();
builder.Services.AddScoped<IUserRepo, UserRepo>();  
builder.Services.AddScoped<IAuctionRepo, AuctionRepo>();
builder.Services.AddScoped<IBidRepo, BidRepo>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        builder =>
        {
            builder.WithOrigins("http://localhost",
                "http://localhost:4200",
                "https://localhost:7230",
                "http://localhost:90")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowedToAllowWildcardSubdomains();
        });
});
builder.Services.AddSignalR();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();
app.MapHub<BidHub>("/hubs/bidHub");

app.Run();
