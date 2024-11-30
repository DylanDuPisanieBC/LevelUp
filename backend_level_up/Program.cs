using backend_level_up.data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();


if(builder.Environment.IsDevelopment()){

    // setup swagger - for testing purposes
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    // allow cross origin requests - for testing purposes
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(builder =>
            {           
                builder.AllowAnyOrigin();
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
            });
    });

    builder.Services.AddDbContext<ApplicationDbContext>(options => 
    {
        options.UseInMemoryDatabase("GradutesTestDB");        
    });

}else{

    builder.Services.AddDbContext<ApplicationDbContext>(options => 
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("DB_Connection_String"));
    });

}

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    // As requested - Swagger to run and test the API
    app.UseSwagger();
    app.UseSwaggerUI();

    DataBaseDataPopulation dbPop = new DataBaseDataPopulation(app.Services.CreateScope().ServiceProvider.GetRequiredService<ApplicationDbContext>());
    dbPop.PopulateDatabase();   
}

app.MapControllers();
app.UseHttpsRedirection();

app.Run();




