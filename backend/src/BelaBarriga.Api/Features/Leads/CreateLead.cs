using BelaBarriga.Api.Infrastructure.Data;
using BelaBarriga.Api.Models;
using MediatR;

namespace BelaBarriga.Api.Features.Leads;

public sealed class CreateLeadHandler(AppDbContext db) : IRequestHandler<CreateLeadCommand, Guid>
{
    public async Task<Guid> Handle(CreateLeadCommand cmd, CancellationToken ct)
    {
        var lead = new Lead
        {
            Nome = cmd.Nome,
            WhatsApp = cmd.WhatsApp,
            Email = cmd.Email,
            UtmSource = cmd.UtmSource,
            UtmMedium = cmd.UtmMedium,
            UtmCampaign = cmd.UtmCampaign,
            IpAddress = AnonymizeIp(cmd.IpAddress),
        };

        db.Leads.Add(lead);
        await db.SaveChangesAsync(ct);
        return lead.Id;
    }

    // Zero last two octets of IPv4 for LGPD compliance
    private static string? AnonymizeIp(string? ip)
    {
        if (ip is null) return null;
        var parts = ip.Split('.');
        if (parts.Length != 4) return null;
        return $"{parts[0]}.{parts[1]}.0.0";
    }
}
