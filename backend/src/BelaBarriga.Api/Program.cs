using System.Threading.RateLimiting;
using BelaBarriga.Api.Endpoints;
using BelaBarriga.Api.Features.Leads;
using BelaBarriga.Api.Infrastructure.Data;
using FluentValidation;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;
using Serilog;
using Serilog.Settings.Configuration;

Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateBootstrapLogger();

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Host.UseSerilog((ctx, cfg) =>
        cfg.ReadFrom.Configuration(ctx.Configuration)
           .Enrich.FromLogContext()
           .Enrich.WithProperty("Service", "BelaBarriga.Api"));

    builder.Services.AddOpenTelemetry()
        .ConfigureResource(r => r.AddService("BelaBarriga.Api"))
        .WithTracing(t => t.AddAspNetCoreInstrumentation())
        .WithMetrics(m => m.AddAspNetCoreInstrumentation());

    var connStr = builder.Configuration.GetConnectionString("Default")
        ?? "Host=localhost;Port=5432;Database=belabarriga;Username=postgres;Password=postgres";

    builder.Services.AddDbContext<AppDbContext>(opt => opt.UseNpgsql(connStr));

    builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblyContaining<CreateLeadHandler>());
    builder.Services.AddValidatorsFromAssemblyContaining<CreateLeadValidator>();

    builder.Services.AddHealthChecks()
        .AddNpgSql(connStr, name: "postgres");

    builder.Services.AddRateLimiter(opt =>
    {
        opt.AddSlidingWindowLimiter("leads", o =>
        {
            o.PermitLimit = 5;
            o.Window = TimeSpan.FromMinutes(1);
            o.SegmentsPerWindow = 6;
            o.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
            o.QueueLimit = 0;
        });
        opt.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    });

    var corsOrigin = builder.Configuration["CORS_ORIGIN"] ?? "http://localhost:5173";
    builder.Services.AddCors(opt =>
        opt.AddDefaultPolicy(p => p.WithOrigins(corsOrigin).AllowAnyHeader().AllowAnyMethod()));

    var app = builder.Build();

    app.UseSerilogRequestLogging();
    app.UseCors();
    app.UseRateLimiter();

    app.MapHealthChecks("/health");
    app.MapHealthChecks("/health/ready");
    app.MapHealthChecks("/health/live");

    app.MapLeadEndpoints();

    await app.RunAsync();
}
catch (Exception ex) when (ex is not HostAbortedException)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
