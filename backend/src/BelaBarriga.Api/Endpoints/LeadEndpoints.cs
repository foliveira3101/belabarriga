using BelaBarriga.Api.Features.Leads;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;

namespace BelaBarriga.Api.Endpoints;

public static class LeadEndpoints
{
    public static void MapLeadEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapPost("/api/leads", async (
            CreateLeadRequest req,
            IValidator<CreateLeadCommand> validator,
            ISender sender,
            HttpContext ctx,
            CancellationToken ct) =>
        {
            var command = new CreateLeadCommand(
                req.Nome, req.WhatsApp, req.Email, req.Consentimento,
                req.UtmSource, req.UtmMedium, req.UtmCampaign,
                ctx.Connection.RemoteIpAddress?.ToString());

            var result = await validator.ValidateAsync(command, ct);
            if (!result.IsValid)
                return Results.ValidationProblem(result.ToDictionary());

            var id = await sender.Send(command, ct);
            return Results.Created($"/api/leads/{id}", new { id });
        })
        .WithName("CreateLead")
        .WithTags("Leads")
        .RequireRateLimiting("leads");
    }
}

public sealed record CreateLeadRequest(
    string Nome,
    string WhatsApp,
    string Email,
    bool Consentimento,
    string? UtmSource,
    string? UtmMedium,
    string? UtmCampaign);
